const CheckoutModal = ({ asset, onClose, onSuccess }) => {
    const [step, setStep] = React.useState(1);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const tax = 0.05; // 5% handling fee
    const rawPrice = parseInt(asset.price.replace(/\D/g, '')) || 0;
    const finalPrice = rawPrice + (rawPrice * tax);
    const displayFinal = `$${finalPrice.toLocaleString()}`;

    const handleConfirm = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const purchases = JSON.parse(localStorage.getItem('zhinovax_purchases')) || [];
            if (!purchases.find(p => p.id === asset.id)) {
                purchases.push(asset);
                localStorage.setItem('zhinovax_purchases', JSON.stringify(purchases));
            }
            setIsProcessing(false);
            setStep(2); // Success step
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
            background: 'rgba(8, 18, 21, 0.85)', backdropFilter: 'blur(20px)',
            zIndex: 1000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            fontFamily: "'Vazirmatn', sans-serif"
        }}>
            <div className="gsap-slide-up" style={{
                background: 'var(--bg-dark)', width: '100%', maxWidth: '420px', 
                margin: '0 auto', borderTopLeftRadius: '30px', borderTopRightRadius: '30px',
                border: '1px solid var(--border-glass)', padding: '30px 20px', color: 'white',
                position: 'relative'
            }}>
                {/* Close Button */}
                <button onClick={onClose} style={{
                    position: 'absolute', top: '20px', left: '20px', background: 'transparent',
                    border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>

                {step === 1 ? (
                    <>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', textAlign: 'center', marginBottom: '20px' }}>تایید خرید VIP</h2>
                        
                        <div style={{ background: 'var(--card-glass)', padding: '15px', borderRadius: '15px', marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '10px', backgroundImage: `url('${asset.image_url}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            <div>
                                <h3 style={{ fontSize: '14px', fontWeight: 'bold' }}>{asset.title}</h3>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>کد کالا: {asset.id}</p>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '15px', marginBottom: '30px', fontSize: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
                                <span>قیمت پایه:</span><span>{asset.price}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
                                <span>کارمزد انتقال (۵٪):</span><span>${(rawPrice * tax).toLocaleString()}</span>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px dashed var(--border-glass)', margin: '15px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '18px', color: 'var(--gold-primary)' }}>
                                <span>مبلغ نهایی:</span><span>{displayFinal}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handleConfirm}
                            disabled={isProcessing}
                            style={{
                                width: '100%', padding: '16px', background: 'var(--gold-gradient)',
                                border: 'none', borderRadius: '16px', color: '#000', fontSize: '16px',
                                fontWeight: '900', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer'
                            }}
                        >
                            {isProcessing ? 'در حال پردازش تراکنش...' : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    پرداخت و انتقال سند
                                </>
                            )}
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '15px' }}>
                            با تایید این فرم، مبلغ از موجودی حساب VIP شما مسدود می‌گردد.
                        </p>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ 
                            width: '80px', height: '80px', background: 'rgba(212,175,55,0.1)', 
                            borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            margin: '0 auto 20px', color: 'var(--gold-primary)'
                        }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        </div>
                        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px' }}>تراکنش موفق</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '30px', lineHeight: '1.6' }}>
                            سند به نام شما ثبت شد و دارایی به قسمت «کیف‌پول» اضافه گردید. 
                            <br/><br/>
                            <span style={{ color: 'var(--gold-primary)', fontWeight: 'bold' }}>
                                یک تیکت قرعه‌کشی ماهانه به شما هدیه داده شد! 🎟️
                            </span>
                        </p>
                        <button 
                            onClick={() => { onClose(); onSuccess(); }}
                            style={{
                                width: '100%', padding: '16px', background: 'transparent',
                                border: '1px solid var(--gold-primary)', borderRadius: '16px', color: 'var(--gold-primary)', 
                                fontSize: '16px', fontWeight: '800', cursor: 'pointer'
                            }}
                        >
                            بازگشت به فروشگاه
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

window.CheckoutModal = CheckoutModal;
