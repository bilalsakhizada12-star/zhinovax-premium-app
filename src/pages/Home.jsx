const Home = ({ cars, properties, loading, connectionError, onOpenDetail, onLogin }) => {
    const AssetCard = window.AssetCard;

    React.useEffect(() => {
        if (!loading) {
            gsap.fromTo('.gsap-reveal', 
                { opacity: 0, y: 30 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.1, 
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.grid-layout',
                        start: 'top 80%'
                    }
                }
            );
        }
    }, [loading, cars, properties]);

    return (
        <div className="screen home-screen" style={{ paddingBottom: '120px' }}>
            {/* Premium Header - Parity with Karwwan */}
            <div style={{ 
                padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5, 16, 20, 0.9)',
                backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="hover-lift" style={{ 
                        background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px',
                        color: 'var(--gold-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <i className="fa-solid fa-bars-staggered" style={{ fontSize: '18px' }}></i>
                    </div>
                    {loading && <span style={{ fontSize: '10px', color: 'var(--gold-primary)', animation: 'pulse 1.5s infinite' }}>درحال اتصال...</span>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <button className="hover-lift" onClick={onLogin} style={{ 
                        background: 'var(--gold-gradient)', color: '#000', border: 'none', 
                        padding: '10px 24px', borderRadius: '30px', fontWeight: '900', fontSize: '13px', 
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                    }}>ورود</button>
                    <img 
                        src="https://i.postimg.cc/W3MnzMzh/jjj.png" 
                        style={{ height: '32px', width: 'auto', objectFit: 'contain' }} 
                        alt="Zhinovax Logo"
                    />
                </div>
            </div>

            {/* Hero Search Section - Parity with Karwwan */}
            <div style={{ padding: '20px' }}>
                <div className="glass" style={{ 
                    padding: '20px', borderRadius: '24px', display: 'flex', 
                    alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)'
                }}>
                    <div className="hover-lift" style={{ 
                        background: 'rgba(5, 16, 20, 0.4)', padding: '12px', borderRadius: '14px', 
                        color: 'var(--gold-primary)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer'
                    }}>
                        <i className="fa-solid fa-sliders" style={{ fontSize: '18px' }}></i>
                    </div>
                    
                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '900', color: '#fff' }}>دارایی رویایی خود را پیدا کنید</h3>
                            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>مجموعه ممتاز زینوواکس را مرور کنید</p>
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
            </div>

            {/* Section Heading */}
            <div style={{ padding: '10px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--gold-primary)', cursor: 'pointer' }}>مشاهده همه</div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: 0 }}>آخرین خودروها</h3>
            </div>

            {/* Vertical Grid - Main Content */}
            <div className="grid-layout">
                {loading && (cars.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '24px', marginBottom: '10px', display: 'block' }}></i>
                        <span>درحال بارگذاری خودروها...</span>
                    </div>
                ) : cars.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>چیزی یافت نشد.</div>
                ) : (
                    cars.map(car => (
                        <AssetCard key={car.id} data={car} type="car" onClick={onOpenDetail} />
                    ))
                )}
            </div>

            {/* Real Estate Section Heading */}
            <div style={{ padding: '20px 25px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: 'var(--gold-primary)', cursor: 'pointer' }}>مشاهده همه</div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: 0 }}>املاک ویژه</h3>
            </div>

            <div className="grid-layout">
                {loading && (properties.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>...</div>
                ) : (
                    properties.map(prop => (
                        <AssetCard key={prop.id} data={prop} type="property" onClick={onOpenDetail} />
                    ))
                )}
            </div>
        </div>
    );
};

window.Home = Home;

window.Home = Home;
