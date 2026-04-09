const AddAssetModal = ({ onClose, onSave }) => {
    const [assetType, setAssetType] = React.useState('car'); // 'car' or 'property'
    const [formData, setFormData] = React.useState({
        title: '',
        price: '',
        image_url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
        // Car specific
        fuel: 'پترول',
        transmission: 'اوتومات',
        mileage: 'Km 0',
        reg_no: '۲۰۲۵#',
        location: 'کابل',
        // Property specific
        area: '',
        bedrooms: '',
        bathrooms: '',
        floor: '',
        address: ''
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
        
        // Prepare final data based on type
        const finalData = { 
            title: formData.title, 
            price: formData.price, 
            image_url: formData.image_url,
            location: formData.location 
        };

        if (assetType === 'car') {
            Object.assign(finalData, {
                fuel: formData.fuel,
                transmission: formData.transmission,
                mileage: formData.mileage,
                reg_no: formData.reg_no
            });
        } else {
            Object.assign(finalData, {
                area: formData.area,
                bedrooms: formData.bedrooms,
                bathrooms: formData.bathrooms,
                floor: formData.floor,
                address: formData.address
            });
        }

        const result = await onSave(assetType, finalData);
        
        setIsSaving(false);
        if (result.success) {
            setStep(2);
        } else {
            alert("خطا در ثبت اطلاعات!");
        }
    };

    const inputStyle = {
        width: '100%', padding: '15px', background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)', borderRadius: '15px',
        color: '#fff', fontSize: '14px', outline: 'none', marginBottom: '15px',
        transition: '0.3s'
    };

    const labelStyle = {
        display: 'block', fontSize: '11px', color: 'var(--gold-primary)',
        marginBottom: '6px', textAlign: 'right', fontWeight: '900', textTransform: 'uppercase'
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
            background: 'rgba(5, 16, 20, 0.9)', backdropFilter: 'blur(25px)',
            zIndex: 3000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
        }}>
            <div className="gsap-slide-up" style={{
                background: 'var(--bg-dark)', width: '100%', maxWidth: '420px', 
                margin: '0 auto', borderTopLeftRadius: '35px', borderTopRightRadius: '35px',
                border: '1px solid rgba(255,255,255,0.1)', padding: '40px 25px', color: 'white',
                maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                     <button onClick={onClose} className="hover-lift" style={{ 
                        background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', 
                        width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' 
                    }}>✕</button>
                    <h2 style={{ fontSize: '20px', fontWeight: '900' }}>ثبت دارایی جدید</h2>
                </div>

                {step === 1 ? (
                    <>
                        {/* Type Switcher */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '35px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '20px' }}>
                            <div 
                                onClick={() => setAssetType('car')}
                                style={{
                                    flex: 1, padding: '12px', borderRadius: '15px', textAlign: 'center', fontSize: '13px', fontWeight: '900',
                                    background: assetType === 'car' ? 'var(--gold-gradient)' : 'transparent',
                                    color: assetType === 'car' ? '#000' : 'var(--text-muted)', cursor: 'pointer', transition: '0.4s'
                                }}
                            >خودرو</div>
                            <div 
                                onClick={() => setAssetType('property')}
                                style={{
                                    flex: 1, padding: '12px', borderRadius: '15px', textAlign: 'center', fontSize: '13px', fontWeight: '900',
                                    background: assetType === 'property' ? 'var(--gold-gradient)' : 'transparent',
                                    color: assetType === 'property' ? '#000' : 'var(--text-muted)', cursor: 'pointer', transition: '0.4s'
                                }}
                            >املاک</div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <label style={labelStyle}>عنوان آگهی</label>
                            <input name="title" value={formData.title} onChange={handleChange} required placeholder="مثلاً: آپارتمان لوکس یا تویوتا کرولا" style={inputStyle} />

                            <label style={labelStyle}>قیمت ($)</label>
                            <input name="price" value={formData.price} onChange={handleChange} required placeholder="12,500$" style={inputStyle} />

                            <label style={labelStyle}>لینک تصویر</label>
                            <input name="image_url" value={formData.image_url} onChange={handleChange} required style={inputStyle} />

                            <label style={labelStyle}>موقعیت</label>
                            <input name="location" value={formData.location} onChange={handleChange} placeholder="کابل، افغانستان" style={inputStyle} />

                            {assetType === 'car' ? (
                                <>
                                    <label style={labelStyle}>نوع سوخت</label>
                                    <select name="fuel" value={formData.fuel} onChange={handleChange} style={inputStyle}>
                                        <option value="پترول">پترول</option>
                                        <option value="دیزل">دیزل</option>
                                        <option value="هایبرید">هایبرید</option>
                                    </select>

                                    <label style={labelStyle}>گیربکس</label>
                                    <select name="transmission" value={formData.transmission} onChange={handleChange} style={inputStyle}>
                                        <option value="اوتومات">اوتومات</option>
                                        <option value="دستی">دستی</option>
                                    </select>

                                    <label style={labelStyle}>کارکرد</label>
                                    <input name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Km 15,000" style={inputStyle} />

                                    <label style={labelStyle}>شماره ثبت/پلیت</label>
                                    <input name="reg_no" value={formData.reg_no} onChange={handleChange} placeholder="۲۰۱۸#" style={inputStyle} />
                                </>
                            ) : (
                                <>
                                    <label style={labelStyle}>متراژ (متر مربع)</label>
                                    <input name="area" value={formData.area} onChange={handleChange} placeholder="۱۵۰ متر مربع" style={inputStyle} />

                                    <label style={labelStyle}>تعداد اتاق</label>
                                    <input name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="۳ اتاق" style={inputStyle} />

                                    <label style={labelStyle}>تعداد حمام</label>
                                    <input name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="۲ حمام" style={inputStyle} />

                                    <label style={labelStyle}>طبقه</label>
                                    <input name="floor" value={formData.floor} onChange={handleChange} placeholder="طبقه ۵" style={inputStyle} />

                                    <label style={labelStyle}>آدرس دقیق</label>
                                    <input name="address" value={formData.address} onChange={handleChange} placeholder="سرک عمومی دارالامان" style={inputStyle} />
                                </>
                            )}

                            <button 
                                type="submit"
                                disabled={isSaving}
                                className="hover-lift"
                                style={{
                                    width: '100%', padding: '20px', background: 'var(--gold-gradient)',
                                    border: 'none', borderRadius: '20px', color: '#000', fontSize: '16px',
                                    fontWeight: '900', marginTop: '20px', cursor: 'pointer',
                                    boxShadow: '0 10px 25px rgba(212, 175, 55, 0.3)'
                                }}
                            >
                                {isSaving ? 'در حال اتصال به دیتابیس...' : 'ثبت نهایی دارایی'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ 
                            width: '90px', height: '90px', background: 'rgba(212,175,55,0.1)', 
                            borderRadius: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            margin: '0 auto 25px', color: 'var(--gold-primary)'
                        }}>
                             <i className="fa-solid fa-check-double" style={{ fontSize: '40px' }}></i>
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '15px' }}>ثبت موفقیت‌آمیز!</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '35px', lineHeight: '1.8' }}>
                            {assetType === 'car' ? 'خودرو' : 'ملک'} شما با موفقیت در دیتابیس مرکزی زینوواکس ثبت شد و اکنون برای تمامی کاربران قابل مشاهده است.
                        </p>
                        <button 
                            onClick={onClose}
                            className="hover-lift"
                            style={{
                                width: '100%', padding: '18px', background: 'transparent',
                                border: '1px solid var(--gold-primary)', borderRadius: '20px', color: 'var(--gold-primary)', 
                                fontSize: '16px', fontWeight: '900', cursor: 'pointer'
                            }}
                        >
                            بستن و مشاهده لیست
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

window.AddAssetModal = AddAssetModal;
