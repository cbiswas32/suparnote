import { useState } from "react";
import { FileText } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";

export function AuthPage() {
  const { signIn, signUp } = useAuthStore();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    try {
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        setMessage("Check your email to verify your account!");
        setMode("signin");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="w-full max-w-sm">
        {/* ── Logo ── */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              backgroundColor: "var(--brand)",
              boxShadow: "0 8px 24px var(--shadow)",
            }}
          >
            <FileText size={24} style={{ color: "var(--paper)" }} />
          </div>
          <h1
            className="text-2xl font-bold font-sans"
            style={{ color: "var(--ink)" }}
          >
            SuparNote
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--ink-faint)" }}>
            Your intelligent note-taking workspace
          </p>
        </div>

        {/* ── Card ── */}
        <div
          className="rounded-2xl p-6 space-y-4"
          style={{
            backgroundColor: "var(--paper-2)",
            border: "1px solid var(--paper-line)",
            boxShadow: "0 2px 16px var(--shadow)",
          }}
        >
          {/* Mode toggle */}
          <div
            className="flex gap-1 p-1 rounded-xl"
            style={{ backgroundColor: "var(--paper)" }}
          >
            {["signin", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-150"
                style={{
                  backgroundColor:
                    mode === m ? "var(--brand-bg)" : "transparent",
                  color: mode === m ? "var(--brand)" : "var(--ink-faint)",
                  boxShadow: mode === m ? "0 1px 4px var(--shadow)" : "none",
                  border:
                    mode === m
                      ? "1px solid var(--paper-line)"
                      : "1px solid transparent",
                }}
              >
                {m === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div
              className="text-sm rounded-xl px-3 py-2"
              style={{
                color: "var(--accent)",
                backgroundColor: "var(--accent-soft)",
                border: "1px solid var(--paper-line)",
              }}
            >
              {error}
            </div>
          )}

          {/* Success message */}
          {message && (
            <div
              className="text-sm rounded-xl px-3 py-2"
              style={{
                color: "var(--brand)",
                backgroundColor: "var(--brand-bg)",
                border: "1px solid var(--tag-border)",
              }}
            >
              {message}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          <Button
            className="w-full justify-center"
            onClick={handleSubmit}
            loading={loading}
            disabled={!email || !password}
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "var(--ink-faint)" }}
        >
          Connect your Supabase project via .env file
        </p>
      </div>
    </div>
  );
}
