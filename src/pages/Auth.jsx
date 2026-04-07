const Auth = ({ onLogin }) => {
    const [step, setStep] = React.useState(1);
    const [phone, setPhone] = React.useState('');
    const [otp, setOtp] = React.useState(['', '', '', '']);
    const [loading, setLoading] = React.useState(false);
    const otpRefs = [React.useRef(), React.useRef(), React.useRef(), React.useRef()];

    React.useEffect(() => {
        gsap.fromTo('.auth-container',
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
        );
    }, []);

    // ✅ FIX: Reduced minimum to 7 digits (was 10 - too strict)
    const isPhoneValid = phone.replace(/\s/g, '').length >= 7;

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (!isPhoneValid || loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1200);
    };

    const handleOtpChange = (index, value) => {
        if (!/^[0-9]*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value !== '' && index < 3) {
            otpRefs[index + 1].current?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const isOtpComplete = otp.join('').length === 4;

    const handleVerify = (e) => {
        e.preventDefault();
        if (!isOtpComplete || loading) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // ✅ Any code works (demo mode)
            onLogin({ phone: `+93${phone}`, name: 'کاربر VIP', isVip: true });
        }, 1200);
    };

    const btnStyle = (isActive) => ({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        background: isActive ? 'var(--gold-primary)' : 'rgba(212,175,55,0.25)',
        color: '#000',
        border: 'none',
        padding: '17px',
        borderRadius: '16px',
        fontWeight: '900',
        fontSize: '16px',
        cursor: isActive ? 'pointer' : 'not-allowed',
        transition: '0.3s',
        fontFamily: 'Vazirmatn, sans-serif'
    });

    const Spinner = () => (
        <div style={{
            width: '22px', height: '22px',
            border: '3px solid rgba(0,0,0,0.15)',
            borderTopColor: '#000', borderRadius: '50%',
            animation: 'authSpin 0.8s linear infinite'
        }} />
    );

    return (
        <div className="screen auth-screen" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: '100vh', padding: '20px',
            background: 'linear-gradient(160deg, var(--bg-dark) 0%, #071822 100%)'
        }}>
            {/* Keyframes injected via style tag */}
            <style>{`@keyframes authSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>

            <div className="auth-container glass" style={{
                width: '100%', maxWidth: '400px', padding: '40px 30px',
                borderRadius: '30px', border: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'center'
            }}>
                {/* Logo */}
                <div style={{ marginBottom: '30px' }}>
                    <img src="https://i.postimg.cc/W3MnzMzh/jjj.png" alt="Zhinovax" style={{ height: '50px', marginBottom: '15px', objectFit: 'contain' }} />
                    <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#fff', margin: '0 0 8px' }}>
                        {step === 1 ? 'خوش آمدید' : 'کد تأیید'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
                        {step === 1 ? 'شماره موبایل خود را وارد کنید' : `کد پیامک شده به ${phone} را وارد کنید`}
                    </p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handlePhoneSubmit}>
                        <div style={{
                            display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)',
                            border: `1px solid ${isPhoneValid ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '15px', marginBottom: '20px', overflow: 'hidden', direction: 'ltr'
                        }}>
                            <div style={{
                                padding: '16px 20px', background: 'rgba(212,175,55,0.1)', color: 'var(--gold-primary)',
                                fontWeight: '900', fontSize: '17px', borderRight: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                +93
                            </div>
                            <input
                                type="tel"
                                placeholder="700 123 456"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                autoFocus
                                style={{
                                    flex: 1, background: 'transparent', border: 'none',
                                    padding: '16px', color: '#fff', fontSize: '17px',
                                    letterSpacing: '2px', outline: 'none', fontFamily: 'monospace'
                                }}
                            />
                        </div>

                        {/* Helper text */}
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>
                            شماره تماس خود را بدون 0 وارد کنید (مثال: 700123456)
                        </p>

                        <button type="submit" style={btnStyle(isPhoneValid && !loading)} disabled={!isPhoneValid || loading}>
                            {loading ? <Spinner /> : <><i className="fa-solid fa-paper-plane"></i> دریافت کد ورود</>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify}>
                        {/* OTP boxes */}
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px', direction: 'ltr' }}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={otpRefs[index]}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    style={{
                                        width: '55px', height: '65px',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: `2px solid ${digit ? 'var(--gold-primary)' : 'rgba(255,255,255,0.1)'}`,
                                        borderRadius: '15px', color: '#fff',
                                        fontSize: '26px', textAlign: 'center',
                                        outline: 'none'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Test hint - prominent */}
                        <div style={{
                            background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)',
                            borderRadius: '12px', padding: '10px', marginBottom: '20px'
                        }}>
                            <p style={{ color: 'var(--gold-primary)', fontSize: '12px', margin: 0, fontWeight: 'bold' }}>
                                ✦ برای تست: کد <strong>1234</strong> را وارد کنید
                            </p>
                        </div>

                        <button type="submit" style={btnStyle(isOtpComplete && !loading)} disabled={!isOtpComplete || loading}>
                            {loading ? <Spinner /> : <><i className="fa-solid fa-circle-check"></i> تأیید و ورود</>}
                        </button>

                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '18px', cursor: 'pointer' }}
                            onClick={() => setStep(1)}>
                            ← ویرایش شماره موبایل
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

window.Auth = Auth;
