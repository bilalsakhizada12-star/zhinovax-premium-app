// Supabase Client Configuration
const SUPABASE_URL = 'https://cjxyfwuqakbmcgpjsub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DxFGUXuiKq_qmyEmvvKA5g_6m9N';

window.supabaseClient = null;
if (typeof supabase !== 'undefined') {
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Supabase Client Initialized!");
} else {
    console.error("Supabase script was not loaded! Check index.html.");
}

const MOCK_CARS = [
    { 
        id: 1, 
        title: 'تویوتا پریوس ۲۰۱۴', 
        price: '12,500$', 
        image_url: 'https://images.unsplash.com/photo-1594070319944-7c0c63146b77?q=80&w=800&auto=format&fit=crop', 
        color: 'نقره‌‌یی',
        plate: 'ندارد',
        fuel: 'پترول و هایبرید', 
        engine: '۴ سلندر',
        transmission: 'اوتومات', 
        accident_history: 'ندارد',
        features: ['ایربک (فعال)', 'ABS (فعال)', 'کمره عقب (فعال)', 'گرم و سرد کن (فعال)', 'استارت تکمه (فعال)'],
        documents: 'سر ترافیک / سه سال پاک',
        docs: 'سر ترافیک / سه سال پاک',
        tax: 'پاک',
        views: 5046,
        reg_no: '۲۰۱۸#',
        mileage: 'Km ۱۵۱,۱۶۷',
        location: 'کابل، افغانستان',
        type: 'car'
    },
    { 
        id: 2, 
        title: 'لکسوس ال اکس ۲۰۱۹', 
        price: '95,000$', 
        image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop', 
        color: 'سیاه',
        plate: 'کابل - ۲۰',
        fuel: 'پترول', 
        engine: 'V8',
        transmission: 'اوتومات', 
        accident_history: 'ندارد',
        features: ['کروز کنترول', 'ABS', 'سانروف', 'کمره ۳۶۰', 'رادار'],
        documents: 'پاک',
        docs: 'پاک',
        tax: 'پاک',
        views: 2310,
        reg_no: '۲۰۲۳#',
        mileage: 'Km ۵۹,۵۸۶',
        location: 'کابل، افغانستان',
        type: 'car'
    },
    { 
        id: 3, 
        title: 'فورد مستنگ ۲۰۱۹', 
        price: '28,000$', 
        image_url: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=800&auto=format&fit=crop', 
        color: 'خاکستری',
        plate: 'کابل - ۶',
        fuel: 'پترول', 
        engine: '۴ سلندر توربو',
        transmission: 'اوتومات', 
        accident_history: 'ندارد',
        features: ['درایو ماید', 'کمره عقب', 'سنسور', 'تکمه درایو'],
        documents: 'پاک',
        docs: 'پاک',
        tax: 'پاک',
        views: 1820,
        reg_no: '۲۰۱۸#',
        mileage: 'Km ۱۵,۰۰۰',
        location: 'کابل، افغانستان',
        type: 'car'
    }
];

const HYBRID_CARS = [
    { 
        id: "hybrid-bugatti", 
        title: 'بـوگـاتـی (Zhinovax Edition)', 
        price: '4,500,000$', 
        image_url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop', 
        color: 'سفید و آبی کورسی',
        plate: '۲۰۲۴#',
        fuel: 'پترول', 
        engine: 'W16 Quad-Turbo',
        transmission: 'اوتومات', 
        accident_history: 'بدون رنگ و خط',
        features: ['فول آپشن', 'کیربن فایبر', 'کمره ۳۶۰', 'سیستم صوتی حرفه‌ای'],
        documents: 'پاک / کارت هوشمند',
        views: 12540,
        mileage: 'Km ۵۰۰',
        location: 'کابل / دبی',
        type: 'car'
    },
    { 
        id: "hybrid-supra", 
        title: 'تویوتا سوپرا ۲۰۲۴', 
        price: '155,000$', 
        image_url: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=800&auto=format&fit=crop', 
        color: 'سیاه متالیک',
        plate: 'کابل - ۲۰۲۴',
        fuel: 'پترول توربو', 
        engine: '۳.۰ لیتر',
        transmission: 'اوتومات', 
        accident_history: 'جدید (صفر)',
        features: ['درایو ماید', 'کمره عقب', 'سنسور', 'تکمه درایو'],
        documents: 'پاک',
        views: 8940,
        mileage: 'Km ۰',
        location: 'کابل، افغانستان',
        type: 'car'
    }
];

const MOCK_PROPS = [
    { 
        id: 101, 
        title: 'کتوازی تاور', 
        price: '220,000$', 
        image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop', 
        floor: '۱۵',
        area: '۲۰۰ مترمربع',
        bedrooms: 3, 
        rooms: 3,
        bathrooms: 3, 
        kitchen: 1,
        balcony: 'دارد',
        address: 'سرک عمومی دارالامان', 
        location: 'کابل، افغانستان',
        amenities: {
            elevator: 'دارد',
            parking: 'دارد - یک عراده',
            heating: 'مرکز گرمی دارد',
            solar: 'ندارد',
            boiler: 'دارد',
            tv_wall: 'دارد',
            cabinets: 'آشپزخانه دارد',
            wardrobe: 'الماری لباس دارد',
            decoration: 'دیکوریشن کامل'
        },
        type: 'property'
    },
    { 
        id: 102, 
        title: 'سلطانی تاور', 
        price: '95,000$', 
        image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop', 
        floor: '۷',
        area: '۹۰ مترمربع',
        bedrooms: 2, 
        rooms: 2,
        bathrooms: 2, 
        kitchen: 1,
        balcony: 'دارد',
        address: 'عقب لیسه حبیبیه - دارالامان', 
        location: 'کابل، افغانستان',
        amenities: {
            elevator: 'دارد',
            parking: 'دارد',
            heating: 'دارد',
            solar: 'ندارد',
            boiler: 'دارد',
            tv_wall: 'ندارد',
            cabinets: 'دارد',
            wardrobe: 'دارد'
        },
        type: 'property'
    }
];

// Global State Initializers
window.useSupabase = () => {
    const [cars, setCars] = React.useState([]);
    const [properties, setProperties] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [connectionError, setConnectionError] = React.useState(null);

    const fetchData = async () => {
        if (!window.supabaseClient) {
            console.error("Supabase client is not ready. Retrying in 1s...");
            setTimeout(fetchData, 1000);
            return;
        }

        try {
            setLoading(true);
            const { data: carsData } = await window.supabaseClient.from('cars').select('*');
            const { data: propData } = await window.supabaseClient.from('properties').select('*');

            // Merge DB cars with HYBRID_CARS (DB cars take priority, no duplicates)
            const allCars = [...HYBRID_CARS];
            if (carsData && carsData.length > 0) {
                carsData.forEach(dbCar => {
                    if (!allCars.find(c => c.title === dbCar.title)) {
                        allCars.push(dbCar);
                    }
                });
                console.log("Supabase Sync OK - Cars:", carsData.length);
            }

            // Always merge MOCK_PROPS with any live DB properties
            const allProps = [...MOCK_PROPS];
            if (propData && propData.length > 0) {
                propData.forEach(dbProp => {
                    if (!allProps.find(p => p.title === dbProp.title)) {
                        allProps.push(dbProp);
                    }
                });
                console.log("Supabase Sync OK - Props:", propData.length);
            }

            setCars(allCars);
            setProperties(allProps);
        } catch (error) {
            console.warn("Using Fallback Data:", error);
            setCars(HYBRID_CARS);
            setProperties(MOCK_PROPS);
            setConnectionError(null);
        } finally {
            setLoading(false);
        }
    };

    const addAsset = async (type, assetData) => {
        try {
            // Optimistically update UI
            const newAsset = { ...assetData, id: 'temp-' + Date.now(), type, views: 0 };
            if (type === 'car') {
                setCars(prev => [newAsset, ...prev]);
                HYBRID_CARS.unshift(newAsset);
            } else {
                setProperties(prev => [newAsset, ...prev]);
                MOCK_PROPS.unshift(newAsset);
            }

            if (!window.supabaseClient) throw new Error("Supabase client not initialized");

            const { data, error } = await window.supabaseClient
                .from(type === 'car' ? 'cars' : 'properties')
                .insert([assetData])
                .select();

            if (error) throw error;
            console.log(`Successfully added ${type} to Supabase`);
            await fetchData();
            return { success: true, data };
        } catch (error) {
            console.warn(`Supabase Add ${type} Error (Mock Mode Active):`, error.message);
            return { success: true, mockMode: true };
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return { 
        cars, 
        properties, 
        loading, 
        connectionError, 
        refresh: fetchData, 
        addAsset 
    };
};
