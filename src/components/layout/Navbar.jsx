const Navbar = ({ activeTab, onTabChange, hasNewNotif }) => {
    const tabs = [
        { id: 'settings', icon: 'fa-solid fa-circle-user', label: 'VIP' },
        { id: 'dashboard', icon: 'fa-solid fa-chart-pie', label: 'پورتفولیو' },
        { id: 'add_asset', icon: 'fa-solid fa-square-plus', label: 'ثبت', special: true },
        { id: 'favorites', icon: 'fa-solid fa-heart', label: 'علاقه' },
        { id: 'home', icon: 'fa-solid fa-house-chimney', label: 'خانه' }
    ];

    return (
        <div style={{
            position: 'fixed', bottom: '25px', left: '50%', transform: 'translateX(-50%)',
            width: '90%', maxWidth: '400px', zIndex: 1000,
            display: 'flex', justifyContent: 'center'
        }}>
            <div className="glass" style={{
                width: '100%', height: '75px', borderRadius: '35px',
                display: 'flex', justifyContent: 'space-around', alignItems: 'center',
                padding: '0 10px', background: 'rgba(5, 16, 20, 0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
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
                                width: '45px', height: '45px', borderRadius: '50%',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                color: isActive ? '#000' : 'rgba(255,255,255,0.4)',
                                background: isActive ? 'var(--gold-gradient)' : 'transparent',
                                fontSize: '20px', transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                                boxShadow: isActive ? '0 8px 20px rgba(212, 175, 55, 0.4)' : 'none',
                                transform: isActive ? 'scale(1.1) translateY(-5px)' : 'scale(1)'
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
