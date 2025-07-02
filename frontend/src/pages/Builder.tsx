import React from "react";
import styles from "../styles/Builder.module.css";
import { useCustomization } from "../context/CustomizationContext";

export default function Builder() {
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

  const handleSocialChange = (i: number, field: 'label' | 'href' | 'icon', value: string) => {
    setSocials(socials.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  };

  return (
    
      <section className={styles.builderSection}>
        <div className={styles.builderContainer}>
        <h1 className={styles.title}>Builder</h1>
        <div className={styles.row}>
          <label>Primary Color:</label>
          <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} />
        </div>
        <div className={styles.row}>
          <label>Background Color:</label>
          <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
        </div>
        <div className={styles.row}>
          <label>Avatar Image:</label>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
          {avatar && <img src={avatar} alt="avatar" className={styles.avatarPreview} />}
        </div>
        <div className={styles.row}>
          <label>Prompts:</label>
          <div className={styles.promptsList}>
            {prompts.map((p, i) => (
              <input
                key={i}
                value={p}
                onChange={e => handlePromptChange(i, e.target.value)}
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
                style={{ fontWeight: 600, background: '#f5f5f5', color: '#434343' }}
              />
              <input
                value="#"
                disabled
                className={styles.socialInput}
                style={{ background: '#f5f5f5', color: '#aaa' }}
              />
            </div>
            {socials.map((s, i) => (
              <div key={i} className={styles.socialRow}>
                <input
                  value={s.label}
                  onChange={e => handleSocialChange(i, 'label', e.target.value)}
                  className={styles.socialInput}
                  placeholder="Label"
                />
                <input
                  value={s.href}
                  onChange={e => handleSocialChange(i, 'href', e.target.value)}
                  className={styles.socialInput}
                  placeholder="URL"
                />
                <select
                  value={s.icon}
                  onChange={e => handleSocialChange(i, 'icon', e.target.value)}
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
        </div>
      </section>
    
  );
}
