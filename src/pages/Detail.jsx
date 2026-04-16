const Detail = ({ asset, onBack }) => {
    const CheckoutModal = window.CheckoutModal;
    const [showCheckout, setShowCheckout] = React.useState(false);
    const [isFav, setIsFav] = React.useState(false);
    const [views, setViews] = React.useState(0);
    
    if (!asset) return null;
    const isCar = asset.type === 'car';

    React.useEffect(() => {
        gsap.fromTo('.detail-content', 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
        
        // Favorites
        const favs = JSON.parse(localStorage.getItem('zhinovax_favorites') || '[]');
        setIsFav(favs.some(f => f.id === asset.id));

        // View Counter Logic
        const viewed = JSON.parse(localStorage.getItem('zhinovax_viewed') || '[]');
        let currentViews = typeof asset.views === 'number' ? asset.views : parseInt((asset.views || '0').toString().replace(/,/g, '')) || 1240;
        
        if (!viewed.includes(asset.id)) {
            currentViews += 1;
            viewed.push(asset.id);
            localStorage.setItem('zhinovax_viewed', JSON.stringify(viewed));
            asset.views = currentViews;
        }
        setViews(currentViews);
    }, [asset.id]);

    const handleFavorite = () => {
        const favs = JSON.parse(localStorage.getItem('zhinovax_favorites') || '[]');
        if (isFav) {
            const newFavs = favs.filter(f => f.id !== asset.id);
            localStorage.setItem('zhinovax_favorites', JSON.stringify(newFavs));
            setIsFav(false);
        } else {
            favs.push(asset);
            localStorage.setItem('zhinovax_favorites', JSON.stringify(favs));
            setIsFav(true);
        }
    };

    const handleShare = () => {
        const text = `${asset.title} - ${asset.price} | Zhinovax VIP`;
        if (navigator.share) {
            navigator.share({ title: 'Zhinovax VIP', text, url: window.location.href });
        } else {
            navigator.clipboard.writeText(text + '\n' + window.location.href);
            alert('لینک کپی شد!');
        }
    };

    const features = Array.isArray(asset.features) ? asset.features : [];

    return (
        <div className="screen detail-screen" style={{ overflowY: 'auto', paddingBottom: '140px', background: 'var(--bg-dark)' }}>
            {/* Transparent Header */}
            <div style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '20px', position: 'absolute', top: 0, left: 0, right: 0,
                zIndex: 100
            }}>
                <div onClick={onBack} className="hover-lift" style={{ 
                    background: 'rgba(5, 16, 20, 0.4)', padding: '12px', borderRadius: '14px', 
                    color: '#fff', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)'
                }}>
                     <i className="fa-solid fa-chevron-right"></i>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div onClick={handleShare} className="hover-lift" style={{ 
                        background: 'rgba(5, 16, 20, 0.4)', padding: '12px', borderRadius: '14px', 
                        color: 'var(--gold-primary)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <i className="fa-solid fa-share-nodes"></i>
                    </div>
                    <div onClick={handleFavorite} className="hover-lift" style={{ 
                        background: 'rgba(5, 16, 20, 0.4)', padding: '12px', borderRadius: '14px', 
                        color: isFav ? '#ff4b5c' : '#fff', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <i className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                    </div>
                </div>
            </div>

            {/* Main Image Banner */}
            <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
                <div style={{ 
                    width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center',
                    backgroundImage: asset.image_url ? `url('${asset.image_url}')` : `url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80')`,
                }}></div>
                <div style={{ 
                    position: 'absolute', inset: 0, 
                    background: 'linear-gradient(to bottom, rgba(5,16,20,0.4) 0%, transparent 40%, transparent 70%, var(--bg-dark) 100%)' 
                }}></div>
                
                <div style={{ position: 'absolute', bottom: '20px', left: '25px', display: 'flex', gap: '10px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '6px 15px', borderRadius: '12px', fontSize: '11px', backdropFilter: 'blur(5px)' }}>
                        <i className="fa-solid fa-eye" style={{ color: 'var(--gold-primary)', marginLeft: '6px' }}></i>
                        {views.toLocaleString()} مشاهده
                    </div>
                </div>
            </div>

            <div className="detail-content" style={{ padding: '0 25px' }}>
                {/* Title & Price */}
                <div style={{ textAlign: 'right', marginBottom: '30px' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(212,175,55,0.1)', color: 'var(--gold-primary)', padding: '5px 16px', borderRadius: '10px', fontSize: '11px', fontWeight: '900', marginBottom: '12px' }}>
                        رجستر: {asset.reg_no || '---'}
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#fff', margin: '0 0 8px' }}>{asset.title}</h1>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', gap: '8px' }}>
                         <span style={{ fontSize: '32px', fontWeight: '900', color: 'var(--gold-primary)' }}>{asset.price}</span>
                    </div>
                </div>

                {/* Primary Specs Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                    <div className="glass" style={{ padding: '18px', textAlign: 'right', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px'}}>موقعیت فعلی</div>
                        <div style={{fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px'}}>
                            {asset.location || 'کابل'} <i className="fa-solid fa-location-dot" style={{color: 'var(--gold-primary)'}}></i>
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '18px', textAlign: 'right', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px'}}>{isCar ? 'گیربکس' : 'مساحت'}</div>
                        <div style={{fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', direction: 'ltr'}}>
                            {isCar ? (asset.transmission || 'اوتومات') : (asset.area || '---')} <i className={isCar ? "fa-solid fa-gear" : "fa-solid fa-ruler-combined"} style={{color: 'var(--gold-primary)'}}></i>
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '18px', textAlign: 'right', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px'}}>{isCar ? 'کارکرد' : 'اتاق‌ها'}</div>
                        <div style={{fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', direction: 'ltr'}}>
                            {isCar ? (asset.mileage || '---') : (asset.bedrooms || '---')} <i className={isCar ? "fa-solid fa-gauge-high" : "fa-solid fa-door-open"} style={{color: 'var(--gold-primary)'}}></i>
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '18px', textAlign: 'right', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px'}}>{isCar ? 'نوع سوخت' : 'منزل'}</div>
                        <div style={{fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px'}}>
                             {isCar ? (asset.fuel || 'پترول') : (asset.floor || '---')} <i className={isCar ? "fa-solid fa-gas-pump" : "fa-solid fa-layer-group"} style={{color: 'var(--gold-primary)'}}></i>
                        </div>
                    </div>
                </div>

                {/* Features List */}
                <div className="glass" style={{ padding: '25px', marginBottom: '30px', background: 'rgba(255,255,255,0.02)' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '20px', textAlign: 'right', color: '#fff' }}>مشخصات و ویژگی‌ها</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                        {features.length > 0 ? features.map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                                <span>{f}</span>
                                <i className="fa-solid fa-circle-check" style={{ color: 'var(--gold-primary)' }}></i>
                            </div>
                        )) : (
                            <p style={{ textAlign: 'right', fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                                این دارایی شامل تمامی استانداردهای لوکس زینوواکس و گارانتی اصالت می‌باشد. جهت کسب اطلاعات بیشتر با کارشناسان ما تماس بگیرید.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Actions Bar */}
            <div style={{ 
                position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', 
                width: '100%', maxWidth: '420px', padding: '20px 25px 35px', 
                background: 'rgba(5, 16, 20, 0.95)', borderTop: '1px solid rgba(255,255,255,0.05)', 
                display: 'flex', gap: '15px', backdropFilter: 'blur(20px)', zIndex: 1000 
            }}>
                <a href="https://wa.me/93700000000" target="_blank" className="hover-lift" style={{ textDecoration: 'none' }}>
                    <div style={{ width: '60px', height: '60px', background: '#25d366', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', boxShadow: '0 5px 15px rgba(37, 211, 102, 0.3)' }}>
                        <i className="fa-brands fa-whatsapp" style={{ fontSize: '32px' }}></i>
                    </div>
                </a>
                <div onClick={() => setShowCheckout(true)} className="hover-lift pulse-gold" style={{ 
                    flex: 1, height: '60px', background: 'var(--gold-primary)', borderRadius: '20px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    color: '#000', fontSize: '17px', fontWeight: '900', gap: '12px', cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(212, 175, 55, 0.4)'
                }}>
                    <span>رزرو و تماس مستقیم</span>
                    <i className="fa-solid fa-phone-volume"></i>
                </div>
            </div>

            {showCheckout && (
                <CheckoutModal 
                    asset={asset} 
                    onClose={() => setShowCheckout(false)} 
                    onSuccess={() => { setShowCheckout(false); onBack(); }} 
                />
            )}
        </div>
    );
};

window.Detail = Detail;
