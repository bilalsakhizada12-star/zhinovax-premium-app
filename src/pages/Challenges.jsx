const Challenges = ({ onBack }) => {
    const activeChallenges = [
        {
            platform: 'Instagram',
            icon: 'fa-brands fa-instagram',
            color: '#e1306c',
            title: 'چالش ویدیوی خلاقانه',
            prize: '۳۵,۰۰۰ افغانی',
            startDate: '2026-03-28',
            endDate: '2026-04-22',
            desc: 'یک ویدیوی خلاقانه از موتر یا ساعت لوکس خود تهیه کنید و ما را تگ کنید.'
        },
        {
            platform: 'TikTok',
            icon: 'fa-brands fa-tiktok',
            color: '#000000',
            title: 'چالش ترند روز',
            prize: '۲۰,۰۰۰ افغانی',
            startDate: '2026-04-01',
            endDate: '2026-05-10',
            desc: 'با صدای اختصاصی Zhinovax یک ویدیو بسازید و برنده جایزه نقدی شوید.'
        }
    ];

    const [submitting, setSubmitting] = React.useState(null);
    const [submitted, setSubmitted] = React.useState([]);

    const handleSubmit = (index) => {
        setSubmitting(index);
        setTimeout(() => {
            setSubmitting(null);
            setSubmitted([...submitted, index]);
            gsap.fromTo(`#success-${index}`, 
                { scale: 0, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
            );
        }, 1500);
    };

    return (
        <div className="screen challenges-screen" style={{
            paddingBottom: '100px', width: '100%', maxWidth: '420px', margin: '0 auto',
            minHeight: '100vh', background: 'var(--bg-dark)'
        }}>
            {/* Header */}
            <div style={{
                padding: '40px 20px 20px', display: 'flex', alignItems: 'center', gap: '15px'
            }}>
                <i className="fa-solid fa-chevron-right" 
                   onClick={onBack}
                   style={{ fontSize: '20px', color: 'var(--gold-primary)', cursor: 'pointer' }}></i>
                <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>چالش‌ها</h1>
            </div>

            {/* List */}
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeChallenges.map((ch, i) => (
                    <div key={i} className="gsap-reveal" style={{
                        background: 'var(--card-glass)', borderRadius: '24px', 
                        padding: '20px', border: '1px solid var(--border-glass)',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        {submitted.includes(i) && (
                            <div id={`success-${i}`} style={{
                                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)',
                                zIndex: 10, display: 'flex', flexDirection: 'column', 
                                justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)'
                            }}>
                                <div style={{ 
                                    width: '50px', height: '50px', borderRadius: '50%', 
                                    background: '#4caf50', display: 'flex', justifyContent: 'center', 
                                    alignItems: 'center', fontSize: '24px', marginBottom: '10px'
                                }}>
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>ارسال شد</h3>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ 
                                    width: '36px', height: '36px', borderRadius: '10px', background: ch.color,
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px'
                                }}>
                                    <i className={ch.icon}></i>
                                </div>
                                <h3 style={{ fontSize: '15px', fontWeight: 'bold' }}>{ch.platform}</h3>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--gold-primary)' }}>{ch.prize}</div>
                        </div>

                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '15px' }}>{ch.desc}</p>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" placeholder="لینک ویدیو..." style={{
                                flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)',
                                borderRadius: '12px', padding: '10px', color: '#fff', fontSize: '12px', outline: 'none'
                            }} disabled={submitting === i} />
                            <button 
                                onClick={() => handleSubmit(i)}
                                disabled={submitting === i}
                                style={{
                                    background: 'var(--gold-primary)', color: '#000', border: 'none',
                                    padding: '0 15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '12px'
                                }}
                            >
                                {submitting === i ? '...' : 'ارسال'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

window.Challenges = Challenges;
