
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAi = message.sender === "ai";

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[80%]",
        isAi ? "self-start" : "self-end ml-auto"
      )}
    >
      {isAi && (
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
          <span className="text-xs font-bold">AI</span>
        </Avatar>
      )}
      <div
        className={cn(
          "rounded-lg p-3",
          isAi
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="text-sm">{message.content}</p>
        <div
          className={cn(
            "text-[10px] mt-1",
            isAi ? "text-muted-foreground" : "text-primary-foreground/80"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      {!isAi && (
        <Avatar className="h-8 w-8 bg-secondary text-secondary-foreground flex items-center justify-center">
          <span className="text-xs font-bold">You</span>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
