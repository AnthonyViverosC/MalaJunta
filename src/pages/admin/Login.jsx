// Página de inicio de sesión del panel administrativo — MALA JUNTA.
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { BRAND, BRAND_LOGO } from '../../config/defaults.js';

export default function Login() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.from?.pathname || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await iniciarSesion(email.trim(), password);
      navigate(destino, { replace: true });
    } catch (err) {
      const msg = err?.message || '';
      if (msg.includes('Invalid login credentials')) {
        setError('Correo o contraseña incorrectos.');
      } else if (msg.includes('Email not confirmed')) {
        setError('Debes confirmar tu correo antes de entrar.');
      } else {
        setError('No se pudo iniciar sesión. Intenta de nuevo.');
      }
    } finally {
      setEnviando(false);
    }
  }

  const inputBase =
    'w-full bg-ink-800 border-2 border-ink-600 focus:border-acid-400 outline-none text-bone font-mono pl-10 pr-3 py-2.5 transition-colors';

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-950 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-faint [background-size:44px_44px] opacity-60" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl bg-acid-500/15" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl bg-flame-500/15" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <span className="inline-block w-20 h-20 rounded-full overflow-hidden ring-2 ring-acid-400/70 mb-4 shadow-[0_0_28px_rgba(229,185,106,0.35)]">
            <img src={BRAND_LOGO} alt={BRAND} className="w-full h-full object-cover" />
          </span>
          <h1 className="font-display uppercase text-4xl text-bone leading-none">{BRAND}</h1>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-bone-muted mt-2">
            Panel de administración
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-ink-900 border-2 border-ink-600 p-6 md:p-8 space-y-5">
          {error && (
            <div className="bg-flame-500/10 border-2 border-flame-500/40 text-flame-300 font-mono text-sm px-4 py-3">
              {error}
            </div>
          )}

          <label className="block">
            <span className="font-mono text-xs uppercase tracking-wider text-bone-muted">Correo</span>
            <div className="mt-1.5 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-acid-400" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputBase}
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
          </label>

          <label className="block">
            <span className="font-mono text-xs uppercase tracking-wider text-bone-muted">Contraseña</span>
            <div className="mt-1.5 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-acid-400" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputBase}
                placeholder="••••••••"
              />
            </div>
          </label>

          <button type="submit" disabled={enviando} className="btn-acid w-full disabled:opacity-60">
            {enviando ? (
              <span className="h-5 w-5 border-2 border-ink-950/40 border-t-ink-950 animate-spin" />
            ) : (
              <>
                <LogIn className="h-4 w-4" /> Entrar
              </>
            )}
          </button>

          <div className="text-center">
            <Link
              to="/"
              className="font-mono text-xs uppercase tracking-wider text-bone-muted hover:text-acid-400 transition"
            >
              ← Volver a la carta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
