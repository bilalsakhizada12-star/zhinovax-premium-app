const AssetCard = ({ data, type, onClick }) => {
    const isCar = type === 'car';

    return (
        <div 
            onClick={() => onClick(type, data.id)}
            className="glass hover-lift gsap-reveal"
            style={{
                width: '100%', borderRadius: '28px', padding: '12px',
                marginBottom: '5px', cursor: 'pointer',
                position: 'relative', border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                overflow: 'hidden'
            }}
        >
            {/* Price Tag - TOP RIGHT */}
            <div style={{
                position: 'absolute', top: '22px', right: '22px',
                background: 'var(--gold-gradient)', color: '#000',
                padding: '6px 16px', borderRadius: '16px', fontSize: '13px',
                fontWeight: '900', zIndex: 10, boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
            }}>
                {data.price}
            </div>

            {/* Heart Icon - TOP LEFT */}
            <div style={{
                position: 'absolute', top: '22px', left: '22px',
                background: 'rgba(0,0,0,0.4)', color: '#fff',
                width: '38px', height: '38px', borderRadius: '50%',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 10, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)'
            }}>
                 <i className="fa-regular fa-heart" style={{ fontSize: '18px' }}></i>
            </div>

            {/* Main Image */}
            <div style={{
                width: '100%', height: '220px', borderRadius: '22px',
                backgroundImage: `url(${data.image_url})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                marginBottom: '15px', border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative'
            }}>
                {/* View Count Badge */}
                <div style={{
                    position: 'absolute', bottom: '12px', right: '12px',
                    background: 'rgba(0,0,0,0.6)', color: '#fff',
                    padding: '4px 10px', borderRadius: '10px', fontSize: '10px',
                    display: 'flex', alignItems: 'center', gap: '6px', backdropFilter: 'blur(5px)'
                }}>
                    <i className="fa-solid fa-eye" style={{ fontSize: '10px', color: 'var(--gold-primary)' }}></i>
                    <span>{data.views ? data.views.toLocaleString() : '۱,۲۴۰'}</span>
                </div>
            </div>

            <div style={{ padding: '0 8px 8px', textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                     <div style={{ fontSize: '11px', color: 'var(--gold-primary)', fontWeight: '900', background: 'rgba(212,175,55,0.1)', padding: '2px 8px', borderRadius: '6px' }}>
                        {isCar ? 'Automotive' : 'Real Estate'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                        رجستر: {data.reg_no || '---'}
                    </div>
                </div>
                
                <h4 style={{ margin: '5px 0 15px', fontSize: '18px', fontWeight: '900', color: '#fff' }}>{data.title}</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                        <span>{isCar ? (data.fuel || 'پترول') : (data.rooms ? data.rooms + ' اتاق' : '---')}</span>
                        <i className="fa-solid fa-gas-pump" style={{ color: 'var(--gold-primary)' }}></i>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                        <span>{isCar ? (data.transmission || 'اوتومات') : (data.area || '---')}</span>
                        <i className="fa-solid fa-gear" style={{ color: 'var(--gold-primary)' }}></i>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', fontSize: '11px', color: 'rgba(255,255,255,0.6)', direction: 'ltr' }}>
                        <span>{isCar ? (data.mileage || 'Km 0') : (data.floor ? data.floor + ' منزل' : '---')}</span>
                        <i className="fa-solid fa-gauge-high" style={{ color: 'var(--gold-primary)' }}></i>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>
                        <span>{data.location || 'کابل'}</span>
                        <i className="fa-solid fa-location-dot" style={{ color: 'var(--gold-primary)' }}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AssetCard = AssetCard;

window.AssetCard = AssetCard;
