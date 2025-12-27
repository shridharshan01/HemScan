import React from 'react';

const SampleReport = () => {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <section id="features" className="section" style={{ backgroundColor: '#f0f4f8' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                    <div style={{ order: 2 }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#1a1a1a' }}>
                            Clear, Actionable <br />
                            <span style={{ color: 'var(--primary-color)' }}>Insights</span>
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            No more confusing medical terms. We break down each metric (Hemoglobin, WBC, Platelets) into simple language.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                'Visual ranges for every metric',
                                'Dietary suggestions for improvement',
                                'Doctor-verified explanations',
                                'Trend tracking over time'
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', color: '#1a1a1a' }}>
                                    <span style={{ color: 'var(--success-color, #28a745)', fontWeight: 'bold' }}>✓</span> {item}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setShowModal(true)} className="btn btn-primary">See a Full Example</button>
                    </div>

                    <div style={{ order: 1, backgroundColor: 'white', borderRadius: '20px', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <div>
                                <h4 style={{ marginBottom: '0.25rem' }}>Hemoglobin</h4>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Oxygen-carrying protein</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc3545' }}>11.2</span>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block' }}>g/dL</span>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <span>Low</span>
                                <span>Normal (13.5 - 17.5)</span>
                                <span>High</span>
                            </div>
                            <div style={{ height: '8px', background: 'linear-gradient(to right, #dc3545 0%, #dc3545 30%, #28a745 35%, #28a745 65%, #dc3545 70%, #dc3545 100%)', borderRadius: '4px', position: 'relative' }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '20%',
                                    top: '-4px',
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: 'white',
                                    border: '3px solid #dc3545',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}></div>
                            </div>
                            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff5f5', borderRadius: '8px', borderLeft: '4px solid #dc3545' }}>
                                <p style={{ margin: 0, fontSize: '0.95rem', color: '#800' }}>
                                    <strong>Attention Needed:</strong> Your hemoglobin levels are slightly low (Anemia). Consider iron-rich foods like spinach, red meat, and beans.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Report Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2000,
                    padding: '20px'
                }} onClick={() => setShowModal(false)}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '2rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        position: 'relative'
                    }} onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        >
                            &times;
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                            <h3 style={{ margin: 0, color: '#1a1a1a' }}>Sample Complete Blood Count Analysis</h3>
                            <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>John Doe • 32 Male • 12 Jan 2024</p>
                        </div>

                        <div style={{ display: 'grid', gap: '2rem' }}>
                            {/* Warning Section */}
                            <div style={{ padding: '1.5rem', borderRadius: '12px', background: '#fff3cd', borderLeft: '4px solid #ffc107' }}>
                                <h4 style={{ margin: '0 0 0.5rem', color: '#856404', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    ⚠️ Action Required
                                </h4>
                                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#856404' }}>
                                    <li><strong>Hemoglobin (11.2 g/dL)</strong> is low. Eat iron-rich foods.</li>
                                    <li><strong>Neutrophils (80%)</strong> are elevated. Possible minor infection.</li>
                                </ul>
                            </div>

                            {/* Data Table */}
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#f8f9fa' }}>
                                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid #eee' }}>Parameter</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid #eee' }}>Value</th>
                                        <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid #eee' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Hemoglobin', val: '11.2 g/dL', status: 'Low', color: '#dc3545' },
                                        { name: 'WBC Count', val: '7,500 /µL', status: 'Normal', color: '#28a745' },
                                        { name: 'RBC Count', val: '4.8 M/µL', status: 'Normal', color: '#28a745' },
                                        { name: 'Platelets', val: '250,000 /µL', status: 'Normal', color: '#28a745' },
                                        { name: 'Neutrophils', val: '80 %', status: 'High', color: '#dc3545' },
                                        { name: 'Lymphocytes', val: '15 %', status: 'Low', color: '#dc3545' },
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #f1f3f5' }}>
                                            <td style={{ padding: '1rem', color: '#333', fontWeight: '500' }}>{row.name}</td>
                                            <td style={{ padding: '1rem', color: '#333' }}>{row.val}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '50px',
                                                    fontSize: '0.85rem',
                                                    backgroundColor: row.status === 'Normal' ? '#d4edda' : '#f8d7da',
                                                    color: row.color,
                                                    fontWeight: '600'
                                                }}>
                                                    {row.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    * This is a sample report generated by HemScan AI.
                                </p>
                                <button
                                    className="btn btn-primary"
                                    style={{ marginTop: '1rem' }}
                                    onClick={() => {
                                        setShowModal(false);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    Upload Your Own Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SampleReport;
