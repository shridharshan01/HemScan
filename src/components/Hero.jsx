import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section id="hero" className="section" style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            paddingTop: '6rem',
            paddingBottom: '6rem'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                alignItems: 'center'
            }}>
                <div>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        color: 'var(--primary-color)',
                        borderRadius: '50px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '1.5rem'
                    }}>
                        AI-Powered Blood Analysis
                    </span>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#1a1a1a' }}>
                        Understand Your <br />
                        <span style={{ color: 'var(--accent-color)' }}>Blood Health</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px' }}>
                        Upload your Complete Blood Count (CBC) report and get a detailed, easy-to-understand analysis in seconds. No medical jargon.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            className="btn btn-primary"
                            style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                            onClick={() => navigate('/dashboard')}
                        >
                            Upload Report
                        </button>
                        <a href="/#features" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none', display: 'inline-block' }}>
                            View Sample
                        </a>
                    </div>
                    <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        <span>✓ 100% Private & Secure</span>
                        <span>✓ Instant Results</span>
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    {/* Abstract visual representation of a report or health app */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        padding: '2rem',
                        transform: 'rotate(-2deg)',
                        border: '1px solid #eee'
                    }}>
                        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', marginBottom: '0.5rem' }}></div>
                            <div style={{ width: '120px', height: '12px', background: '#eee', borderRadius: '4px' }}></div>
                        </div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} style={{ marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <div style={{ width: '80px', height: '10px', background: '#f0f0f0', borderRadius: '4px' }}></div>
                                    <div style={{ width: '30px', height: '10px', background: '#e0e0e0', borderRadius: '4px' }}></div>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: '#f8f9fa', borderRadius: '3px' }}>
                                    <div style={{ width: `${60 + i * 10}%`, height: '100%', background: i === 2 ? '#dc3545' : '#28a745', borderRadius: '3px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: '-20px',
                        right: '-20px',
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '12px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{ width: '12px', height: '12px', background: '#28a745', borderRadius: '50%' }}></div>
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Analysis Ready</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
