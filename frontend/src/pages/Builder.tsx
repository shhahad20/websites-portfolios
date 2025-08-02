import React from "react";
// import { useNavigate } from "react-router-dom";
import styles from "../styles/Builder.module.css";
import { useCustomization } from "../context/CustomizationContext";
import { apiGet } from "../api/client";

export default function Builder() {
  // const navigate = useNavigate();

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

  const [saveStatus, setSaveStatus] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // 🚧🚧🚧 Get auth token (assuming you store it in localStorage or context)
  const getAuthToken = () => {
    return (
      localStorage.getItem("sb_token") || sessionStorage.getItem("sb_token")
    );
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const token = getAuthToken();

      if (!token) {
        setSaveStatus("Please log in to upload avatar");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/builder/upload-avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }

      const data = await response.json();
      setAvatar(data.url);
      setSaveStatus("Avatar uploaded!");

      setTimeout(() => setSaveStatus(null), 2000);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setSaveStatus("Failed to upload avatar");
      setTimeout(() => setSaveStatus(null), 2000);
    } finally {
      setIsLoading(false);
    }
  };

// Add and remove prompt handlers
  const handleAddPrompt = () => {
    if (prompts.length < 5) {
      setPrompts([...prompts, ""]);
    }
  };

  const handleRemovePrompt = (index: number) => {
    setPrompts(prompts.filter((_, i) => i !== index));
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

  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const token = getAuthToken();
        if (!token) {
          setSaveStatus("Please log in to load settings");
          return;
        }

        // Use apiGet helper to fetch settings
        const data = await apiGet<{
          primary_color: string;
          bg_type: "solid" | "gradient";
          bg_color: string;
          gradient_from?: string;
          gradient_to?: string;
          gradient_direction?: string;
          input_color: string;
          border_color: string;
          social_btn_color: string;
          avatar_url?: string | null;
          prompts: string[];
          socials: Array<{ label: string; href: string; icon: string }>;
        }>("/api/builder/settings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Populate context with defaults
        setPrimaryColor(data.primary_color);
        setBgType(data.bg_type);
        setBgColor(data.bg_color);
        setGradient({
          from: data.gradient_from ?? "#3b82f6",
          to: data.gradient_to ?? "#8b5cf6",
          direction: data.gradient_direction ?? "to bottom",
        });
        setInputColor(data.input_color);
        setBorderColor(data.border_color);
        setSocialBtnColor(data.social_btn_color);
        setAvatar(data.avatar_url ?? "");
        setPrompts(data.prompts ?? []);
        setSocials(data.socials ?? []);

        setSaveStatus("Settings loaded successfully");
      } catch (err) {
        console.error("Error loading settings:", err);
        setSaveStatus("Failed to load settings");
      } finally {
        setIsLoading(false);
        setTimeout(() => setSaveStatus(null), 2000);
      }
    };

    loadSettings();
  }, [
    setPrimaryColor,
    setBgType,
    setBgColor,
    setGradient,
    setInputColor,
    setBorderColor,
    setSocialBtnColor,
    setAvatar,
    setPrompts,
    setSocials,
  ]);

  return (
    <section className={styles.builderSection} style={backgroundStyle}>
      <div className={styles.builderContainer}>
        <h1 className={styles.title}>Builder</h1>

        {/* <div className={styles.row}>
          <button
            type="button"
            onClick={loadSettings}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              background: "#f9fafb",
              color: "#374151",
              fontWeight: 500,
              fontSize: 14,
              cursor: "pointer",
              marginBottom: 16,
            }}
          >
            Load Settings
          </button>
        </div> */}

        <div className={styles.row}>
          <label>Primary Color:</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className={styles.row}>
          <label>Background Type:</label>
          <select
            value={bgType}
            onChange={(e) => setBgType(e.target.value as "solid" | "gradient")}
            className={styles.promptInput}
            style={{ maxWidth: 180 }}
            disabled={isLoading}
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
              disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>

        <div className={styles.row}>
          <label>Input / Border Color:</label>
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className={styles.row}>
          <label>Social Button Color:</label>
          <input
            type="color"
            value={socialBtnColor}
            onChange={(e) => setSocialBtnColor(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className={styles.row}>
          <label>Avatar Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            disabled={isLoading}
          />
          {avatar && (
            <img src={avatar} alt="avatar" className={styles.avatarPreview} />
          )}
        </div>
        {/* <div className={styles.row}>
          <label>Prompts:</label>
          <div className={styles.promptsList}>
            {prompts.map((p, i) => (
              <input
                key={i}
                value={p}
                onChange={(e) => handlePromptChange(i, e.target.value)}
                className={styles.promptInput}
                disabled={isLoading}
              />
            ))}
          </div>
        </div> */}
        <div className={styles.row}>
          <label>Prompts:</label>
          <div className={styles.promptsList}>
            {prompts.map((p, i) => (
              <div key={i} className={styles.promptRow}>
                <input
                  type="text"
                  value={p}
                  onChange={(e) => handlePromptChange(i, e.target.value)}
                  className={styles.promptInput}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className={styles.removePromptBtn}
                  onClick={() => handleRemovePrompt(i)}
                  disabled={isLoading}
                  aria-label="Remove prompt"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addPromptBtn}
              onClick={handleAddPrompt}
              disabled={isLoading || prompts.length >= 5}
            >
              + Add Prompt
            </button>
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
                  disabled={isLoading}
                />
                <input
                  value={s.href}
                  onChange={(e) =>
                    handleSocialChange(i, "href", e.target.value)
                  }
                  className={styles.socialInput}
                  placeholder="URL"
                  disabled={isLoading}
                />
                <select
                  value={s.icon}
                  onChange={(e) =>
                    handleSocialChange(i, "icon", e.target.value)
                  }
                  className={styles.socialInput}
                  style={{ width: 80 }}
                  disabled={isLoading}
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
            // onClick={handleSave}
            disabled={isLoading}
            style={{
              padding: "0.7rem 2.2rem",
              borderRadius: 8,
              border: "none",
              background: "#434343",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              transition: "background 0.2s",
            }}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          {saveStatus && (
            <span
              style={{
                color:
                  saveStatus.includes("Saved") ||
                  saveStatus.includes("loaded") ||
                  saveStatus.includes("uploaded")
                    ? "green"
                    : "red",
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
