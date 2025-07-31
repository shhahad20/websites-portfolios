import { useState } from "react";
import styles from "../styles/Global.module.css";
import { apiPost } from "../api/client";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  user_name: string;
  gender: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterResponse = {
  user: { id: string; email: string /* etc. */ };
  message: string;
};

type LoginResponse = {
  user: { id: string; email: string };
  session: { access_token: string /* etc. */ };
  profile: Record<string, unknown> | null;
};

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isSignIn) {
        const payload: LoginPayload = { email, password };
        const data = await apiPost<LoginResponse, LoginPayload>(
          "/auth/login",
          payload
        );
        setSuccess(`Welcome back, ${data.user.email}!`);
        localStorage.setItem("sb_token", data.session.access_token);
        // redirect...
      } else {
        const payload: RegisterPayload = {
          name,
          email,
          password,
          phone: phone || undefined,
          user_name:userName,
          gender,
        };
        const data = await apiPost<RegisterResponse, RegisterPayload>(
          "/auth/register",
          payload
        );

        setSuccess(data.message);
        setIsSignIn(true);
        setName("");
        setPhone("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.global_bg}>
      <div
        className={styles.content}
        style={{ alignItems: "center", minHeight: "60vh" }}
      >
        <h1 className={styles.title} style={{ textAlign: "center" }}>
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        <p className={styles.titleSmall}>
          Please enter your details to start the fun!
        </p>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        {success && (
          <div style={{ color: "green", marginBottom: 12 }}>{success}</div>
        )}
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {!isSignIn && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                className={styles.authInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="User Name"
                className={styles.authInput}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                className={styles.authInput}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <select
                className={styles.authInput}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className={styles.authInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.authInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.authBtn} disabled={loading}>
            {loading
              ? isSignIn
                ? "Signing In…"
                : "Signing Up…"
              : isSignIn
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>
        <div
          style={{ marginTop: "1.5rem", fontSize: "0.97rem", color: "#434343" }}
        >
          {isSignIn ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                style={{
                  color: "#434343",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => {
                  setIsSignIn(false);
                  setError(null);
                  setSuccess(null);
                }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                style={{
                  color: "#434343",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => {
                  setIsSignIn(true);
                  setError(null);
                  setSuccess(null);
                }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
