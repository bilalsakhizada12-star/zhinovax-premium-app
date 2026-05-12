const Home = ({ cars, properties, loading, connectionError, onOpenDetail, onLogin }) => {
    const AssetCard = window.AssetCard;
    const [viewType, setViewType] = React.useState('cars'); // 'cars' or 'properties'
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleTabChange = (type) => {
        if (viewType === type) return;
        setViewType(type);
    };

    const normalize = (text) => {
        if (!text) return '';
        return text.toLowerCase()
            .replace(/ي/g, 'ی')
            .replace(/ك/g, 'ک')
            .trim();
    };

    const filteredCars = (cars || []).filter(car => {
        const term = normalize(searchTerm);
        const titleMatch = normalize(car.title).includes(term);
        const regMatch = normalize(car.reg_no).includes(term);
        const fuelMatch = normalize(car.fuel).includes(term);
        const transMatch = normalize(car.transmission).includes(term);
        return car.type === 'car' && (titleMatch || regMatch || fuelMatch || transMatch);
    });

    const filteredProps = (properties || []).filter(prop => {
        const term = normalize(searchTerm);
        const titleMatch = normalize(prop.title).includes(term);
        const locMatch = normalize(prop.location).includes(term);
        const addrMatch = normalize(prop.address).includes(term);
        const areaMatch = normalize(prop.area).includes(term);
        return prop.type === 'property' && (titleMatch || locMatch || addrMatch || areaMatch);
    });

    const activeAssets = viewType === 'cars' ? filteredCars : filteredProps;

    const SkeletonCard = () => (
        <div className="glass shimmer-wrapper skeleton" style={{ height: '280px', width: '100%', marginBottom: '15px', overflow: 'hidden' }}>
            {/* Box for image */}
            <div style={{ height: '180px', width: '100%', background: 'rgba(255,255,255,0.02)' }}></div>
            <div style={{ padding: '15px' }}>
                <div className="skeleton" style={{ height: '15px', width: '70%', background: 'rgba(255,255,255,0.05)', marginBottom: '10px' }}></div>
                <div className="skeleton" style={{ height: '10px', width: '40%', background: 'rgba(255,255,255,0.03)' }}></div>
            </div>
        </div>
    );

    const FeaturedSlider = () => {
        const featured = (viewType === 'cars' ? (cars || []) : (properties || [])).slice(0, 3);
        if (featured.length === 0) return null;
        
        return (
            <div className="no-scrollbar" style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '0 24px 30px', scrollSnapType: 'x mandatory' }}>
                {featured.map((item, idx) => (
                    <div key={idx} onClick={() => onOpenDetail(viewType === 'cars' ? 'car' : 'property', item.id)} style={{ 
                        minWidth: '280px', height: '160px', borderRadius: '30px', position: 'relative', overflow: 'hidden', 
                        scrollSnapAlign: 'center', cursor: 'pointer', border: '1px solid var(--border-glass)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.4)', background: 'rgba(255,255,255,0.02)'
                    }}>
                        <div style={{ 
                            width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center',
                            backgroundImage: `url(${item.image_url || 'https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=800&auto=format&fit=crop'})`, opacity: 0.6
                        }}></div>
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,10,13,0.9), transparent)' }}></div>
                        <div style={{ position: 'absolute', bottom: '15px', right: '20px', textAlign: 'right' }}>
                            <div style={{ color: 'var(--gold-primary)', fontSize: '10px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>پیشنهاد ویـژه</div>
                            <div style={{ color: '#fff', fontSize: '16px', fontWeight: '900' }}>{item.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="screen home-screen" style={{ paddingBottom: '120px' }}>
            {/* Prestige Header */}
            <div style={{ 
                padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5, 10, 13, 0.85)',
                backdropFilter: 'blur(40px)', borderBottom: '1px solid var(--border-glass)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <div onClick={onLogin} className="hover-lift" style={{ 
                    width: '45px', height: '45px', borderRadius: '15px', 
                    background: 'var(--gold-gradient)', display: 'flex', justifyContent: 'center', 
                    alignItems: 'center', color: '#000', cursor: 'pointer',
                    boxShadow: 'var(--gold-glow)'
                }}>
                    <i className="fa-solid fa-user-crown" style={{ fontSize: '20px' }}></i>
                </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <img 
                        src="https://i.postimg.cc/W3MnzMzh/jjj.png" 
                        style={{ height: '34px', filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.4))' }} 
                        alt="Zhinovax"
                    />
                </div>

                <div style={{ width: '40px' }}></div>
            </div>

            {/* Premium Header Logo Area */}
            <div style={{ padding: '25px 24px 10px', textAlign: 'center' }}>
                <div style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '8px 20px', borderRadius: '20px', background: 'rgba(212,175,55,0.05)',
                    border: '1px solid rgba(212,175,55,0.1)'
                }}>
                    <i className="fa-solid fa-gem" style={{ color: 'var(--gold-primary)', fontSize: '14px' }}></i>
                    <span style={{ 
                        color: 'var(--gold-primary)', fontSize: '13px', fontWeight: '900', 
                        letterSpacing: '3px', textTransform: 'uppercase' 
                    }}>Zhinovax Premium</span>
                </div>
            </div>

            {/* Premium Search Hero */}
            <div style={{ padding: '15px 24px 20px' }}>
                <div className="glass" style={{ 
                    padding: '8px 8px 8px 15px', borderRadius: '24px', display: 'flex', 
                    alignItems: 'center', gap: '15px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                }}>
                    <div style={{ 
                        width: '50px', height: '50px', background: 'var(--gold-gradient)', 
                        borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        boxShadow: 'var(--gold-glow)', flexShrink: 0
                    }}>
                        <i className="fa-solid fa-magnifying-glass" style={{ color: '#000', fontSize: '22px' }}></i>
                    </div>

                    <input 
                        type="text"
                        placeholder={viewType === 'cars' ? 'جستجوی مدل خاص...' : 'منطقه مورد نظر شما...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            flex: 1, background: 'transparent', border: 'none', color: '#fff',
                            fontSize: '16px', fontWeight: '400', outline: 'none', padding: '12px 0',
                            textAlign: 'right', fontFamily: 'inherit'
                        }}
                    />
                </div>
            </div>

            {/* Featured Slider */}
            {!searchTerm && <FeaturedSlider />}

            {/* Partner Services Section */}
            <div style={{ padding: '10px 0 10px' }}>
                <div style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '900', color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>کاتالوگ خدمات ویـژه</span>
                    <i className="fa-solid fa-star" style={{ color: 'var(--gold-primary)', fontSize: '10px' }}></i>
                </div>
                <div className="no-scrollbar" style={{ display: 'flex', gap: '18px', overflowX: 'auto', padding: '5px 24px', scrollSnapType: 'x mandatory' }}>
                    {[
                        { icon: 'fa-solid fa-handshake-angle', label: 'تسهیلات بانکی', color: '#4caf50' },
                        { icon: 'fa-solid fa-magnifying-glass-chart', label: 'کارشناسی موتر', color: '#2196f3' },
                        { icon: 'fa-solid fa-building-shield', label: 'نمایشگاه همکار', color: '#ff9800' },
                        { icon: 'fa-solid fa-file-signature', label: 'امور حقوقی', color: '#e91e63' }
                    ].map((service, idx) => (
                        <div key={idx} className="glass hover-lift" style={{ 
                            minWidth: '105px', padding: '20px 10px', borderRadius: '24px', textAlign: 'center',
                            border: '1px solid var(--border-glass)', flexShrink: 0, scrollSnapAlign: 'start',
                            background: 'rgba(255,255,255,0.01)'
                        }}>
                            <div style={{ width: '44px', height: '44px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', margin: '0 auto 12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: service.color, boxShadow: 'inset 0 0 10px rgba(255,255,255,0.02)' }}>
                                <i className={service.icon} style={{ fontSize: '20px' }}></i>
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: '700', color: '#fff' }}>{service.label}</div>
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
            <div key={viewType} className="grid-layout">
                {loading ? (
                    [1,2,3,4].map(n => <SkeletonCard key={n} />)
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
