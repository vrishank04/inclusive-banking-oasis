
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUp, Bot, X } from "lucide-react";
import { bankingOffers } from "@/data/bankingOffers";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  relatedOffers?: string[];
}

const LoanChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your banking assistant. How can I help you find the right loan or banking offer today?",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Process the message to generate a response
    setTimeout(() => {
      const relatedOffers = findRelatedOffers(input.toLowerCase());
      
      let botResponse: Message;
      
      if (relatedOffers.length > 0) {
        const offerTitles = relatedOffers.map(offerId => {
          const offer = bankingOffers.find(o => o.id === offerId);
          return offer ? offer.title : '';
        }).filter(Boolean);
        
        botResponse = {
          id: Date.now().toString(),
          text: `Based on your inquiry, I've found these offers that might interest you: ${offerTitles.join(', ')}. Would you like more details about any of them?`,
          sender: 'bot',
          relatedOffers
        };
      } else {
        botResponse = {
          id: Date.now().toString(),
          text: "I'm here to help you find the right banking offer. You can ask about loans for businesses, women entrepreneurs, agriculture, or any of our special programs. What specific financial need are you looking for?",
          sender: 'bot'
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const findRelatedOffers = (query: string): string[] => {
    const relatedOffers: string[] = [];
    
    // Check for keywords related to each offer
    if (query.includes('women') || query.includes('woman') || query.includes('female') || query.includes('lady')) {
      relatedOffers.push('nari-shakti', 'mahila-udyam');
    }
    
    if (query.includes('business') || query.includes('entrepreneur') || query.includes('company') || query.includes('startup')) {
      relatedOffers.push('business-elite', 'entrepreneur-growth', 'mudra-yojana');
    }
    
    if (query.includes('senior') || query.includes('old') || query.includes('elder') || query.includes('retirement')) {
      relatedOffers.push('senior-citizen');
    }
    
    if (query.includes('young') || query.includes('student') || query.includes('college') || query.includes('university')) {
      relatedOffers.push('young-achievers');
    }
    
    if (query.includes('green') || query.includes('eco') || query.includes('environment') || query.includes('sustainable')) {
      relatedOffers.push('sustainable-banking');
    }
    
    if (query.includes('nri') || query.includes('abroad') || query.includes('foreign') || query.includes('overseas')) {
      relatedOffers.push('nri-homecoming');
    }
    
    if (query.includes('farm') || query.includes('agriculture') || query.includes('crop') || query.includes('rural')) {
      relatedOffers.push('agriculture-plan', 'mudra-yojana');
    }
    
    if (query.includes('loyal') || query.includes('long-term') || query.includes('old customer')) {
      relatedOffers.push('legacy-customer');
    }
    
    if (query.includes('digital') || query.includes('online') || query.includes('tech') || query.includes('invest')) {
      relatedOffers.push('tech-investor');
    }
    
    // General loan queries
    if (query.includes('loan') || query.includes('borrow') || query.includes('credit')) {
      // If no specific category was matched, add some general loan offers
      if (relatedOffers.length === 0) {
        relatedOffers.push('business-elite', 'mahila-udyam', 'mudra-yojana');
      }
    }
    
    return relatedOffers;
  };

  return (
    <>
      {!isOpen && (
        <Button 
          className="fixed bottom-4 right-4 rounded-full p-4 banking-gradient shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
      
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-full max-w-sm shadow-xl border-banking-primary/20 animate-fade-in">
          <CardHeader className="banking-gradient text-white rounded-t-lg flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Loan Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 h-80 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-banking-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    
                    {message.relatedOffers && message.relatedOffers.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.relatedOffers.map(offerId => {
                          const offer = bankingOffers.find(o => o.id === offerId);
                          return offer ? (
                            <Button 
                              key={offerId}
                              variant="ghost" 
                              size="sm"
                              className="text-xs w-full justify-start px-2 py-1 h-auto bg-white/20 hover:bg-white/30 text-white"
                            >
                              {offer.title}
                            </Button>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="border-t p-3">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button size="icon" className="banking-gradient" onClick={handleSend}>
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default LoanChatbot;
