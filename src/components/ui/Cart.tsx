import React from 'react';
import { ShoppingCart, Trash2, Calendar, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { CartItem } from '../../types/booking';
import { Button } from './Button';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (serviceId: string) => void;
  onUpdateQuantity: (serviceId: string, quantity: number) => void;
  onCheckout: () => void;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  className?: string;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  isMinimized = false,
  onToggleMinimize,
  className = ''
}) => {
  const totalAmount = items.reduce((sum, item) => sum + (item.service.price * item.quantity), 0);
  const totalDuration = items.reduce((sum, item) => sum + (item.service.duration * item.quantity), 0);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  if (items.length === 0) {
    return (
      <div className={`bg-white rounded-2xl p-6 text-center ${className}`}>
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">Add some services to get started</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg transition-all duration-300 border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="px-3 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-semibold text-gray-900">Your Cart</h2>
            <div className="flex items-center space-x-1">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600 font-semibold">{items.length}</span>
            </div>
          </div>
          {onToggleMinimize && (
            <button
              onClick={onToggleMinimize}
              aria-label={isMinimized ? "Expand cart" : "Minimize cart"}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              {isMinimized ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
        </div>
      </div>

      {isMinimized ? (
        /* Minimized View */
        <div className="px-3 py-4">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-purple-600">₹{totalAmount}</span>
            <span className="text-sm text-gray-600">• {formatDuration(totalDuration)}</span>
          </div>
          <Button
            onClick={onCheckout}
            size="sm"
            className="w-full mt-3"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Proceed to Checkout
          </Button>
        </div>
      ) : (
        /* Expanded View */
        <>
          {/* Cart Items */}
          <div className="px-3 py-4 space-y-4 max-h-32 overflow-y-auto">
            {items.map((item) => (
              <div key={`${item.service.id}-${item.provider.id}`} className="flex space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.service.image}
                    alt={item.service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.service.name}</h4>
                  <p className="text-sm text-gray-600">{item.provider.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.service.id, Math.max(0, item.quantity - 1))}
                        aria-label={`Decrease quantity of ${item.service.name}`}
                        className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-gray-600 text-sm">-</span>
                      </button>
                      <span 
                        className="font-medium text-gray-900 min-w-[20px] text-center"
                        aria-label={`Quantity: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.service.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.service.name}`}
                        className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center hover:bg-purple-200 transition-colors"
                      >
                        <span className="text-purple-600 text-sm">+</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-purple-600">₹{item.service.price * item.quantity}</span>
                      <button
                        onClick={() => onRemoveItem(item.service.id)}
                        aria-label={`Remove ${item.service.name} from cart`}
                        className="w-6 h-6 bg-red-100 rounded flex items-center justify-center hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="px-3 py-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Total Duration:</span>
              </div>
              <span className="font-medium text-gray-900">{formatDuration(totalDuration)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
              <span className="text-xl font-bold text-purple-600">₹{totalAmount}</span>
            </div>

            <Button
              onClick={onCheckout}
              size="lg"
              className="w-full py-3"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};