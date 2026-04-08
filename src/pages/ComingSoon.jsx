const ComingSoon = ({ onBack, title }) => {
    React.useEffect(() => {
        gsap.fromTo('.coming-soon-screen', 
            { opacity: 0, scale: 0.9 }, 
            { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
    }, []);

    return (
        <div className="screen coming-soon-screen" style={{ 
            background: 'var(--bg-dark)', 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center'
        }}>
            {/* Top Back Button */}
            <button 
                onClick={onBack}
                style={{
                    position: 'absolute', top: '40px', right: '20px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)',
                    color: 'var(--gold-primary)', width: '45px', height: '45px', borderRadius: '15px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}
            >✕</button>

            <div className="glass" style={{ padding: '40px 30px', borderRadius: '30px', border: '1px solid var(--gold-primary)' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>⏳</div>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--gold-primary)', marginBottom: '10px' }}>بزودی</h1>
                <h2 style={{ fontSize: '18px', color: '#fff', marginBottom: '15px' }}>{title || 'این بخش در حال توسعه است'}</h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    تیم زینوواکس در حال آماده‌سازی این قابلیت جذاب برای شماست. در نسخه‌های بعدی همراه ما باشید.
                </p>
                
                <button 
                    onClick={onBack}
                    style={{
                        marginTop: '30px', padding: '12px 30px', borderRadius: '15px',
                        background: 'transparent', border: '1px solid var(--gold-primary)',
                        color: 'var(--gold-primary)', fontWeight: 'bold', cursor: 'pointer'
                    }}
                >
                    بازگشت به برنامه
                </button>
            </div>
        </div>
    );
};

window.ComingSoon = ComingSoon;
