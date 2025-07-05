import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Builder.module.css";
import { useCustomization } from "../context/CustomizationContext";

export default function Builder() {
  const navigate = useNavigate();

  const {
    primaryColor,
    setPrimaryColor,
    bgColor,
    setBgColor,
    avatar,
    setAvatar,
    prompts,
    setPrompts,
    socials,
    setSocials,
    bgType,
    setBgType,
    gradient,
    setGradient,
    inputColor,
    setInputColor,
    borderColor,
    setBorderColor,
    socialBtnColor,
    setSocialBtnColor,
  } = useCustomization();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromptChange = (i: number, value: string) => {
    setPrompts(prompts.map((p, idx) => (idx === i ? value : p)));
  };

  const handleSocialChange = (
    i: number,
    field: "label" | "href" | "icon",
    value: string
  ) => {
    setSocials(
      socials.map((s, idx) => (idx === i ? { ...s, [field]: value } : s))
    );
  };

   const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Compute background style
  const backgroundStyle =
    bgType === "solid"
      ? { background: bgColor }
      : {
          background: `linear-gradient(${gradient.direction}, ${gradient.from}, ${gradient.to})`,
          "--input-bg": inputColor,
          "--input-border": borderColor,
          "--social-btn-bg": hexToRgba(socialBtnColor, 0.6),
        };

  // Save handler (simulate saving to localStorage or API)
  const [saveStatus, setSaveStatus] = React.useState<string | null>(null);
  const handleSave = () => {
    // Here you could call an API or save to localStorage
    const data = {
      primaryColor,
      bgType,
      bgColor,
      gradient,
      avatar,
      prompts,
      socials,
      inputColor,
      borderColor,
      socialBtnColor,
    };
    // Apply CSS variables to document root
    document.documentElement.style.setProperty("--input-bg", inputColor);
    document.documentElement.style.setProperty("--input-border", borderColor);
    document.documentElement.style.setProperty(
      "--social-btn-bg",
      socialBtnColor
    );
    try {
      localStorage.setItem("builderSettings", JSON.stringify(data));
      setSaveStatus("Saved!");
      setTimeout(() => {
        setSaveStatus(null);
        navigate("/home");
      }, 800);
    } catch {
      setSaveStatus("Failed to save");
    }
  };

  return (
    <section className={styles.builderSection} style={backgroundStyle}>
      <div className={styles.builderContainer}>
        <h1 className={styles.title}>Builder</h1>
        <div className={styles.row}>
          <label>Primary Color:</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label>Background Type:</label>
          <select
            value={bgType}
            onChange={(e) => setBgType(e.target.value as "solid" | "gradient")}
            className={styles.promptInput}
            style={{ maxWidth: 180 }}
          >
            <option value="solid">Solid</option>
            <option value="gradient">Gradient</option>
          </select>
        </div>
        {bgType === "solid" ? (
          <div className={styles.row}>
            <label>Background Color:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
        ) : (
          <>
            <div className={styles.row}>
              <label>Gradient From:</label>
              <input
                type="color"
                value={gradient.from}
                onChange={(e) =>
                  setGradient({ ...gradient, from: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <label>Gradient To:</label>
              <input
                type="color"
                value={gradient.to}
                onChange={(e) =>
                  setGradient({ ...gradient, to: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <label>Direction:</label>
              <select
                value={gradient.direction}
                onChange={(e) =>
                  setGradient({ ...gradient, direction: e.target.value })
                }
                className={styles.promptInput}
                style={{ maxWidth: 180 }}
              >
                <option value="to bottom">Top to Bottom</option>
                <option value="to right">Left to Right</option>
                <option value="135deg">Diagonal</option>
              </select>
            </div>
          </>
        )}
        <div className={styles.row}>
          <label>Input Background Color:</label>
          <input
            type="color"
            value={inputColor}
            onChange={(e) => setInputColor(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label>Input / Border Color:</label>
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label>Social Button Color:</label>
          <input
            type="color"
            value={socialBtnColor}
            onChange={(e) => setSocialBtnColor(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label>Avatar Image:</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {avatar && (
            <img src={avatar} alt="avatar" className={styles.avatarPreview} />
          )}
        </div>
        <div className={styles.row}>
          <label>Prompts:</label>
          <div className={styles.promptsList}>
            {prompts.map((p, i) => (
              <input
                key={i}
                value={p}
                onChange={(e) => handlePromptChange(i, e.target.value)}
                className={styles.promptInput}
              />
            ))}
          </div>
        </div>
        <div className={styles.row}>
          <label>Social Links:</label>
          <div className={styles.socialsList}>
            {/* Keep the first 'Socials' static, only allow editing the rest */}
            <div className={styles.socialRow}>
              <input
                value="Socials"
                disabled
                className={styles.socialInput}
                style={{
                  fontWeight: 600,
                  background: "#f5f5f5",
                  color: "#434343",
                }}
              />
              <input
                value="#"
                disabled
                className={styles.socialInput}
                style={{ background: "#f5f5f5", color: "#aaa" }}
              />
            </div>
            {socials.map((s, i) => (
              <div key={i} className={styles.socialRow}>
                <input
                  value={s.label}
                  onChange={(e) =>
                    handleSocialChange(i, "label", e.target.value)
                  }
                  className={styles.socialInput}
                  placeholder="Label"
                />
                <input
                  value={s.href}
                  onChange={(e) =>
                    handleSocialChange(i, "href", e.target.value)
                  }
                  className={styles.socialInput}
                  placeholder="URL"
                />
                <select
                  value={s.icon}
                  onChange={(e) =>
                    handleSocialChange(i, "icon", e.target.value)
                  }
                  className={styles.socialInput}
                  style={{ width: 80 }}
                >
                  <option value="twitter">Twitter</option>
                  <option value="mastodon">Mastodon</option>
                  <option value="codepen">CodePen</option>
                  <option value="github">GitHub</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="globe">Website</option>
                </select>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 24,
          }}
        >
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: "0.7rem 2.2rem",
              borderRadius: 8,
              border: "none",
              background: primaryColor,
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              transition: "background 0.2s",
            }}
          >
            Save
          </button>
          {saveStatus && (
            <span
              style={{
                color: saveStatus === "Saved!" ? "green" : "red",
                fontWeight: 500,
              }}
            >
              {saveStatus}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
