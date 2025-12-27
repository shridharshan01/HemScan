import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Tesseract from 'tesseract.js';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressStatus, setProgressStatus] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        if (location.state && location.state.reportData) {
            setResults(location.state.reportData);
        }
    }, [location]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResults(null);
            setError(null);
            setProgress(0);
            setProgressStatus('');
        }
    };

    const parseResults = (text) => {
        const lines = text.split('\n');
        const data = {};

        // Helper to find number in line
        const findNumber = (str) => {
            const match = str.match(/(\d+\.?\d*)/);
            return match ? match[1] : null;
        };

        // Keyword mapping
        const keywords = {
            "Hemoglobin (Hb)": ["hemoglobin", "haemoglobin", "hgb", "hb"],
            "Total WBC Count": ["white blood cell", "wbc", "total count", "leukocyte", "tlc"],
            "RBC Count": ["red blood cell", "rbc", "erythrocyte"],
            "Platelet Count": ["platelet", "plt"],
            "Hematocrit (PCV)": ["hematocrit", "hct", "pcv", "packed cell volume"],
            "MCV": ["mcv", "mean corpuscular volume"],
            "MCH": ["mch", "mean corpuscular hemoglobin"],
            "MCHC": ["mchc", "mean corpuscular hemoglobin concentration"],
            "RDW": ["rdw", "red cell distribution width"],
            "Neutrophils": ["neutrophils", "neutrophil"],
            "Lymphocytes": ["lymphocytes", "lymphocyte"],
            "Monocytes": ["monocytes", "monocyte"],
            "Eosinophils": ["eosinophils", "eosinophil"],
            "Basophils": ["basophils", "basophil"],
            "MPV": ["mpv", "mean platelet volume"],
            "PCT": ["pct", "plateletcrit"],
            "ESR": ["esr", "erythrocyte sedimentation rate"]
        };

        lines.forEach(line => {
            const lowerLine = line.toLowerCase();
            for (const [key, patterns] of Object.entries(keywords)) {
                if (patterns.some(p => lowerLine.includes(p))) {
                    // If we haven't found this key yet
                    if (!data[key]) {
                        const value = findNumber(line);
                        if (value) {
                            data[key] = value;
                        }
                    }
                }
            }
        });

        return data;
    };

    const handleUpload = async () => {
        if (!file) return;

        setAnalyzing(true);
        setError(null);
        setProgress(0);
        setProgressStatus('Initializing Tesseract...');

        try {
            const result = await Tesseract.recognize(
                file,
                'eng',
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            setProgress(Math.round(m.progress * 100));
                            setProgressStatus(`Scanning... ${Math.round(m.progress * 100)}% `);
                        } else {
                            setProgressStatus(m.status);
                        }
                    }
                }
            );

            const parsedData = parseResults(result.data.text);

            const newReport = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                timestamp: new Date().toISOString(),
                data: parsedData, // Corrected: parsedData is the direct data object
                raw_text: result.data.text // Corrected: raw_text comes from Tesseract result
            };

            setResults(newReport);

            if (user && user.email) {
                try {
                    const userKey = `hemscan_history_${user.email}`;
                    const existingHistory = JSON.parse(localStorage.getItem(userKey) || '[]');
                    const updatedHistory = [newReport, ...existingHistory].slice(0, 50); // Keep last 50
                    localStorage.setItem(userKey, JSON.stringify(updatedHistory));
                } catch (e) {
                    console.error("Failed to save history:", e);
                }
            }

        } catch (err) {
            console.error(err);
            setError("Failed to process image. Please try a clearer image.");
        } finally {
            setAnalyzing(false);
            setProgressStatus('');
        }
    };

    // Normal Ranges (Simplified - Adult) & Recommendations
    // Using "Union" ranges (min of female, max of male) for general safety without gender input
    const rules = {
        "Hemoglobin (Hb)": {
            min: 12.0, max: 17.5,
            low: { msg: 'Anemia Risk (Hb < 12.0)', rec: 'Eat iron-rich foods: Spinach, Red Meat, Lentils. Take Vitamin C.' },
            high: { msg: 'Polycythemia Risk (Hb > 17.5)', rec: 'Stay hydrated. Consult a hematologist.' }
        },
        "Total WBC Count": {
            min: 4000, max: 11000,
            low: { msg: 'Leukopenia (< 4,000)', rec: 'Weak immunity. Prevent infections. Eat protein-rich food.' },
            high: { msg: 'Leukocytosis (> 11,000)', rec: 'Possible bacterial infection or inflammation. Rest and hydrate.' }
        },
        "RBC Count": {
            min: 3.5, max: 6.1,
            low: { msg: 'Low RBC Count', rec: 'Check for anemia/vitamin deficiencies.' },
            high: { msg: 'High RBC Count', rec: 'Could be dehydration or lung issues.' }
        },
        "Hematocrit (PCV)": {
            min: 36, max: 53,
            low: { msg: 'Low Hematocrit', rec: 'Hydrate, iron supplements.' },
            high: { msg: 'High Hematocrit', rec: 'Dehydration risk.' }
        },
        "MCV": {
            min: 80, max: 100,
            low: { msg: 'Microcytic Anemia (Low MCV)', rec: 'Iron deficiency likely.' },
            high: { msg: 'Macrocytic Anemia (High MCV)', rec: 'B12/Folate deficiency likely.' }
        },
        "MCH": {
            min: 27, max: 34,
            low: { msg: 'Hypochromic (Low MCH)', rec: 'Often iron deficiency.' },
            high: { msg: 'Hyperchromic (High MCH)', rec: 'Check B12/Folate levels.' }
        },
        "MCHC": {
            min: 32, max: 36,
            low: { msg: 'Hypochromic (Low MCHC)', rec: 'Iron deficiency anemia.' }
        },
        "RDW": {
            min: 11.5, max: 14.5,
            high: { msg: 'High RDW (Anisocytosis)', rec: 'Mixed anemia types likely. Thorough checkup needed.' }
        },
        "Platelet Count": {
            min: 150000, max: 450000,
            low: { msg: 'Thrombocytopenia (< 150k)', rec: 'Bleeding risk. Avoid injuries. Papaya leaf extract.' },
            high: { msg: 'Thrombocytosis (> 450k)', rec: 'Consult doctor. Stay hydrated.' }
        },
        // Differential Count
        "Neutrophils": {
            min: 40, max: 75,
            high: { msg: 'Neutrophilia (High)', rec: 'Bacterial Infection likely. Antibiotics might be needed (prescribed only).' }
        },
        "Lymphocytes": {
            min: 16, max: 52,
            high: { msg: 'Lymphocytosis (High)', rec: 'Viral Infection likely. Boost immunity.' }
        },
        "Monocytes": {
            min: 0, max: 12,
            high: { msg: 'Monocytosis (High)', rec: 'Chronic infection/inflammation check required.' }
        },
        "Eosinophils": {
            min: 0, max: 5,
            high: { msg: 'Eosinophilia (High)', rec: 'Allergy or Parasitic Infection. Identify allergens.' }
        },
        "Basophils": {
            min: 0, max: 4,
            high: { msg: 'Basophilia (High)', rec: 'Rare condition. Consult hematologist.' }
        }
    };

    const analyzeHealth = (data) => {
        const insights = [];
        const recommendations = [];

        Object.entries(data).forEach(([key, valueStr]) => {
            const rule = rules[key];
            if (rule) {
                // Simple parsing to handle commas like 4,500
                const value = parseFloat(valueStr.replace(/,/g, ''));
                if (!isNaN(value)) {
                    if (rule.min !== undefined && value < rule.min) {
                        if (rule.low) {
                            insights.push({ type: 'warning', msg: `${key}: ${rule.low.msg} ` });
                            recommendations.push(rule.low.rec);
                        }
                    } else if (rule.max !== undefined && value > rule.max) {
                        if (rule.high) {
                            insights.push({ type: 'warning', msg: `${key}: ${rule.high.msg} ` });
                            recommendations.push(rule.high.rec);
                        }
                    }
                }
            }
        });

        if (insights.length === 0 && Object.keys(data).length > 0) {
            insights.push({ type: 'success', msg: 'All detected parameters are within normal ranges.' });
            recommendations.push('Maintain your healthy lifestyle!');
        }

        return { insights, recommendations: [...new Set(recommendations)] };
    };

    const analysis = results ? analyzeHealth(results.data) : { insights: [], recommendations: [] };

    const referenceRanges = {
        "Hemoglobin (Hb)": "M: 13.5-17.5, F: 12.0-16.0 g/dL",
        "Total WBC Count": "4,000 - 11,000 cells/µL",
        "RBC Count": "M: 4.3-6.1, F: 3.5-5.5 M/µL",
        "Hematocrit (PCV)": "M: 41-53%, F: 36-46%",
        "MCV": "80 - 100 fL",
        "MCH": "27 - 34 pg",
        "MCHC": "32 - 36 g/dL",
        "RDW": "11.5 - 14.5 %",
        "Platelet Count": "150,000 - 450,000 cells/µL",
        "Neutrophils": "40 - 75 %",
        "Lymphocytes": "16 - 52 %",
        "Monocytes": "0 - 12 %",
        "Eosinophils": "0 - 5 %",
        "Basophils": "0 - 4 %"
    };

    const getValueColor = (key, valueStr) => {
        const rule = rules[key];
        if (!rule) return 'var(--primary-color)';

        const value = parseFloat(valueStr.replace(/,/g, ''));
        if (isNaN(value)) return 'var(--primary-color)';

        if (rule.min !== undefined && value < rule.min) return '#dc3545'; // Red for Low
        if (rule.max !== undefined && value > rule.max) return '#dc3545'; // Red for High (Keeping consistent with abnormal = red)

        return 'var(--success-color, #28a745)'; // Green for Normal
    };

    const getStatusText = (key, valueStr) => {
        const rule = rules[key];
        if (!rule) return 'Normal';

        const value = parseFloat(valueStr.replace(/,/g, ''));
        if (isNaN(value)) return 'Normal';

        if (rule.min !== undefined && value < rule.min) return 'Low';
        if (rule.max !== undefined && value > rule.max) return 'High';

        return 'Normal';
    };

    return (
        <div className="section" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 80px - 300px)' }}>
            <div className="container">
                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Upload Report</h2>

                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
                    {/* Upload Area */}
                    <div style={{
                        border: '2px dashed #ccc',
                        borderRadius: '12px',
                        padding: '3rem 1rem',
                        textAlign: 'center',
                        marginBottom: '2rem',
                        cursor: 'pointer',
                        backgroundColor: file ? '#f0f8ff' : 'transparent',
                        borderColor: file ? 'var(--primary-color)' : '#ccc'
                    }}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <Upload size={48} color={file ? 'var(--primary-color)' : '#999'} />
                            {file ? (
                                <div>
                                    <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{file.name}</p>
                                    <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}>Click to change</p>
                                </div>
                            ) : (
                                <div>
                                    <p style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem' }}>Click or Drag to Upload Report</p>
                                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Supports JPG, PNG (Clear Images Best)</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                        disabled={!file || analyzing}
                        onClick={handleUpload}
                    >
                        {analyzing ? <Loader className="spin" size={20} /> : <FileText size={20} />}
                        {analyzing ? (progress > 0 ? `Processing... ${progress}% ` : 'Starting Engine...') : 'Analyze Report'}
                    </button>

                    {analyzing && (
                        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            {progressStatus}
                        </p>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fff5f5', borderRadius: '8px', borderLeft: '4px solid #dc3545', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <AlertCircle size={20} color="#dc3545" />
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#dc3545' }}>{error}</p>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {results && (
                    <div style={{ maxWidth: '900px', margin: '3rem auto 0 auto', animation: 'fadeIn 0.5s ease' }}>

                        {/* Health Analysis Block */}
                        <div style={{ marginBottom: '2rem', display: 'grid', gap: '2rem' }}>
                            {/* Diagnosis */}
                            <div style={{ padding: '1.5rem', borderRadius: '12px', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#0d47a1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <CheckCircle size={24} /> Health Analysis
                                </h3>
                                {analysis.insights.length > 0 ? (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {analysis.insights.map((d, i) => (
                                            <li key={i} style={{
                                                marginBottom: '0.5rem',
                                                padding: '0.75rem',
                                                backgroundColor: d.type === 'success' ? '#d4edda' : '#fff3cd',
                                                color: d.type === 'success' ? '#155724' : '#856404',
                                                borderRadius: '8px',
                                                borderLeft: `4px solid ${d.type === 'success' ? '#28a745' : '#ffc107'} `
                                            }}>
                                                {d.msg}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ color: '#0d47a1' }}>No anomalies detected yet or insufficient data.</p>
                                )}
                            </div>

                            {/* Recommendations */}
                            {analysis.recommendations.length > 0 && (
                                <div style={{ padding: '1.5rem', borderRadius: '12px', background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#1b5e20', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <AlertCircle size={24} /> Recommendations
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {analysis.recommendations.map((rec, i) => (
                                            <li key={i} style={{
                                                marginBottom: '0.5rem',
                                                padding: '0.75rem',
                                                backgroundColor: 'rgba(255,255,255,0.6)',
                                                color: '#1b5e20',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'start',
                                                gap: '8px'
                                            }}>
                                                <span>•</span> {rec}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Detailed Report</h3>

                        <div className="table-container" style={{ overflowX: 'auto', background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                <thead>
                                    <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: '#495057', width: '35%' }}>Parameter</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: '#495057', width: '20%' }}>Observed Value</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: '#495057', width: '25%' }}>Reference Range</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', color: '#495057', width: '20%' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(results.data).map(([key, value], index) => {
                                        const status = getStatusText(key, value);
                                        const statusColor = getValueColor(key, value);
                                        const badgeBg = status === 'Normal' ? '#d4edda' : '#f8d7da';

                                        return (
                                            <tr key={key} style={{ borderBottom: '1px solid #f1f3f5', backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa' }}>
                                                <td style={{ padding: '1rem', fontWeight: '500', color: '#343a40' }}>{key}</td>
                                                <td style={{ padding: '1rem', fontWeight: '700', color: '#343a40', fontSize: '1.1rem' }}>
                                                    {value}
                                                </td>
                                                <td style={{ padding: '1rem', color: '#6c757d', fontSize: '0.9rem' }}>
                                                    {referenceRanges[key] || 'N/A'}
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        padding: '0.35rem 0.85rem',
                                                        borderRadius: '50px',
                                                        fontSize: '0.85rem',
                                                        fontWeight: '600',
                                                        backgroundColor: badgeBg,
                                                        color: statusColor
                                                    }}>
                                                        {status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {Object.keys(results.data).length === 0 && (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                                No specific parameters detected. Please ensure the image is clear and contains a standard CBC report.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem' }}>Extracted Text Debug</h4>
                            <div style={{ background: '#eee', padding: '1rem', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto', fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                {results.raw_text}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
@keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
}
        .spin {
    animation: spin 1s linear infinite;
}
@keyframes spin {
    100 % { transform: rotate(360deg); }
}
`}</style>
        </div>
    );
};

export default Dashboard;
