import React from 'react';
import { Users, Heart, Shield } from 'lucide-react';

const About = () => {
    return (
        <section id="about" style={{ padding: '6rem 0', backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>About HemScan</h2>
                    <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
                        Empowering individuals to understand their health data through accessible, instant analysis.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                            <Users size={40} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>Our Mission</h3>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            To bridge the gap between complex medical reports and patient understanding. We believe everyone deserves to clearly understand their health metrics without confusion.
                        </p>
                    </div>

                    <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                            <Heart size={40} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>Why We Built It</h3>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            Blood tests are routine but often unreadable to the average person. HemScan was created to instantly demystify CBC reports and provide actionable insights.
                        </p>
                    </div>

                    <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                        <div style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                            <Shield size={40} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>Privacy First</h3>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>
                            Your health data is personal. We designed HemScan to process data locally on your device wherever possible, ensuring your privacy is never compromised.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
