const SplashScreen = ({ onComplete }) => {
    React.useEffect(() => {
        // Entrance animation
        gsap.fromTo('.splash-content', 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.7)' }
        );

        // Auto-complete timer
        const timer = setTimeout(() => {
            gsap.to('.splash-screen', { 
                opacity: 0, 
                duration: 0.8, 
                onComplete: onComplete 
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    const zhinovaxLogo = (
        <svg viewBox="0 0 200 60" style={{ width: '180px', height: 'auto' }}>
            <text x="50%" y="45" textAnchor="middle" fill="#D4AF37" fontSize="28" fontWeight="bold" fontFamily="Arial, sans-serif">ZHINOVAX</text>
            <rect x="40" y="50" width="120" height="2" fill="url(#goldGradient)" />
            <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#F9D976', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
        </svg>
    );

    return (
        <div className="splash-screen" style={{
            position: 'fixed', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',
            background: 'radial-gradient(circle at center, #0a1f26 0%, #051014 100%)', zIndex: 9999, transition: 'opacity 0.8s ease'
        }}>
            <div className="splash-content" style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '20px' }}>{zhinovaxLogo}</div>
                <div style={{ color: 'var(--gold-primary)', letterSpacing: '3px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', opacity: 0.8 }}>
                    Elysian Technical Excellence
                </div>
                <div style={{ marginTop: '40px', width: '40px', height: '2px', background: 'var(--gold-primary)', margin: '0 auto', animation: 'widthScale 2s infinite ease-in-out' }}></div>
            </div>
            <style>{`
                @keyframes widthScale {
                    0% { width: 0; opacity: 0; }
                    50% { width: 100px; opacity: 1; }
                    100% { width: 0; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

window.SplashScreen = SplashScreen;
