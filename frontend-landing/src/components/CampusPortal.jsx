import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Terminal, BookOpen, Rocket, ShieldCheck, Send, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Importante: Estilos de matemáticas

const CampusPortal = ({ user, onUpgrade }) => {
    const [chat, setChat] = useState([
        { role: 'model', text: 'SISTEMA INICIALIZADO. Mathy v1.0 listo. Acceso verificado para ' + (user.isLoggedIn ? user.name : 'MODO INVITADO') + '. ¿Iniciamos el análisis de cálculo?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress] = useState(35);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [chat]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input;
        setChat(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:3001/api/chat', {
                message: userMsg,
                history: chat.slice(-4).map(m => ({
                    role: m.role === 'model' ? 'model' : 'user',
                    parts: [{ text: m.text }]
                })),
                problemContext: "Misión Crítica: Análisis de Sistemas Dinámicos."
            }, { timeout: 15000 });

            let cleanText = res.data.text.replace(/<thought>[\s\S]*?<\/thought>/g, '').trim();
            
            setChat(prev => [...prev, { role: 'model', text: cleanText }]);
        } catch (e) {
            console.error(e);
            setChat(prev => [...prev, { role: 'model', text: 'ERR_TELEMETRY: Enlace con MATHY interrumpido.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full gap-6 p-6" style={{ height: 'calc(100vh - 80px)' }}>
            {/* Sidebar */}
            <div className="flex flex-col gap-6" style={{ width: '320px' }}>
                <div className="glass-panel p-6 tech-border">
                    <div className="flex items-center gap-3 mb-4" style={{ marginBottom: '1rem' }}>
                        <Rocket size={18} />
                        <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.2em' }}>MISIÓN: CÁLCULO I</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', height: '2px', width: '100%', marginBottom: '0.5rem' }}>
                        <div style={{ background: 'white', height: '100%', width: `${progress}%`, transition: 'width 1s' }} />
                    </div>
                    <div className="flex justify-between" style={{ fontSize: '9px', fontWeight: 700, opacity: 0.5, letterSpacing: '0.1em' }}>
                        <span>ÓRBITA ACTUAL</span>
                        <span>{progress}%</span>
                    </div>
                </div>

                <div className="flex-1 glass-panel p-6 tech-border" style={{ overflowY: 'auto' }}>
                    <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', opacity: 0.4, marginBottom: '1.5rem' }}>MÓDULOS DE INGENIERÍA</div>
                    {[
                        { title: 'Derivadas Vectoriales', status: 'OK', locked: false },
                        { title: 'Integrales de Superficie', status: 'ACTIVE', locked: false },
                        { title: 'Dinámica de Fluidos', status: 'LOCKED', locked: !user.isPremium },
                    ].map((m, i) => (
                        <div key={i} style={{ 
                            padding: '1rem 0', 
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            opacity: m.locked ? 0.3 : 1
                        }}>
                            <div className="flex items-center gap-3">
                                <BookOpen size={14} opacity={0.5} />
                                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em' }}>{m.title}</span>
                            </div>
                            {m.locked ? <ShieldCheck size={12} /> : <ChevronRight size={14} opacity={0.3} />}
                        </div>
                    ))}
                    {!user.isPremium && (
                        <button onClick={onUpgrade} className="btn-primary w-full" style={{ marginTop: '2rem' }}>
                            Upgrade a Premium
                        </button>
                    )}
                </div>
            </div>

            {/* Main Terminal */}
            <div className="flex-1 glass-panel tech-border flex flex-col">
                <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 animate-pulse" style={{ borderRadius: '50%', width: '8px', height: '8px' }} />
                        <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em' }}>IA-MATHY TERMINAL [ONLINE]</span>
                    </div>
                    <Terminal size={14} opacity={0.3} />
                </div>

                <div className="flex-1 p-6" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <AnimatePresence>
                        {chat.map((m, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ 
                                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%'
                                }}
                            >
                                <div style={{ 
                                    padding: '1rem', 
                                    fontSize: '11px',
                                    lineHeight: '1.6',
                                    fontFamily: 'monospace',
                                    background: m.role === 'user' ? 'white' : 'rgba(255,255,255,0.03)',
                                    color: m.role === 'user' ? 'black' : 'white',
                                    border: m.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <span style={{ display: 'block', fontSize: '8px', marginBottom: '0.5rem', opacity: 0.5, fontWeight: 900 }}>
                                        {m.role === 'user' ? 'USER_INPUT' : 'MATHY_OUTPUT'}
                                    </span>
                                    <ReactMarkdown 
                                        remarkPlugins={[remarkMath]} 
                                        rehypePlugins={[rehypeKatex]}
                                    >
                                        {m.text}
                                    </ReactMarkdown>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {loading && <div style={{ fontSize: '9px', opacity: 0.5, letterSpacing: '0.2em' }} className="animate-pulse">RECIBIENDO TELEMETRÍA...</div>}
                    <div ref={chatEndRef} />
                </div>

                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.1)' }} className="flex gap-4">
                    <input 
                        style={{ 
                            flex: 1, 
                            background: 'transparent', 
                            border: '1px solid rgba(255,255,255,0.1)', 
                            padding: '1rem', 
                            color: 'white', 
                            fontSize: '11px',
                            fontFamily: 'monospace',
                            outline: 'none'
                        }}
                        placeholder="INGRESE CONSULTA TÉCNICA..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} className="btn-primary" style={{ padding: '0 1.5rem' }}>
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampusPortal;
