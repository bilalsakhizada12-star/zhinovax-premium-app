const Settings = ({ user, onLogin, onTabChange }) => {
    const [installable, setInstallable] = React.useState(false);
    const [showIosModal, setShowIosModal] = React.useState(false);

    React.useEffect(() => {
        gsap.fromTo('.settings-item', 
            { opacity: 0, x: 20 }, 
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out' }
        );

        // Listen for install availability
        if (window.deferredPrompt) setInstallable(true);
        window.addEventListener('pwa-installable', () => setInstallable(true));
    }, []);

    const handleInstall = async () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        if (isIOS) {
            setShowIosModal(true);
        } else if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            const { outcome } = await window.deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted install');
                setInstallable(false);
            }
            window.deferredPrompt = null;
        } else {
            alert('اپلیکیشن در حال حاضر قابل نصب نیست. از گوگل کروم استفاده کنید.');
        }
    };

    const handleShareApp = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Zhinovax VIP',
                text: 'بهترین اپلیکیشن خرید و فروش موتر و املاک در افغانستان را تجربه کنید.',
                url: 'https://app.zhinovax.com'
            });
        } else {
            navigator.clipboard.writeText('https://app.zhinovax.com');
            alert('لینک اپلیکیشن کپی شد. آن را برای دوستان تان بفرستید.');
        }
    };

    const publicMenuItems = [
        { icon: 'fa-solid fa-download', title: 'نصب اپلیکیشن (اندروید و آیفون)', color: 'var(--gold-primary)', action: handleInstall, visible: (window.isStandalone && typeof window.isStandalone === 'function') ? !window.isStandalone() : true },
        { icon: 'fa-solid fa-share-nodes', title: 'دعوت از دوستان به زینوواکس', color: '#00c853', action: handleShareApp },
        { icon: 'fa-solid fa-handshake', title: 'همکاری تجاری با ما', color: '#1a73e8', action: () => alert('لطفاً با شماره پشتیبانی زینوواکس در تماس شوید.') },
        { icon: 'fa-solid fa-bell', title: 'اعلانات و پیام‌ها', color: 'var(--gold-primary)', badge: '4', action: () => alert('بخش اعلانات فعال است') },
        { icon: 'fa-solid fa-trophy', title: 'چالش‌های زینوواکس', color: '#ab8720', action: () => onTabChange('challenges') },
        { icon: 'fa-solid fa-circle-info', title: 'درباره ما', color: '#e91e63', action: () => onTabChange('about') },
    ];

    const privateMenuItems = [
        { icon: 'fa-solid fa-wallet', title: 'تراکنش‌های مالی', color: '#1a73e8', action: () => onTabChange('coming_soon') },
        { icon: 'fa-solid fa-sliders', title: 'تنظیمات حساب کاربری', color: '#17a2b8', action: () => onTabChange('coming_soon') },
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
                            برای تجربه کامل و دسترسی به پنل ویژه خرید و فروش، به حساب خود داخل شوید.
                        </p>
                        <button onClick={onLogin} className="hover-lift pulse-gold" style={{ 
                            width: '100%', background: 'var(--gold-gradient)', color: '#000', 
                            border: 'none', padding: '16px', borderRadius: '18px', 
                            fontWeight: '900', fontSize: '15px', cursor: 'pointer' 
                        }}>
                            داخل شدن / ثبت نام زودهنگام
                        </button>
                    </div>
                )}
            </div>

            {/* Menu Sections */}
            <div style={{ padding: '0 25px' }}>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'right', paddingRight: '10px', marginBottom: '15px', fontWeight: '900', letterSpacing: '1px' }}>عمومی</div>
                <div className="settings-list">
                    {publicMenuItems.map((item, i) => (item.visible !== false) && <MenuItem key={i} item={item} />)}
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

            {/* iOS Install Instructions Modal */}
            {showIosModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                    zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                }}>
                    <div className="glass" style={{ 
                        padding: '35px', borderRadius: '35px', border: '1px solid var(--gold-primary)', 
                        textAlign: 'center', maxWidth: '350px' 
                    }}>
                        <div style={{ color: 'var(--gold-primary)', fontSize: '50px', marginBottom: '20px' }}>
                            <i className="fa-solid fa-arrow-up-from-bracket"></i>
                        </div>
                        <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '900', marginBottom: '15px' }}>نصب در آیفون (iOS)</h2>
                        <ol style={{ textAlign: 'right', color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '2', paddingRight: '20px' }}>
                            <li>در براوزر Safari، دکمه <strong>Share</strong> (آیکون مربع با فلش بالا) را بزنید.</li>
                            <li>لیست را پایین بکشید و گزینه <strong>Add to Home Screen</strong> را انتخاب کنید.</li>
                            <li>در آخر روی <strong>Add</strong> کلیک کنید.</li>
                        </ol>
                        <button onClick={() => setShowIosModal(false)} className="hover-lift" style={{
                            marginTop: '30px', background: 'var(--gold-gradient)', border: 'none', 
                            padding: '12px 40px', borderRadius: '15px', fontWeight: '900'
                        }}>فهمیدم</button>
                    </div>
                </div>
            )}

            {/* Footer Text */}
            <div style={{ textAlign: 'center', padding: '50px 25px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontWeight: 'bold', letterSpacing: '1px' }}>
                ZHINOVAX CAR & PROPERTY MARKETPLACE<br/>
                <span style={{ fontSize: '9px', fontWeight: 'normal', color: 'var(--gold-primary)', marginTop: '8px', display: 'block' }}>PRESTIGE EDITION V1.1.0 (PRO)</span>
            </div>
        </div>
    );
};

window.Settings = Settings;

