import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ onSuccess }) => {
    const [cardData, setCardData] = useState({
        card_number: '',
        exp_month: '',
        exp_year: '',
        cvv: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: 'info', message: 'INICIANDO VALIDACIÓN DE ENLACE BANCARIO...' });

        try {
            const response = await axios.post('http://localhost:8000/api/v1/subscribe', cardData);
            setStatus({ type: 'success', message: response.data.message });
            setTimeout(() => {
                if (onSuccess) onSuccess();
            }, 1500);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'ERROR EN PROTOCOLO DE PAGO.';
            setStatus({ type: 'error', message: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    return (
        <div className="premium-card tech-border glass-panel">
            <div className="card-header">
                <h3>SISTEMA DE PAGOS</h3>
                <p>SUSCRIPCIÓN PREMIUM • $29.99 USD</p>
            </div>
            
            <form onSubmit={handleSubmit} className="form-content font-mono">
                <div className="field">
                    <label>ID DE TARJETA</label>
                    <div className="input-container">
                        <input 
                            className="bg-white/5 border-white/10 text-white"
                            type="text" 
                            name="card_number" 
                            placeholder="4111 1111 1111 1111"
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <small className="opacity-40">ALGORITMO DE LUHN ACTIVO</small>
                </div>
                
                <div className="grid-fields">
                    <div className="field">
                        <label>EXP</label>
                        <div className="expiry-group">
                            <input className="bg-white/5 border-white/10 text-white" type="text" name="exp_month" placeholder="MM" onChange={handleChange} required />
                            <input className="bg-white/5 border-white/10 text-white" type="text" name="exp_year" placeholder="YYYY" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="field">
                        <label>CVV</label>
                        <input className="bg-white/5 border-white/10 text-white" type="text" name="cvv" placeholder="123" onChange={handleChange} required />
                    </div>
                </div>

                <button type="submit" className={`pay-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                    {loading ? 'TRANSMITIENDO...' : 'CONFIRMAR TRANSACCIÓN'}
                </button>
            </form>

            {status.message && (
                <div className={`status-banner ${status.type} font-mono text-[10px]`}>
                    {status.message}
                </div>
            )}

            <style>{`
                .premium-card { background: #000; width: 100%; border-radius: 0; }
                .card-header { padding: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .card-header h3 { margin: 0; font-size: 1rem; letter-spacing: 0.2em; font-weight: 900; }
                .card-header p { margin: 5px 0 0; opacity: 0.5; font-size: 0.7rem; letter-spacing: 0.1em; }
                .form-content { padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
                .field { display: flex; flex-direction: column; gap: 8px; }
                label { font-size: 9px; font-weight: 800; color: rgba(255,255,255,0.5); letter-spacing: 0.2em; }
                input { padding: 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 0; font-size: 0.8rem; outline: none; transition: border 0.3s; }
                input:focus { border-color: white; }
                .grid-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                .expiry-group { display: flex; gap: 8px; }
                .expiry-group input { width: 50%; }
                .pay-btn { background: white; color: black; border: none; padding: 16px; font-weight: 900; font-size: 10px; letter-spacing: 0.2em; cursor: pointer; transition: all 0.3s; }
                .pay-btn:hover { background: #eee; transform: translateY(-2px); }
                .pay-btn.loading { opacity: 0.5; }
                .status-banner { margin: 0 2rem 2rem; padding: 15px; border: 1px solid; }
                .success { border-color: #10b981; color: #10b981; }
                .error { border-color: #ef4444; color: #ef4444; }
                .info { border-color: rgba(255,255,255,0.3); color: white; }
            `}</style>
        </div>
    );
};

export default PaymentForm;
