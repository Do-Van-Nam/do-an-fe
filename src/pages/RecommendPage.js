// src/App.js hoặc src/pages/RecommendPage.js
import React, { useState, useRef, useEffect } from "react";

function RecommendPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào! Bạn cần hỗ trợ gì hôm nay?", sender: "bot" },
    { id: 2, text: "Mình muốn hỏi về đơn hàng", sender: "user" },
    // bạn có thể thêm tin nhắn mẫu ở đây
  ]);

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Ví dụ trả lời tự động từ bot (tùy chọn)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Cảm ơn bạn! Mình sẽ kiểm tra đơn hàng ngay đây.",
          sender: "bot",
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Khu vực tin nhắn - có thể scroll */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* Điểm neo để cuộn xuống cuối */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Thanh input cố định ở dưới cùng */}
      <div className="border-t bg-white px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecommendPage;