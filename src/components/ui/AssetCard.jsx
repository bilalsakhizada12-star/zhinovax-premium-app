const AssetCard = ({ data, type, onClick }) => {
    const isCar = type === 'car';

    return (
        <div 
            onClick={() => onClick(type, data.id)}
            className="glass hover-lift"
            style={{
                width: '185px', borderRadius: '24px', padding: '10px',
                marginRight: '15px', cursor: 'pointer', flexShrink: 0,
                position: 'relative', border: '1px solid rgba(255,255,255,0.06)'
            }}
        >
            {/* Price Tag - TOP RIGHT (Corrected from Screenshot) */}
            <div style={{
                position: 'absolute', top: '18px', right: '18px',
                background: '#0084ad', color: '#fff',
                padding: '4px 12px', borderRadius: '14px', fontSize: '11px',
                fontWeight: '900', zIndex: 10
            }}>
                {data.price}
            </div>

            {/* Heart Icon - TOP LEFT (Corrected from Screenshot) */}
            <div style={{
                position: 'absolute', top: '18px', left: '18px',
                background: 'rgba(255,255,255,0.1)', color: '#fff',
                width: '32px', height: '32px', borderRadius: '50%',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                zIndex: 10, backdropFilter: 'blur(5px)'
            }}>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>

            {/* View Count Badge - BOTTOM LEFT of Image */}
            <div style={{
                position: 'absolute', top: '115px', left: '18px',
                background: 'rgba(0,0,0,0.5)', color: '#fff',
                padding: '2px 8px', borderRadius: '8px', fontSize: '9px',
                display: 'flex', alignItems: 'center', gap: '4px', zIndex: 10
            }}>
                <span>۵,۰۴۶</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>

            <div style={{
                width: '100%', height: '140px', borderRadius: '18px',
                backgroundImage: `url(${data.image_url})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                marginBottom: '12px', border: '1px solid rgba(255,255,255,0.08)'
            }}></div>

            <div style={{ padding: '0 4px', textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>
                    رجستر: {data.reg_no || '---'}
                </div>
                
                <h4 style={{ margin: '2px 0 12px', fontSize: '13px', fontWeight: '900', color: '#fff' }}>{data.title}</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
                        <span>{isCar ? (data.fuel || 'پترول') : (data.rooms ? data.rooms + ' اتاق' : '---')}</span>
                        <i className="fa-solid fa-gas-pump"></i>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
                        <span>{isCar ? (data.transmission || 'اوتومات') : (data.area || '---')}</span>
                        <i className="fa-solid fa-gear"></i>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
                        <span>{isCar ? (data.mileage || 'Km 0') : (data.floor ? data.floor + ' منزل' : '---')}</span>
                        <i className="fa-solid fa-gauge-high"></i>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
                        <span>{data.location || 'کابل'}</span>
                        <i className="fa-solid fa-location-dot"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

window.AssetCard = AssetCard;
