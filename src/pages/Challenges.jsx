const Challenges = ({ onBack }) => {
    return (
        <div className="screen challenges-screen" style={{
            paddingBottom: '120px', width: '100%',
            minHeight: '100vh', background: 'var(--bg-dark)', overflowY: 'auto'
        }}>
            {/* Header */}
            <div style={{
                padding: '40px 25px 25px', display: 'flex', alignItems: 'center', gap: '20px'
            }}>
                <div onClick={onBack} className="hover-lift" style={{ 
                    width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(212,175,55,0.1)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--gold-primary)', cursor: 'pointer'
                }}>
                    <i className="fa-solid fa-chevron-right" style={{ fontSize: '18px' }}></i>
                </div>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: 0 }}>چالش‌ها</h1>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>جوایز نقدی و فرصت‌های ویژه</p>
                </div>
            </div>

            {/* Coming Soon Content */}
            <div style={{ 
                flex: 1, display: 'flex', flexDirection: 'column', 
                justifyContent: 'center', alignItems: 'center', padding: '60px 40px',
                textAlign: 'center'
            }}>
                <div className="pulse-gold" style={{ 
                    width: '120px', height: '120px', borderRadius: '40px', 
                    background: 'rgba(212,175,55,0.05)', border: '1px solid var(--border-glass)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    fontSize: '50px', color: 'var(--gold-primary)', marginBottom: '30px'
                }}>
                    <i className="fa-solid fa-trophy"></i>
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', marginBottom: '15px' }}>بزودی فعال می‌شود</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '280px' }}>
                    چالش‌های هیجان‌انگیز زینوواکس با جوایز نقدی نفیس در راه است. گوش به زنگ باشید!
                </p>
                
                <div style={{ marginTop: '40px', fontSize: '11px', color: 'var(--gold-primary)', letterSpacing: '3px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Coming Soon....
                </div>
            </div>

            {/* Hint */}
            <div style={{ padding: '30px 25px', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', lineHeight: '1.8' }}>
                    نتایج هر چالش در روز پایانی ماه میلادی اعلام می‌گردد.<br/>
                    برای اطلاعات بیشتر با پشتیبانی در تماس شوید.
                </p>
            </div>
        </div>
    );
};

window.Challenges = Challenges;
