const Navbar = ({ activeTab, onTabChange, hasNewNotif }) => {
    React.useEffect(() => {
        gsap.fromTo('.navbar-inner', 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.5 }
        );
    }, []);

    const navItemStyle = (tab) => ({
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        gap: '6px', width: '60px', cursor: 'pointer', transition: '0.3s',
        color: activeTab === tab ? 'var(--gold-primary)' : 'rgba(255,255,255,0.3)',
        textShadow: activeTab === tab ? '0 0 15px rgba(212,175,55,0.4)' : 'none',
        position: 'relative', zIndex: 2
    });

    return (
        <div className="navbar-container" style={{
            position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', 
            width: '100%', maxWidth: '420px', height: '100px', zIndex: '2000',
            pointerEvents: 'none', padding: '0 15px 15px'
        }}>
            <div className="navbar-inner glass" style={{
                position: 'relative', width: '100%', height: '70px', 
                borderRadius: '24px', display: 'flex', justifyContent: 'space-around', 
                alignItems: 'center', pointerEvents: 'auto',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(5, 16, 20, 0.85)',
                backdropFilter: 'blur(20px)'
            }}>
                {/* SETTINGS */}
                <div id="nav-settings" onClick={() => onTabChange('settings')} className="hover-lift" style={navItemStyle('settings')}>
                    <i className="fa-solid fa-gear" style={{ fontSize: '20px' }}></i>
                    <span style={{ fontSize: '10px', fontWeight: 'bold' }}>تنظیمات</span>
                </div>

                {/* FAVORITES */}
                <div id="nav-favorites" onClick={() => onTabChange('favorites')} className="hover-lift" style={navItemStyle('favorites')}>
                    <i className="fa-solid fa-heart" style={{ fontSize: '20px' }}></i>
                    <span style={{ fontSize: '10px', fontWeight: 'bold' }}>برگزیده</span>
                </div>
                
                {/* MOCK GAP FOR FAB */}
                <div style={{ width: '60px' }}></div>
                
                {/* ASSETS / HOME */}
                <div id="nav-home" onClick={() => onTabChange('home')} className="hover-lift" style={navItemStyle('home')}>
                    <i className="fa-solid fa-gem" style={{ fontSize: '20px' }}></i>
                    <span style={{ fontSize: '10px', fontWeight: 'bold' }}>موترها</span>
                </div>
                
                {/* DASHBOARD / PORTFOLIO */}
                <div id="nav-dashboard" onClick={() => onTabChange('dashboard')} className="hover-lift" style={navItemStyle('dashboard')}>
                    <i className="fa-solid fa-layer-group" style={{ fontSize: '20px' }}></i>
                    <span style={{ fontSize: '10px', fontWeight: 'bold' }}>داشبورد</span>
                    {hasNewNotif && <span style={{ position: 'absolute', top: '-5px', right: '15px', width: '8px', height: '8px', background: '#ff4b5c', borderRadius: '50%', border: '2px solid #051014' }}></span>}
                </div>

                {/* CENTRAL FAB (Floating Action Button) */}
                <div onClick={() => onTabChange('home')} className="hover-lift pulse-gold" style={{
                    position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--gold-gradient)', width: '65px', height: '65px', 
                    borderRadius: '22px', display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    boxShadow: '0 10px 25px rgba(212, 175, 55, 0.5)',
                    cursor: 'pointer', border: '5px solid #051014', transition: '0.3s',
                    zIndex: 10
                }}>
                    <i className="fa-solid fa-house" style={{ color: '#000', fontSize: '26px' }}></i>
                </div>
            </div>
        </div>
    );
};

window.Navbar = Navbar;
