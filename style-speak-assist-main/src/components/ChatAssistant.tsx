import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, Bot, User, X } from "lucide-react";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const predefinedQuestions = [
  "What's the best shoe for running?",
  "Show me shoes under $100",
  "Do you have waterproof boots?",
  "What size should I get?",
];

const mockResponses = [
  "I'd recommend our Nike Air Max series for running - they offer excellent cushioning and support!",
  "Here are some great options under $100: Converse Chuck Taylor ($65), Vans Old Skool ($75), and several others!",
  "Yes! We have waterproof hiking boots from brands like Timberland and Columbia. Would you like to see them?",
  "I can help you find your perfect size! Do you know your foot length in inches or your usual shoe size?",
];

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi! I'm your AI shopping assistant. I can help you find the perfect shoes, answer questions about products, sizes, and more. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you find exactly what you're looking for.",
        "Based on your preferences, I have some excellent recommendations for you.",
        "I can definitely help with that! Here's what I suggest...",
        ...mockResponses
      ];
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-gradient-primary text-primary-foreground shadow-button hover:shadow-card-hover transition-smooth z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-card-hover z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-card-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">AI Shopping Assistant</h3>
            <p className="text-xs text-muted-foreground">Online now</p>
          </div>
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="p-4 border-b border-card-border">
          <p className="text-sm text-muted-foreground mb-3">Quick questions:</p>
          <div className="space-y-2">
            {predefinedQuestions.map((question, index) => (
              <Button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start text-xs h-auto py-2 whitespace-normal"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className={
                    message.isUser 
                      ? "bg-secondary text-secondary-foreground" 
                      : "bg-gradient-primary text-primary-foreground"
                  }>
                    {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background-secondary'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-card-border">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about shoes, sizes, brands..."
            className="flex-1"
          />
          <Button type="submit" size="sm" className="px-3">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};