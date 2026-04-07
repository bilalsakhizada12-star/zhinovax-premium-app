const SplashScreen = ({ onComplete }) => {
    React.useEffect(() => {
        // Step 1: Logo drops in
        gsap.fromTo('.splash-logo',
            { opacity: 0, y: -40, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'back.out(1.7)' }
        );

        // Step 2: Tagline fades in after logo
        gsap.fromTo('.splash-tagline',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power2.out' }
        );

        // Step 3: Gold bar sweeps in
        gsap.fromTo('.splash-bar',
            { width: 0, opacity: 0 },
            { width: '120px', opacity: 1, duration: 1.2, delay: 1.2, ease: 'power3.out' }
        );

        // Auto exit after 3.2s
        const timer = setTimeout(() => {
            gsap.to('.splash-screen', {
                opacity: 0,
                duration: 0.7,
                ease: 'power2.in',
                onComplete: onComplete
            });
        }, 3200);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="splash-screen" style={{
            position: 'fixed', inset: 0, display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            background: 'radial-gradient(ellipse at center, #0a1f26 0%, #051014 70%)',
            zIndex: 9999
        }}>
            {/* Decorative rings */}
            <div style={{
                position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
                border: '1px solid rgba(212,175,55,0.08)', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)'
            }} />
            <div style={{
                position: 'absolute', width: '220px', height: '220px', borderRadius: '50%',
                border: '1px solid rgba(212,175,55,0.12)', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)'
            }} />

            {/* SVG Logo */}
            <div className="splash-logo" style={{ textAlign: 'center', opacity: 0 }}>
                <svg viewBox="0 0 220 65" style={{ width: '200px', height: 'auto', marginBottom: '18px' }}>
                    <defs>
                        <linearGradient id="g1-splash" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#D4AF37" />
                            <stop offset="50%" stopColor="#F9D976" />
                            <stop offset="100%" stopColor="#D4AF37" />
                        </linearGradient>
                    </defs>
                    <text x="50%" y="48" textAnchor="middle" fill="url(#g1-splash)" fontSize="34" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="3">ZHINOVAX</text>
                </svg>

                <div className="splash-tagline" style={{
                    color: 'rgba(212,175,55,0.7)', letterSpacing: '4px',
                    fontSize: '9px', fontWeight: '700',
                    textTransform: 'uppercase', opacity: 0
                }}>
                    Elysian Technical Excellence
                </div>

                {/* Animated gold bar */}
                <div className="splash-bar" style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #D4AF37, #F9D976, #D4AF37, transparent)',
                    margin: '22px auto 0',
                    width: 0,
                    opacity: 0,
                    borderRadius: '2px'
                }} />
            </div>
        </div>
    );
};

window.SplashScreen = SplashScreen;
