const Settings = ({ onTabChange, user, onLogin }) => {
    React.useEffect(() => {
        gsap.fromTo('.settings-item', 
            { opacity: 0, x: 20 }, 
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
        );
    }, []);

    const publicMenuItems = [
        { icon: 'fa-solid fa-bell', title: 'اعلانات و پیام‌ها', color: 'var(--gold-primary)', badge: '4', action: () => alert('بخش اعلانات فعال است') },
        { icon: 'fa-solid fa-trophy', title: 'چالش‌های زینوواکس', color: '#ab8720', action: () => onTabChange('challenges') },
        { icon: 'fa-solid fa-gamepad', title: 'مسابقات و جوایز', color: '#f9ab00', action: () => onTabChange('coming_soon') },
        { icon: 'fa-solid fa-circle-info', title: 'درباره ما', color: '#e91e63', action: () => onTabChange('about') },
    ];

    const privateMenuItems = [
        { icon: 'fa-solid fa-wallet', title: 'تراکنش‌های مالی', color: '#1a73e8', action: () => onTabChange('coming_soon') },
        { icon: 'fa-solid fa-sliders', title: 'تنظیمات پروفایل', color: '#17a2b8', action: () => onTabChange('coming_soon') },
        { icon: 'fa-solid fa-right-from-bracket', title: 'خروج از حساب', color: '#ff4b5c', action: () => {
            alert('خروج با موفقیت انجام شد');
            window.location.reload();
        }}
    ];

    const socials = [
        { icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/profile.php?id=61587145516031', color: '#1877F2' },
        { icon: 'fa-brands fa-tiktok', url: 'https://www.tiktok.com/@zhinovax_carproperty', color: '#fff' },
        { icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/zhinovax_carproperty', color: '#E1306C' }
    ];

    const MenuItem = ({ item }) => (
        <div onClick={item.action} className="settings-item glass hover-lift" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 22px', borderRadius: '22px', border: '1px solid rgba(255,255,255,0.04)',
            cursor: 'pointer', marginBottom: '12px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                    width: '42px', height: '42px', borderRadius: '14px',
                    background: 'rgba(255,255,255,0.03)', display: 'flex', 
                    justifyContent: 'center', alignItems: 'center', color: item.color,
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <i className={item.icon} style={{ fontSize: '18px' }}></i>
                </div>
                <span style={{ fontSize: '15px', fontWeight: '900', color: '#fff' }}>{item.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {item.badge && (
                    <span className="pulse-gold" style={{ background: 'var(--gold-primary)', padding: '3px 10px', borderRadius: '12px', fontSize: '10px', color: '#000', fontWeight: '900' }}>{item.badge}</span>
                )}
                <i className="fa-solid fa-chevron-left" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}></i>
            </div>
        </div>
    );

    return (
        <div className="screen settings-screen" style={{ paddingBottom: '120px', background: 'var(--bg-dark)', overflowY: 'auto' }}>
            {/* Header */}
            <div style={{ padding: '40px 25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', margin: 0 }}>تنظیمات</h1>
                <div className="hover-lift" style={{ 
                    width: '45px', height: '45px', background: 'rgba(255,255,255,0.03)', 
                    borderRadius: '15px', display: 'flex', justifyContent: 'center', 
                    alignItems: 'center', border: '1px solid rgba(255,255,255,0.06)' 
                }}>
                    <i className="fa-solid fa-gear" style={{ fontSize: '20px', color: 'var(--gold-primary)' }}></i>
                </div>
            </div>

            {/* Profile Card */}
            <div style={{ padding: '0 25px 35px' }}>
                {user ? (
                    <div className="glass" style={{ 
                        padding: '25px', borderRadius: '30px', display: 'flex', 
                        alignItems: 'center', gap: '20px', border: '1px solid rgba(212,175,55,0.25)',
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.08), transparent)'
                    }}>
                        <div className="pulse-gold" style={{ 
                            width: '75px', height: '75px', borderRadius: '50%', border: '2px solid var(--gold-primary)',
                            padding: '4px', overflow: 'hidden'
                        }}>
                            <div style={{ 
                                width: '100%', height: '100%', borderRadius: '50%', background: 'var(--gold-gradient)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                                fontSize: '28px', fontWeight: '900', color: '#000'
                            }}>
                                {(user.email || 'Z')[0].toUpperCase()}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: '0 0 5px' }}>{user.name || 'کاربر زینوواکس'}</h3>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 10px' }}>{user.phone || user.email}</p>
                            <div style={{ 
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                background: 'rgba(212,175,55,0.15)', padding: '5px 12px', borderRadius: '20px', 
                                fontSize: '10px', color: 'var(--gold-primary)', fontWeight: '900'
                            }}>
                                <i className="fa-solid fa-crown"></i> عضو ویژه VIP
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass" style={{ 
                        padding: '30px 25px', borderRadius: '30px', border: '1px solid rgba(0,132,173,0.3)', 
                        background: 'linear-gradient(135deg, rgba(0,132,173,0.1), transparent)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: '0 0 8px' }}>به زینوواکس بپیوندید</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 25px', lineHeight: '1.7' }}>
                            برای تجربه کامل و دسترسی به پنل ویژه خرید و فروش، وارد حساب خود شوید.
                        </p>
                        <button onClick={onLogin} className="hover-lift pulse-gold" style={{ 
                            width: '100%', background: 'var(--gold-gradient)', color: '#000', 
                            border: 'none', padding: '16px', borderRadius: '18px', 
                            fontWeight: '900', fontSize: '15px', cursor: 'pointer' 
                        }}>
                            ورود / ثبت نام زودهنگام
                        </button>
                    </div>
                )}
            </div>

            {/* Menu Sections */}
            <div style={{ padding: '0 25px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'right', paddingRight: '10px', marginBottom: '15px', fontWeight: '900', letterSpacing: '1px' }}>عمومی</div>
                <div className="settings-list">
                    {publicMenuItems.map((item, i) => <MenuItem key={i} item={item} />)}
                </div>

                {user && (
                    <div style={{ marginTop: '30px' }}>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'right', paddingRight: '10px', marginBottom: '15px', fontWeight: '900', letterSpacing: '1px' }}>حساب کاربری</div>
                        <div className="settings-list">
                            {privateMenuItems.map((item, i) => <MenuItem key={i} item={item} />)}
                        </div>
                    </div>
                )}
            </div>

            {/* Socials & Connect */}
            <div style={{ marginTop: '40px', padding: '0 25px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '20px', fontWeight: '900' }}>شبکه‌های اجتماعی ما</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    {socials.map((social, i) => (
                        <a key={i} href={social.url} target="_blank" className="hover-lift" style={{ 
                            width: '55px', height: '55px', borderRadius: '18px', 
                            background: 'rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'center', 
                            alignItems: 'center', color: social.color, 
                            border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none',
                            fontSize: '22px'
                        }}>
                             <i className={social.icon}></i>
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer Text */}
            <div style={{ textAlign: 'center', padding: '50px 25px', fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontWeight: 'bold' }}>
                ZHINOVAX PREMIUM MARKETPLACE<br/>
                <span style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '8px', display: 'block' }}>VERSION 1.4.0 (KARWWAN PARITY)</span>
            </div>
        </div>
    );
};

window.Settings = Settings;

window.Settings = Settings;
