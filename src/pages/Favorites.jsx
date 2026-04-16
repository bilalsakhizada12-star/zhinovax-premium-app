const Favorites = ({ onTabChange, assets, onOpenDetail }) => {
    const AssetCard = window.AssetCard;
    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        gsap.fromTo('.fav-content', 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
        const saved = JSON.parse(localStorage.getItem('zhinovax_favorites')) || [];
        setFavorites(saved);
    }, []);

    const removeFav = (id) => {
        const newFavs = favorites.filter(f => f.id !== id);
        localStorage.setItem('zhinovax_favorites', JSON.stringify(newFavs));
        setFavorites(newFavs);
    };

    return (
        <div className="screen favorites-screen" style={{ overflowY: 'auto', paddingBottom: '120px', background: 'var(--bg-dark)' }}>
            <div style={{ 
                padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5, 16, 20, 0.9)',
                backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: 0 }}>مورد علاقه</h1>
                <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'rgba(255,75,92,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ff4b5c' }}>
                    <i className="fa-solid fa-heart" style={{ fontSize: '20px' }}></i>
                </div>
            </div>

            <div className="fav-content" style={{ padding: '0 25px' }}>
                {favorites.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-muted)' }}>
                        <i className="fa-regular fa-heart" style={{ fontSize: '60px', marginBottom: '20px', opacity: 0.1 }}></i>
                        <p style={{ fontSize: '15px' }}>لیست علاقه‌مندی‌های شما خالی است.</p>
                        <button onClick={() => onTabChange('home')} className="hover-lift" style={{ borderRadius: '15px', padding: '12px 25px', background: 'var(--gold-primary)', color: '#000', border: 'none', marginTop: '25px', fontWeight: '900', cursor: 'pointer' }}>مشاهده موترها</button>
                    </div>
                ) : (
                    <div className="grid-layout" style={{ marginTop: '20px' }}>
                        {favorites.map((asset) => (
                            <AssetCard
                                key={asset.id}
                                data={asset}
                                type={asset.type || 'car'}
                                onClick={onOpenDetail}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

window.Favorites = Favorites;
