import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type ChatScreenNavigationProp = StackNavigationProp<any, 'Chat'>;
type ChatScreenRouteProp = RouteProp<{ Chat: { therapistInfo: any } }, 'Chat'>;

interface Props {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'therapist';
  timestamp: string;
}

const ChatScreen: React.FC<Props> = ({ navigation, route }) => {
  const { therapistInfo } = route.params;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m excited to help you with your wellness journey. How are you feeling today?',
      sender: 'therapist',
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      text: 'Hi! I\'m looking forward to our session. I have some tension in my shoulders.',
      sender: 'user',
      timestamp: '10:32 AM'
    },
    {
      id: '3',
      text: 'I understand. Shoulder tension is very common. I\'ll focus on that area during our massage.',
      sender: 'therapist',
      timestamp: '10:33 AM'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
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
        })
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
          })
        };
        setMessages(prev => [...prev, therapistResponse]);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.therapistHeader}>
          <View style={styles.therapistAvatar}>
            <Text style={styles.therapistAvatarText}>👩‍⚕️</Text>
            {therapistInfo.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.therapistInfo}>
            <Text style={styles.therapistName}>{therapistInfo.name}</Text>
            <Text style={styles.therapistStatus}>
              {therapistInfo.isOnline ? 'Online' : 'Last seen recently'}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📹</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.sender === 'user' ? styles.userMessage : styles.therapistMessage
              ]}
            >
              <View style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userBubble : styles.therapistBubble
              ]}>
                <Text style={[
                  styles.messageText,
                  message.sender === 'user' ? styles.userMessageText : styles.therapistMessageText
                ]}>
                  {message.text}
                </Text>
                <Text style={[
                  styles.messageTime,
                  message.sender === 'user' ? styles.userMessageTime : styles.therapistMessageTime
                ]}>
                  {message.timestamp}
                </Text>
              </View>
            </View>
          ))}
          
          {isTyping && (
            <View style={[styles.messageContainer, styles.therapistMessage]}>
              <View style={[styles.messageBubble, styles.therapistBubble]}>
                <View style={styles.typingIndicator}>
                  <View style={[styles.typingDot, { animationDelay: '0ms' }]} />
                  <View style={[styles.typingDot, { animationDelay: '150ms' }]} />
                  <View style={[styles.typingDot, { animationDelay: '300ms' }]} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachButtonText}>📎</Text>
          </TouchableOpacity>
          
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor={colors.gray[400]}
              multiline
              maxLength={500}
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Text style={styles.emojiButtonText}>😊</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={[
              styles.sendButton,
              newMessage.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
            activeOpacity={0.7}
          >
            <Text style={styles.sendButtonText}>📤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    ...shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  backButtonText: {
    fontSize: typography.xl,
    color: colors.gray[700],
  },
  therapistHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  therapistAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    position: 'relative',
  },
  therapistAvatarText: {
    fontSize: typography.xl,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: borderRadius.full,
    backgroundColor: colors.success[500],
    borderWidth: 2,
    borderColor: colors.white,
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
  },
  therapistStatus: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: typography.base,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  messageContainer: {
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  therapistMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
  },
  userBubble: {
    backgroundColor: colors.primary[600],
  },
  therapistBubble: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[100],
    ...shadows.sm,
  },
  messageText: {
    fontSize: typography.sm,
    lineHeight: typography.xl,
    marginBottom: spacing.xs,
  },
  userMessageText: {
    color: colors.white,
  },
  therapistMessageText: {
    color: colors.gray[900],
  },
  messageTime: {
    fontSize: typography.xs,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  therapistMessageTime: {
    color: colors.gray[500],
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[400],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    gap: spacing.md,
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachButtonText: {
    fontSize: typography.base,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    maxHeight: 120,
  },
  textInput: {
    flex: 1,
    fontSize: typography.base,
    color: colors.gray[900],
    maxHeight: 80,
  },
  emojiButton: {
    marginLeft: spacing.sm,
  },
  emojiButtonText: {
    fontSize: typography.base,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: colors.primary[600],
  },
  sendButtonInactive: {
    backgroundColor: colors.gray[100],
  },
  sendButtonText: {
    fontSize: typography.base,
  },
});

export default ChatScreen;