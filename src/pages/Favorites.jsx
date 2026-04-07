const Favorites = ({ onTabChange, assets }) => {
    const AssetCard = window.AssetCard;
    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        // favorites stored as full asset objects in localStorage
        const saved = JSON.parse(localStorage.getItem('zhinovax_favorites')) || [];
        setFavorites(saved);
    }, []);

    // Extract IDs so we can match against live assets list
    const favIds = favorites.map(f => f.id);
    const matchedAssets = (assets || []).filter(a => favIds.includes(a.id));
    // Also include saved objects not in current assets list
    const allFavs = [...matchedAssets];
    favorites.forEach(f => {
        if (!allFavs.find(a => a.id === f.id)) allFavs.push(f);
    });

    return (
        <div className="screen" style={{ overflowY: 'auto', height: '100vh', paddingBottom: '100px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', position: 'sticky', top: 0, background: 'rgba(8,18,21,0.9)', backdropFilter: 'blur(20px)', zIndex: 50 }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>مورد علاقه</h1>
                <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--gold-primary)" stroke="var(--gold-primary)" strokeWidth="1.5">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                </div>
            </div>

            <div style={{ padding: '0 20px' }}>
                {allFavs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px', opacity: 0.2 }}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto' }}>
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                            </svg>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>لیست علاقه‌مندی شما خالی است!</h3>
                        <p style={{ fontSize: '13px', marginTop: '10px', lineHeight: '1.6' }}>روی آیکون قلب روی هر آگهی ضربه بزنید تا اینجا ذخیره شود.</p>
                        <button
                            onClick={() => onTabChange('home')}
                            style={{ background: 'transparent', border: '1px solid var(--gold-primary)', color: 'var(--gold-primary)', padding: '10px 20px', borderRadius: '10px', marginTop: '20px', cursor: 'pointer', fontSize: '14px' }}>
                            بازگشت به خانه
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px', justifyContent: 'center' }}>
                        {allFavs.map((asset) => (
                            <AssetCard
                                key={asset.id}
                                data={asset}
                                type={asset.type || 'car'}
                                onClick={onTabChange}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

window.Favorites = Favorites;
