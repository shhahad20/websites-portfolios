import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EnterName.module.css";

export const EnterName: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      navigate(`/${name}`);
    }
  };

  return (
    <section className={styles.enterSection}>
      <form className={styles.enterForm} onSubmit={handleSubmit}>
        <h1 className={styles.enterTitle}>Welcome!</h1>
        <p className={styles.enterSubtitle}>Please enter your name to continue</p>
        <input
          className={styles.enterInput}
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <button className={styles.enterBtn} type="submit">Continue</button>
      </form>
    </section>
  );
};

export default EnterName;
