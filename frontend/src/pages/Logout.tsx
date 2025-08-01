import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api/client";

interface LogoutResponse {
  message: string;
}
const Logout = () => {
  const navigate = useNavigate();
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const doLogout = async () => {
      try {
        const data = await apiPost<LogoutResponse>("/auth/logout", {});
        console.log("Server said:", data.message);
        localStorage.removeItem("sb_token");
        navigate("/", { replace: true });
      } catch (err: unknown) {
        console.error("Logout error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      }
    };

    doLogout();
  }, [navigate]);

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
        <p>Failed to log out:</p>
        <pre>{error}</pre>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>Logging out…</p>
    </div>
  );
};

export default Logout;
