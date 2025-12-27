import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { History as HistoryIcon, Activity, Calendar, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const History = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedMetric, setSelectedMetric] = useState('Hb');

    useEffect(() => {
        if (user && user.email) {
            const userKey = `hemscan_history_${user.email}`;
            const saved = JSON.parse(localStorage.getItem(userKey) || '[]');
            setHistory(saved.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
        }
    }, [user]);

    const clearHistory = () => {
        if (window.confirm("Are you sure you want to clear all history? This cannot be undone.")) {
            if (user && user.email) {
                localStorage.removeItem(`hemscan_history_${user.email}`);
                setHistory([]);
            }
        }
    };

    const deleteItem = (id) => {
        if (window.confirm("Delete this report?")) {
            const updatedHistory = history.filter(item => item.id !== id);
            setHistory(updatedHistory);
            if (user && user.email) {
                localStorage.setItem(`hemscan_history_${user.email}`, JSON.stringify(updatedHistory));
            }
        }
    };

    const viewItem = (item) => {
        navigate('/dashboard', { state: { reportData: item } });
    };

    if (history.length === 0) {
        return (
            <div className="section" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <HistoryIcon size={64} color="#ccc" style={{ marginBottom: '1rem' }} />
                <h3>No History Found</h3>
                <p>Analyze your first report to see trends here.</p>
            </div>
        );
    }

    const chartData = history.map(h => ({
        date: h.date,
        Hb: parseFloat(h.data["Hemoglobin (Hb)"] || 0),
        WBC: parseFloat(h.data["Total WBC Count"] || 0),
        RBC: parseFloat(h.data["RBC Count"] || 0),
        Platelets: parseFloat(h.data["Platelet Count"] || 0) / 1000
    }));

    const metrics = {
        'Hb': { label: 'Hemoglobin', color: '#d32f2f', unit: 'g/dL' },
        'WBC': { label: 'White Blood Cells', color: '#1976d2', unit: '/µL' },
        'RBC': { label: 'Red Blood Cells', color: '#2e7d32', unit: 'M/µL' },
        'Platelets': { label: 'Platelets (x10³)', color: '#ed6c02', unit: '/µL' }
    };

    return (
        <div className="section">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                        <Activity color="var(--primary-color)" /> Health Trends
                    </h2>
                    <button
                        onClick={clearHistory}
                        className="btn"
                        style={{
                            backgroundColor: '#fee2e2',
                            color: '#b91c1c',
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        <Trash2 size={16} /> Clear History
                    </button>
                </div>

                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', marginBottom: '3rem' }}>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {Object.entries(metrics).map(([key, config]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedMetric(key)}
                                style={{
                                    padding: '0.6rem 1.2rem',
                                    borderRadius: '50px',
                                    border: `2px solid ${config.color}`,
                                    background: selectedMetric === key ? config.color : 'transparent',
                                    color: selectedMetric === key ? 'white' : config.color,
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s ease',
                                    boxShadow: selectedMetric === key ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                                }}
                            >
                                {config.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ height: '400px', width: '100%' }}>
                        <ResponsiveContainer>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: '#666' }}
                                    axisLine={{ stroke: '#eee' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    tick={{ fill: '#666' }}
                                    axisLine={{ stroke: '#eee' }}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Line
                                    type="monotone"
                                    dataKey={selectedMetric}
                                    name={metrics[selectedMetric].label}
                                    stroke={metrics[selectedMetric].color}
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: metrics[selectedMetric].color, strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 8 }}
                                    animationDuration={1500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Calendar /> Recent Scans
                </h3>
                <div className="table-container" style={{ background: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Hemoglobin</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>WBC Count</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Platelets</th>
                                <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...history].reverse().map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>{item.date}</td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.data["Hemoglobin (Hb)"] || '-'}</td>
                                    <td style={{ padding: '1rem' }}>{item.data["Total WBC Count"] || '-'}</td>
                                    <td style={{ padding: '1rem' }}>{item.data["Platelet Count"] || '-'}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            background: Object.keys(item.data).length > 0 ? '#e8f5e9' : '#fff3cd',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.85rem',
                                            color: Object.keys(item.data).length > 0 ? '#1b5e20' : '#856404'
                                        }}>
                                            {Object.keys(item.data).length > 0 ? 'Analyzed' : 'No Data'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                        <button
                                            onClick={() => viewItem(item)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: 'var(--primary-color)',
                                                padding: '4px'
                                            }}
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteItem(item.id)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: '#ef4444',
                                                padding: '4px'
                                            }}
                                            title="Delete Report"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default History;
