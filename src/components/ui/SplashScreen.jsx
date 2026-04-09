const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        // Entrance Choreography
        const tl = gsap.timeline({ onComplete });
        
        tl.fromTo('.splash-bg', 
            { opacity: 0, scale: 1.1 }, 
            { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
        )
        .fromTo('.splash-logo', 
            { y: 30, opacity: 0, filter: 'blur(10px)' }, 
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'back.out(1.7)' }, 
            "-=0.8"
        )
        .fromTo('.splash-tagline', 
            { y: 10, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8 }, 
            "-=0.5"
        )
        .fromTo('.progress-container', 
            { width: 0, opacity: 0 }, 
            { width: '200px', opacity: 1, duration: 0.8 }, 
            "-=0.6"
        );

        // Progress simulation
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        // Exit animation
        tl.to('.splash-screen-inner', { 
            scale: 1.05, 
            opacity: 0, 
            duration: 0.8, 
            delay: 0.8,
            ease: 'power3.inOut' 
        });

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="splash-screen" style={{
            position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
            background: '#051014'
        }}>
            <div className="splash-bg" style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at center, #0a242d 0%, #051014 100%)',
                opacity: 0
            }}></div>
            
            <div className="splash-screen-inner" style={{
                position: 'relative', width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
                <div className="splash-logo" style={{ marginBottom: '25px', opacity: 0 }}>
                    <img 
                        src="https://i.postimg.cc/W3MnzMzh/jjj.png" 
                        style={{ height: '90px', filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.4))' }} 
                        alt="Zhinovax"
                    />
                </div>

                <div className="splash-tagline" style={{ 
                    color: 'var(--gold-primary)', fontSize: '11px', fontWeight: '900', 
                    letterSpacing: '4px', marginBottom: '40px', opacity: 0 
                }}>
                    PREMIUM MARKETPLACE
                </div>

                <div className="progress-container" style={{ 
                    height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px',
                    position: 'relative', overflow: 'hidden', opacity: 0
                }}>
                    <div style={{ 
                        height: '100%', width: `${progress}%`, background: 'var(--gold-gradient)',
                        boxShadow: '0 0 15px var(--gold-primary)', transition: 'width 0.1s linear'
                    }}></div>
                </div>
                
                <div style={{ marginTop: '15px', fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }}>
                    {progress}%
                </div>
            </div>
        </div>
    );
};

window.SplashScreen = SplashScreen;
