import React from 'react';
import { Activity, LogOut, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const location = useLocation();

    const handleScroll = (e, id) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const handleAction = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 1000 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                    <Activity color="var(--primary-color)" size={32} />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>HemScan</span>
                </Link>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <a href="#features" onClick={(e) => handleScroll(e, 'features')} style={{ textDecoration: 'none', color: '#666', fontWeight: '500', cursor: 'pointer' }}>Features</a>
                    <a href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')} style={{ textDecoration: 'none', color: '#666', fontWeight: '500', cursor: 'pointer' }}>How it Works</a>
                    <a href="#pricing" onClick={(e) => handleScroll(e, 'pricing')} style={{ textDecoration: 'none', color: '#666', fontWeight: '500', cursor: 'pointer' }}>Pricing</a>
                    <a href="#about" onClick={(e) => handleScroll(e, 'about')} style={{ textDecoration: 'none', color: '#666', fontWeight: '500', cursor: 'pointer' }}>About</a>

                    {user ? (
                        <>
                            <a href="/history" onClick={(e) => { e.preventDefault(); navigate('/history'); }} style={{ textDecoration: 'none', color: '#666', fontWeight: '500' }}>History</a>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', fontWeight: '600' }}>
                                <User size={18} /> {user.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="btn"
                                style={{ background: '#eee', color: '#333', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Link to="/login" style={{ textDecoration: 'none', color: '#666', fontWeight: '500', padding: '0.5rem 1rem' }}>Login</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign Up</Link>
                        </div>
                    )}

                    {user && (
                        <button onClick={handleAction} className="btn btn-primary">
                            Analyze Report
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
