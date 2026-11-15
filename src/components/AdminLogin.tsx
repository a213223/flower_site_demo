import React, { useState } from 'react';
import { Lock, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';
import { setAdminAuth } from '../data/storage';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToStore }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Prompt credentials: login admin, password florist2026
    if (username.trim() === 'admin' && password === 'florist2026') {
      setAdminAuth(true);
      onSuccess();
    } else {
      setError('Неверный логин или пароль. Пожалуйста, проверьте введённые данные.');
    }
  };

  return (
    <div className="min-h-screen bg-botanika-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Top back link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <button
          type="button"
          onClick={onBackToStore}
          className="inline-flex items-center gap-2 text-xs font-medium text-botanika-muted hover:text-botanika-text transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Вернуться на витрину студии</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        
        {/* Brand header */}
        <div className="text-center mb-8">
          <span className="font-serif text-3xl tracking-[0.22em] text-botanika-text uppercase font-semibold block">
            БОТАНИКА
          </span>
          <span className="text-[11px] tracking-[0.25em] text-botanika-subtle uppercase mt-1 block">
            Служебный вход для флориста
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-botanika-card/50 border border-botanika-border rounded-sm p-6 sm:p-10 shadow-subtle space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-botanika-border text-botanika-olive">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-botanika-text">
              Авторизация сотрудника
            </span>
          </div>

          {error && (
            <div className="p-3 bg-botanika-terracotta/10 border border-botanika-terracotta/30 text-botanika-terracotta text-xs rounded-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-username" className="text-xs font-medium text-botanika-muted block mb-1">
                Логин
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Логин сотрудника"
                className="w-full text-xs p-3 rounded-sm border border-botanika-border bg-botanika-bg text-botanika-text focus:outline-none focus:ring-1 focus:ring-botanika-olive"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="text-xs font-medium text-botanika-muted block mb-1">
                Пароль
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs p-3 rounded-sm border border-botanika-border bg-botanika-bg text-botanika-text focus:outline-none focus:ring-1 focus:ring-botanika-olive"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-botanika-olive hover:bg-botanika-oliveDeep text-white text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-150 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 pt-3"
            >
              <KeyRound className="w-4 h-4" />
              <span>Войти в систему</span>
            </button>
          </form>

          {/* Discreet demo credentials hint (only shown under login form per user instructions) */}
          <div className="pt-4 border-t border-botanika-border/70 text-center">
            <p className="text-[11px] text-botanika-subtle leading-relaxed">
              Демо-доступ для проверки: <br />
              логин <code className="bg-botanika-bg px-1.5 py-0.5 rounded text-botanika-text border border-botanika-border/60 font-mono">admin</code>, 
              пароль <code className="bg-botanika-bg px-1.5 py-0.5 rounded text-botanika-text border border-botanika-border/60 font-mono">florist2026</code>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
