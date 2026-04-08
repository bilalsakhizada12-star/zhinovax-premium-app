const Settings = ({ onTabChange, user, onLogin }) => {
    const getIconSvg = (name) => {
        const style = { width: '20px', height: '20px', fill: 'none', stroke: 'currentColor', strokeWidth: '1.2', strokeLinecap: 'round', strokeLinejoin: 'round' };
        switch(name) {
            case 'wallet': return <svg {...style}><rect x="3" y="7" width="18" height="14" rx="2" ry="2"/><path d="M21 12H19"/><path d="M5 7V5a2 2 0 0 1 2-2h14v4"/></svg>;
            case 'bell': return <svg {...style}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
            case 'trophy': return <svg {...style}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
            case 'gamepad': return <svg {...style}><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/></svg>;
            case 'gear': return <svg {...style}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
            case 'info': return <svg {...style}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
            case 'logout': return <svg {...style}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
            case 'login': return <svg {...style}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>;
            case 'facebook': return <svg {...style}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
            case 'tiktok': return <svg {...style}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;
            case 'instagram': return <svg {...style}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
            case 'youtube': return <svg {...style}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.16 1 12 1 12s0 3.84.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.84 23 12 23 12s0-3.84-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;
        }
    }

    const handleComingSoon = () => alert('بزودی در نسخه‌های بعدی... (Coming Soon)');

    const handleAbout = () => {
        alert(`زینوواکس (Zhinovax)
یک شرکت پیشرو در مشاوره دیجیتال و تکنولوژی‌های هوش مصنوعی (AI) مستقر در کابل، افغانستان.

مأموریت ما: استفاده از راهکارهای هوشمند برای رشد کسب‌وکارها و ارائه خدمات لوکس در خرید و فروش خودرو و املاک.

مدیریت: تحت رهبری عبدالصبور غیاثی.
آدرس: کابل، شهر نو، ساعت‌فروشی، منزل دوم.
Info@zhinovax.com`);
    };

    // Public menu - visible to ALL visitors
    const publicMenuItems = [
        { iconName: 'bell', title: 'اعلانات', color: 'transparent', stroke: '#34a853', badge: '4', action: () => alert('بخش اعلانات فعال است') },
        { iconName: 'trophy', title: 'چالش‌ها', color: 'transparent', stroke: '#ab8720', action: handleComingSoon },
        { iconName: 'gamepad', title: 'مسابقه و بازی‌ها', color: 'transparent', stroke: '#f9ab00', action: handleComingSoon },
        { iconName: 'info', title: 'درباره زینوواکس', color: 'transparent', stroke: '#e91e63', action: () => onTabChange('about') },
    ];

    // Private menu - visible ONLY to logged-in users
    const privateMenuItems = [
        { iconName: 'wallet', title: 'بیلانس و پرداخت‌ها', color: 'transparent', stroke: '#1a73e8', action: handleComingSoon },
        { iconName: 'gear', title: 'تنظیمات حساب', color: 'transparent', stroke: '#17a2b8', action: handleComingSoon },
        { iconName: 'logout', title: 'خروج از حساب', color: 'transparent', stroke: '#ff5722', action: () => {
            alert('خروج با موفقیت انجام شد');
            window.location.reload();
        }}
    ];

    const socials = [
        { icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/profile.php?id=61587145516031', color: '#1877F2', bg: 'rgba(24,119,242,0.15)' },
        { icon: 'fa-brands fa-tiktok', url: 'https://www.tiktok.com/@zhinovax_carproperty', color: '#fff', bg: 'rgba(0,0,0,0.5)' },
        { icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/zhinovax_carproperty', color: '#E1306C', bg: 'rgba(225,48,108,0.12)' },
        { icon: 'fa-brands fa-youtube', url: '#', color: '#FF0000', bg: 'rgba(255,0,0,0.12)' }
    ];

    const MenuItem = ({ item }) => (
        <div id={item.id} onClick={item.action} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '15px 20px', background: 'rgba(255,255,255,0.03)', 
            borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer', transition: '0.2s'
        }} className="hover-lift">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)', display: 'flex', 
                    justifyContent: 'center', alignItems: 'center', color: item.stroke
                }}>
                    {getIconSvg(item.iconName)}
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{item.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.badge && (
                    <span style={{ background: '#ff4b5c', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', color: '#fff' }}>{item.badge}</span>
                )}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </div>
        </div>
    );

    return (
        <div className="screen" style={{ paddingBottom: '110px', background: 'var(--bg-dark)' }}>
            {/* Header */}
            <div style={{ padding: '40px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff' }}>تنظیمات</h1>
                <div style={{ position: 'relative' }}>
                    <i className="fa-solid fa-bell" style={{ fontSize: '20px', color: 'var(--gold-primary)' }}></i>
                    <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'red', borderRadius: '50%', width: '15px', height: '15px', fontSize: '9px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>4</span>
                </div>
            </div>

            {/* Profile Section: Changes based on login state */}
            {user ? (
                // --- LOGGED IN: Show full profile card ---
                <div style={{ margin: '0 20px 30px', padding: '20px', background: 'rgba(255,255,255,0.04)', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid rgba(212,175,55,0.2)' }}>
                    <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--gold-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '32px', fontWeight: '900', color: '#000' }}>
                        {(user.email || 'Z')[0].toUpperCase()}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: '0 0 4px' }}>خوش آمدید!</h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>{user.email || 'sales@zhinovax.com'}</p>
                        <div style={{ marginTop: '8px', display: 'inline-block', background: 'rgba(212,175,55,0.15)', padding: '3px 12px', borderRadius: '20px', fontSize: '10px', color: 'var(--gold-primary)', fontWeight: 'bold' }}>
                            ✦ عضو VIP زینوواکس
                        </div>
                    </div>
                </div>
            ) : (
                // --- NOT LOGGED IN: Show a login CTA banner ---
                <div style={{ margin: '0 20px 30px', padding: '20px 25px', background: 'rgba(0,132,173,0.08)', borderRadius: '24px', border: '1px solid rgba(0,132,173,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'right' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#fff', margin: '0 0 5px' }}>عضویت رایگان</h3>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>برای دسترسی به امکانات بیشتر وارد شوید</p>
                    </div>
                    <button onClick={onLogin} style={{ background: 'var(--gold-primary)', color: '#000', border: 'none', padding: '10px 22px', borderRadius: '15px', fontWeight: '900', fontSize: '13px', cursor: 'pointer', flexShrink: 0 }}>
                        ورود / ثبت نام
                    </button>
                </div>
            )}

            {/* Public Menu - Available to Everyone */}
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right', paddingRight: '5px', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '1px' }}>عمومی</div>
                {publicMenuItems.map((item, i) => <MenuItem key={i} item={item} />)}
            </div>

            {/* Private Menu - Only shown after login */}
            {user && (
                <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right', paddingRight: '5px', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '1px' }}>حساب کاربری</div>
                    {privateMenuItems.map((item, i) => <MenuItem key={i} item={item} />)}
                </div>
            )}

            {/* Socials */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '35px', padding: '0 20px' }}>
                {socials.map((social, i) => (
                    <a key={i} href={social.url} target="_blank" style={{ 
                        width: '50px', height: '50px', borderRadius: '16px', 
                        background: social.bg, display: 'flex', justifyContent: 'center', 
                        alignItems: 'center', color: social.color, 
                        border: `1px solid ${social.color}33`, textDecoration: 'none',
                        fontSize: '20px', transition: '0.2s'
                    }}>
                        <i className={social.icon}></i>

                    </a>
                ))}
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', padding: '35px 20px', fontSize: '11px', color: 'var(--text-muted)', lineHeight: '2' }}>
                © 2025 Zhinovax. تمامی حقوق محفوظ است.
            </div>
        </div>
    );
};

window.Settings = Settings;
