import React, { useState } from "react";
import styles from "../styles/ContactUs.module.css";

const TAGS = ["Suggestion", "Problem", "Feedback", "Other"];

const ContactUs: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState(TAGS[0]);

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContent}>
        <h1 className={styles.contactTitle}>Contact Us</h1>
        <p className={styles.contactSubtitle}>We'd love to hear from you! Fill out the form below and we'll get back to you soon.</p>
        <form className={styles.contactForm}>
          <input type="text" name="name" placeholder="Your Name" required className={styles.inputField} />
          <input type="email" name="email" placeholder="Your Email" required className={styles.inputField} />
          <div className={styles.tagRow}>
            {TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                className={selectedTag === tag ? styles.tagBtnActive : styles.tagBtn}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <textarea name="message" placeholder="Your Message" required className={styles.textareaField} rows={5} />
          <input type="hidden" name="tag" value={selectedTag} />
          <button type="submit" className={styles.submitBtn}>Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
