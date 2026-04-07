const SplashScreen = ({ onComplete }) => {
    React.useEffect(() => {
        // Fast fade-out after logo display
        gsap.to('.splash-logo', { scale: 1.2, duration: 1, ease: 'power2.out' });
        
        const timer = setTimeout(() => {
            gsap.to('.splash-screen', { 
                opacity: 0, 
                duration: 0.5, 
                onComplete: onComplete 
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="splash-screen" style={{
            position: 'fixed', inset: 0, background: '#081215', zIndex: 1000,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
            <img 
                src="https://www.directfiles.link/YGDVHGGRG" 
                className="splash-logo"
                style={{ width: '120px', marginBottom: '20px' }} 
                alt="Logo"
            />
            <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '20px', letterSpacing: '2px' }}>
                ZHINOVAX
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '10px' }}>
                Elysian Technical Excellence
            </p>
        </div>
    );
};

window.SplashScreen = SplashScreen;
