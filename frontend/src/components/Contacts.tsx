import React from "react";
import { useCustomization } from "../context/CustomizationContext";
import styles from "../styles/Contacts.module.css";

function getSocialIcon(icon: string) {
  const size = 15;
  switch (icon) {
    case "twitter":
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
        >
          <title>Twitter</title>
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      );
    case "mastodon":
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
        >
          <title>Mastodon</title>
          <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z" />
        </svg>
      );
    case "codepen":
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
        >
          <title>CodePen</title>
          <path d="M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 01-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 01-.021.043l-.019.03a.57.57 0 01-.08.1l-.026.025a.602.602 0 01-.036.03l-.029.022-.01.008-6.782 4.522a.637.637 0 01-.708 0L4.864 14.79l-.01-.008a.599.599 0 01-.065-.052l-.026-.025-.032-.034-.021-.028a.588.588 0 01-.067-.11l-.014-.031a.644.644 0 01-.017-.047l-.01-.03c-.004-.018-.008-.036-.01-.054l-.006-.028a.628.628 0 01-.006-.083V9.739c0-.028.002-.055.006-.083l.005-.027.011-.054.01-.03a.574.574 0 01.12-.217l.031-.034.026-.025a.62.62 0 01.065-.052l.01-.008 6.782-4.521a.638.638 0 01.708 0l6.782 4.521.01.008.03.022.035.03c.01.008.017.016.026.025a.545.545 0 01.08.1l.019.03a.633.633 0 01.021.043l.014.03c.007.016.012.032.017.047l.01.031c.004.018.008.036.01.054l.006.027a.619.619 0 01.006.083zM12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12c6.628 0 12-5.372 12-12c0-6.627-5.372-12-12-12m0 10.492L9.745 12L12 13.51L14.255 12zm.638 4.124v2.975l4.996-3.33l-2.232-1.493zm-6.272-.356l4.996 3.33v-2.974l-2.764-1.849zm11.268-4.52l-4.996-3.33v2.974l2.764 1.85zm-6.272-.356V6.41L6.366 9.74l2.232 1.493zm-5.506 1.549v2.134L7.45 12Z" />
        </svg>
      );
    case "github":
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <title>GitHub</title>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.304-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.649.242 2.872.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <title>LinkedIn</title>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 01-2.058-2.058c0-1.137.922-2.058 2.058-2.058 1.137 0 2.058.921 2.058 2.058 0 1.136-.921 2.058-2.058 2.058zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.222 0z" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <title>Facebook</title>
          <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 6.084 4.563 11.1 10.438 11.879v-8.385h-3.14v-3.494h3.14V9.797c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.494h-3.12V24C19.437 23.1 24 18.084 24 12z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
        >
          <title>Instagram</title>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.497 5.782 2.225 7.148 2.163 8.414 2.105 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.78.127 4.602.398 3.635 1.365 2.668 2.332 2.397 3.51 2.34 4.782 2.282 6.062 2.27 6.471 2.27 12c0 5.529.012 5.938.07 7.218.057 1.272.328 2.45 1.295 3.417.967.967 2.145 1.238 3.417 1.295 1.28.058 1.689.07 7.218.07s5.938-.012 7.218-.07c1.272-.057 2.45-.328 3.417-1.295.967-.967 1.238-2.145 1.295-3.417.058-1.28.07-1.689.07-7.218s-.012-5.938-.07-7.218c-.057-1.272-.328-2.45-1.295-3.417C19.398.398 18.22.127 16.948.07 15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
        </svg>
      );
    case "globe":
      return (
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Contacts() {
  const { socials } = useCustomization();
  return (
    <div className={styles.contactsRow}>
      <nav
        className={styles.contactsNav}
        style={{ "--count": socials.length + 1 } as React.CSSProperties}
      >
        <ul className={styles.contactsList}>
          {/* Always render the static 'Socials' link first */}
          <li key="Socials" style={{ "--index": 1 } as React.CSSProperties}>
            <a
              href="#"
              tabIndex={-1}
              style={{
                pointerEvents: "none",
                color: "#434343",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                // gap: 6,
              }}
            >
              <span>
				<div className={styles.iconWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg> </div>
                Socials
              </span>
            </a>
          </li>
          {socials.map((c, i) => (
            <li
              key={c.label}
              style={{ "--index": i + 2 } as React.CSSProperties}
            >
              <a href={c.href} target="_blank" rel="noreferrer noopener">
                <span style={{ display: "flex", alignItems: "center",  }}>
                  <div className={styles.iconWrapper}>
                    {getSocialIcon(c.icon)}
                  </div>
                  {c.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={styles.copyUrlBtn}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
        }}
        title="Copy page URL"
        type="button"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="#434343"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect x="9" y="9" width="13" height="13" rx="2.5" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
        <span>Copy URL</span>
      </button>
    </div>
  );
}
