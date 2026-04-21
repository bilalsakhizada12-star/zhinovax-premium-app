const AssetCard = ({ data, type, onClick }) => {
    const isCar = type === 'car';

    return (
        <div 
            onClick={() => onClick(type, data.id)}
            className="glass hover-lift gsap-reveal"
            style={{
                width: '100%', borderRadius: '32px', padding: '10px',
                marginBottom: '10px', cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
                background: 'rgba(255,255,255,0.01)',
                transition: 'all 0.4s ease'
            }}
        >
            {/* Price Chip - High Visibility */}
            <div style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
                color: 'var(--gold-primary)', padding: '6px 14px', borderRadius: '16px',
                fontSize: '11px', fontWeight: '900', zIndex: 10,
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
            }}>
                {data.price}
            </div>

            {/* Media Container */}
            <div style={{
                width: '100%', height: '180px', borderRadius: '24px',
                backgroundImage: `url(${data.image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                marginBottom: '12px', position: 'relative',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
                {/* Visual Glow behind image */}
                <div style={{
                    position: 'absolute', inset: 0, 
                    boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
                    borderRadius: '24px'
                }}></div>
            </div>

            {/* Content Section */}
            <div style={{ padding: '0 10px 10px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                     <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.4)' }}>
                        {isCar ? 'Automotive' : 'Estate'}
                    </div>
                    {isCar && (
                        <div style={{ fontSize: '9px', color: 'var(--gold-primary)', fontWeight: 'bold' }}>
                            {data.fuel}
                        </div>
                    )}
                </div>
                
                <h4 style={{ 
                    margin: '0 0 15px', fontSize: '16px', fontWeight: '700', 
                    color: '#fff', letterSpacing: '-0.5px', lineHeight: '1.2'
                }}>{data.title}</h4>
                
                <div style={{ 
                    display: 'flex', gap: '8px', flexWrap: 'wrap', 
                    justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' 
                }}>
                    <div className="badge-item" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{isCar ? (data.transmission || 'نامشخص') : (data.bedrooms ? data.bedrooms + ' اتاق' : 'تماس بگیرید')}</span>
                        <i className={isCar ? "fa-solid fa-bolt-lightning" : "fa-solid fa-bed"} style={{ fontSize: '9px', color: 'var(--gold-primary)' }}></i>
                    </div>
                    <div className="badge-item" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>{isCar ? (data.mileage?.split(' ')[1] || data.mileage || '0') : (data.location ? data.location.split('،')[0] : 'نامشخص')}</span>
                        <i className={isCar ? "fa-solid fa-gauge" : "fa-solid fa-location-arrow"} style={{ fontSize: '9px', color: 'var(--gold-primary)' }}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AssetCard = AssetCard;
