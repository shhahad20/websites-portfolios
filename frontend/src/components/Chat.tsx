import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/Chat.module.css';
import avatarSrc from '../assets/avatar.svg';
import { useParams } from 'react-router-dom';
import { apiGet } from '../api/client';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

interface ChatHeroProps {
  initialUserMsg?: string;
}

export const ChatHero: React.FC<ChatHeroProps> = ({ initialUserMsg }) => {
  const [messages, setMessages] = useState<Message[]>(
    initialUserMsg
      ? [{ role: 'user', text: initialUserMsg }]
      : []
  );
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto‐scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

    const { ownerName } = useParams<{ ownerName: string }>();
  const [owner, setOwner] = useState<{ name: string; email: string } | null>(null);

 useEffect(() => {
    if (!ownerName) return;
    (async () => {
      try {
        const data = await apiGet<{ name: string; email: string }>(`/auth/${ownerName}`);
        console.log("owner data", data);
        setOwner(data);           // ← save into state
      } catch (err) {
        console.error(err);
      }
    })();
  }, [ownerName]);
  // Function to get bot response based on user message
  const getBotResponse = (userMessage: string): string => {
    const userMsg = userMessage.toLowerCase();
    if (
      userMsg.includes('experience') ||
      userMsg.includes('background') ||
      userMsg.includes('work history')
    ) {
      return `${owner?.name ?? ownerName} has extensive experience in AI research and software engineering, having worked on projects ranging from natural language processing to computer vision. She's passionate about building innovative solutions and has contributed to several open-source initiatives.`;
    }
    return `You're most welcome! If you have any more questions about ${owner?.name ?? ownerName}, don't hesitate to ask. 😊`;
  };

  // Respond to initial user message
  useEffect(() => {
    if (
      initialUserMsg &&
      messages.length === 1 &&
      messages[0].role === 'user'
    ) {
      setTimeout(() => {
        setMessages((m) => {
          if (m.some((msg) => msg.role === 'bot')) return m;
          return [
            ...m,
            {
              role: 'bot',
              text: getBotResponse(initialUserMsg),
            },
          ];
        });
      }, 600);
    }
  }, [initialUserMsg, messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Prevent double bot response for initial message
    if (
      initialUserMsg &&
      messages.length === 1 &&
      messages[0].role === 'user' &&
      text === initialUserMsg &&
      messages.some((msg) => msg.role === 'bot')
    ) {
      setInput('');
      return;
    }
    
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: getBotResponse(text),
        },
      ]);
    }, 600);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Check if input is empty or only whitespace
  const isInputEmpty = !input.trim();

  return (
    <div className={styles.chatOnlyWindow}>
      <div className={styles.chatWindow}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === 'user' ? styles.userMsgWrapper : styles.botMsgWrapper
            }
          >
            {m.role === 'bot' && i === 0 && (
              <img
                src={avatarSrc}
                alt={owner?.name ?? ownerName}
                className={styles.avatar}
              />
            )}
            <div
              className={
                m.role === 'user' ? styles.userBubble : styles.botBubble
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <div className={styles.inputWrapper}>
        <textarea
          className={styles.textInput}
          placeholder={`Ask ${owner?.name ?? ownerName}'s AI anything`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          maxLength={500}
        />
        <span className={styles.charCount}>{input.length}/500</span>
        <button
          className={styles.sendBtn}
          onClick={() => sendMessage(input)}
          aria-label="Send"
          disabled={isInputEmpty}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="29"
            viewBox="0 0 30 29"
            fill="none"
          >
            <g clipPath="url(#clip0_1_448)">
              <path
                d="M12.9762 14.1422L18.6875 14.1422M23.3514 15.3206L13.107 20.7441C12.189 21.2301 11.7297 21.4732 11.427 21.4033C11.1644 21.3427 10.9474 21.1595 10.8444 20.9105C10.7257 20.6233 10.8898 20.1297 11.2184 19.1439L12.7452 14.5637C12.7973 14.4073 12.8232 14.3293 12.8335 14.2493C12.8427 14.1782 12.8432 14.1064 12.834 14.0354C12.8238 13.9572 12.7983 13.8807 12.7485 13.7312L11.2182 9.14045C10.8896 8.15465 10.7255 7.66157 10.8442 7.37441C10.9472 7.12537 11.1641 6.94176 11.4267 6.88112C11.7294 6.81121 12.1889 7.05413 13.1072 7.54032L23.3516 12.9638C24.0736 13.346 24.4346 13.5373 24.5526 13.7923C24.6554 14.0143 24.6556 14.2703 24.5528 14.4924C24.4348 14.7472 24.0738 14.9383 23.3526 15.3202L23.3514 15.3206Z"
                stroke={isInputEmpty ? "#CCCCCC" : "#BABABA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_448">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(14.9706) rotate(45)"
                />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
};