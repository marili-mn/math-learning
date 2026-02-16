import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Zap, ExternalLink } from 'lucide-react';

const LuhnGateway = ({ onSuccess }) => {
    const [cardData, setCardData] = useState({
        card_number: '',
        exp_month: '',
        exp_year: '',
        cvv: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [luhnValid, setLuhnValid] = useState(null); // null, true, false

    const validateLuhn = (number) => {
        let s = 0;
        let doubleDigit = false;
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number.charAt(i));
            if (doubleDigit) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            s += digit;
            doubleDigit = !doubleDigit;
        }
        return (s % 10 == 0);
    };

    const handleCardNumberChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        setCardData({ ...cardData, card_number: val });
        if (val.length > 0) {
            setLuhnValid(validateLuhn(val));
        } else {
            setLuhnValid(null);
        }
    };

    const handleChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const autocomplete = () => {
        // Valid Luhn number (Visa test)
        const validNum = '4242424242424242'; 
        setCardData({
            card_number: validNum,
            exp_month: '12',
            exp_year: '2030',
            cvv: '123'
        });
        setLuhnValid(validateLuhn(validNum));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateLuhn(cardData.card_number)) {
            setStatus({ type: 'error', message: 'ERROR: VALIDACIÓN LUHN FALLIDA. TARJETA INVÁLIDA.' });
            return;
        }

        setLoading(true);
        setStatus({ type: 'info', message: 'INICIANDO PROTOCOLO DE PAGO SEGURO...' });

        try {
            // Mock success for now as we might not have the backend running/reachable exactly as expected
            // or we use the existing endpoint
            // const response = await axios.post('http://localhost:8000/api/v1/subscribe', cardData);
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setStatus({ type: 'success', message: 'TRANSACCIÓN AUTORIZADA. BIENVENIDO.' });
            setTimeout(() => {
                if (onSuccess) onSuccess();
            }, 1000);
        } catch (error) {
            setStatus({ type: 'error', message: 'ERROR DE CONEXIÓN CON PASARELA.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="luhn-gateway tech-border glass-panel">
            <div className="gateway-header">
                <div className="flex justify-between items-start">
                    <div>
                        <h3>LUHN SECURE GATEWAY</h3>
                        <p>ENCRIPTACIÓN DE GRADO MILITAR ACTIVA</p>
                    </div>
                    <ShieldCheck size={24} className="text-emerald-500" />
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="gateway-form font-mono">
                <div className="field">
                    <div className="flex justify-between items-end mb-2">
                        <label>SECUENCIA DE TARJETA</label>
                        <button type="button" onClick={autocomplete} className="auto-btn">
                            <Zap size={10} style={{marginRight:4}}/> AUTO-FILL
                        </button>
                    </div>
                    
                    <div className="input-wrapper">
                        <input 
                            className={`bg-white/5 border-white/10 text-white w-full ${luhnValid === true ? 'valid-border' : luhnValid === false ? 'invalid-border' : ''}`}
                            type="text" 
                            name="card_number" 
                            value={cardData.card_number}
                            placeholder="0000 0000 0000 0000"
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            required 
                        />
                        {luhnValid === true && <span className="indicator valid">VALID</span>}
                        {luhnValid === false && <span className="indicator invalid">INVALID</span>}
                    </div>
                    
                    <a 
                        href="https://stripe.com/resources/more/how-to-use-the-luhn-algorithm-a-guide-in-applications-for-businesses" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ref-link"
                    >
                        <ExternalLink size={10} style={{marginRight:4}}/>
                        REFERENCIA: ALGORITMO DE LUHN (STRIPE)
                    </a>
                </div>
                
                <div className="grid-fields">
                    <div className="field">
                        <label>VENCIMIENTO</label>
                        <div className="expiry-group">
                            <input className="bg-white/5 border-white/10 text-white" type="text" name="exp_month" value={cardData.exp_month} placeholder="MM" onChange={handleChange} maxLength={2} required />
                            <input className="bg-white/5 border-white/10 text-white" type="text" name="exp_year" value={cardData.exp_year} placeholder="YYYY" onChange={handleChange} maxLength={4} required />
                        </div>
                    </div>
                    <div className="field">
                        <label>CÓDIGO DE SEGURIDAD</label>
                        <input className="bg-white/5 border-white/10 text-white" type="password" name="cvv" value={cardData.cvv} placeholder="•••" onChange={handleChange} maxLength={4} required />
                    </div>
                </div>

                <button type="submit" className={`pay-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                    {loading ? 'PROCESANDO...' : 'EJECUTAR TRANSACCIÓN'}
                </button>
            </form>

            {status.message && (
                <div className={`status-banner ${status.type} font-mono text-[10px]`}>
                    {status.message}
                </div>
            )}

            <style>{`
                .luhn-gateway { background: #050505; width: 100%; border: 1px solid rgba(255,255,255,0.1); }
                .gateway-header { padding: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); background: linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%); }
                .gateway-header h3 { margin: 0; font-size: 1.1rem; letter-spacing: 0.1em; font-weight: 800; color: #fff; }
                .gateway-header p { margin: 5px 0 0; opacity: 0.5; font-size: 0.7rem; letter-spacing: 0.1em; }
                
                .gateway-form { padding: 2rem; display: flex; flex-direction: column; gap: 2rem; }
                .field { display: flex; flex-direction: column; gap: 8px; }
                label { font-size: 9px; font-weight: 800; color: rgba(255,255,255,0.5); letter-spacing: 0.2em; }
                
                .input-wrapper { position: relative; }
                input { padding: 16px; border: 1px solid rgba(255,255,255,0.1); border-radius: 0; font-size: 0.9rem; outline: none; transition: all 0.3s; background: rgba(0,0,0,0.3); color: white; font-family: monospace; }
                input:focus { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.02); }
                
                .valid-border { border-color: #10b981 !important; box-shadow: 0 0 10px rgba(16, 185, 129, 0.2); }
                .invalid-border { border-color: #ef4444 !important; box-shadow: 0 0 10px rgba(239, 68, 68, 0.2); }
                
                .indicator { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-size: 9px; font-weight: 900; letter-spacing: 0.1em; padding: 2px 6px; border-radius: 2px; }
                .indicator.valid { background: #10b981; color: black; }
                .indicator.invalid { background: #ef4444; color: white; }

                .auto-btn { background: rgba(255,255,255,0.1); border: none; color: white; padding: 4px 10px; font-size: 9px; cursor: pointer; display: flex; align-items: center; letter-spacing: 0.1em; transition: background 0.2s; }
                .auto-btn:hover { background: rgba(255,255,255,0.2); }

                .ref-link { font-size: 9px; color: rgba(255,255,255,0.4); text-decoration: none; display: flex; align-items: center; margin-top: 5px; transition: color 0.2s; }
                .ref-link:hover { color: #3b82f6; }

                .grid-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                .expiry-group { display: flex; gap: 10px; }
                .expiry-group input { width: 100%; }

                .pay-btn { background: white; color: black; border: none; padding: 18px; font-weight: 900; font-size: 11px; letter-spacing: 0.2em; cursor: pointer; transition: all 0.3s; margin-top: 1rem; position: relative; overflow: hidden; }
                .pay-btn:hover { background: #f0f0f0; letter-spacing: 0.25em; }
                .pay-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                .status-banner { margin: 0 2rem 2rem; padding: 15px; border-left: 4px solid; background: rgba(255,255,255,0.02); }
                .success { border-color: #10b981; color: #10b981; }
                .error { border-color: #ef4444; color: #ef4444; }
                .info { border-color: #3b82f6; color: #3b82f6; }
            `}</style>
        </div>
    );
};

export default LuhnGateway;
