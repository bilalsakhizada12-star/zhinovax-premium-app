const App = () => {
    const { 
        SplashScreen, Auth, Home, Settings, Favorites, Portfolio, Challenges, Detail, Navbar, AddAssetModal, About, ComingSoon 
    } = window;

    // Safety: If core components are missing, show a simple recovery message instead of crashing
    if (typeof Home !== 'function' || typeof SplashScreen !== 'function') {
        return (
            <div style={{ color: '#fff', padding: '20px', textAlign: 'center', background: '#051014', height: '100vh' }}>
                <h2 style={{color: 'var(--gold-primary)'}}>در حال آماده سازی...</h2>
                <p>لطفاً یک لحظه صبر کنید یا صفحه را رفرش کنید.</p>
                <button onClick={() => window.location.reload()} style={{background: 'var(--gold-gradient)', padding: '10px 20px', borderRadius: '10px', border: 'none'}}>رفرش صفحه</button>
            </div>
        );
    }
    const { cars, properties, loading, addAsset, connectionError } = window.useSupabase();
    const [activeTab, setActiveTab] = React.useState('home');
    const [selectedAsset, setSelectedAsset] = React.useState(null);
    const [view, setView] = React.useState('home'); // 'home', 'detail', 'settings', 'challenges', 'auth'
    const [showSplash, setShowSplash] = React.useState(true);
    const [user, setUser] = React.useState(null); // Auth State
    const [pendingAction, setPendingAction] = React.useState(null);
    const [lastCarCount, setLastCarCount] = React.useState(parseInt(localStorage.getItem('zhinovax_car_count') || '0'));
    const [hasNewNotif, setHasNewNotif] = React.useState(false);

    React.useEffect(() => {
        if (!loading && cars.length > 0) {
            if (cars.length > lastCarCount && lastCarCount !== 0) {
                setHasNewNotif(true);
            }
            localStorage.setItem('zhinovax_car_count', cars.length.toString());
            setLastCarCount(cars.length);
        }
    }, [cars, loading]);

    React.useEffect(() => {
        if (!showSplash) {
            gsap.set('.screen', { opacity: 1, y: 0 });
        }
    }, [activeTab, view, showSplash]);

    const handleOpenDetail = (type, id) => {
        const asset = type === 'car' 
            ? cars.find(c => String(c.id) === String(id)) 
            : properties.find(p => String(p.id) === String(id));
        
        if (asset) {
            setSelectedAsset({ ...asset, type });
            setView('detail');
        }
    };

    const handleBack = () => {
        setView('home');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setView('home'); // ensures we clear detail view or other sub-pages
    };

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        setView('home'); // default return
        
        // Execute pending action after login
        if (pendingAction) {
            if (pendingAction.type === 'tab') {
                setActiveTab(pendingAction.target);
            }
            // Add other mock actions here like 'buy'
            setPendingAction(null);
        }
    };

    // Splash Screen handling
    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />;
    }

    return (
        <div className="app-container">
            {/* View Switching */}
            {view === 'auth' && (
                <div style={{ position: 'relative' }}>
                    {/* Back button for auth screen */}
                    <button 
                        onClick={handleBack}
                        style={{
                            position: 'absolute', top: '30px', right: '30px', zIndex: 10,
                            background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-glass)',
                            color: '#fff', width: '40px', height: '40px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}
                    >✕</button>
                    <Auth onLogin={handleLogin} />
                </div>
            )}

            {view === 'home' && activeTab === 'home' && (
                <Home cars={cars} properties={properties} loading={loading} connectionError={connectionError} onOpenDetail={handleOpenDetail} onLogin={() => setView('auth')} />
            )}
            
            {view === 'home' && activeTab === 'settings' && (
                <Settings user={user} onLogin={() => setView('auth')} onTabChange={(tab) => {
                    if (tab === 'challenges') setView('challenges');
                    else if (tab === 'about') setView('about');
                    else if (tab === 'coming_soon') setView('coming_soon');
                    else if (tab === 'add_asset') setView('add_asset');
                    else {
                        setActiveTab(tab);
                        setView('home');
                    }
                }} />
            )}
            
            {view === 'challenges' && (
                <Challenges onBack={() => { setView('home'); setActiveTab('settings'); }} />
            )}

            {view === 'about' && (
                <About onBack={() => { setView('home'); setActiveTab('settings'); }} />
            )}

            {view === 'coming_soon' && (
                <ComingSoon onBack={() => { setView('home'); setActiveTab('settings'); }} />
            )}
            
            {view === 'home' && activeTab === 'favorites' && (
                <Favorites onTabChange={handleTabChange} assets={[...cars, ...properties]} onOpenDetail={handleOpenDetail} />
            )}
            
            {view === 'home' && activeTab === 'dashboard' && (
                <Portfolio user={user} onLogin={() => setView('auth')} onTabChange={handleTabChange} assets={[...cars, ...properties]} onOpenDetail={handleOpenDetail} />
            )}

            {view === 'add_asset' && (
                <AddAssetModal onClose={() => setView('home')} onSave={addAsset} />
            )}

            {view === 'detail' && (
                <Detail asset={selectedAsset} onBack={handleBack} />
            )}

            {/* Navbar is only shown in main views, not splash, auth, or detail */}
            {(view === 'home' || view === 'add_asset') && <Navbar activeTab={activeTab} onTabChange={handleTabChange} hasNewNotif={hasNewNotif} />}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
