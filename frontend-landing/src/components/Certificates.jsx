import React from 'react';
import { Award, FileCheck, Download } from 'lucide-react';

const Certificates = () => {
    // Mock data based on what might be expected
    const certificates = [
        {
            id: 'CERT-2023-8842',
            title: 'FUNDAMENTOS DE ÁLGEBRA LINEAL',
            date: '2023-10-15',
            status: 'VERIFICADO',
            grade: '98/100'
        },
        {
            id: 'CERT-2024-0012',
            title: 'CÁLCULO DIFERENCIAL I',
            date: '2024-02-20',
            status: 'VERIFICADO',
            grade: '100/100'
        }
    ];

    return (
        <div className="certificates-container fade-in">
            <div className="header-section">
                <Award size={48} className="mb-4 opacity-80" />
                <h2 className="text-3xl font-black tracking-tight mb-2">REGISTRO DE CERTIFICACIONES</h2>
                <p className="opacity-60 text-sm tracking-widest">VALIDACIÓN ACADÉMICA EN BLOCKCHAIN</p>
            </div>

            <div className="certs-grid">
                {certificates.map(cert => (
                    <div key={cert.id} className="cert-card tech-border">
                        <div className="cert-status">{cert.status}</div>
                        <div className="cert-body">
                            <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                            <div className="text-xs opacity-50 mb-4 font-mono">{cert.id}</div>
                            
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] uppercase tracking-wider opacity-60">Fecha de Emisión</div>
                                    <div className="font-mono text-sm">{cert.date}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase tracking-wider opacity-60">Calificación</div>
                                    <div className="font-mono text-xl font-bold text-emerald-400">{cert.grade}</div>
                                </div>
                            </div>
                        </div>
                        <div className="cert-footer">
                            <button className="download-btn">
                                <Download size={14} className="mr-2" /> DESCARGAR PDF
                            </button>
                            <button className="verify-btn">
                                <FileCheck size={14} className="mr-2" /> VALIDAR
                            </button>
                        </div>
                    </div>
                ))}

                {/* Placeholder for empty state or future certs */}
                <div className="cert-card empty-card">
                    <div className="flex flex-col items-center justify-center h-full opacity-30">
                        <Award size={40} className="mb-2" />
                        <div className="text-xs tracking-widest">PRÓXIMA CERTIFICACIÓN</div>
                    </div>
                </div>
            </div>

            <style>{`
                .certificates-container { max-width: 900px; margin: 0 auto; padding: 2rem; color: white; }
                .header-section { text-align: center; margin-bottom: 4rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .certs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
                
                .cert-card { 
                    background: rgba(255,255,255,0.03); 
                    border: 1px solid rgba(255,255,255,0.1); 
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .cert-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }
                
                .cert-status { 
                    position: absolute; top: 0; right: 0; 
                    background: #10b981; color: black; 
                    font-size: 9px; font-weight: 900; padding: 4px 8px; 
                    letter-spacing: 0.1em;
                }
                
                .cert-body { padding: 2rem; }
                
                .cert-footer { 
                    display: grid; grid-template-columns: 1fr 1fr; 
                    border-top: 1px solid rgba(255,255,255,0.1); 
                }
                
                .download-btn, .verify-btn { 
                    background: transparent; border: none; color: white; 
                    padding: 1rem; font-size: 10px; font-weight: 800; 
                    cursor: pointer; display: flex; items-center; justify-content: center;
                    transition: background 0.2s;
                    letter-spacing: 0.1em;
                }
                .download-btn:hover { background: rgba(255,255,255,0.1); }
                .verify-btn:hover { background: rgba(255,255,255,0.1); }
                .verify-btn { border-left: 1px solid rgba(255,255,255,0.1); }

                .empty-card { border-style: dashed; background: transparent; min-height: 200px; }
            `}</style>
        </div>
    );
};

export default Certificates;
