import React, { useState } from 'react';
import styles from '../styles/HeroSection.module.css';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <section className={styles.hero}>
      <div className={styles.content} style={{alignItems: 'center', minHeight: '60vh'}}>
        <h1 className={styles.title} style={{textAlign: 'center', marginBottom: '1.5rem'}}>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h1>
        <form style={{width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1.2rem'}}>
          {!isSignIn && (
            <input
              type="text"
              placeholder="Full Name"
              style={{padding: '1rem', borderRadius: 12, border: '1px solid #ccc', fontSize: '1rem'}}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            style={{padding: '1rem', borderRadius: 12, border: '1px solid #ccc', fontSize: '1rem'}}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={{padding: '1rem', borderRadius: 12, border: '1px solid #ccc', fontSize: '1rem'}}
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
              <button type="button" style={{color: '#bfa100', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600}} onClick={() => setIsSignIn(false)}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" style={{color: '#bfa100', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600}} onClick={() => setIsSignIn(true)}>
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
