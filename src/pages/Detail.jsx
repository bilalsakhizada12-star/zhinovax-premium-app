const Detail = ({ asset, onBack }) => {
    const CheckoutModal = window.CheckoutModal;
    const [showCheckout, setShowCheckout] = React.useState(false);
    const [isFav, setIsFav] = React.useState(false);
    
    if (!asset) return null;
    const isCar = asset.type === 'car';

    // Check if already in favorites on load
    React.useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('zhinovax_favorites') || '[]');
        setIsFav(favs.some(f => f.id === asset.id));
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

    // Safe accessors for fields that may be missing in Supabase-added cars
    const features = Array.isArray(asset.features) ? asset.features : [];
    const amenities = asset.amenities && typeof asset.amenities === 'object' ? asset.amenities : {};

    return (
        <div className="screen" style={{ overflowY: 'auto', paddingBottom: '140px', background: 'var(--bg-dark)' }}>
            {/* Header */}
            <div style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '15px 20px', position: 'sticky', top: 0, 
                background: 'var(--bg-dark)', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.04)'
            }}>
                <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '900', color: '#fff' }}>
                     <i className="fa-solid fa-chevron-left"></i> جزئیات {isCar ? 'موتر' : 'آپارتمان'}
                </div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '18px', color: '#fff' }}>
                    <i className="fa-solid fa-circle-info" style={{ cursor: 'pointer', opacity: 0.7 }}></i>
                    <i onClick={handleShare} className="fa-solid fa-share-nodes" style={{ cursor: 'pointer', color: '#0084ad' }}></i>
                    <i onClick={handleFavorite} className={isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'} style={{ cursor: 'pointer', color: isFav ? '#ff4b5c' : '#fff', transition: 'color 0.2s' }}></i>
                </div>
            </div>

            <div style={{ padding: '0' }}>
                {/* Main Image */}
                <div style={{ position: 'relative', width: '100%', height: '260px' }}>
                    <div style={{ 
                        width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center',
                        backgroundImage: asset.image_url ? `url('${asset.image_url}')` : `url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800')`,
                        backgroundColor: '#0a1f26'
                    }}></div>
                    <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 15px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>۱/۱</div>
                    <div style={{ position: 'absolute', bottom: '15px', left: '15px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: '#fff', padding: '4px 12px', borderRadius: '15px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>{asset.views || '---'}</span>
                        <i className="fa-solid fa-eye"></i>
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="scroller" style={{ padding: '15px 20px', borderBottom: '1px solid var(--border-glass)' }}>
                    {[1,2,3,4].map(i => (
                        <div key={i} style={{ 
                            width: '85px', height: '65px', borderRadius: '15px', flexShrink: 0,
                            backgroundImage: asset.image_url ? `url(${asset.image_url})` : `url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400')`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}></div>
                    ))}
                </div>

                <div style={{ padding: '20px' }}>
                    <div style={{ textAlign: 'right', marginBottom: '25px' }}>
                        <div style={{ display: 'inline-block', background: 'rgba(0,132,173,0.1)', color: '#0084ad', padding: '4px 15px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>
                            رجستر: {asset.reg_no || '---'}
                        </div>
                        <h1 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 5px', color: '#fff' }}>{asset.title}</h1>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: '#0084ad' }}>{asset.price}</div>
                    </div>

                    {/* Specification Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                        {isCar ? (
                            <>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>سابقه تصادف</div>
                                    <div style={{fontWeight: '900', color: asset.accident_history ? '#ff4444' : 'var(--text-muted)'}}>{asset.accident_history || '---'}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>گیربکس</div>
                                    <div style={{fontWeight: '900'}}>{asset.transmission || '---'}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>موتر</div>
                                    <div style={{fontWeight: '900'}}>{asset.engine || '---'}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>موقعیت</div>
                                    <div style={{fontWeight: '900'}}>{asset.location || '---'}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>کارکرد</div>
                                    <div style={{fontWeight: '900'}}>{asset.mileage || '---'}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>سوخت</div>
                                    <div style={{fontWeight: '900'}}>{asset.fuel || '---'}</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>منزل</div><div style={{fontWeight: '900'}}>{asset.floor || '---'}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>مساحت</div><div style={{fontWeight: '900'}}>{asset.area || '---'}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>اتاق‌ها</div><div style={{fontWeight: '900'}}>{asset.rooms || '---'}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>موقعیت</div><div style={{fontWeight: '900'}}>{asset.location || '---'}</div>
                                </div>
                            </>
                        )}
                    </div>
                    
                    {/* Features if available */}
                    {features.length > 0 && (
                        <div className="glass" style={{ padding: '20px', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '20px', textAlign: 'right', color: '#fff' }}>ویژگی‌ها و امکانات</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', textAlign: 'right' }}>
                                {features.map((f, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', fontSize: '13px' }}>
                                        <span style={{ color: '#fff' }}>{f}</span>
                                        <i className="fa-solid fa-check" style={{ color: '#0084ad', fontSize: '14px' }}></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {Object.keys(amenities).length > 0 && (
                        <div className="glass" style={{ padding: '20px', marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '20px', textAlign: 'right', color: '#fff' }}>امکانات</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', textAlign: 'right' }}>
                                {Object.entries(amenities).map(([k, v], i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', fontSize: '13px' }}>
                                        <span style={{ color: '#fff' }}>{v}</span>
                                        <i className="fa-solid fa-check" style={{ color: '#0084ad', fontSize: '14px' }}></i>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Action Bar */}
            <div style={{ 
                position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', 
                width: '100%', maxWidth: '420px', padding: '15px 20px', 
                background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.05)', 
                display: 'flex', gap: '15px', alignItems: 'center', zIndex: 1000 
            }}>
                <a href="https://wa.me/93700000000" target="_blank" style={{ textDecoration: 'none' }}>
                    <div style={{ width: '60px', height: '60px', background: '#25d366', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', cursor: 'pointer' }}>
                        <i className="fa-brands fa-whatsapp" style={{ fontSize: '32px' }}></i>
                    </div>
                </a>
                <div onClick={() => setShowCheckout(true)} style={{ 
                    flex: 1, height: '60px', background: '#0084ad', borderRadius: '15px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    color: '#fff', fontSize: '17px', fontWeight: '900', gap: '12px', cursor: 'pointer'
                }}>
                    <span>تماس با فروشنده</span>
                    <i className="fa-solid fa-phone-flip"></i>
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
