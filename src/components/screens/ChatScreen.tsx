import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Button } from '../ui/Button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'therapist';
  timestamp: string;
  type: 'text' | 'image' | 'booking';
}

interface ChatScreenProps {
  therapistInfo: {
    id: string;
    name: string;
    photo: string;
    isOnline: boolean;
    specialties: string[];
  };
  onBack: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  therapistInfo,
  onBack,
  onCall,
  onVideoCall
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m excited to help you with your wellness journey. How are you feeling today?',
      sender: 'therapist',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '2',
      text: 'Hi! I\'m looking forward to our session. I have some tension in my shoulders.',
      sender: 'user',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: '3',
      text: 'I understand. Shoulder tension is very common, especially with desk work. I\'ll focus on that area during our massage. Any specific areas of concern?',
      sender: 'therapist',
      timestamp: '10:33 AM',
      type: 'text'
    },
    {
      id: '4',
      text: 'Yes, mainly the right shoulder and neck area. Also, should I prepare anything before you arrive?',
      sender: 'user',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: '5',
      text: 'Perfect! Just ensure you have a comfortable space ready. I\'ll bring all the necessary equipment. I\'m about 15 minutes away from your location.',
      sender: 'therapist',
      timestamp: '10:37 AM',
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'text'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // Simulate therapist typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const therapistResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Thank you for letting me know. I\'ll make sure to address that during our session.',
          sender: 'therapist',
          timestamp: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          type: 'text'
        };
        setMessages(prev => [...prev, therapistResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 pt-12">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              aria-label="Go back to previous screen"
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={therapistInfo.photo}
                    alt={therapistInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {therapistInfo.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{therapistInfo.name}</h1>
                <p className="text-sm text-gray-600">
                  {therapistInfo.isOnline ? 'Online' : 'Last seen recently'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {onCall && (
              <button
                onClick={onCall}
                aria-label="Start voice call"
                className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center hover:bg-green-200 transition-colors"
              >
                <Phone className="w-5 h-5 text-green-600" />
              </button>
            )}
            
            {onVideoCall && (
              <button
                onClick={onVideoCall}
                aria-label="Start video call"
                className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Video className="w-5 h-5 text-blue-600" />
              </button>
            )}
            
            <button
              aria-label="More options"
              className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.sender === 'user'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-900 shadow-sm border border-gray-100'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 shadow-sm border border-gray-100 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="flex items-end space-x-3">
          <button
            aria-label="Attach file"
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
          >
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              aria-label="Add emoji"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
            >
              <Smile className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            aria-label="Send message"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
              newMessage.trim()
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};