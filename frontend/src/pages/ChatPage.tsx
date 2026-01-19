import { useState } from 'react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Welcome to the Herbal Garden Chat Assistant! 🌿 How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickSuggestions = [
    { label: '🛡️ Boost Immunity', query: 'How can I boost my immunity?' },
    { label: '😴 Better Sleep', query: 'Which herbs help with sleep?' },
    { label: '🤧 Common Cold', query: 'What herbs are good for cold?' },
    { label: '🧘 Reduce Stress', query: 'How to reduce stress naturally?' },
    { label: '💪 Increase Energy', query: 'Which plants boost energy?' },
    { label: '🌱 Good Digestion', query: 'Help with digestion issues' },
  ];

  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Simple rule-based responses
    if (lowerQuery.includes('immun')) {
      return 'For immunity boosting, I recommend Tulsi (Holy Basil), Amla (Indian Gooseberry), and Neem. Tulsi is known as the "Queen of Herbs" and has powerful immunomodulatory properties. Amla is rich in Vitamin C, and Neem has strong antibacterial properties. Try our Immunity Boosters Tour to learn more!';
    } else if (lowerQuery.includes('stress') || lowerQuery.includes('anxiety')) {
      return 'For stress relief, Ashwagandha is excellent! It\'s a powerful adaptogen that helps reduce cortisol levels. Brahmi is also great for calming the mind while maintaining focus. Tulsi can help with stress-related symptoms. Check out our Stress Relief & Mental Clarity Tour!';
    } else if (lowerQuery.includes('digest') || lowerQuery.includes('stomach')) {
      return 'For digestive health, Ginger is wonderful - it reduces nausea and bloating. Turmeric helps with inflammation in the gut. Aloe Vera can soothe the digestive tract. Visit our Digestion Tour for detailed information!';
    } else if (lowerQuery.includes('cold') || lowerQuery.includes('cough') || lowerQuery.includes('fever')) {
      return 'Tulsi is excellent for cold and cough - it has antimicrobial properties and boosts immunity. Ginger helps with congestion and has warming properties. Both can be taken as tea for best results.';
    } else if (lowerQuery.includes('sleep') || lowerQuery.includes('insomnia')) {
      return 'Ashwagandha can help improve sleep quality by reducing stress and anxiety. It\'s best taken in the evening. Brahmi also helps calm the mind. Always consult with a healthcare provider for persistent sleep issues.';
    } else if (lowerQuery.includes('skin') || lowerQuery.includes('acne')) {
      return 'For skin health, Neem is nature\'s purifier with antibacterial properties. Turmeric helps brighten skin and reduce inflammation. Aloe Vera is excellent for hydration and healing. Check our Radiant Skin Tour!';
    } else if (lowerQuery.includes('energy') || lowerQuery.includes('fatigue')) {
      return 'Ashwagandha is great for boosting energy and reducing fatigue. It helps the body adapt to stress. Ginger can also improve circulation and provide a natural energy boost. Amla supports overall vitality.';
    } else if (lowerQuery.includes('hair')) {
      return 'Amla is excellent for hair health - it promotes growth and prevents premature graying. Neem can help with scalp issues. Both can be used topically or consumed.';
    } else if (lowerQuery.includes('diabetes') || lowerQuery.includes('blood sugar')) {
      return 'Several plants may help with blood sugar management including Neem, Amla, and Turmeric. However, it\'s crucial to consult with your healthcare provider before using any herbs, especially if you\'re on medication.';
    } else {
      return 'I\'m a simple chatbot focused on herbal medicine basics. For specific health concerns, please explore our Plant Compendium for detailed information or consult with a qualified healthcare professional. You can also try our Guided Tours for themed plant collections!';
    }
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Add bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleSuggestionClick = (query: string) => {
    handleSend(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 font-['Cinzel']">
            💬 Herbal Chat Assistant
          </h1>
          <p className="text-xl text-emerald-200">
            Ask me about medicinal plants and natural remedies
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                      : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-white/70' : 'text-white/50'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-emerald-300 mb-3 font-semibold">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.label}
                    onClick={() => handleSuggestionClick(suggestion.query)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg border border-white/20 transition-all"
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-white/20 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about medicinal plants..."
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                onClick={() => handleSend()}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-amber-500/10 backdrop-blur-md rounded-xl p-4 border border-amber-500/30">
          <p className="text-amber-200 text-sm">
            <strong>⚠️ Disclaimer:</strong> This chatbot provides general information only. 
            For medical advice, diagnosis, or treatment, please consult a qualified healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}
