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

            {/* Premium Search Hero */}
            <div style={{ padding: '30px 24px 20px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 10px', color: '#fff' }}>پـلی بـه سوی <span style={{ color: 'var(--gold-primary)' }}>اشـرافیت</span></h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: '0 0 25px' }}>به پلتفرم لوکس خرید و فروش زینوواکس خوش آمدید.</p>
                
                <div className="glass" style={{ 
                    padding: '6px 6px 6px 20px', borderRadius: '30px', display: 'flex', 
                    alignItems: 'center', gap: '15px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}>
                    <div style={{ 
                        width: '48px', height: '48px', background: 'var(--gold-gradient)', 
                        borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        boxShadow: '0 10px 20px rgba(212, 175, 55, 0.3)', flexShrink: 0
                    }}>
                        <i className="fa-solid fa-magnifying-glass" style={{ color: '#000', fontSize: '20px' }}></i>
                    </div>

                    <input 
                        type="text"
                        placeholder={viewType === 'cars' ? 'مدل ماشین مورد نظر شما...' : 'لوکیشن ملک گرانبها...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            flex: 1, background: 'transparent', border: 'none', color: '#fff',
                            fontSize: '16px', fontWeight: '500', outline: 'none', padding: '12px 0',
                            textAlign: 'right', fontFamily: 'inherit'
                        }}
                    />
                </div>
            </div>

            {/* Partner Services Section - NEW MONETIZATION */}
            <div style={{ padding: '15px 0 5px' }}>
                <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '900', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>خدمات ویژه زینوواکس</span>
                    <i className="fa-solid fa-gem" style={{ color: 'var(--gold-primary)', fontSize: '12px' }}></i>
                </div>
                <div className="no-scrollbar" style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '5px 20px', scrollSnapType: 'x mandatory' }}>
                    {[
                        { icon: 'fa-solid fa-handshake-angle', label: 'تسهیلات بانکی', color: '#4caf50' },
                        { icon: 'fa-solid fa-magnifying-glass-chart', label: 'کارشناسی موتر', color: '#2196f3' },
                        { icon: 'fa-solid fa-building-shield', label: 'نمایشگاه همکار', color: '#ff9800' },
                        { icon: 'fa-solid fa-file-signature', label: 'امور حقوقی', color: '#e91e63' }
                    ].map((service, idx) => (
                        <div key={idx} className="glass hover-lift" style={{ 
                            minWidth: '100px', padding: '15px 10px', borderRadius: '20px', textAlign: 'center',
                            border: '1px solid rgba(255,255,255,0.05)', flexShrink: 0, scrollSnapAlign: 'start'
                        }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', margin: '0 auto 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: service.color }}>
                                <i className={service.icon} style={{ fontSize: '18px' }}></i>
                            </div>
                            <div style={{ fontSize: '10px', fontWeight: '900', color: '#fff' }}>{service.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Category Filter Pills */}
            <div style={{ padding: '5px 24px 25px', display: 'flex', gap: '10px' }}>
                <div 
                    onClick={() => handleTabChange('cars')}
                    className="hover-lift"
                    style={{
                        flex: 1, padding: '14px 0', borderRadius: '25px', textAlign: 'center',
                        background: viewType === 'cars' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.02)',
                        color: viewType === 'cars' ? '#000' : 'rgba(255,255,255,0.4)',
                        fontWeight: '900', fontSize: '13px', cursor: 'pointer',
                        transition: '0.4s', border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: viewType === 'cars' ? '0 10px 20px rgba(212, 175, 55, 0.2)' : 'none'
                    }}
                >
                    مـوترهـای مـدرن
                </div>
                <div 
                    onClick={() => handleTabChange('properties')}
                    className="hover-lift"
                    style={{
                        flex: 1, padding: '14px 0', borderRadius: '25px', textAlign: 'center',
                        background: viewType === 'properties' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.02)',
                        color: viewType === 'properties' ? '#000' : 'rgba(255,255,255,0.4)',
                        fontWeight: '900', fontSize: '13px', cursor: 'pointer',
                        transition: '0.4s', border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: viewType === 'properties' ? '0 10px 20px rgba(212, 175, 55, 0.2)' : 'none'
                    }}
                >
                    امـلاک پـرمـیـوم
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid-layout">
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
