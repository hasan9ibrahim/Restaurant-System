/* ============================================
   Abu Abdou Restaurant - Interactive Script
   ============================================ */

// Translations
const translations = {
    en: {
        nav: {
            home: 'Home',
            menu: 'Menu',
            about: 'About',
            contact: 'Contact'
        },
        hero: {
            badge: 'Since 1985',
            title1: 'Authentic',
            title2: 'Middle Eastern',
            title3: 'Cuisine',
            description: 'Experience the rich flavors of traditional recipes passed down through generations',
            viewMenu: 'View Menu',
            orderNow: 'Order Now',
            scroll: 'Scroll to explore'
        },
        menu: {
            tag: 'Our Menu',
            title: 'Discover Our<br>Delicious Offerings',
            description: 'Fresh ingredients, authentic recipes, and love in every dish',
            all: 'All',
            appetizers: 'Appetizers',
            mains: 'Main Course',
            grills: 'Grills',
            desserts: 'Desserts',
            beverages: 'Beverages'
        },
        about: {
            tag: 'Our Story',
            title: 'Tradition Meets<br>Excellence',
            years: 'Years Experience',
            items: 'Menu Items',
            customers: 'Happy Customers',
            text1: 'Founded in 1985, Abu Abdou Restaurant has been serving authentic Middle Eastern cuisine to our beloved community for over three decades. Our recipes are rooted in tradition, using only the freshest ingredients and time-honored cooking methods.',
            text2: 'Every dish we serve is prepared with love and dedication, just like our grandmother used to make. We take pride in creating memorable dining experiences that bring families and friends together.',
            feature1: 'Fresh, locally-sourced ingredients',
            feature2: 'Authentic family recipes',
            feature3: 'Warm, welcoming atmosphere',
            feature4: 'Exceptional customer service'
        },
        contact: {
            tag: 'Get In Touch',
            title: 'Visit Us or<br>Order Online',
            location: 'Location',
            hours: 'Opening Hours',
            hoursText: 'Daily: 8:00 AM - 12:00 AM<br>Friday: 9:00 AM - 1:00 AM',
            phone: 'Phone',
            email: 'Email'
        },
        footer: {
            tagline: 'Authentic Middle Eastern cuisine since 1985',
            quickLinks: 'Quick Links',
            monThu: 'Monday - Thursday: 8AM - 11PM',
            friSat: 'Friday - Saturday: 8AM - 1AM',
            sunday: 'Sunday: 9AM - 10PM'
        }
    },
    ar: {
        nav: {
            home: 'الرئيسية',
            menu: 'القائمة',
            about: 'من نحن',
            contact: 'اتصل بنا'
        },
        hero: {
            badge: 'منذ 1985',
            title1: 'أصلي',
            title2: 'شرق أوسطي',
            title3: 'المطبخ',
            description: 'استمتع بالنكهة الغنية للوصفات التقليدية التي ورثناها عبر الأجيال',
            viewMenu: 'عرض القائمة',
            orderNow: 'اطلب الآن',
            scroll: 'قم بالتمرير للاستكشاف'
        },
        menu: {
            tag: 'قائمنا',
            title: 'اكتشف<br>أطباقنا اللذيذة',
            description: 'مكونات طازجة، وصفات أصلية، وحب في كل طبق',
            all: 'الكل',
            appetizers: 'المقبلات',
            mains: 'الأطباق الرئيسية',
            grills: 'المشويات',
            desserts: 'الحلويات',
            beverages: 'المشروبات'
        },
        about: {
            tag: 'قصتنا',
            title: 'التقالة<br>تواجه التميز',
            years: 'سنوات الخبرة',
            items: 'عنصر القائمة',
            customers: 'عميل سعيد',
            text1: 'منذ عام 1985، كان مطعم أبو عبدو يقدم المطبخ الشرقي الأصيل لمجتمعتنا العزيزة لأكثر من ثلاثة عقود. وصفاتنا مبنية على التقاليد، باستخدام أجود المكونات الطازجة وطرق الطبخ التقليدية.',
            text2: 'كل طبق نقدمه محضر بحب وإخلاص، تمامًا كما كانت جدتنا تفعل. نفخر بخلق تجارب طعام لا تُنسى تجمع العائلات والأصدقاء.',
            feature1: 'مكونات طازجة محلية',
            feature2: 'وصفات عائلية أصلية',
            feature3: 'أجواء دافئة ومرحبة',
            feature4: 'خدمة عملاء استثنائية'
        },
        contact: {
            tag: 'تواصل معنا',
            title: 'زُرنا أو<br>اطلب عبر الإنترنت',
            location: 'الموقع',
            hours: 'ساعات العمل',
            hoursText: 'يومياً: 8:00 صباحاً - 12:00 منتصف الليل<br>الجمعة: 9:00 صباحاً - 1:00 صباحاً',
            phone: 'الهاتف',
            email: 'البريد الإلكتروني'
        },
        footer: {
            tagline: 'مطبخ شرقي أصيل منذ 1985',
            quickLinks: 'روابط سريعة',
            monThu: 'الاثنين - الخميس: 8ص - 11م',
            friSat: 'الجمعة - السبت: 8ص - 1ص',
            sunday: 'الأحد: 9ص - 10م'
        }
    }
};

// Menu Data with Bilingual Support
const menuItems = [
    // Appetizers
    {
        id: 1,
        name: { en: "Hummus with Pita", ar: "حمص مع بيتا" },
        description: { en: "Creamy chickpea dip blended with tahini, garlic, and olive oil, served with warm pita bread", ar: "طحينة حمص كريمية ممزوجة مع طحينة وثوم وزيت زيتون، تقدم مع خبز بيتا الدافئ" },
        price: "$8.99",
        category: "appetizers",
        tags: { en: ["Vegetarian", "Popular"], ar: ["نباتي", "شعبي"] },
        badge: { en: null, ar: null }
    },
    {
        id: 2,
        name: { en: "Baba Ganoush", ar: "بابا غنوج" },
        description: { en: "Smoky roasted eggplant dip with tahini, garlic, and lemon juice", ar: "باذنجان مشوي مدخن مع طحينة وثوم وعصير ليمون" },
        price: "$9.99",
        category: "appetizers",
        tags: { en: ["Vegetarian", "Vegan"], ar: ["نباتي", "نباتي صرف"] },
        badge: { en: null, ar: null }
    },
    {
        id: 3,
        name: { en: "Fattoush Salad", ar: "سلطة فتوش" },
        description: { en: "Fresh mixed greens with crispy pita chips, tomatoes, cucumbers, and sumac dressing", ar: "خضروات مشكلة طازجة مع شرائح بيتا مقرمشة وطماطم وخيار وصلصة السماق" },
        price: "$10.99",
        category: "appetizers",
        tags: { en: ["Vegetarian", "Fresh"], ar: ["نباتي", "طازج"] },
        badge: { en: null, ar: null }
    },
    {
        id: 4,
        name: { en: "Fried Kibbeh", ar: "كبة مقلية" },
        description: { en: "Crispy bulgur shells filled with spiced ground beef and pine nuts", ar: "قشور برغل مقرمشة محشوة بلحم مفروم متبل وصنوبر" },
        price: "$11.99",
        category: "appetizers",
        tags: { en: ["Popular"], ar: ["شعبي"] },
        badge: { en: null, ar: null }
    },
    {
        id: 5,
        name: { en: "Falafel Platter", ar: "طبق falcon" },
        description: { en: "Crispy chickpea and herb fritters served with tahini sauce and pickles", ar: "قطاعات حمص وأعشاب مقرمشة تقدم مع صلصة الطحينة والمخللات" },
        price: "$12.99",
        category: "appetizers",
        tags: { en: ["Vegetarian", "Vegan"], ar: ["نباتي", "نباتي صرف"] },
        badge: { en: "Chef's Choice", ar: "اختيار الشيف" }
    },
    
    // Main Course
    {
        id: 6,
        name: { en: "Chicken Shawarma", ar: "شاورما دجاج" },
        description: { en: "Tender marinated chicken carved from the spit, served with garlic sauce and pickles", ar: "دجاج طري ومتبل مشوي على السيخ يقدم مع صلصة الثوم والمخللات" },
        price: "$16.99",
        category: "mains",
        tags: { en: ["Popular", "Signature"], ar: ["شعبي", "مميز"] },
        badge: { en: "Best Seller", ar: "الأكثر مبيعاً" }
    },
    {
        id: 7,
        name: { en: "Beef Kebab", ar: "كباب لحم" },
        description: { en: "Char-grilled skewers of seasoned ground beef with onions and parsley", ar: "أسياخ لحم مفروم متبل مشوي على الفحم مع بقدونس وبصل" },
        price: "$18.99",
        category: "mains",
        tags: { en: ["Premium"], ar: ["فاخر"] },
        badge: { en: null, ar: null }
    },
    {
        id: 8,
        name: { en: "Mixed Grilled Platter", ar: "طبق مشويات مشكلة" },
        description: { en: "Combination of chicken, beef, and kofta kebabs served with rice and salad", ar: "تشكيلة من كباب الدجاج واللحم والكفتة يقدم مع أرز وسلطة" },
        price: "$24.99",
        category: "mains",
        tags: { en: ["For Two", "Popular"], ar: ["لشخصين", "شعبي"] },
        badge: { en: "Popular", ar: "شعبي" }
    },
    {
        id: 9,
        name: { en: "Kousa (Stuffed Cabbage)", ar: "كوسا محشي" },
        description: { en: "Tender cabbage leaves stuffed with seasoned rice and ground beef in tomato sauce", ar: "أوراق ملفوف طرية محشوة بأرز متبل ولحم مفرم في صلصة طماطم" },
        price: "$15.99",
        category: "mains",
        tags: { en: ["Traditional"], ar: ["تقليدي"] },
        badge: { en: null, ar: null }
    },
    {
        id: 10,
        name: { en: "Shakshuka", ar: "شكشوكة" },
        description: { en: "Poached eggs in spiced tomato and pepper sauce, served with pita", ar: "بيض مسلوق في صلصة طماطم وفلفل متبل، يقدم مع بيتا" },
        price: "$13.99",
        category: "mains",
        tags: { en: ["Vegetarian", "Breakfast"], ar: ["نباتي", "فطور"] },
        badge: { en: null, ar: null }
    },
    
    // Grills
    {
        id: 11,
        name: { en: "Lamb Chops", ar: "ضلع الحمل" },
        description: { en: "Juicy grilled lamb chops seasoned with Lebanese spices and garlic", ar: "ضلع حمل مشوي وعصيري متبل بالتوابل اللبنانية والثوم" },
        price: "$28.99",
        category: "grills",
        tags: { en: ["Premium"], ar: ["فاخر"] },
        badge: { en: null, ar: null }
    },
    {
        id: 12,
        name: { en: "Chicken Kebab", ar: "كباب دجاج" },
        description: { en: "Tender chicken breast cubes marinated in herbs and grilled to perfection", ar: "مكعبات صدر دجاج طرية متبل بالأعشاب مشوية بشكل مثالي" },
        price: "$17.99",
        category: "grills",
        tags: { en: ["Lean", "Popular"], ar: ["خفيف", "شعبي"] },
        badge: { en: null, ar: null }
    },
    {
        id: 13,
        name: { en: "Kofta Kebab", ar: "كباب كفتة" },
        description: { en: "Minced beef mixed with onions, parsley, and spices on a skewer", ar: "لحم مفروم مخلوط مع بصل وبقدونس وتوابل على سيخ" },
        price: "$16.99",
        category: "grills",
        tags: { en: ["Traditional"], ar: ["تقليدي"] },
        badge: { en: null, ar: null }
    },
    {
        id: 14,
        name: { en: "Mixed Seafood Grill", ar: "مشويات بحر مشكلة" },
        description: { en: "Fresh shrimp, calamari, and fish fillet grilled with lemon and herbs", ar: "جمبري و calamari وشرائح سمك طازجة مشوية مع ليمون وأعشاب" },
        price: "$26.99",
        category: "grills",
        tags: { en: ["Fresh"], ar: ["طازج"] },
        badge: { en: null, ar: null }
    },
    {
        id: 15,
        name: { en: "Grilled Halloumi", ar: "حلوم مشوي" },
        description: { en: "Char-grilled Cypriot cheese served with fresh vegetables and olive oil", ar: "جبن قبرصي مشوي على الفحم يقدم مع خضروات طازجة وزيت زيتون" },
        price: "$12.99",
        category: "grills",
        tags: { en: ["Vegetarian"], ar: ["نباتي"] },
        badge: { en: null, ar: null }
    },
    
    // Desserts
    {
        id: 16,
        name: { en: "Baklava", ar: "بقلاوة" },
        description: { en: "Layers of flaky phyllo filled with nuts and honey syrup", ar: "طبقات من العجين الهش محشوة بالمكسرات والشراب السكري" },
        price: "$7.99",
        category: "desserts",
        tags: { en: ["Sweet", "Traditional"], ar: ["حلو", "تقليدي"] },
        badge: { en: "Sweet", ar: "حلو" }
    },
    {
        id: 17,
        name: { en: "Knafeh", ar: "كنافة" },
        description: { en: "Sweet cheese pastry soaked in rose water syrup, topped with pistachios", ar: "معجنات جبن حلوة منقوعة في شراب الورد، مغطاة بالفستق" },
        price: "$8.99",
        category: "desserts",
        tags: { en: ["Signature", "Popular"], ar: ["مميز", "شعبي"] },
        badge: { en: "Must Try", ar: "يجب تجربته" }
    },
    {
        id: 18,
        name: { en: "Maamoul", ar: "معمول" },
        description: { en: "Soft date-filled cookies dusted with powdered sugar", ar: "بسكويت طري محشي بالتمر مرشوش بالسكر البودرة" },
        price: "$6.99",
        category: "desserts",
        tags: { en: ["Traditional"], ar: ["تقليدي"] },
        badge: { en: null, ar: null }
    },
    {
        id: 19,
        name: { en: "Rice Pudding", ar: "أرز بالحليب" },
        description: { en: "Creamy rice pudding flavored with rose water and cinnamon", ar: "أرز بالحليب الكريمي بنكهة ماء الورد والقرفة" },
        price: "$5.99",
        category: "desserts",
        tags: { en: ["Light"], ar: ["خفيف"] },
        badge: { en: null, ar: null }
    },
    {
        id: 20,
        name: { en: "Fresh Fruit Platter", ar: "طبق فواكه طازجة" },
        description: { en: "Seasonal fresh fruits served with honey and yogurt", ar: "فواكه طازجة موسمية تقدم مع عسل وياغورت" },
        price: "$9.99",
        category: "desserts",
        tags: { en: ["Fresh", "Healthy"], ar: ["طازج", "صحي"] },
        badge: { en: null, ar: null }
    },
    
    // Beverages
    {
        id: 21,
        name: { en: "Arabic Coffee", ar: "قهوة عربية" },
        description: { en: "Traditional coffee infused with cardamom and served with dates", ar: "قهوة تقليدية ممزوجة بالهيل وتقدم مع تمور" },
        price: "$4.99",
        category: "beverages",
        tags: { en: ["Traditional", "Hot"], ar: ["تقليدي", "ساخن"] },
        badge: { en: null, ar: null }
    },
    {
        id: 22,
        name: { en: "Fresh Lemonade", ar: "عصير ليمون طازج" },
        description: { en: "Freshly squeezed lemons with mint and a hint of rose water", ar: "ليمونات طازجة مع نعناع ولمسة من ماء الورد" },
        price: "$4.99",
        category: "beverages",
        tags: { en: ["Fresh", "Refreshing"], ar: ["طازج", "منعش"] },
        badge: { en: null, ar: null }
    },
    {
        id: 23,
        name: { en: "Turkish Coffee", ar: "قهوة تركية" },
        description: { en: "Strong brewed coffee served in traditional cups with foam", ar: "قهوة قوية مطهوة تقدم في أكواب تقليدية مع رغوة" },
        price: "$5.99",
        category: "beverages",
        tags: { en: ["Traditional", "Hot"], ar: ["تقليدي", "ساخن"] },
        badge: { en: null, ar: null }
    },
    {
        id: 24,
        name: { en: "Jallab", ar: "جلب" },
        description: { en: "Sweet syrup drink with rose water, pine nuts, and raisins", ar: "مشروب شراب حلو مع ماء الورد وصنوبر والزبيب" },
        price: "$5.99",
        category: "beverages",
        tags: { en: ["Refreshing", "Traditional"], ar: ["منعش", "تقليدي"] },
        badge: { en: null, ar: null }
    },
    {
        id: 25,
        name: { en: "Ayran", ar: "عيران" },
        description: { en: "Traditional yogurt drink with a hint of mint", ar: "مشروب زبادي تقليدي لمسة من النعناع" },
        price: "$3.99",
        category: "beverages",
        tags: { en: ["Refreshing", "Cold"], ar: ["منعش", "بارد"] },
        badge: { en: null, ar: null }
    }
];

// Current Language
let currentLang = 'en';

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');
const allNavLinks = document.querySelectorAll('.nav-links a');
const langSwitch = document.getElementById('langSwitch');
const htmlElement = document.documentElement;

// Initialize
function init() {
    initMenu();
    setupCategoryButtons();
    setupNavigation();
    setupScrollEffects();
    setupSmoothScroll();
    setupLanguageSwitcher();
    applyTranslations();
}

// Language Switcher
function setupLanguageSwitcher() {
    langSwitch.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        applyTranslations();
        updateDirection();
        renderMenuItems(getActiveCategory());
    });
}

function updateDirection() {
    if (currentLang === 'ar') {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'ar');
    } else {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', 'en');
    }
}

function applyTranslations() {
    const t = translations[currentLang];
    
    // Apply translations to all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = t;
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        if (value) {
            if (value.includes('<br>')) {
                element.innerHTML = currentLang === 'ar' ? value : value;
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Update language button text
    document.querySelector('.lang-en').textContent = currentLang === 'en' ? 'EN' : 'إنجليزية';
    document.querySelector('.lang-ar').textContent = currentLang === 'ar' ? 'عربي' : 'عربي';
}

// Get Active Category
function getActiveCategory() {
    const activeBtn = document.querySelector('.category-btn.active');
    return activeBtn ? activeBtn.dataset.category : 'all';
}

// Initialize Menu
function initMenu() {
    renderMenuItems('all');
}

// Render Menu Items
function renderMenuItems(category) {
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    menuGrid.innerHTML = '';
    
    filteredItems.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.style.animationDelay = `${index * 0.1}s`;
        
        const name = item.name[currentLang] || item.name.en;
        const description = item.description[currentLang] || item.description.en;
        const tags = item.tags[currentLang] || item.tags.en;
        const badge = item.badge[currentLang] || item.badge.en;
        
        menuItem.innerHTML = `
            <div class="menu-item-image">
                <i class="fas fa-utensils"></i>
                ${badge ? `<span class="menu-item-badge">${badge}</span>` : ''}
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${name}</h3>
                    <span class="menu-item-price">${item.price}</span>
                </div>
                <p class="menu-item-description">${description}</p>
                <div class="menu-item-footer">
                    <div class="menu-item-tags">
                        ${tags.map(tag => `<span class="menu-item-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="menu-item-btn" aria-label="Add ${name} to cart">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        
        menuGrid.appendChild(menuItem);
    });
}

// Setup Category Buttons
function setupCategoryButtons() {
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Render filtered items
            const category = btn.dataset.category;
            renderMenuItems(category);
        });
    });
}

// Setup Navigation
function setupNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll effects for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Setup Scroll Effects
function setupScrollEffects() {
    // Back to top button visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Back to top click handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Setup Smooth Scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add to cart functionality (placeholder)
document.addEventListener('click', (e) => {
    if (e.target.closest('.menu-item-btn')) {
        const btn = e.target.closest('.menu-item-btn');
        const menuItem = btn.closest('.menu-item');
        const itemName = menuItem.querySelector('.menu-item-title').textContent;
        
        // Animate button
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        // Could add cart functionality here
        console.log(`Added ${itemName} to cart`);
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);
