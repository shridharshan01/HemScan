import React from 'react';

const TermsOfService = () => {
    return (
        <div className="section" style={{ minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Terms of Service</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h3>1. Acceptance of Terms</h3>
                    <p>
                        By accessing and using HemScan, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                </div>

                <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: '#fff3cd', borderRadius: '8px', borderLeft: '4px solid #ffc107' }}>
                    <h3 style={{ color: '#856404' }}>2. Medical Disclaimer (Critical)</h3>
                    <p style={{ color: '#856404' }}>
                        HemScan is an informational tool only. **IT IS NOT A MEDICAL DEVICE AND DOES NOT PROVIDE MEDICAL ADVICE.**
                        <br /><br />
                        The analysis provided is based on general algorithms and OCR technology which may contain errors. You should NEVER disregard professional medical advice or delay in seeking it because of something you have read on this website. Always consult with a qualified healthcare provider regarding your medical condition/test results.
                    </p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h3>3. Accuracy of Information</h3>
                    <p>
                        While we strive for accuracy, OCR technology can misinterpret text. Users are responsible for verifying the extracted data against their original physical reports. We do not guarantee the accuracy, completeness, or usefulness of any information on the site.
                    </p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h3>4. Limitation of Liability</h3>
                    <p>
                        In no event shall HemScan be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HemScan's website.
                    </p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h3>5. Governing Law</h3>
                    <p>
                        Any claim relating to HemScan's website shall be governed by the laws of your jurisdiction without regard to its conflict of law provisions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
