const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const allowedOrigins = [
  'http://localhost:8080',        // local frontend
  'http://127.0.0.1:8080',
  'https://restaurant-system-frontend-xqql.onrender.com' // your Render frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/abuabdourestaurant';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  price: { type: String, required: true },
  category: { type: String, required: true },
  tags: {
    en: [{ type: String }],
    ar: [{ type: String }]
  },
  badge: {
    en: { type: String, default: null },
    ar: { type: String, default: null }
  },
  createdAt: { type: Date, default: Date.now }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Translations Schema
const translationSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  en: { type: String, required: true },
  ar: { type: String, required: true }
});

const Translation = mongoose.model('Translation', translationSchema);

// Seed initial data
async function seedDatabase() {
  const count = await MenuItem.countDocuments();
  if (count === 0) {
    console.log('🌱 Seeding database with initial menu items...');
    
    const menuItems = [
      // Appetizers
      {
        name: { en: "Hummus with Pita", ar: "حمص مع بيتا" },
        description: { en: "Creamy chickpea dip blended with tahini, garlic, and olive oil, served with warm pita bread", ar: "طحينة حمص كريمية ممزوجة مع طحينة وثوم وزيت زيتون، تقدم مع خبز بيتا الدافئ" },
        price: "$8.99",
        category: "appetizers",
        tags: { en: ["Vegetarian", "Popular"], ar: ["نباتي", "شعبي"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Baba Ganoush", ar: "بابا غنوج" },
        description: { en: "Smoky roasted eggplant dip with tahini, garlic, and lemon juice", ar: "باذنجان مشوي مدخن مع طحينة وثوم وعصير ليمون" },
        price: "$9.99",
        category: "appetizers",
        tags: { en: ["Vegetarian", "Vegan"], ar: ["نباتي", "نباتي صرف"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Fattoush Salad", ar: "سلطة فتوش" },
        description: { en: "Fresh mixed greens with crispy pita chips, tomatoes, cucumbers, and sumac dressing", ar: "خضروات مشكلة طازجة مع شرائح بيتا مقرمشة وطماطم وخيار وصلصة السماق" },
        price: "$10.99",
        category: "appetizers",
        tags: { en: ["Vegetarian", "Fresh"], ar: ["نباتي", "طازج"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Fried Kibbeh", ar: "كبة مقلية" },
        description: { en: "Crispy bulgur shells filled with spiced ground beef and pine nuts", ar: "قشور برغل مقرمشة محشوة بلحم مفروم متبل وصنوبر" },
        price: "$11.99",
        category: "appetizers",
        tags: { en: ["Popular"], ar: ["شعبي"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Falafel Platter", ar: "طبق falcon" },
        description: { en: "Crispy chickpea and herb fritters served with tahini sauce and pickles", ar: "قطاعات حمص وأعشاب مقرمشة تقدم مع صلصة الطحينة والمخللات" },
        price: "$12.99",
        category: "appetizers",
        tags: { en: ["Vegetarian", "Vegan"], ar: ["نباتي", "نباتي صرف"] },
        badge: { en: "Chef's Choice", ar: "اختيار الشيف" }
      },
      // Main Course
      {
        name: { en: "Chicken Shawarma", ar: "شاورما دجاج" },
        description: { en: "Tender marinated chicken carved from the spit, served with garlic sauce and pickles", ar: "دجاج طري ومتبل مشوي على السيخ يقدم مع صلصة الثوم والمخللات" },
        price: "$16.99",
        category: "mains",
        tags: { en: ["Popular", "Signature"], ar: ["شعبي", "مميز"] },
        badge: { en: "Best Seller", ar: "الأكثر مبيعاً" }
      },
      {
        name: { en: "Beef Kebab", ar: "كباب لحم" },
        description: { en: "Char-grilled skewers of seasoned ground beef with onions and parsley", ar: "أسياخ لحم مفروم متبل مشوي على الفحم مع بقدونس وبصل" },
        price: "$18.99",
        category: "mains",
        tags: { en: ["Premium"], ar: ["فاخر"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Mixed Grilled Platter", ar: "طبق مشويات مشكلة" },
        description: { en: "Combination of chicken, beef, and kofta kebabs served with rice and salad", ar: "تشكيلة من كباب الدجاج واللحم والكفتة يقدم مع أرز وسلطة" },
        price: "$24.99",
        category: "mains",
        tags: { en: ["For Two", "Popular"], ar: ["لشخصين", "شعبي"] },
        badge: { en: "Popular", ar: "شعبي" }
      },
      {
        name: { en: "Kousa (Stuffed Cabbage)", ar: "كوسا محشي" },
        description: { en: "Tender cabbage leaves stuffed with seasoned rice and ground beef in tomato sauce", ar: "أوراق ملفوف طرية محشوة بأرز متبل ولحم مفرم في صلصة طماطم" },
        price: "$15.99",
        category: "mains",
        tags: { en: ["Traditional"], ar: ["تقليدي"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Shakshuka", ar: "شكشوكة" },
        description: { en: "Poached eggs in spiced tomato and pepper sauce, served with pita", ar: "بيض مسلوق في صلصة طماطم وفلفل متبل، يقدم مع بيتا" },
        price: "$13.99",
        category: "mains",
        tags: { en: ["Vegetarian", "Breakfast"], ar: ["نباتي", "فطور"] },
        badge: { en: null, ar: null }
      },
      // Grills
      {
        name: { en: "Lamb Chops", ar: "ضلع الحمل" },
        description: { en: "Juicy grilled lamb chops seasoned with Lebanese spices and garlic", ar: "ضلع حمل مشوي وعصاري متبل بالتوابل اللبنانية والثوم" },
        price: "$28.99",
        category: "grills",
        tags: { en: ["Premium"], ar: ["فاخر"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Chicken Kebab", ar: "كباب دجاج" },
        description: { en: "Tender chicken breast cubes marinated in herbs and grilled to perfection", ar: "مكعبات صدر دجاج طرية متبل بالأعشاب مشوية بشكل مثالي" },
        price: "$17.99",
        category: "grills",
        tags: { en: ["Lean", "Popular"], ar: ["خفيف", "شعبي"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Kofta Kebab", ar: "كباب كفتة" },
        description: { en: "Minced beef mixed with onions, parsley, and spices on a skewer", ar: "لحم مفروم مخلوط مع بصل وبقدونس وتوابل على سيخ" },
        price: "$16.99",
        category: "grills",
        tags: { en: ["Traditional"], ar: ["تقليدي"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Mixed Seafood Grill", ar: "مشويات بحر مشكلة" },
        description: { en: "Fresh shrimp, calamari, and fish fillet grilled with lemon and herbs", ar: "جمبري و calamari وشرائح سمك طازجة مشوية مع ليمون وأعشاب" },
        price: "$26.99",
        category: "grills",
        tags: { en: ["Fresh"], ar: ["طازج"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Grilled Halloumi", ar: "حلوم مشوي" },
        description: { en: "Char-grilled Cypriot cheese served with fresh vegetables and olive oil", ar: "جبن قبرصي مشوي على الفحم يقدم مع خضروات طازجة وزيت زيتون" },
        price: "$12.99",
        category: "grills",
        tags: { en: ["Vegetarian"], ar: ["نباتي"] },
        badge: { en: null, ar: null }
      },
      // Desserts
      {
        name: { en: "Baklava", ar: "بقلاوة" },
        description: { en: "Layers of flaky phyllo filled with nuts and honey syrup", ar: "طبقات من العجين الهش محشوة بالمكسرات والشراب السكري" },
        price: "$7.99",
        category: "desserts",
        tags: { en: ["Sweet", "Traditional"], ar: ["حلو", "تقليدي"] },
        badge: { en: "Sweet", ar: "حلو" }
      },
      {
        name: { en: "Knafeh", ar: "كنافة" },
        description: { en: "Sweet cheese pastry soaked in rose water syrup, topped with pistachios", ar: "معجنات جبن حلوة منقوعة في شراب الورد، مغطاة بالفستق" },
        price: "$8.99",
        category: "desserts",
        tags: { en: ["Signature", "Popular"], ar: ["مميز", "شعبي"] },
        badge: { en: "Must Try", ar: "يجب تجربته" }
      },
      {
        name: { en: "Maamoul", ar: "معمول" },
        description: { en: "Soft date-filled cookies dusted with powdered sugar", ar: "بسكويت طري محشي بالتمر مرشوش بالسكر البودرة" },
        price: "$6.99",
        category: "desserts",
        tags: { en: ["Traditional"], ar: ["تقليدي"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Rice Pudding", ar: "أرز بالحليب" },
        description: { en: "Creamy rice pudding flavored with rose water and cinnamon", ar: "أرز بالحليب الكريمي بنكهة ماء الورد والقرفة" },
        price: "$5.99",
        category: "desserts",
        tags: { en: ["Light"], ar: ["خفيف"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Fresh Fruit Platter", ar: "طبق فواكه طازجة" },
        description: { en: "Seasonal fresh fruits served with honey and yogurt", ar: "فواكه طازجة موسمية تقدم مع عسل وياغورت" },
        price: "$9.99",
        category: "desserts",
        tags: { en: ["Fresh", "Healthy"], ar: ["طازج", "صحي"] },
        badge: { en: null, ar: null }
      },
      // Beverages
      {
        name: { en: "Arabic Coffee", ar: "قهوة عربية" },
        description: { en: "Traditional coffee infused with cardamom and served with dates", ar: "قهوة تقليدية ممزوجة بالهيل وتقدم مع تمور" },
        price: "$4.99",
        category: "beverages",
        tags: { en: ["Traditional", "Hot"], ar: ["تقليدي", "ساخن"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Fresh Lemonade", ar: "عصير ليمون طازج" },
        description: { en: "Freshly squeezed lemons with mint and a hint of rose water", ar: "ليمونات طازجة مع نعناع ولمسة من ماء الورد" },
        price: "$4.99",
        category: "beverages",
        tags: { en: ["Fresh", "Refreshing"], ar: ["طازج", "منعش"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Turkish Coffee", ar: "قهوة تركية" },
        description: { en: "Strong brewed coffee served in traditional cups with foam", ar: "قهوة قوية مطهوة تقدم في أكواب تقليدية مع رغوة" },
        price: "$5.99",
        category: "beverages",
        tags: { en: ["Traditional", "Hot"], ar: ["تقليدي", "ساخن"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Jallab", ar: "جلب" },
        description: { en: "Sweet syrup drink with rose water, pine nuts, and raisins", ar: "مشروب شراب حلو مع ماء الورد وصنوبر والزبيب" },
        price: "$5.99",
        category: "beverages",
        tags: { en: ["Refreshing", "Traditional"], ar: ["منعش", "تقليدي"] },
        badge: { en: null, ar: null }
      },
      {
        name: { en: "Ayran", ar: "عيران" },
        description: { en: "Traditional yogurt drink with a hint of mint", ar: "مشروب زبادي تقليدي لمسة من النعناع" },
        price: "$3.99",
        category: "beverages",
        tags: { en: ["Refreshing", "Cold"], ar: ["منعش", "بارد"] },
        badge: { en: null, ar: null }
      }
    ];

    await MenuItem.insertMany(menuItems);
    console.log('✅ Menu items seeded successfully');
  }

  // Seed translations
  // Always delete and re-seed to ensure latest translations are loaded
  await Translation.deleteMany({});
  console.log('🌱 Seeding translations...');
  
    const translations = [
      { key: 'nav.home', en: 'Home', ar: 'الرئيسية' },
      { key: 'nav.menu', en: 'Menu', ar: 'القائمة' },
      { key: 'nav.about', en: 'About', ar: 'من نحن' },
      { key: 'nav.contact', en: 'Contact', ar: 'اتصل بنا' },
      { key: 'hero.badge', en: 'Since 1985', ar: 'منذ 1985' },
      { key: 'hero.title1', en: 'Authentic', ar: 'أصلي' },
      { key: 'hero.title2', en: 'Middle Eastern', ar: 'شرق أوسطي' },
      { key: 'hero.title3', en: 'Cuisine', ar: 'المطبخ' },
      { key: 'hero.description', en: 'Experience the rich flavors of traditional recipes passed down through generations', ar: 'استمتع بالنكهة الغنية للوصفات التقليدية التي ورثناها عبر الأجيال' },
      { key: 'hero.viewMenu', en: 'View Menu', ar: 'عرض القائمة' },
      { key: 'hero.orderNow', en: 'Order Now', ar: 'اطلب الآن' },
      { key: 'hero.scroll', en: 'Scroll to explore', ar: 'قم بالتمرير للاستكشاف' },
      { key: 'menu.tag', en: 'Our Menu', ar: 'قائمنا' },
      { key: 'menu.title', en: 'Discover Our<br>Delicious Offerings', ar: 'اكتشف<br>أطباقنا اللذيذة' },
      { key: 'menu.description', en: 'Fresh ingredients, authentic recipes, and love in every dish', ar: 'مكونات طازجة، وصفات أصلية، وحب في كل طبق' },
      { key: 'menu.all', en: 'All', ar: 'الكل' },
      { key: 'menu.appetizers', en: 'Appetizers', ar: 'المقبلات' },
      { key: 'menu.mains', en: 'Main Course', ar: 'الأطباق الرئيسية' },
      { key: 'menu.grills', en: 'Grills', ar: 'المشويات' },
      { key: 'menu.desserts', en: 'Desserts', ar: 'الحلويات' },
      { key: 'menu.beverages', en: 'Beverages', ar: 'المشروبات' },
      { key: 'about.tag', en: 'Our Story', ar: 'قصتنا' },
      { key: 'about.title', en: 'Tradition Meets<br>Excellence', ar: 'التقالة<br>تواجه التميز' },
      { key: 'about.years', en: 'Years Experience', ar: 'سنوات الخبرة' },
      { key: 'about.items', en: 'Menu Items', ar: 'عنصر القائمة' },
      { key: 'about.customers', en: 'Happy Customers', ar: 'عميل سعيد' },
      { key: 'about.text1', en: 'Founded in 1985, <Insert Name> Restaurant has been serving authentic Middle Eastern cuisine to our beloved community for over three decades.', ar: 'منذ عام 1985، كان مطعم أبو عبدو يقدم المطبخ الشرقي الأصيل لمجتمعتنا العزيزة لأكثر من ثلاثة عقود.' },
      { key: 'about.text2', en: 'Every dish we serve is prepared with love and dedication.', ar: 'كل طبق نقدمه محضر بحب وإخلاص.' },
      { key: 'about.feature1', en: 'Fresh, locally-sourced ingredients', ar: 'مكونات طازجة محلية' },
      { key: 'about.feature2', en: 'Authentic family recipes', ar: 'وصفات عائلية أصلية' },
      { key: 'about.feature3', en: 'Warm, welcoming atmosphere', ar: 'أجواء دافئة ومرحبة' },
      { key: 'about.feature4', en: 'Exceptional customer service', ar: 'خدمة عملاء استثنائية' },
      { key: 'contact.tag', en: 'Get In Touch', ar: 'تواصل معنا' },
      { key: 'contact.title', en: 'Visit Us or<br>Order Online', ar: 'زُرنا أو<br>اطلب عبر الإنترنت' },
      { key: 'contact.location', en: 'Location', ar: 'الموقع' },
      { key: 'contact.hours', en: 'Opening Hours', ar: 'ساعات العمل' },
      { key: 'contact.hoursText', en: 'Daily: 8:00 AM - 12:00 AM<br>Friday: 9:00 AM - 1:00 AM', ar: 'يومياً: 8:00 صباحاً - 12:00 منتصف الليل<br>الجمعة: 9:00 صباحاً - 1:00 صباحاً' },
      { key: 'contact.phone', en: 'Phone', ar: 'الهاتف' },
      { key: 'contact.email', en: 'Email', ar: 'البريد الإلكتروني' },
      { key: 'footer.tagline', en: 'Authentic Middle Eastern cuisine since 1985', ar: 'مطبخ شرقي أصيل منذ 1985' },
      { key: 'footer.quickLinks', en: 'Quick Links', ar: 'روابط سريعة' },
      { key: 'footer.monThu', en: 'Monday - Thursday: 8AM - 11PM', ar: 'الاثنين - الخميس: 8ص - 11م' },
      { key: 'footer.friSat', en: 'Friday - Saturday: 8AM - 1AM', ar: 'الجمعة - السبت: 8ص - 1ص' },
      { key: 'footer.sunday', en: 'Sunday: 9AM - 10PM', ar: 'الأحد: 9ص - 10م' }
    ];

    await Translation.insertMany(translations);
    console.log('✅ Translations seeded successfully');
}

// API Routes

// Get all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    const menuItems = await MenuItem.find(query);
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single menu item
app.get('/api/menu/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all translations
app.get('/api/translations', async (req, res) => {
  try {
    const translations = await Translation.find();
    const transObj = {};
    translations.forEach(t => {
      transObj[t.key] = { en: t.en, ar: t.ar };
    });
    res.json(transObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add menu item (for future admin functionality)
app.post('/api/menu', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Wait for MongoDB and seed data
  setTimeout(async () => {
    await seedDatabase();
  }, 2000);
});
