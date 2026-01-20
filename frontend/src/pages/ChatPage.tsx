import React, { useState, useRef, useEffect } from 'react';

// --- CSS Styles ---
const styles = `
/* =========================
   ROOT VARIABLES
========================= */
:root {
    --bubble-system: rgba(40, 60, 45, 0.88);
    --bubble-user: rgba(85, 139, 47, 0.9);
    --text-primary: #e8f5e9;
    --text-secondary: #c5e1a5;
    --accent-glow: rgba(129, 199, 132, 0.5);
    --glass-panel: rgba(20, 35, 25, 0.7);
}

/* =========================
   MAIN CONTAINER (JUNGLE)
========================= */
.chat-interface {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;

    background:
        radial-gradient(circle at center,
            rgba(60, 120, 90, 0.55) 0%,
            rgba(20, 40, 30, 0.85) 40%,
            rgba(5, 15, 10, 0.95) 70%),
        linear-gradient(to bottom, #020a05, #06140c);

    animation: forestPulse 18s ease-in-out infinite;
}

/* =========================
   FIREFLIES CONTAINER
========================= */
.fireflies {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 5;
}

/* Individual firefly */
.firefly {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #b9ffd8;
    border-radius: 50%;
    box-shadow: 0 0 12px #b9ffd8,
        0 0 24px rgba(185, 255, 216, 0.8);
    opacity: 0.8;
    animation: fly 16s infinite ease-in-out;
}

/* Positions */
.firefly:nth-child(1) {
    top: 20%;
    left: 15%;
    animation-delay: 0s;
}

.firefly:nth-child(2) {
    top: 60%;
    left: 70%;
    animation-delay: 3s;
}

.firefly:nth-child(3) {
    top: 40%;
    left: 45%;
    animation-delay: 6s;
}

.firefly:nth-child(4) {
    top: 75%;
    left: 30%;
    animation-delay: 9s;
}

.firefly:nth-child(5) {
    top: 30%;
    left: 80%;
    animation-delay: 12s;
}

.firefly:nth-child(6) {
    top: 55%;
    left: 55%;
    animation-delay: 18s;
}

.firefly:nth-child(7) {
    top: 70%;
    left: 90%;
    animation-delay: 14s;
}

.firefly:nth-child(8) {
    top: 50%;
    left: 40%;
    animation-delay: 8s;
}

/* Animation */
@keyframes fly {
    0% {
        transform: translate(0, 0);
        opacity: 0.2;
    }

    30% {
        opacity: 1;
    }

    50% {
        transform: translate(40px, -60px);
    }

    80% {
        opacity: 0.6;
    }

    100% {
        transform: translate(-30px, 40px);
        opacity: 0.2;
    }
}

@keyframes forestPulse {
    0% {
        filter: brightness(0.95);
    }

    50% {
        filter: brightness(1.05);
    }

    100% {
        filter: brightness(0.95);
    }
}



/* =========================
   FOG / MIST LAYER
========================= */
.chat-interface::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 50%),
        linear-gradient(to left, rgba(0, 0, 0, 0.6), transparent 40%),
        linear-gradient(to right, rgba(0, 0, 0, 0.6), transparent 40%);
    z-index: 0;
}


.chat-interface::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(ellipse at bottom,
            rgba(0, 0, 0, 0.7) 0%,
            transparent 60%);
    pointer-events: none;
    z-index: 1;
}


@keyframes fogDrift {
    0% {
        transform: translateX(-6%) translateY(0);
    }

    50% {
        transform: translateX(6%) translateY(-2%);
    }

    100% {
        transform: translateX(-6%) translateY(0);
    }
}

/* =========================
   HEADER
========================= */
.chat-header {
    padding: 1.5rem;
    text-align: center;
    background: rgba(10, 25, 15, 0.75);
    backdrop-filter: blur(14px);
    z-index: 10;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

.chat-header h1 {
    margin: 0;
    font-size: 2.3rem;
    font-family: 'Cinzel', serif;
    background: linear-gradient(to bottom, #a5d6a7, #66bb6a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.chat-header p {
    margin-top: 0.5rem;
    color: var(--text-secondary);
    font-style: italic;
}

/* =========================
   MESSAGES AREA
========================= */
.messages-area {
    flex: 1;
    padding: 2rem;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
    z-index: 1;
}

/* =========================
   MESSAGE BUBBLES
========================= */
.message-container {
    display: flex;
    width: 100%;
}

.user-container {
    justify-content: flex-end;
}

.system-container {
    justify-content: flex-start;
}

.message-bubble {
    max-width: 80%;
    padding: 1.25rem 1.5rem;
    line-height: 1.7;
    border-radius: 1.5rem;
    backdrop-filter: blur(6px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
}

.user-bubble {
    background: var(--bubble-user);
    color: #fff;
    border-bottom-right-radius: 0;
}

.system-bubble {
    background:
        radial-gradient(circle at top left,
            rgba(120, 180, 140, 0.15),
            transparent 60%),
        rgba(35, 55, 40, 0.9);

    color: #eaf5ec;
    border-radius: 1.75rem;
    border-left: 4px solid #81c784;
    font-family: 'Georgia', serif;

    box-shadow:
        0 0 0 2px rgba(120, 180, 140, 0.1),
        0 15px 40px rgba(0, 0, 0, 0.6);

    animation: sageBreath 6s ease-in-out infinite;
}


@keyframes sageBreath {
    0% {
        box-shadow: 0 0 18px rgba(129, 199, 132, 0.15);
    }

    50% {
        box-shadow: 0 0 28px rgba(129, 199, 132, 0.35);
    }

    100% {
        box-shadow: 0 0 18px rgba(129, 199, 132, 0.15);
    }
}

/* =========================
   SOURCES
========================= */
.message-sources {
    margin-top: 1rem;
    border-top: 1px dashed rgba(255, 255, 255, 0.2);
    padding-top: 0.75rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
}

.messages-area {
    position: relative;
}

.messages-area::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at center,
            rgba(255, 255, 255, 0.04),
            transparent 65%);
    filter: blur(40px);
    pointer-events: none;
    animation: clearingGlow 12s ease-in-out infinite;
}

@keyframes clearingGlow {
    0% {
        opacity: 0.4;
    }

    50% {
        opacity: 0.6;
    }

    100% {
        opacity: 0.4;
    }
}

/* =========================
   INPUT AREA
========================= */
.input-area {
    position: sticky;
    bottom: 0;
    padding: 2rem;
    background: linear-gradient(to top, rgba(0, 10, 0, 0.9), transparent);
    z-index: 10;
}

.input-wrapper {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background: rgba(30, 40, 30, 0.8);
    backdrop-filter: blur(15px);
    border-radius: 2rem;
    padding: 0.75rem 1.5rem;
    border: 1px solid rgba(129, 199, 132, 0.25);
    transition: all 0.3s ease;
}

.input-wrapper:focus-within {
    border-color: #66bb6a;
    box-shadow: 0 0 35px rgba(102, 187, 106, 0.4);
}

.chat-input {
    flex: 1;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 1.1rem;
    outline: none;
}

.chat-input::placeholder {
    color: rgba(255, 255, 255, 0.4);
    font-style: italic;
}

/* =========================
   BUTTONS
========================= */
.action-button {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin-left: 0.75rem;
    border: none;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
}

.action-button:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
}

.send-button {
    background: linear-gradient(135deg, #66bb6a, #2e7d32);
}

.mic-button.active {
    animation: pulse 1.5s infinite;
    border: 1px solid #ef5350;
}

/* =========================
   ANIMATIONS
========================= */
@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(239, 83, 80, 0.4);
    }

    70% {
        box-shadow: 0 0 0 12px rgba(239, 83, 80, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(239, 83, 80, 0);
    }
}

/* =========================
   SCROLLBAR
========================= */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-thumb {
    background: rgba(165, 214, 167, 0.3);
    border-radius: 4px;
}

.messages-area::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari */
}
`;

// --- MessageBubble Component ---

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'system';
  sources?: string[];
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender, sources }) => {
  const isUser = sender === 'user';

  return (
    <div className={`message-container ${isUser ? 'user-container' : 'system-container'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'system-bubble'}`}>
        <div className="message-text">
          {text.split('\n').map((line: string, i: number) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        {sources && sources.length > 0 && (
          <div className="message-sources">
            <small>Sources:</small>
            <ul>
              {sources.map((source: string, idx: number) => (
                <li key={idx}>{source}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ChatPage Component (Renamed from ChatInterface) ---

// Type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: (event: Event) => void;
  onend: (event: Event) => void;
  onerror: (event: any) => void;
  onresult: (event: any) => void;
}

interface Message {
  text: string;
  sender: 'user' | 'system';
  sources?: string[];
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Greetings. I am the Vana Sage. Ask me of the ancient herbs and their healing properties.", sender: 'system' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const flies = document.querySelectorAll('.firefly');

    flies.forEach((fly) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = 12 + Math.random() * 10;

      (fly as HTMLElement).style.top = `${top}%`;
      (fly as HTMLElement).style.left = `${left}%`;
      (fly as HTMLElement).style.animationDelay = `${delay}s`;
      (fly as HTMLElement).style.animationDuration = `${duration}s`;
    });
  }, []);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Stop after one sentence/phrase
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // Voice Selection Logic
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find an Indian English voice
      const indianVoice = voices.find(v => v.lang.startsWith("en") && /male|man|fred|daniel|arthur/i.test(v.name));
      // Fallback to any English voice if Indian not found, or just the first available
      setSelectedVoice(indianVoice || voices.find(v => v.lang.includes('en')) || null);
    };

    if ('speechSynthesis' in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech

      // 🌿 Sage-style pauses for wisdom & gravitas
      const sageText = text
        .replace(/\./g, ". … ")
        .replace(/,/g, ", … ");

      const utterance = new SpeechSynthesisUtterance(sageText);

      // Apply "Old Man Sage" tuning
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.pitch = 0.6;   // Lower pitch for deeper voice
      utterance.rate = 0.8;    // Slower rate for wisdom
      utterance.volume = 1.0;  // Full presence

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };


  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    // Stop speaking if user interrupts
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    const userMessage: Message = { text: textToSend, sender: 'user' };
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // UPDATED URL FOR VANA-RUBIX26 BACKEND
      const response = await fetch('http://localhost:5000/api/chat/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const systemMessage: Message = {
        text: data.answer,
        sender: 'system',
        sources: data.sources
      };

      setMessages((prev: Message[]) => [...prev, systemMessage]);
      speakResponse(data.answer); // Auto-speak response
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev: Message[]) => [...prev, {
        text: "The spirits are silent. I cannot reach the knowledge base at this moment.",
        sender: 'system'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-interface">
      <style>{styles}</style>
      <header className="chat-header">
        <h1>Vana Sage</h1>
        <p>Ancient Wisdom, Modern Knowledge</p>
      </header>

      <div className="fireflies">
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
      </div>

      <div className="messages-area">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            text={msg.text}
            sender={msg.sender}
            sources={msg.sources}
          />
        ))}
        {isLoading && (
          <div className="message-container system-container">
            <div className="message-bubble system-bubble loading-bubble">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <div className={`input-wrapper ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "Listening..." : "Inquire about medicinal plants..."}
            rows={1}
            className="chat-input"
          />

          {/* Microphone Button */}
          <button
            onClick={toggleListening}
            className={`action-button mic-button ${isListening ? 'active' : ''}`}
            title={isListening ? "Stop Listening" : "Start Voice Input"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
              <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
              <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
            </svg>
            {isListening && <span className="mic-pulse"></span>}
          </button>

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="action-button send-button"
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
