// Supabase Client Configuration
const SUPABASE_URL = 'https://cjxyfwuqakbmcgpjsub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_DxFGUXuiKq_qmyEmvvKA5g_iQhQ-6m9N';

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
        // Direct Heartbeat Test
        try {
            // Target the actual API endpoint for the heartbeat
            await fetch(`${SUPABASE_URL}/rest/v1/`, { mode: 'no-cors' });
        } catch (e) {
            console.error("Supabase domain is BLOCKED by browser/network!");
            setConnectionError("DomainBlocked");
            setLoading(false);
            return;
        }

        if (!window.supabaseClient) {
            console.error("Supabase client is not ready. Retrying in 1s...");
            setTimeout(fetchData, 1000);
            return;
        }

        try {
            setLoading(true);
            const { data: carsData, error: carsError } = await window.supabaseClient.from('cars').select('*');
            const { data: propData, error: propError } = await window.supabaseClient.from('properties').select('*');
            
            if (carsError) {
                console.error("Supabase Error (Cars):", carsError);
                throw carsError;
            }
            if (propError) {
                console.error("Supabase Error (Properties):", propError);
                throw propError;
            }

            setCars(carsData || []);
            setProperties(propData || []);
            setConnectionError(null);
            console.log("Loaded data from Supabase:", { cars: carsData?.length, props: propData?.length });
        } catch (error) {
            console.error("Critical Fetch Error:", error);
            const errorMsg = error.message || (typeof error === 'string' ? error : JSON.stringify(error));
            setConnectionError(errorMsg);
            // Still show mock data as final fallback to avoid empty screen
            setCars(MOCK_CARS);
            setProperties(MOCK_PROPS);
        } finally {
            setLoading(false);
        }
    };

    const addCar = async (carData) => {
        try {
            const { data, error } = await window.supabaseClient
                .from('cars')
                .insert([carData])
                .select();

            if (error) throw error;
            await fetchData(); // Refresh list
            return { success: true, data };
        } catch (error) {
            console.error("Add Car Error:", error);
            return { success: false, error };
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return { cars, properties, loading, connectionError, refresh: fetchData, addCar };
};
