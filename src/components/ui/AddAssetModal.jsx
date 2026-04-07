const AddAssetModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = React.useState({
        title: '',
        price: '',
        image_url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
        fuel: 'پترول',
        transmission: 'اوتومات',
        mileage: 'Km 0',
        reg_no: '۲۰۲۵#',
        location: 'کابل'
    });
    const [isSaving, setIsSaving] = React.useState(false);
    const [step, setStep] = React.useState(1); // 1: Form, 2: Success

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        const result = await onSave(formData);
        
        setIsSaving(false);
        if (result.success) {
            setStep(2);
        } else {
            alert("خطا در ثبت اطلاعات: " + (result.error?.message || "مشکل نامعلوم در اتصال به دیتابیس"));
        }
    };

    const inputStyle = {
        width: '100%', padding: '12px 15px', background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
        color: '#fff', fontSize: '14px', outline: 'none', marginBottom: '15px'
    };

    const labelStyle = {
        display: 'block', fontSize: '11px', color: 'var(--text-muted)',
        marginBottom: '6px', textAlign: 'right', fontWeight: 'bold'
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
                maxHeight: '90vh', overflowY: 'auto'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                     <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                    <h2 style={{ fontSize: '18px', fontWeight: '800' }}>ثبت خودروی جدید</h2>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label style={labelStyle}>نام و مدل خودرو</label>
                            <input name="title" value={formData.title} onChange={handleChange} required placeholder="مثلاً: کرولا ۲۰۱۸ دبی" style={inputStyle} />
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={labelStyle}>قیمت ($)</label>
                                <input name="price" value={formData.price} onChange={handleChange} required placeholder="12,500$" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>شماره ثبت/پلیت</label>
                                <input name="reg_no" value={formData.reg_no} onChange={handleChange} placeholder="۲۰۱۸#" style={inputStyle} />
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>لینک تصویر (URL)</label>
                            <input name="image_url" value={formData.image_url} onChange={handleChange} required style={inputStyle} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={labelStyle}>نوع سوخت</label>
                                <select name="fuel" value={formData.fuel} onChange={handleChange} style={inputStyle}>
                                    <option value="پترول">پترول</option>
                                    <option value="دیزل">دیزل</option>
                                    <option value="هایبرید">هایبرید</option>
                                    <option value="برقی">برقی</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>گیربکس</label>
                                <select name="transmission" value={formData.transmission} onChange={handleChange} style={inputStyle}>
                                    <option value="اوتومات">اوتومات</option>
                                    <option value="دستی">دستی</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                             <div>
                                <label style={labelStyle}>کیلومتر کارکرد</label>
                                <input name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Km 15,000" style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>موقعیت</label>
                                <input name="location" value={formData.location} onChange={handleChange} placeholder="کابل" style={inputStyle} />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSaving}
                            style={{
                                width: '100%', padding: '16px', background: 'var(--gold-gradient)',
                                border: 'none', borderRadius: '16px', color: '#000', fontSize: '16px',
                                fontWeight: '900', marginTop: '10px', cursor: 'pointer',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
                            }}
                        >
                            {isSaving ? 'در حال ثبت...' : 'تایید و ارسال به دیتابیس'}
                        </button>
                    </form>
                ) : (
                    <div style={{ textAlign: 'center', padding: '30px 0' }}>
                        <div style={{ 
                            width: '80px', height: '80px', background: 'rgba(212,175,55,0.1)', 
                            borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            margin: '0 auto 20px', color: 'var(--gold-primary)'
                        }}>
                             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        </div>
                        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px' }}>ثبت موفقیت‌آمیز</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '30px' }}>
                            خودروی جدید با موفقیت در سیستم ذخیره شد و اکنون در لیست عمومی قابل مشاهده است.
                        </p>
                        <button 
                            onClick={onClose}
                            style={{
                                width: '100%', padding: '16px', background: 'transparent',
                                border: '1px solid var(--gold-primary)', borderRadius: '16px', color: 'var(--gold-primary)', 
                                fontSize: '16px', fontWeight: '800', cursor: 'pointer'
                            }}
                        >
                            متوجه شدم
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

window.AddAssetModal = AddAssetModal;
