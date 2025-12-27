import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="section" style={{ minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>Last updated: {new Date().toLocaleDateString()}</p>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h3>1. Information We Collect</h3>
                    <p>
                        HemScan is designed with privacy as a priority. We do not store your blood test images or extracted data on our servers. All Optical Character Recognition (OCR) and analysis happen locally in your browser or are processed transiently without permanent storage.
                    </p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h3>2. Local Storage</h3>
                    <p>
                        For your convenience, report history is stored locally on your device's browser (LocalStorage). This data remains on your device and is not synchronized with any external database by default. You can clear this data at any time using the "Clear History" function.
                    </p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h3>3. Third-Party Services</h3>
                    <p>
                        We may use standard web analytics to understand website usage trends, but this does not include personal medical data from your reports.
                    </p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h3>4. Data Security</h3>
                    <p>
                        Since your data primarily stays on your device, it is as secure as your personal device. We recommend using secure devices when processing sensitive health information.
                    </p>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                    <h3>5. Changes to This Policy</h3>
                    <p>
                        We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
