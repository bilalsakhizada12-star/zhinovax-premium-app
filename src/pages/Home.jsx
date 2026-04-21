const Home = ({ cars, properties, loading, connectionError, onOpenDetail, onLogin }) => {
    const AssetCard = window.AssetCard;
    const [viewType, setViewType] = React.useState('cars'); // 'cars' or 'properties'
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleTabChange = (type) => {
        if (viewType === type) return;
        setViewType(type);
    };

    const filteredCars = (cars || []).filter(car => {
        const titleMatch = car.title ? car.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const regMatch = car.reg_no ? car.reg_no.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        return car.type === 'car' && (titleMatch || regMatch);
    });

    const filteredProps = (properties || []).filter(prop => {
        const titleMatch = prop.title ? prop.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const locMatch = prop.location ? prop.location.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        return prop.type === 'property' && (titleMatch || locMatch);
    });

    const activeAssets = viewType === 'cars' ? filteredCars : filteredProps;

    return (
        <div className="screen home-screen" style={{ paddingBottom: '120px' }}>
            {/* Prestige Header */}
            <div style={{ 
                padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 100, background: 'rgba(2, 6, 8, 0.8)',
                backdropFilter: 'blur(30px)', borderBottom: '1px solid rgba(255,255,255,0.03)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <div onClick={onLogin} className="hover-lift" style={{ 
                        width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden',
                        border: '2px solid var(--gold-primary)', padding: '2px', cursor: 'pointer',
                        boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)'
                    }}>
                        <img 
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop" 
                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                            alt="User"
                        />
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <img 
                        src="https://i.postimg.cc/W3MnzMzh/jjj.png" 
                        style={{ height: '38px', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }} 
                        alt="Zhinovax"
                    />
                </div>

                <div className="hover-lift" style={{ 
                    background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '15px', 
                    color: '#fff', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer'
                }}>
                    <i className="fa-solid fa-bell-concierge" style={{ fontSize: '18px', color: 'var(--gold-primary)' }}></i>
                </div>
            </div>

            {/* VIP Button */}
            <div style={{ padding: '10px 24px', textAlign: 'center' }}>
                <button onClick={onLogin} className="hover-lift" style={{ 
                    background: 'var(--gold-gradient)', color: '#000', border: 'none', 
                    padding: '12px 50px', borderRadius: '30px', fontWeight: '900', 
                    fontFamily: 'inherit', fontSize: '14px', cursor: 'pointer',
                    boxShadow: '0 8px 15px rgba(212, 175, 55, 0.2)'
                }}>داخل شدن VIP</button>
            </div>

            {/* Services Label */}
            <div style={{ padding: '15px 24px 10px', textAlign: 'right' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>خدمات ویژه زینوواکس (همکاران ما)</span>
            </div>

            {/* Services Grid (3 cards) */}
            <div style={{ padding: '0 24px 20px', display: 'flex', gap: '10px' }}>
                <div onClick={() => window.open('https://t.me/yourid', '_blank')} className="glass hover-lift" style={{ background: '#111518', borderRadius: '15px', padding: '15px 5px', flex: 1, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                    <i className="fa-solid fa-building-shield" style={{ color: '#ff9800', fontSize: '20px', marginBottom: '8px' }}></i>
                    <div style={{ fontSize: '10px', color: '#fff' }}>نمایشگاه همکار</div>
                </div>
                <div onClick={() => window.open('https://t.me/yourid', '_blank')} className="glass hover-lift" style={{ background: '#111518', borderRadius: '15px', padding: '15px 5px', flex: 1, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                     <i className="fa-solid fa-magnifying-glass-chart" style={{ color: '#2196f3', fontSize: '20px', marginBottom: '8px' }}></i>
                    <div style={{ fontSize: '10px', color: '#fff' }}>کارشناسی موتر</div>
                </div>
                <div onClick={() => window.open('https://t.me/yourid', '_blank')} className="glass hover-lift" style={{ background: '#111518', borderRadius: '15px', padding: '15px 5px', flex: 1, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                     <i className="fa-solid fa-handshake-angle" style={{ color: '#4caf50', fontSize: '20px', marginBottom: '8px' }}></i>
                    <div style={{ fontSize: '10px', color: '#fff' }}>تسهیلات بانکی</div>
                </div>
            </div>

            {/* Category Filter Pills (Restored Old Layout) */}
            <div style={{ padding: '0 24px 25px', display: 'flex', gap: '10px' }}>
                <div 
                    onClick={() => handleTabChange('cars')}
                    className="hover-lift"
                    style={{
                        flex: 1, padding: '12px 0', borderRadius: '12px', textAlign: 'center',
                        background: viewType === 'cars' ? 'var(--gold-gradient)' : '#111518',
                        color: viewType === 'cars' ? '#000' : 'rgba(255,255,255,0.4)',
                        fontWeight: 'bold', fontSize: '13px', cursor: 'pointer',
                        transition: '0.4s', border: viewType === 'cars' ? 'none' : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: viewType === 'cars' ? '0 5px 15px rgba(212, 175, 55, 0.2)' : 'none'
                    }}
                >
                    موترها
                </div>
                <div 
                    onClick={() => handleTabChange('properties')}
                    className="hover-lift"
                    style={{
                        flex: 1, padding: '12px 0', borderRadius: '12px', textAlign: 'center',
                        background: viewType === 'properties' ? '#1c2226' : '#111518',
                        color: viewType === 'properties' ? '#fff' : 'rgba(255,255,255,0.4)',
                        fontWeight: 'bold', fontSize: '13px', cursor: 'pointer',
                        transition: '0.4s', border: viewType === 'properties' ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    املاک
                </div>
            </div>

            {/* Main Content Grid */}
            <div key={viewType} className="grid-layout">
                {loading && activeAssets.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px 25px', fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontWeight: 'bold', letterSpacing: '1px' }}>
                        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}></i>
                         بارگذاری...
                    </div>
                ) : activeAssets.map((asset, index) => (
                    <div key={asset.id} className="gsap-reveal" style={{ animationDelay: `${index * 0.05}s` }}>
                        <AssetCard data={asset} type={viewType === 'cars' ? 'car' : 'property'} onClick={onOpenDetail} />
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {activeAssets.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '40px', color: 'rgba(255,255,255,0.1)', marginBottom: '15px' }}></i>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>نتیجه‌ای برای «{searchTerm}» یافت نشد.</p>
                </div>
            )}
        </div>
    );
};

window.Home = Home;
