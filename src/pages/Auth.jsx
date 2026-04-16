const Auth = ({ onLogin }) => {
    const [step, setStep] = React.useState(1);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [otp, setOtp] = React.useState(['', '', '', '']);
    const [loading, setLoading] = React.useState(false);
    const otpRefs = [React.useRef(), React.useRef(), React.useRef(), React.useRef()];

    React.useEffect(() => {
        gsap.fromTo('.auth-container',
            { opacity: 0, scale: 0.95, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
    }, [step]);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        if (!isEmailValid || !isPasswordValid || loading) return;
        setLoading(true);
        // Simulate sending code
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
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
            onLogin({ email, name: email.split('@')[0], isVip: true });
        }, 1200);
    };

    const btnStyle = (isActive) => ({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        background: isActive ? 'var(--gold-gradient)' : 'rgba(212,175,55,0.15)',
        color: isActive ? '#000' : 'rgba(212,175,55,0.5)',
        border: 'none',
        padding: '18px',
        borderRadius: '20px',
        fontWeight: '900',
        fontSize: '16px',
        cursor: isActive ? 'pointer' : 'not-allowed',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        boxShadow: isActive ? '0 8px 25px rgba(212, 175, 55, 0.3)' : 'none',
        transform: isActive ? 'scale(1)' : 'scale(0.98)'
    });

    const inputContainerStyle = (isValid) => ({
        display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${isValid ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '20px', marginBottom: '15px', overflow: 'hidden',
        transition: 'all 0.3s'
    });

    const Spinner = () => (
        <div style={{
            width: '24px', height: '24px',
            border: '3px solid rgba(0,0,0,0.1)',
            borderTopColor: '#000', borderRadius: '50%',
            animation: 'authSpin 0.8s linear infinite'
        }} />
    );

    return (
        <div className="screen auth-screen" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: '100vh', padding: '25px',
            background: 'radial-gradient(circle at top right, #0a1f26 0%, var(--bg-dark) 60%)'
        }}>
            <style>{`@keyframes authSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>

            <div className="auth-container glass" style={{
                width: '100%', maxWidth: '420px', padding: '50px 35px',
                borderRadius: '35px', border: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ 
                    display: 'inline-flex', padding: '6px 15px', borderRadius: '20px', 
                    background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
                    color: 'var(--gold-primary)', fontSize: '10px', fontWeight: '900',
                    marginBottom: '25px', letterSpacing: '1px', textTransform: 'uppercase'
                }}>
                    <i className="fa-solid fa-crown" style={{ marginLeft: '6px' }}></i>
                    ZHINOVAX PREMIUM ACCESS
                </div>

                <div style={{ marginBottom: '35px' }}>
                    <img src="https://i.postimg.cc/W3MnzMzh/jjj.png" alt="Zhinovax" style={{ height: '55px', marginBottom: '20px', objectFit: 'contain' }} />
                    <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#fff', margin: '0 0 10px' }}>
                        {step === 1 ? 'داخل شدن به دنیای لوکس' : 'تأیید ایمیل'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        {step === 1 ? 'اطلاعات کاربری خود را برای دسترسی ویژه وارد کنید' : `کد ۴ رقمی ارسال شده به ${email} را وارد کنید`}
                    </p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleInitialSubmit}>
                        <div style={inputContainerStyle(isEmailValid)}>
                            <div style={{ padding: '18px 22px', color: 'var(--gold-primary)', fontSize: '18px' }}>
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                style={{
                                    flex: 1, background: 'transparent', border: 'none',
                                    padding: '18px 18px 18px 0', color: '#fff', fontSize: '16px',
                                    outline: 'none', fontFamily: 'Inter, sans-serif',
                                    transition: '0.3s'
                                }}
                                onFocus={(e) => e.target.parentElement.style.boxShadow = '0 0 15px rgba(212,175,55,0.2)'}
                                onBlur={(e) => e.target.parentElement.style.boxShadow = 'none'}
                            />
                        </div>

                        <div style={inputContainerStyle(isPasswordValid)}>
                            <div style={{ padding: '18px 22px', color: 'var(--gold-primary)', fontSize: '18px' }}>
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    flex: 1, background: 'transparent', border: 'none',
                                    padding: '18px 18px 18px 0', color: '#fff', fontSize: '16px',
                                    outline: 'none', fontFamily: 'Inter, sans-serif',
                                    transition: '0.3s'
                                }}
                                onFocus={(e) => e.target.parentElement.style.boxShadow = '0 0 15px rgba(212,175,55,0.2)'}
                                onBlur={(e) => e.target.parentElement.style.boxShadow = 'none'}
                            />
                        </div>

                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', textAlign: 'right', marginBottom: '25px', paddingRight: '10px' }}>
                             فراموشی رمز عبور؟
                        </p>

                        <button type="submit" className="hover-lift" style={btnStyle(isEmailValid && isPasswordValid && !loading)} disabled={!isEmailValid || !isPasswordValid || loading}>
                            {loading ? <Spinner /> : <><i className="fa-solid fa-paper-plane" style={{ fontSize: '18px' }}></i> درخواست کد تایید</>}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify}>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '30px', direction: 'ltr' }}>
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
                                        width: '60px', height: '75px',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: `2px solid ${digit ? 'var(--gold-primary)' : 'rgba(255,255,255,0.08)'}`,
                                        borderRadius: '18px', color: '#fff',
                                        fontSize: '28px', textAlign: 'center',
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                />
                            ))}
                        </div>

                        <div style={{
                            background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.2)',
                            borderRadius: '15px', padding: '12px', marginBottom: '30px'
                        }}>
                            <p style={{ color: 'var(--gold-primary)', fontSize: '12px', margin: 0, fontWeight: '700' }}>
                                <i className="fa-solid fa-bolt" style={{ marginLeft: '8px' }}></i>
                                حالت نمایش: هر کدی قابل قبول است
                            </p>
                        </div>

                        <button type="submit" className="hover-lift" style={btnStyle(isOtpComplete && !loading)} disabled={!isOtpComplete || loading}>
                            {loading ? <Spinner /> : <><i className="fa-solid fa-unlock-keyhole" style={{ fontSize: '18px' }}></i> داخل شدن نهایی</>}
                        </button>

                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '25px', cursor: 'pointer', display: 'inline-block' }}
                            onClick={() => setStep(1)} className="hover-lift">
                            <i className="fa-solid fa-chevron-left" style={{ marginRight: '8px', fontSize: '10px' }}></i> ویرایش اطلاعات
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

window.Auth = Auth;
