import React, { useState } from 'react';
import LuhnGateway from './components/LuhnGateway';
import Certificates from './components/Certificates';
import TechnicalManifest from './components/TechnicalManifest';
import { User, Activity, Lock, Layout, Book, CreditCard, ArrowRight, FileText, Award, Sun, Moon } from 'lucide-react';
import './App.css';

function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState({ name: 'INVITADO', isPremium: false });
  const [theme, setTheme] = useState('dark'); // Estado del tema global

  const navTo = (v) => setView(v);
  const login = () => { setUser({ name: 'NAHUEL', isPremium: false }); setView('dashboard'); };
  const upgrade = () => { setUser({ ...user, isPremium: true }); setView('dashboard'); };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    // Sync with iframe
    const iframe = document.getElementById('classroom-frame');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage('toggle-theme', '*');
    }
  };

  // Escuchar mensajes del Iframe (Vue)
  React.useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'toggle-theme') {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      }
      if (event.data === 'go-premium') {
        setView('billing');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Aplicar tema al body
  React.useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Vista de Landing (Video Background)
  if (view === 'landing') {
    return (
      <div className="landing-overlay">
        <div className="video-background">
          <iframe 
            src="https://www.youtube.com/embed/S8uheIt9Iec?autoplay=1&mute=1&controls=0&loop=1&playlist=S8uheIt9Iec&showinfo=0&modestbranding=1" 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
            title="MathFlow Background"
          ></iframe>
          <div className="video-overlay"></div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', lineHeight: 0.9, fontWeight: 800, marginBottom: '2rem', textShadow: '0 0 30px rgba(0,0,0,0.8)' }}>
            MATH<br/><span style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>FLOW</span>
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '3rem', fontWeight: 500, textShadow: '0 0 10px rgba(0,0,0,1)' }}>
            SISTEMA DE ENTRENAMIENTO TÉCNICO DE ALTA PRECISIÓN.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={login} className="btn-primary">INICIAR SISTEMA</button>
            <button onClick={() => setView('manifest')} className="btn-outline">MANIFIESTO TÉCNICO</button>
          </div>
        </div>
      </div>
    );
  }

  // Vista de Aplicación (Dashboard / Aula / Manifiesto)
  return (
    <div className="app-shell">
      <nav>
        <span className="nav-brand" onClick={() => setView('landing')}>MATHFLOW</span>
        <div className="nav-right">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            title={theme === 'dark' ? "Modo Claro" : "Modo Oscuro"}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', marginRight: '1rem', display: 'flex', alignItems: 'center' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="user-info">
            <span style={{ fontWeight: 800 }}>{user.name}</span>
            <span style={{ opacity: 0.5, fontSize: '0.8em', marginLeft: '5px' }}>{user.isPremium ? 'PRO' : 'BASIC'}</span>
          </div>
        </div>
      </nav>

      <aside className="sidebar">
        <div className="card">
          <div style={{ fontSize: '10px', opacity: 0.5, marginBottom: '0.5rem' }}>ESTADO</div>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>OPERATIVO</div>
        </div>
        
        <div className="flex-col" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <button onClick={() => setView('dashboard')} className={`btn-menu ${view === 'dashboard' ? 'active' : ''}`}>
            <Layout size={14} style={{ marginRight: 8, display: 'inline' }}/> DASHBOARD
          </button>
          <button onClick={() => setView('classroom')} className={`btn-menu ${view === 'classroom' ? 'active' : ''}`}>
            <Book size={14} style={{ marginRight: 8, display: 'inline' }}/> AULA VIRTUAL
          </button>
          <button onClick={() => setView('certificates')} className={`btn-menu ${view === 'certificates' ? 'active' : ''}`}>
            <Award size={14} style={{ marginRight: 8, display: 'inline' }}/> CERTIFICADOS
          </button>
          <button onClick={() => setView('manifest')} className={`btn-menu ${view === 'manifest' ? 'active' : ''}`}>
            <FileText size={14} style={{ marginRight: 8, display: 'inline' }}/> DOCS TÉCNICA
          </button>
          <button onClick={() => setView('billing')} className={`btn-menu ${view === 'billing' ? 'active' : ''}`}>
            <CreditCard size={14} style={{ marginRight: 8, display: 'inline' }}/> SUSCRIPCIÓN
          </button>
        </div>
      </aside>

      <div className={`main-viewport ${view === 'classroom' ? 'full-screen-mode' : ''}`}>
        
        {view === 'dashboard' && (
          <div className="scroll-container">
            <div className="center-content">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 700 }}>CENTRAL DE OPERACIONES</h2>
              </div>

              <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <Activity size={40} opacity={0.8}/>
                <h3>DINÁMICA DE FLUIDOS</h3>
                <button onClick={() => setView('classroom')} className="btn-primary" style={{ width: '100%' }}>CONTINUAR</button>
              </div>

              <div className="card" style={{ opacity: user.isPremium ? 1 : 0.4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                {user.isPremium ? <Activity size={40}/> : <Lock size={40}/>}
                <h3>MECÁNICA ORBITAL</h3>
                {user.isPremium ? (
                  <button onClick={() => setView('classroom')} className="btn-primary" style={{ width: '100%' }}>CONTINUAR</button>
                ) : (
                  <button onClick={() => setView('billing')} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '10px', width: '100%', cursor: 'pointer' }}>DESBLOQUEAR</button>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'manifest' && (
          <div className="scroll-container">
            <TechnicalManifest />
          </div>
        )}
        
        {view === 'certificates' && (
          <div className="scroll-container">
            <Certificates />
          </div>
        )}

        {view === 'classroom' && (
          <iframe id="classroom-frame" src="http://localhost:5173" className="iframe-full" title="Aula" />
        )}

        {view === 'billing' && (
          <div className="scroll-container">
            <div className="center-content" style={{ maxWidth: '600px' }}>
              <LuhnGateway onSuccess={upgrade} />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
