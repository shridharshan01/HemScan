import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
    return (
        <section id="pricing" className="section" style={{ backgroundColor: 'white' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>Simple, Transparent Pricing</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No hidden fees. No credit card required.</p>
                </div>

                <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{
                        padding: '2.5rem',
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                        color: 'white',
                        boxShadow: '0 20px 40px rgba(0, 50, 150, 0.3)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '100px',
                            height: '100px',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '50%'
                        }}></div>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '500' }}>Personal</h3>
                        <div style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Free</div>
                        <p style={{ opacity: 0.9, marginBottom: '2rem' }}>Forever free for individuals.</p>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', textAlign: 'left' }}>
                            {[
                                'Unlimited Reports',
                                'Instant Analysis',
                                'History & Trends',
                                'Secure Local Storage',
                                'Health Recommendations'
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', fontSize: '1.05rem' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '50%', padding: '2px' }}>
                                        <Check size={16} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button className="btn" style={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: '#0056b3',
                            border: 'none',
                            padding: '1rem',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }} onClick={() => document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })}>
                            Get Started Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
