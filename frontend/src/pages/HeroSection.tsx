import React, { useState } from "react";
import styles from "../styles/HeroSection.module.css";
import { ChatHero } from "../components/Chat";
import avatarSrc from "../assets/avatar.png";

const PROMPTS = [
  "Tell me about last Noura’s projects",
  "What is Noura’s educations?",
  "Noura’s Contact info",
  "What are Noura’s technical skills?",
  "List Noura’s certifications.",
  "Describe Noura’s work experience.",
  "What are Noura’s hobbies?",
  "Share a fun fact about Noura.",
  "What languages does Noura speak?",
  "What is Noura’s favorite project?",
];

export const HeroSection: React.FC = () => {
  const [input, setInput] = useState("");
  const [promptStart, setPromptStart] = useState(0);
  const [chatMode, setChatMode] = useState(false);
  const [initialUserMsg, setInitialUserMsg] = useState<string | null>(null);

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const handleRefreshPrompts = () => {
    // Show next 3 prompts, wrap around if at end
    setPromptStart((prev) => (prev + 3) % PROMPTS.length);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setInitialUserMsg(input);
    setChatMode(true);
  };

  const visiblePrompts =
    PROMPTS.slice(promptStart, promptStart + 3).length === 3
      ? PROMPTS.slice(promptStart, promptStart + 3)
      : PROMPTS.slice(promptStart).concat(
          PROMPTS.slice(0, 3 - (PROMPTS.length - promptStart))
        );

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <img src={avatarSrc} alt="Noura" className={styles.avatarHero} />
          <h1 className={chatMode ? styles.titleSmall : styles.title}>
            Hi there, Mohammed
          </h1>
        </div>
        <div className={chatMode ? styles.hideSmooth : ""}>
          <p className={styles.subtitle}>
            What would you like to know about Noura?
          </p>
          <p className={styles.smtitle}>
            Use one of the most common prompts below or use your own to begin
          </p>
          <div className={styles.prompts}>
            {visiblePrompts.map((p) => (
              <button
                key={p}
                className={styles.promptCard}
                onClick={() => handlePromptClick(p)}
              >
                {p}
              </button>
            ))}
            <button
              className={styles.refreshPrompt}
              onClick={handleRefreshPrompts}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M4.58331 7.33333H2.29165V9.625M6.41665 3.66667H8.70831V1.375M2.10052 4.12656C2.35751 3.49051 2.78776 2.93931 3.3424 2.5356C3.89703 2.1319 4.55437 1.89178 5.23862 1.84273C5.92286 1.79369 6.60673 1.93756 7.21328 2.25803C7.81982 2.5785 8.32388 3.06283 8.66895 3.65572M8.89969 6.87366C8.64271 7.50971 8.21245 8.06091 7.65782 8.46461C7.10318 8.86832 6.44651 9.10813 5.76227 9.15718C5.07802 9.20623 4.39359 9.06237 3.78705 8.7419C3.1805 8.42143 2.67611 7.93719 2.33103 7.3443"
                  stroke="#434343"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Refresh Prompts
            </button>
          </div>
          <form onSubmit={handleSend} className={styles.inputWrapper}>
            <textarea
              className={styles.textInput}
              placeholder="Ask Noura’s AI anything about her"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
            />
            <span className={styles.charCount}>{input.length}/500</span>
            <button className={styles.sendBtn} aria-label="Send" type="submit">
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
                    stroke="#BABABA"
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
          </form>
        </div>
        {chatMode && initialUserMsg && <ChatHero initialUserMsg={initialUserMsg} />}
      </div>
    </section>
  );
};
