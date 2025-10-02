import redis.asyncio as redis
from typing import Optional, Any
import json
from app.core.config import settings

class RedisClient:
    def __init__(self):
        self.redis: Optional[redis.Redis] = None

    async def connect(self):
        self.redis = await redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True
        )

    async def disconnect(self):
        if self.redis:
            await self.redis.close()

    async def get(self, key: str) -> Optional[Any]:
        if not self.redis:
            return None
        value = await self.redis.get(key)
        if value:
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                return value
        return None

    async def set(self, key: str, value: Any, expire: int = 3600) -> bool:
        if not self.redis:
            return False
        if isinstance(value, (dict, list)):
            value = json.dumps(value)
        return await self.redis.set(key, value, ex=expire)

    async def delete(self, key: str) -> bool:
        if not self.redis:
            return False
        return await self.redis.delete(key) > 0

    async def exists(self, key: str) -> bool:
        if not self.redis:
            return False
        return await self.redis.exists(key) > 0

    async def set_hash(self, key: str, mapping: dict, expire: int = 3600) -> bool:
        if not self.redis:
            return False
        await self.redis.hset(key, mapping=mapping)
        await self.redis.expire(key, expire)
        return True

    async def get_hash(self, key: str) -> Optional[dict]:
        if not self.redis:
            return None
        return await self.redis.hgetall(key)

    async def increment(self, key: str, amount: int = 1) -> int:
        if not self.redis:
            return 0
        return await self.redis.incrby(key, amount)

redis_client = RedisClient()
