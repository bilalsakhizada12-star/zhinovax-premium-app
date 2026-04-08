const SplashScreen = ({ onComplete }) => {
    React.useEffect(() => {
        // Dramatic floating entrance with elasticity for the logo
        gsap.fromTo('.splash-logo-container', 
            { scale: 0.5, opacity: 0, y: 30 }, 
            { scale: 1.1, opacity: 1, y: 0, duration: 1.8, ease: 'elastic.out(1, 0.5)' }
        );
        
        // Continuous subtle floating pulse
        gsap.to('.splash-logo-container', { 
            y: -15, 
            duration: 2, 
            repeat: -1, 
            yoyo: true, 
            ease: 'sine.inOut',
            delay: 1.8
        });
        
        const timer = setTimeout(() => {
            gsap.to('.splash-screen', { 
                opacity: 0, 
                duration: 0.8, 
                ease: 'power2.inOut',
                onComplete: onComplete 
            });
        }, 3500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="splash-screen" style={{
            position: 'fixed', inset: 0, 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            background: 'radial-gradient(circle at center, #0a1f26 0%, #051014 100%)',
            zIndex: 9999
        }}>
            <div className="splash-logo-container" style={{ textAlign: 'center' }}>
                <img 
                    src="https://www.directfiles.link/YGDVHGGRG" 
                    style={{ 
                        width: '240px', 
                        filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))' 
                    }} 
                    alt="Zhinovax Logo"
                />
            </div>
        </div>
    );
};

window.SplashScreen = SplashScreen;
