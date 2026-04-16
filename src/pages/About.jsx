const About = ({ onBack }) => {
    React.useEffect(() => {
        gsap.fromTo('.about-screen', 
            { opacity: 0, x: 50 }, 
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
        );
    }, []);

    return (
        <div className="screen about-screen" style={{ 
            background: 'var(--bg-dark)', 
            minHeight: '100vh', 
            paddingBottom: '40px',
            overflowY: 'auto'
        }}>
            {/* Header */}
            <div style={{ 
                padding: '40px 20px 20px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                background: 'rgba(5, 16, 20, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 10
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: 0 }}>درباره زینوواکس</h1>
                <button 
                    onClick={onBack}
                    style={{
                        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)',
                        color: 'var(--gold-primary)', width: '45px', height: '45px', borderRadius: '15px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        fontSize: '20px'
                    }}
                >✕</button>
            </div>

            <div style={{ padding: '0 20px' }}>
                {/* Logo Section */}
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <img src="https://i.postimg.cc/W3MnzMzh/jjj.png" alt="Zhinovax" style={{ height: '80px', marginBottom: '15px' }} />
                    <p style={{ color: 'var(--gold-primary)', fontWeight: 'bold', letterSpacing: '2px' }}>EXCELLENCE IN INNOVATION</p>
                </div>

                {/* Main Content */}
                <div className="glass" style={{ padding: '25px', marginBottom: '20px' }}>
                    <h2 style={{ color: 'var(--gold-primary)', fontSize: '18px', marginBottom: '15px' }}>ما کی هستیم؟</h2>
                    <p style={{ color: '#fff', lineHeight: '1.8', fontSize: '14px', textAlign: 'justify' }}>
                        زینوواکس (Zhinovax) یک شرکت پیشرو در ارائه خدمات تکنولوژی و مشاوره دیجیتال است که در قلب کابل، افغانستان فعالیت می‌کند. 
                        ما با تمرکز بر هوش مصنوعی (AI) و راهکارهای نوین، به کسب‌وکارها کمک می‌کنیم تا در دنیای دیجیتال به شکلی متمایز رشد کنند.
                    </p>
                </div>

                <div className="glass" style={{ padding: '25px', marginBottom: '20px' }}>
                    <h2 style={{ color: 'var(--gold-primary)', fontSize: '18px', marginBottom: '15px' }}>خدمات ممتاز</h2>
                    <ul style={{ color: '#fff', padding: '0 15px', margin: 0, fontSize: '14px', lineHeight: '2' }}>
                        <li>تجارت و معاملات موترهای لوکس</li>
                        <li>مشاوره تخصصی املاک و مستغلات</li>
                        <li>دیجیتال مارکتینگ و تبلیغات هوشمند</li>
                        <li>توسعه نرم‌افزار و اپلیکیشن‌های اختصاصی</li>
                    </ul>
                </div>

                {/* Team / Info Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                    <div className="glass" style={{ padding: '15px', textAlign: 'center' }}>
                        <i className="fa-solid fa-user-tie" style={{ color: 'var(--gold-primary)', fontSize: '24px', marginBottom: '10px' }}></i>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>مدیریت</div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>عبدالصبور غیاثی</div>
                    </div>
                    <div className="glass" style={{ padding: '15px', textAlign: 'center' }}>
                        <i className="fa-solid fa-location-dot" style={{ color: 'var(--gold-primary)', fontSize: '24px', marginBottom: '10px' }}></i>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>آدرس</div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>کابل، شهر نو</div>
                    </div>
                </div>

                {/* Contact CTA */}
                <button 
                    onClick={() => window.location.href = 'https://zhinovax.com'}
                    style={{
                        width: '100%', background: 'var(--gold-gradient)', color: '#000',
                        border: 'none', padding: '18px', borderRadius: '18px',
                        fontWeight: '900', fontSize: '16px', cursor: 'pointer',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
                    }}
                >
                    <i className="fa-solid fa-globe"></i> مشاهده سایت رسمی
                </button>
            </div>
        </div>
    );
};

window.About = About;
