import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const PHONE_FRAME_CLASS = "flex items-center justify-center min-h-screen bg-neutral-200 dark:bg-neutral-900";
const MOBILE_VIEW_CLASS = "relative w-full max-w-xs sm:max-w-sm min-h-[90vh] bg-white dark:bg-neutral-950 shadow-2xl rounded-[2.5rem] border-4 border-neutral-400 dark:border-neutral-700 p-0 overflow-hidden flex flex-col";

function RequireAuth({ children, loggedIn }: { children: JSX.Element, loggedIn: boolean }) {
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('loggedIn') === 'true');

  // Optionally, sync with system preference or persist in sessionStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className={PHONE_FRAME_CLASS}>
          <div className={MOBILE_VIEW_CLASS + (mode === 'dark' ? ' dark' : '')}>
            <ModeToggle mode={mode} setMode={setMode} />
            <BrowserRouter>
              <Routes>
                <Route path="/signup" element={<SignupWrapper />} />
                <Route path="/login" element={<LoginWrapper loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                <Route path="/" element={<Navigate to="/signup" replace />} />
                <Route path="*" element={<Navigate to="/signup" replace />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

function LoginWrapper({ loggedIn, setLoggedIn }: { loggedIn: boolean, setLoggedIn: (v: boolean) => void }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn, navigate]);
  return <LoginWithSession setLoggedIn={setLoggedIn} />;
}

function LoginWithSession({ setLoggedIn }: { setLoggedIn: (v: boolean) => void }) {
  const navigate = useNavigate();
  return <LoginWithLogic onLogin={() => {
    sessionStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
    navigate('/', { replace: true });
  }} />;
}

function LoginWithLogic({ onLogin }: { onLogin: () => void }) {
  return <Login onLogin={onLogin} />;
}

function SignupWrapper() {
  const navigate = useNavigate();
  return <Signup onSignupSuccess={() => navigate('/login')} />;
}

function ModeToggle({ mode, setMode }: { mode: 'light' | 'dark', setMode: (m: 'light' | 'dark') => void }) {
  return (
    <button
      aria-label="Toggle light/dark mode"
      className="absolute top-4 right-4 z-20 rounded-full border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 p-2 shadow-md transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-700"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      {mode === 'light' ? (
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" /><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" /></svg>
      ) : (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      )}
    </button>
  );
}


export default App;
