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
            desc: 'یک ویدیوی خلاقانه از موتر یا ساعت لوکس خود تهیه کنید و ما را تگ کنید تا در قرعه‌کشی شرکت داده شوید.'
        },
        {
            platform: 'TikTok',
            icon: 'fa-brands fa-tiktok',
            color: '#ffffff',
            title: 'چالش ترند روز',
            prize: '۲۰,۰۰۰ افغانی',
            startDate: '2026-04-01',
            endDate: '2026-05-10',
            desc: 'با صدای اختصاصی Zhinovax یک ویدیو بسازید و برنده جایزه نقدی شوید. بهترین ویدیو در صفحه اصلی نمایش داده می‌شود.'
        }
    ];

    const [submitting, setSubmitting] = React.useState(null);
    const [submitted, setSubmitted] = React.useState([]);

    React.useEffect(() => {
        gsap.fromTo('.challenge-card', 
            { opacity: 0, y: 30, scale: 0.95 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
    }, []);

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

            {/* List */}
            <div style={{ padding: '0 25px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {activeChallenges.map((ch, i) => (
                    <div key={i} className="challenge-card glass" style={{
                        borderRadius: '30px', padding: '25px', border: '1px solid rgba(255,255,255,0.06)',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        {submitted.includes(i) && (
                            <div id={`success-${i}`} style={{
                                position: 'absolute', inset: 0, background: 'rgba(5, 16, 20, 0.9)',
                                zIndex: 10, display: 'flex', flexDirection: 'column', 
                                justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(12px)'
                            }}>
                                <div className="pulse-gold" style={{ 
                                    width: '60px', height: '60px', borderRadius: '50%', 
                                    background: 'var(--gold-gradient)', display: 'flex', justifyContent: 'center', 
                                    alignItems: 'center', fontSize: '28px', marginBottom: '15px'
                                }}>
                                    <i className="fa-solid fa-check" style={{ color: '#000' }}></i>
                                </div>
                                <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#fff' }}>درخواست شما ثبت شد</h3>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>در حال بررسی توسط ادمین...</p>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ 
                                    width: '45px', height: '45px', borderRadius: '14px', background: ch.color === '#ffffff' ? '#000' : ch.color,
                                    display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px', border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <i className={ch.icon} style={{ color: ch.color === '#ffffff' ? '#fff' : '#fff' }}></i>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#fff' }}>{ch.platform}</h3>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>پلتفرم هدف</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div className="pulse-gold" style={{ fontSize: '16px', fontWeight: '900', color: 'var(--gold-primary)' }}>{ch.prize}</div>
                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>ارزش جایزه</span>
                            </div>
                        </div>

                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>{ch.title}</h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '25px', lineHeight: '1.8' }}>{ch.desc}</p>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input type="text" placeholder="لینک ویدیو یا پست خود را اینجا قرار دهید..." style={{
                                flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '16px', padding: '15px', color: '#fff', fontSize: '13px', outline: 'none',
                                transition: '0.3s'
                            }} disabled={submitting === i} />
                            <button 
                                onClick={() => handleSubmit(i)}
                                disabled={submitting === i}
                                className="hover-lift"
                                style={{
                                    background: 'var(--gold-gradient)', color: '#000', border: 'none',
                                    padding: '0 25px', borderRadius: '16px', fontWeight: '900', fontSize: '13px',
                                    cursor: 'pointer'
                                }}
                            >
                                {submitting === i ? <i className="fa-solid fa-spinner fa-spin"></i> : 'ثبت'}
                            </button>
                        </div>
                    </div>
                ))}
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
