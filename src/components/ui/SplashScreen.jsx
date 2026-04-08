const SplashScreen = ({ onComplete }) => {
    React.useEffect(() => {
        // Fix: Only one clean entrance animation, no repeat or pulse
        gsap.fromTo('.splash-logo-container', 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }
        );
        
        // Shorten the wait time so it doesn't feel like it's "coming again"
        const timer = setTimeout(() => {
            gsap.to('.splash-screen', { 
                opacity: 0, 
                duration: 0.5, 
                ease: 'power2.inOut',
                onComplete: onComplete 
            });
        }, 2200); // Faster transition to the app

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
                    src="https://i.postimg.cc/W3MnzMzh/jjj.png" 
                    style={{ 
                        height: '110px', 
                        width: 'auto',
                        filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.3))' 
                    }} 
                    alt="Zhinovax Logo"
                />
            </div>
        </div>
    );
};

window.SplashScreen = SplashScreen;
