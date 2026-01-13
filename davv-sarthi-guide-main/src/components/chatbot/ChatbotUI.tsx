import { useState } from "react";
import { Bot, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatbotUI = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Admission Counselor Assistant. Ask me anything about DAVV admissions, eligibility, fees, or the application process.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { role: "user", content: inputMessage },
    ]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Admissions are based on CUET scores and centralized counseling.",
        "Eligibility depends on course and category. Would you like me to check?",
        "Previous year cutoffs are available on the Cutoffs page.",
        "Multiple counseling rounds are conducted for seat allotment.",
      ];

      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            responses[Math.floor(Math.random() * responses.length)],
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-primary flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
          <Bot className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-background">
            Admission Counselor
          </h3>
          <p className="text-xs text-background/70">
            Online • Ready to help
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {chatMessages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              m.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                m.role === "user"
                  ? "bg-primary"
                  : "bg-primary/10"
              }`}
            >
              {m.role === "user" ? (
                <MessageCircle className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Bot className="w-4 h-4 text-primary" />
              )}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-xl text-sm ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-xs text-muted-foreground">
            Assistant is typing…
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about admissions..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSendMessage()
            }
          />
          <Button size="icon" onClick={handleSendMessage}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;
