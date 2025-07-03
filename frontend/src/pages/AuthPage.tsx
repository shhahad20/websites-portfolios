import { useState } from 'react';
// import styles from '../styles/HeroSection.module.css';
import styles from'../styles/Global.module.css'; // Import global styles

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <section className={styles.global_bg}>
      <div className={styles.content} style={{alignItems: 'center', minHeight: '60vh'}}>
        <h1 className={styles.title} style={{textAlign: 'center'}}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h1>
        <p className={styles.titleSmall}>Please enter your details to start the fun!</p>
        <form style={{width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1.2rem'}}>
          {!isSignIn && (
            <input
              type="text"
              placeholder="Full Name"
              className={styles.authInput}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className={styles.authInput}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.authInput}
            required
          />
          <button
            type="submit"
            className={styles.authBtn}
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <div style={{marginTop: '1.5rem', fontSize: '0.97rem', color: '#434343'}}>
          {isSignIn ? (
            <>
              Don&apos;t have an account?{' '}
              <button type="button" style={{color: '#434343', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600}} onClick={() => setIsSignIn(false)}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" style={{color: '#434343', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600}} onClick={() => setIsSignIn(true)}>
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
