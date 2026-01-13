import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatbotUI from "./ChatbotUI";

const FloatingChatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-[500px] bg-white border rounded-2xl shadow-2xl overflow-hidden">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow"
          >
            <X className="w-4 h-4" />
          </button>
          <ChatbotUI />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary shadow-xl flex items-center justify-center hover:scale-105 transition"
      >
        <MessageCircle className="text-white w-6 h-6" />
      </button>
    </>
  );
};

export default FloatingChatbot;
