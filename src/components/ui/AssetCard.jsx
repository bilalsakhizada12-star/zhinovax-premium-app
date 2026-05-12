const AssetCard = ({ data, type, onClick }) => {
    const isCar = type === 'car';

    return (
        <div 
            onClick={() => onClick(type, data.id)}
            className="glass hover-lift"
            style={{
                width: '100%', borderRadius: '28px', padding: '12px',
                marginBottom: '10px', cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                border: '1px solid var(--border-glass)'
            }}
        >
            {/* Price Badge - Ultra Premium */}
            <div style={{
                position: 'absolute', top: '22px', right: '22px',
                background: 'var(--gold-gradient)', 
                color: '#000', padding: '8px 18px', borderRadius: '14px',
                fontSize: '12px', fontWeight: '900', zIndex: 10,
                boxShadow: 'var(--gold-glow)',
                transform: 'rotate(2deg)'
            }}>
                {data.price}
            </div>

            {/* Media Container */}
            <div style={{
                width: '100%', height: '185px', borderRadius: '20px',
                backgroundImage: `url(${data.image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800'})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                marginBottom: '15px', position: 'relative',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                {/* Visual Gradient Overlay */}
                <div style={{
                    position: 'absolute', inset: 0, 
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6))',
                    borderRadius: '20px'
                }}></div>
            </div>

            {/* Content Section */}
            <div style={{ padding: '0 5px 5px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                     <div style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', color: 'var(--gold-primary)', letterSpacing: '0.5px' }}>
                        {isCar ? 'Automotive' : 'Estate'}
                    </div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 'bold' }}>
                        {isCar ? data.fuel : (data.area || 'Premium')}
                    </div>
                </div>
                
                <h4 style={{ 
                    margin: '0 0 15px', fontSize: '18px', fontWeight: '900', 
                    color: '#fff', letterSpacing: '-0.3px', lineHeight: '1.2'
                }}>{data.title}</h4>
                
                <div style={{ 
                    display: 'flex', gap: '10px', flexWrap: 'wrap', 
                    justifyContent: 'flex-end', borderTop: '1px solid var(--border-glass)', paddingTop: '15px' 
                }}>
                    <div className="badge-item" style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{isCar ? (data.transmission || 'Auto') : (data.bedrooms ? data.bedrooms + ' Bed' : 'Contact')}</span>
                        <i className={isCar ? "fa-solid fa-gear" : "fa-solid fa-bed"} style={{ fontSize: '10px', color: 'var(--gold-primary)' }}></i>
                    </div>
                    <div className="badge-item" style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{isCar ? (data.reg_no?.split(' ')[1] || 'VIP') : (data.location ? data.location.split('،')[0] : 'Kabul')}</span>
                        <i className={isCar ? "fa-solid fa-id-card" : "fa-solid fa-location-dot"} style={{ fontSize: '10px', color: 'var(--gold-primary)' }}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AssetCard = AssetCard;
