const Portfolio = ({ onTabChange, assets, user, onLogin }) => {
    const [ownedAssets, setOwnedAssets] = React.useState([]);

    React.useEffect(() => {
        gsap.fromTo('.portfolio-content', 
            { opacity: 0, scale: 0.98 }, 
            { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
        );
        if (user) {
            const saved = JSON.parse(localStorage.getItem('zhinovax_purchases')) || [];
            setOwnedAssets(saved);
        }
    }, [user]);

    if (!user) {
        return (
            <div className="screen portfolio-screen" style={{ overflowY: 'auto', paddingBottom: '120px', background: 'var(--bg-dark)' }}>
                <div style={{ padding: '40px 25px 25px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: '0 0 5px' }}>داشبورد</h1>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>مدیریت دارایی‌های زینوواکس</p>
                </div>

                <div className="portfolio-content" style={{ padding: '0 25px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                        <div className="glass hover-lift" style={{ padding: '20px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.05)' }}>
                             <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--gold-primary)' }}>۱۲۰+</div>
                             <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '5px' }}>خودروی لوکس</div>
                        </div>
                        <div className="glass hover-lift" style={{ padding: '20px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.05)' }}>
                             <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--gold-primary)' }}>۴۵+</div>
                             <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '5px' }}>املاک ویژه</div>
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '30px 25px', borderRadius: '28px', border: '1px solid rgba(212,175,55,0.2)', background: 'linear-gradient(135deg, rgba(212,175,55,0.05), transparent)', textAlign: 'right' }}>
                        <div style={{ fontSize: '32px', marginBottom: '15px' }}>👑</div>
                        <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: '0 0 10px' }}>دسترسی به بخش ویژه</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 25px', lineHeight: '1.8' }}>
                            برای مشاهده اسناد دیجیتال، تیکت‌های قرعه‌کشی و مدیریت خریدهای خود، وارد حساب کاربری شوید.
                        </p>
                        <button onClick={onLogin} className="hover-lift pulse-gold" style={{
                            width: '100%', background: 'var(--gold-gradient)', color: '#000',
                            border: 'none', padding: '15px', borderRadius: '18px',
                            fontWeight: '900', fontSize: '15px', cursor: 'pointer'
                        }}>
                            ورود به پنل کاربری
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="screen portfolio-screen" style={{ overflowY: 'auto', paddingBottom: '120px', background: 'var(--bg-dark)' }}>
            <div style={{ padding: '40px 25px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: 0 }}>دارایی‌های من</h1>
                <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'rgba(212,175,55,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--gold-primary)' }}>
                    <i className="fa-solid fa-briefcase" style={{ fontSize: '20px' }}></i>
                </div>
            </div>

            <div className="portfolio-content" style={{ padding: '0 25px' }}>
                <div className="glass" style={{ padding: '30px 25px', borderRadius: '28px', marginBottom: '25px', border: '1px solid rgba(212,175,55,0.3)', background: 'rgba(212,175,55,0.05)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textAlign: 'right' }}>ارزش تخمینی کل</p>
                    <h2 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--gold-primary)', margin: 0, textAlign: 'right' }}>
                        {ownedAssets.length > 0 ? '$' + ownedAssets.reduce((acc, curr) => acc + (parseInt(curr.price.replace(/\D/g, '')) || 0), 0).toLocaleString() : '$0'}
                    </h2>
                </div>

                {ownedAssets.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                        <i className="fa-solid fa-box-open" style={{ fontSize: '60px', marginBottom: '20px', opacity: 0.1 }}></i>
                        <p style={{ fontSize: '14px' }}>شما هنوز خریدی انجام نداده‌اید.</p>
                        <button onClick={() => onTabChange('home')} className="hover-lift" style={{ borderRadius: '15px', padding: '12px 25px', background: 'var(--gold-primary)', color: '#000', border: 'none', marginTop: '20px', fontWeight: '900', cursor: 'pointer' }}>مشاهده محصولات</button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '18px' }}>
                        {ownedAssets.map((asset, i) => (
                            <div key={i} className="glass" style={{ borderRadius: '24px', padding: '15px', display: 'flex', gap: '15px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '18px', backgroundImage: `url(${asset.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }}></div>
                                <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h4 style={{ fontSize: '15px', margin: '0 0 5px', fontWeight: '900', color: '#fff' }}>{asset.title}</h4>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)' }}>
                                        <span style={{ fontSize: '11px', fontWeight: '900' }}>تأیید شده</span>
                                        <i className="fa-solid fa-circle-check" style={{ fontSize: '14px' }}></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

window.Portfolio = Portfolio;
