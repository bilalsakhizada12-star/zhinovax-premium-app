const Navbar = ({ activeTab, onTabChange, hasNewNotif }) => {
    const tabs = [
        { id: 'settings', icon: 'fa-solid fa-circle-user', label: 'VIP' },
        { id: 'favorites', icon: 'fa-solid fa-heart', label: 'علاقه' },
        { id: 'home', icon: 'fa-solid fa-house-chimney', label: 'خانه' }
    ];

    return (
        <div style={{
            position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
            width: '92%', maxWidth: '420px', zIndex: 1000,
            display: 'flex', justifyContent: 'center'
        }}>
            <div className="glass" style={{
                width: '100%', height: '80px', borderRadius: '40px',
                display: 'flex', justifyContent: 'space-around', alignItems: 'center',
                padding: '0 12px', background: 'rgba(5, 10, 13, 0.4)',
                border: '1px solid var(--border-glass)',
                boxShadow: 'var(--shadow-premium)'
            }}>
                {tabs.map(tab => {
                    const isActive = activeTab === tab.id;
                    return (
                        <div 
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className="hover-lift"
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                cursor: 'pointer', position: 'relative', flex: 1,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '50px', height: '50px', borderRadius: '18px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                color: isActive ? '#000' : 'rgba(255,255,255,0.3)',
                                background: isActive ? 'var(--gold-gradient)' : 'transparent',
                                fontSize: '22px', transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                                boxShadow: isActive ? 'var(--gold-glow)' : 'none',
                                transform: isActive ? 'scale(1.15) translateY(-8px)' : 'scale(1)'
                            }}>
                                <i className={tab.icon}></i>
                            </div>
                            
                            {isActive && (
                                <div style={{
                                    position: 'absolute', bottom: '-12px', width: '4px', height: '4px',
                                    borderRadius: '50%', background: 'var(--gold-primary)',
                                    boxShadow: '0 0 10px var(--gold-primary)'
                                }}></div>
                            )}

                            {tab.id === 'favorites' && hasNewNotif && !isActive && (
                                <div style={{
                                    position: 'absolute', top: '5px', right: '15px',
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: '#ff4b2b', border: '2px solid #000'
                                }}></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

window.Navbar = Navbar;
