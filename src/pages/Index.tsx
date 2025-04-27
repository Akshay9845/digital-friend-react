
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your digital assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");

    // In the future, this is where we'll integrate with the AI API
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "This is a placeholder response. Soon I'll be powered by AI!",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      toast({
        title: "Message received",
        description: "Your message has been sent successfully.",
      });
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Digital Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full gap-2">
            <Input
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
