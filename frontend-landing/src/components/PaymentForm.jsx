import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [cardData, setCardData] = useState({
        card_number: '',
        exp_month: '',
        exp_year: '',
        cvv: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Validando con el servidor...' });

        try {
            const response = await axios.post('http://localhost:8000/api/v1/subscribe', cardData);
            setStatus({ type: 'success', message: response.data.message });
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error en el proceso.';
            setStatus({ type: 'error', message: `Fallo de Seguridad: ${errorMsg}` });
        }
    };

    const handleChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    return (
        <div className="payment-form-container">
            <h2>Acceso Premium a MathFlow</h2>
            <p>Tu aprendizaje, asegurado por nuestro Core de validación técnica.</p>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Número de Tarjeta</label>
                    <input 
                        type="text" 
                        name="card_number" 
                        placeholder="XXXX XXXX XXXX XXXX"
                        onChange={handleChange}
                        required 
                    />
                    <small>Validación vía Algoritmo de Luhn activa.</small>
                </div>
                
                <div className="row">
                    <input type="text" name="exp_month" placeholder="MM" onChange={handleChange} required />
                    <input type="text" name="exp_year" placeholder="YYYY" onChange={handleChange} required />
                    <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} required />
                </div>

                <button type="submit" className="btn-pay">Activar Curso Premium</button>
            </form>

            {status.message && (
                <div className={`alert ${status.type}`}>
                    {status.message}
                </div>
            )}

            <style jsx>{`
                .payment-form-container { max-width: 400px; margin: 2rem auto; padding: 2rem; border: 1px solid #ddd; border-radius: 12px; }
                .input-group { margin-bottom: 1rem; }
                input { width: 100%; padding: 10px; margin: 5px 0; border: 1px solid #ccc; border-radius: 4px; }
                .row { display: flex; gap: 10px; }
                .btn-pay { width: 100%; background: #007bff; color: white; padding: 12px; border: none; border-radius: 6px; cursor: pointer; margin-top: 1rem; }
                .alert { margin-top: 1rem; padding: 10px; border-radius: 4px; }
                .success { background: #d4edda; color: #155724; }
                .error { background: #f8d7da; color: #721c24; }
                .info { background: #d1ecf1; color: #0c5460; }
            `}</style>
        </div>
    );
};

export default PaymentForm;
