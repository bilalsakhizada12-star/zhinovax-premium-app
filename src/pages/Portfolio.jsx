const Portfolio = ({ onTabChange, assets, user, onLogin }) => {
    const [ownedAssets, setOwnedAssets] = React.useState([]);

    React.useEffect(() => {
        if (user) {
            const saved = JSON.parse(localStorage.getItem('zhinovax_purchases')) || [];
            setOwnedAssets(saved);
        }
    }, [user]);

    // --- NOT LOGGED IN: Show a public dashboard/stats page ---
    if (!user) {
        return (
            <div className="screen" style={{ overflowY: 'auto', paddingBottom: '110px', background: 'var(--bg-dark)' }}>
                <div style={{ padding: '40px 20px 20px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: '0 0 5px' }}>داشبورد</h1>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>بازار خودرو و ملک زینوواکس</p>
                </div>

                {/* Public stats */}
                <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                    <div className="glass" style={{ padding: '20px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--gold-primary)' }}>۱۲۰+</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>موتر موجود</div>
                    </div>
                    <div className="glass" style={{ padding: '20px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--gold-primary)' }}>۴۵+</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>ملک موجود</div>
                    </div>
                    <div className="glass" style={{ padding: '20px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--gold-primary)' }}>۹۸٪</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>رضایت مشتریان</div>
                    </div>
                    <div className="glass" style={{ padding: '20px', textAlign: 'right', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--gold-primary)' }}>۵+</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>سال تجربه</div>
                    </div>
                </div>

                {/* CTA to log in for personal dashboard */}
                <div style={{ margin: '0 20px 25px', padding: '25px', background: 'rgba(212,175,55,0.06)', borderRadius: '24px', border: '1px dashed rgba(212,175,55,0.3)', textAlign: 'right' }}>
                    <div style={{ fontSize: '28px', marginBottom: '10px' }}>💼</div>
                    <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#fff', margin: '0 0 8px' }}>دارایی‌های شخصی شما</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 18px', lineHeight: '1.7' }}>
                        برای مشاهده خریدها، تیکت‌های قرعه‌کشی و اسناد دیجیتال خود وارد شوید.
                    </p>
                    <button onClick={onLogin} style={{
                        width: '100%', background: 'var(--gold-primary)', color: '#000',
                        border: 'none', padding: '14px', borderRadius: '15px',
                        fontWeight: '900', fontSize: '15px', cursor: 'pointer'
                    }}>
                        ورود / ثبت نام رایگان
                    </button>
                </div>

                {/* Featured listings teaser */}
                <div style={{ padding: '0 20px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '900', color: '#fff', textAlign: 'right', marginBottom: '15px' }}>پربازدیدترین‌ها امروز</h3>
                    {(assets || []).slice(0, 3).map((asset, i) => (
                        <div key={i} onClick={() => onTabChange('home')} className="hover-lift" style={{
                            display: 'flex', alignItems: 'center', gap: '15px',
                            padding: '12px', background: 'rgba(255,255,255,0.03)',
                            borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)',
                            marginBottom: '12px', cursor: 'pointer'
                        }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '14px', backgroundImage: `url(${asset.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }}></div>
                            <div style={{ textAlign: 'right', flex: 1 }}>
                                <div style={{ fontWeight: '800', fontSize: '14px', color: '#fff' }}>{asset.title}</div>
                                <div style={{ fontSize: '13px', color: 'var(--gold-primary)', fontWeight: '900', marginTop: '3px' }}>{asset.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // --- LOGGED IN: Show full personal portfolio ---
    return (
        <div className="screen" style={{ overflowY: 'auto', paddingBottom: '110px', background: 'var(--bg-dark)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '40px 20px 20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', margin: 0 }}>دارایی‌های من</h1>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>

            <div style={{ padding: '0 20px' }}>
                {/* Total Wealth Summary */}
                <div className="glass" style={{ padding: '25px 20px', borderRadius: '24px', marginBottom: '20px', border: '1px solid rgba(212,175,55,0.2)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '5px', textAlign: 'right' }}>ارزش کل دارایی‌های شما</p>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--gold-primary)', margin: 0, textAlign: 'right' }}>
                        {ownedAssets.length > 0 ? '$' + ownedAssets.reduce((acc, curr) => acc + (parseInt(curr.price.replace(/\D/g, '')) || 0), 0).toLocaleString() : '$0'}
                    </h2>
                </div>

                {/* VIP Lottery Section */}
                <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.02))', padding: '20px', borderRadius: '20px', marginBottom: '30px', border: '1px dashed var(--gold-primary)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'var(--gold-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '900', color: 'var(--gold-primary)', margin: 0 }}>تیکت‌های قرعه‌کشی ماهانه</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '5px 0 0' }}>شما {ownedAssets.length} تیکت فعال دارید</p>
                    </div>
                </div>

                {ownedAssets.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '15px' }}>📦</div>
                        <p>شما هنوز دارایی‌ای ثبت نکرده‌اید.</p>
                        <button onClick={() => onTabChange('home')} style={{ background: 'var(--gold-primary)', color: '#000', border: 'none', padding: '12px 25px', borderRadius: '12px', marginTop: '15px', fontWeight: '900', cursor: 'pointer' }}>مشاهده فروشگاه</button>
                    </div>
                ) : (
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '900', marginBottom: '15px', textAlign: 'right' }}>اسناد دیجیتال شما</h3>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {ownedAssets.map((asset, i) => (
                                <div key={i} className="glass" style={{ borderRadius: '20px', padding: '15px', display: 'flex', gap: '15px', border: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                                    <div style={{ width: '70px', height: '70px', borderRadius: '14px', backgroundImage: `url(${asset.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }}></div>
                                    <div style={{ flex: 1, textAlign: 'right' }}>
                                        <h4 style={{ fontSize: '14px', margin: '0 0 4px', fontWeight: '900' }}>{asset.title}</h4>
                                        <p style={{ fontSize: '13px', color: 'var(--gold-primary)', fontWeight: '900', margin: '0 0 5px' }}>{asset.price}</p>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>تأیید شده</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

window.Portfolio = Portfolio;
