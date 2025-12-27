import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "Is HemScan a replacement for a doctor?",
            answer: "No. HemScan is an educational tool designed to help you understand your blood report. It does not provide medical diagnosis or treatment. Always consult a qualified healthcare professional for medical advice."
        },
        {
            question: "How accurate is the analysis?",
            answer: "We use advanced OCR technology to read your report and standard medical reference ranges to analyze it. However, reference ranges can vary by lab and location. Always treat these results as preliminary insights."
        },
        {
            question: "Is my data safe?",
            answer: "Yes. HemScan processes your data locally on your device or stores it securely in your browser's local storage. We do not upload your personal health reports to any external cloud servers."
        },
        {
            question: "What kind of reports can I upload?",
            answer: "Currently, HemScan is optimized for Complete Blood Count (CBC) reports. We support clear images (JPG, PNG) of printed reports."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>Frequently Asked Questions</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Got questions? We've got answers.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, index) => (
                        <div key={index} style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow-sm)',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease'
                        }}>
                            <button
                                onClick={() => toggleFAQ(index)}
                                style={{
                                    width: '100%',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.1rem',
                                    fontWeight: '500',
                                    color: '#1a1a1a',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                            >
                                {faq.question}
                                {activeIndex === index ? <Minus size={20} color="var(--primary-color)" /> : <Plus size={20} color="#666" />}
                            </button>
                            <div style={{
                                maxHeight: activeIndex === index ? '200px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.3s ease-out'
                            }}>
                                <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
