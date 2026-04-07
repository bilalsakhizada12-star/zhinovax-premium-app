const Home = ({ cars, properties, loading, connectionError, onOpenDetail }) => {
    const AssetCard = window.AssetCard;

    return (
        <div className="screen home-screen" style={{ paddingBottom: '110px' }}>
            {/* Connection Warning Banner - AGGRESSIVE STYLE */}
            {connectionError && (
                <div style={{
                    background: '#ff4b5c', color: '#fff', padding: '15px 20px', 
                    fontSize: '13px', textAlign: 'right', fontWeight: 'bold',
                    display: 'flex', alignItems: 'center', gap: '15px', zIndex: 1001,
                    position: 'relative'
                }}>
                    <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '24px' }}></i>
                    <div>
                        <div style={{ fontSize: '15px', marginBottom: '4px' }}>هشدار: دسترسی به دیتابیس مسدود شده است!</div>
                        <div style={{ opacity: 0.9, fontWeight: 'normal' }}>
                            مرورگر یا آنتی‌ویروس شما اجازه نمایش لیست خودروهای واقعی را نمی‌دهد. 
                            لطفاً <strong>Ad-blocker</strong> خود را خاموش کنید یا از اینترنت دیگری استفاده کنید.
                        </div>
                    </div>
                </div>
            )}

            {/* Header - 100% Yesterday Baseline */}
            <div style={{ 
                padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg-dark)'
            }}>
                <img src="https://www.directfiles.link/YGDVHGGRG" style={{ height: '32px' }} alt="Zhinovax" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {loading && <span style={{ fontSize: '10px', color: 'var(--gold-primary)', animation: 'pulse 1s infinite' }}>درحال بروزرسانی...</span>}
                    <button style={{ 
                        background: 'var(--gold-primary)', color: '#000', border: 'none', 
                        padding: '8px 25px', borderRadius: '15px', fontWeight: 'bold', fontSize: '13px' 
                    }}>ورود</button>
                </div>
            </div>

            {/* Banner - Minimalist Yesterday Baseline */}
            <div style={{ padding: '0 20px', marginBottom: '30px' }}>
                <div className="glass" style={{ 
                    padding: '25px', borderRadius: '24px', display: 'flex', 
                    alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px', color: '#fff' }}>دارایی خاص خود را پیدا کنید</h2>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>مجموعه ممتاز خودرو و املاک زینوواکس</p>
                    </div>
                    <div style={{ 
                        width: '45px', height: '45px', background: 'var(--gold-primary)', 
                        borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <i className="fa-solid fa-gem" style={{ color: '#000' }}></i>
                    </div>
                </div>
            </div>

            {/* Content Sections - Horizontal Scrolling only */}
            <div style={{ padding: '0 20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#fff', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                    خودروهای پیشنهاد شده
                    {cars.length > 0 && cars[0].id === 1 && <span style={{ fontSize: '9px', background: 'rgba(255,0,0,0.2)', color: '#ff4b5c', padding: '2px 8px', borderRadius: '10px' }}>حالت دمو</span>}
                </h3>
                <div className="scroller" style={{ margin: '0 -20px', paddingBottom: '10px' }}>
                    {loading && cars.length === 0 ? (
                        <div style={{ padding: '0 40px', color: 'var(--text-muted)', fontSize: '12px' }}>درحال اتصال به پایگاه داده...</div>
                    ) : cars.length === 0 ? (
                        <div style={{ padding: '0 40px', color: 'var(--text-muted)', fontSize: '12px' }}>هیچ خودرویی یافت نشد.</div>
                    ) : cars.map(car => (
                        <AssetCard key={car.id} data={car} type="car" onClick={onOpenDetail} />
                    ))}
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '40px 0 20px', color: '#fff', textAlign: 'right' }}>املاک پیشنهاد شده</h3>
                <div className="scroller" style={{ margin: '0 -20px', paddingBottom: '10px' }}>
                    {loading ? (
                        <div style={{ padding: '0 20px', color: 'var(--text-muted)' }}>...</div>
                    ) : properties.map(prop => (
                        <AssetCard key={prop.id} data={prop} type="property" onClick={onOpenDetail} />
                    ))}
                </div>
            </div>
        </div>
    );
};

window.Home = Home;
