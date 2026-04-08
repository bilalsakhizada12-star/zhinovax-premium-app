const Navbar = ({ activeTab, onTabChange }) => {
    return (
        <div style={{
            position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', 
            width: '90%', maxWidth: '380px', height: '70px', zIndex: '1000'
        }}>
            {/* Background - 100% Yesterday Baseline Glass */}
            <div className="glass" style={{
                position: 'absolute', bottom: '0', width: '100%', height: '100%', 
                borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}></div>
            
            <div style={{
                position: 'relative', width: '100%', height: '100%', 
                display: 'flex', justifyContent: 'space-around', alignItems: 'center'
            }}>
                {/* DASHBOARD */}
                <div id="nav-dashboard" onClick={() => onTabChange('dashboard')} className="hover-lift" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    gap: '4px', width: '50px', cursor: 'pointer', 
                    color: activeTab === 'dashboard' ? 'var(--gold-primary)' : 'var(--text-muted)',
                    textShadow: activeTab === 'dashboard' ? '0 0 15px rgba(212,175,55,0.4)' : 'none',
                    position: 'relative'
                }}>
                    <i className="fa-solid fa-chart-line" style={{ fontSize: '18px' }}></i>
                    <span style={{ fontSize: '9px', fontWeight: 'bold' }}>داشبورد</span>
                    {hasNewNotif && activeTab !== 'dashboard' && <span style={{ position: 'absolute', top: '-5px', right: '5px', width: '10px', height: '10px', background: '#ff4b5c', borderRadius: '50%', border: '2px solid var(--bg-dark)' }}></span>}
                </div>
                
                {/* HOME */}
                <div id="nav-home" onClick={() => onTabChange('home')} className="hover-lift" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    gap: '4px', width: '50px', cursor: 'pointer', 
                    color: activeTab === 'home' ? 'var(--gold-primary)' : 'var(--text-muted)',
                    textShadow: activeTab === 'home' ? '0 0 15px rgba(212,175,55,0.4)' : 'none'
                }}>
                    <i className="fa-solid fa-house" style={{ fontSize: '18px' }}></i>
                    <span style={{ fontSize: '9px', fontWeight: 'bold' }}>خانه</span>
                </div>
                
                {/* CENTRAL CUBE FAB - 100% Yesterday Baseline */}
                <div id="nav-cube" onClick={() => onTabChange('home')} className="hover-lift" style={{
                    background: 'var(--gold-gradient)', width: '55px', height: '55px', 
                    borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    marginTop: '-35px', boxShadow: '0 8px 30px rgba(212, 175, 55, 0.4)',
                    cursor: 'pointer', border: '4px solid var(--bg-dark)', transition: '0.2s'
                }}>
                    <i className="fa-solid fa-cube" style={{ color: '#000', fontSize: '24px' }}></i>
                </div>
                
                {/* FAVORITES */}
                <div id="nav-favorites" onClick={() => onTabChange('favorites')} className="hover-lift" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    gap: '4px', width: '50px', cursor: 'pointer', 
                    color: activeTab === 'favorites' ? 'var(--gold-primary)' : 'var(--text-muted)',
                    textShadow: activeTab === 'favorites' ? '0 0 15px rgba(212,175,55,0.4)' : 'none'
                }}>
                    <i className="fa-solid fa-heart" style={{ fontSize: '18px' }}></i>
                    <span style={{ fontSize: '9px', fontWeight: 'bold' }}>مورد علاقه</span>
                </div>

                {/* SETTINGS */}
                <div id="nav-settings" onClick={() => onTabChange('settings')} className="hover-lift" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    gap: '4px', width: '50px', cursor: 'pointer', 
                    color: activeTab === 'settings' ? 'var(--gold-primary)' : 'var(--text-muted)',
                    textShadow: activeTab === 'settings' ? '0 0 15px rgba(212,175,55,0.4)' : 'none'
                }}>
                    <i className="fa-solid fa-gear" style={{ fontSize: '18px' }}></i>
                    <span style={{ fontSize: '9px', fontWeight: 'bold' }}>تنظیمات</span>
                </div>
            </div>
        </div>
    );
};

window.Navbar = Navbar;
