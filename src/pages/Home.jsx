const Home = ({ cars, properties, loading, connectionError, onOpenDetail, onLogin }) => {
    const AssetCard = window.AssetCard;
    const [viewType, setViewType] = React.useState('cars'); // 'cars' or 'properties'

    React.useEffect(() => {
        if (!loading) {
            gsap.fromTo('.gsap-reveal', 
                { opacity: 0, y: 30 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.08, 
                    ease: 'power3.out'
                }
            );
        }
    }, [loading, viewType]);

    const handleTabChange = (type) => {
        if (viewType === type) return;
        gsap.to('.grid-layout', { opacity: 0, scale: 0.98, duration: 0.3, onComplete: () => {
            setViewType(type);
            gsap.to('.grid-layout', { opacity: 1, scale: 1, duration: 0.4, delay: 0.1 });
        }});
    };

    return (
        <div className="screen home-screen" style={{ paddingBottom: '120px' }}>
            {/* Premium Header */}
            <div style={{ 
                padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5, 16, 20, 0.95)',
                backdropFilter: 'blur(25px)', borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="hover-lift" style={{ 
                        background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px',
                        color: 'var(--gold-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <i className="fa-solid fa-bars-staggered" style={{ fontSize: '18px' }}></i>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <button className="hover-lift" onClick={onLogin} style={{ 
                        background: 'var(--gold-gradient)', color: '#000', border: 'none', 
                        padding: '10px 24px', borderRadius: '30px', fontWeight: '900', fontSize: '12px', 
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                    }}>ورود VIP</button>
                    <img 
                        src="https://i.postimg.cc/W3MnzMzh/jjj.png" 
                        style={{ height: '32px', width: 'auto', objectFit: 'contain' }} 
                        alt="Zhinovax Logo"
                    />
                </div>
            </div>

            {/* Hero Search Section */}
            <div style={{ padding: '20px 20px 10px' }}>
                <div className="glass" style={{ 
                    padding: '20px', borderRadius: '25px', display: 'flex', 
                    alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'
                }}>
                    <div className="hover-lift" style={{ 
                        background: 'rgba(5, 16, 20, 0.4)', padding: '12px', borderRadius: '14px', 
                        color: 'var(--gold-primary)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer'
                    }}>
                        <i className="fa-solid fa-sliders" style={{ fontSize: '18px' }}></i>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: '#fff' }}>
                            {viewType === 'cars' ? 'خودرو رویایی خود را پیدا کنید' : 'املاک لوکس خود را پیدا کنید'}
                        </h3>
                        <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>مجموعه ممتاز زینوواکس</p>
                    </div>
                    
                    <div style={{ 
                        width: '45px', height: '45px', background: 'var(--gold-primary)', 
                        borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        boxShadow: '0 5px 15px rgba(212, 175, 55, 0.2)'
                    }}>
                        <i className="fa-solid fa-magnifying-glass" style={{ color: '#000', fontSize: '18px' }}></i>
                    </div>
                </div>
            </div>

            {/* Category Tabs - Karwwan Parity */}
            <div style={{ padding: '15px 20px 25px', display: 'flex', gap: '12px' }}>
                <div 
                    onClick={() => handleTabChange('cars')}
                    className="hover-lift"
                    style={{
                        flex: 1, padding: '12px 0', borderRadius: '16px', textAlign: 'center',
                        background: viewType === 'cars' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.03)',
                        color: viewType === 'cars' ? '#000' : 'var(--text-muted)',
                        fontWeight: '900', fontSize: '14px', cursor: 'pointer',
                        transition: '0.3s', border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: viewType === 'cars' ? '0 5px 15px rgba(212, 175, 55, 0.2)' : 'none'
                    }}
                >
                    <i className="fa-solid fa-car" style={{ marginLeft: '8px' }}></i>
                    خودروها
                </div>
                <div 
                    onClick={() => handleTabChange('properties')}
                    className="hover-lift"
                    style={{
                        flex: 1, padding: '12px 0', borderRadius: '16px', textAlign: 'center',
                        background: viewType === 'properties' ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.03)',
                        color: viewType === 'properties' ? '#000' : 'var(--text-muted)',
                        fontWeight: '900', fontSize: '14px', cursor: 'pointer',
                        transition: '0.3s', border: '1px solid rgba(255,255,255,0.05)',
                        boxShadow: viewType === 'properties' ? '0 5px 15px rgba(212, 175, 55, 0.2)' : 'none'
                    }}
                >
                    <i className="fa-solid fa-building" style={{ marginLeft: '8px' }}></i>
                    املاک
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid-layout">
                {viewType === 'cars' ? (
                    loading && cars.length === 0 ? (
                        <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                             <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}></i>
                             بارگذاری...
                        </div>
                    ) : cars.map(car => (
                        <div key={car.id} className="gsap-reveal">
                            <AssetCard data={car} type="car" onClick={onOpenDetail} />
                        </div>
                    ))
                ) : (
                    loading && properties.length === 0 ? (
                        <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                             <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}></i>
                             بارگذاری...
                        </div>
                    ) : properties.map(prop => (
                        <div key={prop.id} className="gsap-reveal">
                            <AssetCard data={prop} type="property" onClick={onOpenDetail} />
                        </div>
                    ))
                )}
            </div>

            {/* Empty State */}
            {((viewType === 'cars' && cars.length === 0) || (viewType === 'properties' && properties.length === 0)) && !loading && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <i className="fa-solid fa-box-open" style={{ fontSize: '40px', color: 'rgba(255,255,255,0.1)', marginBottom: '15px' }}></i>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>هیچ موردی در این دسته‌بندی یافت نشد.</p>
                </div>
            )}
        </div>
    );
};

window.Home = Home;
