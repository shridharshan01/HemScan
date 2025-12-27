import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: 'Upload Report',
            description: 'Take a photo or upload a PDF of your CBC blood report.',
            icon: '📄'
        },
        {
            id: 2,
            title: 'AI Analysis',
            description: 'Our advanced AI scans and interprets the values instantly.',
            icon: '🧠'
        },
        {
            id: 3,
            title: 'Get Insights',
            description: 'Receive a simplified summary of what your numbers mean.',
            icon: '📊'
        }
    ];

    return (
        <section id="how-it-works" className="section" style={{ backgroundColor: 'var(--white)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>How HemScan Works</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Three simple steps to understand your health.</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {steps.map((step) => (
                        <div key={step.id} style={{
                            padding: '2rem',
                            borderRadius: '16px',
                            backgroundColor: 'var(--background-light)',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease',
                            border: '1px solid transparent'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.borderColor = 'rgba(0,123,255,0.2)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'transparent';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: '1.5rem',
                                background: 'white',
                                width: '80px',
                                height: '80px',
                                lineHeight: '80px',
                                borderRadius: '50%',
                                margin: '0 auto 1.5rem auto',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {step.icon}
                            </div>
                            <h3 style={{ marginBottom: '1rem', color: '#1a1a1a' }}>{step.title}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
