const Detail = ({ asset, onBack }) => {
    const CheckoutModal = window.CheckoutModal;
    const [showCheckout, setShowCheckout] = React.useState(false);
    if (!asset) return null;
    const isCar = asset.type === 'car';

    return (
        <div className="screen" style={{ overflowY: 'auto', paddingBottom: '140px', background: 'var(--bg-dark)' }}>
            {/* Header - EXACT Matching Icons from Screenshot 2 */}
            <div style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '15px 20px', position: 'sticky', top: 0, 
                background: 'var(--bg-dark)', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.04)'
            }}>
                <div onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '900', color: '#fff' }}>
                     <i className="fa-solid fa-chevron-left"></i> جزئیات {isCar ? 'موتر' : 'آپارتمان'}
                </div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '18px', color: '#fff' }}>
                    <i className="fa-solid fa-circle-info"></i>
                    <i className="fa-solid fa-share-nodes"></i>
                    <i className="fa-regular fa-heart"></i>
                </div>
            </div>

            <div style={{ padding: '0' }}>
                {/* Main Media Section with Large Badge and Gallery */}
                <div style={{ position: 'relative', width: '100%', height: '260px' }}>
                    <div style={{ 
                        width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center',
                        backgroundImage: `url('${asset.image_url}')`
                    }}></div>
                    <div style={{ 
                        position: 'absolute', bottom: '15px', right: '15px', 
                        background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 15px', 
                        borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' 
                    }}>۱/۱۲</div>
                    <div style={{ 
                        position: 'absolute', bottom: '15px', left: '15px', 
                        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: '#fff', 
                        padding: '4px 12px', borderRadius: '15px', fontSize: '11px', 
                        display: 'flex', alignItems: 'center', gap: '5px' 
                    }}>
                        <span>۵,۱۸۱</span>
                        <i className="fa-solid fa-eye"></i>
                    </div>
                </div>

                {/* Thumbnails Scroller below Main Image */}
                <div className="scroller" style={{ padding: '15px 20px', borderBottom: '1px solid var(--border-glass)' }}>
                    {[1,2,3,4,5].map(i => (
                        <div key={i} style={{ 
                            width: '85px', height: '65px', borderRadius: '15px', flexShrink: 0,
                            backgroundImage: `url(${asset.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center',
                            border: i === 5 ? '2px solid #0084ad' : '1px solid rgba(255,255,255,0.1)'
                        }}></div>
                    ))}
                </div>

                <div style={{ padding: '20px' }}>
                    <div style={{ textAlign: 'right', marginBottom: '25px' }}>
                        <div style={{ 
                            display: 'inline-block', background: 'rgba(0,132,173,0.1)', color: '#0084ad',
                            padding: '4px 15px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', marginBottom: '10px'
                        }}>رجستر: {asset.reg_no}</div>
                        <h1 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 5px', color: '#fff' }}>{asset.title}</h1>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: '#0084ad' }}>{asset.price}</div>
                    </div>

                    {/* Specification Grid in Mini-Cards for Professional Layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                        {isCar ? (
                            <>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>سابقه تصادف</div>
                                    <div style={{fontWeight: '900', color: '#ff4444'}}>{asset.accident_history}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>گیربکس</div>
                                    <div style={{fontWeight: '900'}}>{asset.transmission}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>سلندر</div>
                                    <div style={{fontWeight: '900'}}>{asset.engine}</div>
                                    <i className="fa-solid fa-cogs" style={{fontSize: '10px', color: 'var(--gold-primary)', marginTop: '5px'}}></i>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px'}}>اسناد</div>
                                    <div style={{fontWeight: '900'}}>{asset.docs}</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>منزل</div><div style={{fontWeight: '900'}}>{asset.floor}</div>
                                </div>
                                <div className="glass" style={{ padding: '15px', textAlign: 'right' }}>
                                    <div style={{fontSize: '11px', color: 'var(--text-muted)'}}>مساحت</div><div style={{fontWeight: '900'}}>{asset.area}</div>
                                </div>
                            </>
                        )}
                    </div>
                    
                    {/* Detailed Features Section */}
                    <div className="glass" style={{ padding: '20px', marginBottom: '30px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '20px', textAlign: 'right', color: '#fff' }}>ویژگی‌ها و امکانات</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', textAlign: 'right' }}>
                            {isCar ? asset.features.map((f, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', fontSize: '13px' }}>
                                    <span style={{ color: '#fff' }}>{f}</span>
                                    <i className="fa-solid fa-check" style={{ color: '#0084ad', fontSize: '14px' }}></i>
                                </div>
                            )) : Object.entries(asset.amenities).map(([k, v], i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', fontSize: '13px' }}>
                                    <span style={{ color: '#fff' }}>{v}</span>
                                    <i className="fa-solid fa-check" style={{ color: '#0084ad', fontSize: '14px' }}></i>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING ACTION BAR - GREEN WA & BLUE CALL (Screenshot 2 Match) */}
            <div style={{ 
                position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', 
                width: '100%', maxWidth: '420px', padding: '15px 20px', 
                background: 'var(--bg-dark)', borderTop: '1px solid rgba(255,255,255,0.05)', 
                display: 'flex', gap: '15px', alignItems: 'center', zIndex: 1000 
            }}>
                <div style={{ 
                    width: '60px', height: '60px', background: '#25d366', borderRadius: '18px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff',
                    boxShadow: '0 8px 24px rgba(37, 211, 102, 0.2)', cursor: 'pointer'
                }}>
                    <i className="fa-brands fa-whatsapp" style={{ fontSize: '32px' }}></i>
                </div>

                <div onClick={() => setShowCheckout(true)} style={{ 
                    flex: 1, height: '60px', background: '#0084ad', borderRadius: '15px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    color: '#fff', fontSize: '17px', fontWeight: '900', gap: '12px', cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0, 132, 173, 0.2)'
                }}>
                    <span>تماس با فروشنده</span>
                    <i className="fa-solid fa-phone-flip"></i>
                </div>
            </div>

            {showCheckout && (
                <CheckoutModal 
                    asset={asset} 
                    onClose={() => setShowCheckout(false)} 
                    onSuccess={() => {
                        setShowCheckout(false);
                        onBack();
                    }} 
                />
            )}
        </div>
    );
};

window.Detail = Detail;
