const SplashScreen = ({ onComplete }) => {
    const [progress, setProgress] = React.useState(0);
    const doneRef = React.useRef(false);

    const finish = React.useCallback(() => {
        if (!doneRef.current) {
            doneRef.current = true;
            onComplete();
        }
    }, [onComplete]);

    React.useEffect(() => {
        // Absolute safety exit after 4 seconds no matter what
        const safetyTimer = setTimeout(finish, 4000);

        // Entrance animation
        gsap.fromTo('.splash-logo', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
        gsap.fromTo('.splash-tagline', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.8 });
        gsap.fromTo('.progress-container', { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.0 });

        // Progress bar: goes from 0 to 100 in ~1.5s
        let prog = 0;
        const interval = setInterval(() => {
            prog += 4;
            if (prog >= 100) {
                prog = 100;
                clearInterval(interval);
                // Exit animation then call finish
                gsap.to('.splash-screen-inner', {
                    scale: 1.04,
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.3,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        clearTimeout(safetyTimer);
                        finish();
                    }
                });
            }
            setProgress(prog);
        }, 40);

        return () => {
            clearInterval(interval);
            clearTimeout(safetyTimer);
        };
    }, [finish]);

    return (
        <div className="splash-screen" style={{
            position: 'fixed', inset: 0, zIndex: 9999, overflow: 'hidden',
            background: 'radial-gradient(ellipse at center, #082030 0%, #020608 100%)'
        }}>
            <div className="splash-screen-inner" style={{
                position: 'relative', width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
                <div className="splash-logo" style={{ marginBottom: '20px', opacity: 0 }}>
                    <img 
                        src="https://i.postimg.cc/W3MnzMzh/jjj.png" 
                        style={{ height: '90px', filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.5))' }} 
                        alt="Zhinovax"
                    />
                </div>

                <div className="splash-tagline" style={{ 
                    color: 'var(--gold-primary)', fontSize: '11px', fontWeight: '900', 
                    letterSpacing: '5px', marginBottom: '50px', opacity: 0,
                    textTransform: 'uppercase'
                }}>
                    Premium Marketplace
                </div>

                <div className="progress-container" style={{ 
                    width: '200px', height: '2px', background: 'rgba(255,255,255,0.06)', 
                    borderRadius: '4px', overflow: 'hidden', opacity: 0
                }}>
                    <div style={{ 
                        height: '100%', width: `${progress}%`, background: 'var(--gold-gradient)',
                        boxShadow: '0 0 10px var(--gold-primary)', transition: 'width 0.05s linear'
                    }}></div>
                </div>
                
                <div style={{ marginTop: '12px', fontSize: '10px', color: 'rgba(255,255,255,0.18)', fontWeight: 'bold' }}>
                    {progress}%
                </div>
            </div>
        </div>
    );
};

window.SplashScreen = SplashScreen;
