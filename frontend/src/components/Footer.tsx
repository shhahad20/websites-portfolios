import React from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <span>&copy; 2025 SHAHAD ALTHARWA. All Rights Reserved.</span>
      <span className={styles.contactLink}>
        <Link to="/auth">Sign in</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/builder">Builder</Link>
        <Link to="/contact">Contact Us</Link>
      </span>
    </div>
  </footer>
);

export default Footer;
