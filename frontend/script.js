/* ============================================
   <Insert Name> Restaurant - Interactive Script
   ============================================ */

// State
let translations = {};
let currentLang = 'en';
let menuItems = [];

// Fallback Translations (used when API is unavailable)
const fallbackTranslations = {
    "nav.home": { en: "Home", ar: "الرئيسية" },
    "nav.menu": { en: "Menu", ar: "القائمة" },
    "nav.about": { en: "About", ar: "من نحن" },
    "nav.contact": { en: "Contact", ar: "اتصل بنا" },
    "hero.badge": { en: "Since 1985", ar: "منذ 1985" },
    "hero.title1": { en: "Authentic", ar: "أصلي" },
    "hero.title2": { en: "Middle Eastern", ar: "شرق أوسطي" },
    "hero.title3": { en: "Cuisine", ar: "المطبخ" },
    "hero.description": { en: "Experience the rich flavors of traditional recipes passed down through generations", ar: "استمتع بالنكهة الغنية للوصفات التقليدية التي ورثناها عبر الأجيال" },
    "hero.viewMenu": { en: "View Menu", ar: "عرض القائمة" },
    "hero.orderNow": { en: "Order Now", ar: "اطلب الآن" },
    "hero.scroll": { en: "Scroll to explore", ar: "قم بالتمرير للاستكشاف" },
    "menu.tag": { en: "Our Menu", ar: "قائمنا" },
    "menu.title": { en: "Discover Our<br>Delicious Offerings", ar: "اكتشف<br>أطباقنا اللذيذة" },
    "menu.description": { en: "Fresh ingredients, authentic recipes, and love in every dish", ar: "مكونات طازجة، وصفات أصلية، وحب في كل طبق" },
    "menu.all": { en: "All", ar: "الكل" },
    "menu.appetizers": { en: "Appetizers", ar: "المقبلات" },
    "menu.mains": { en: "Main Course", ar: "الأطباق الرئيسية" },
    "menu.grills": { en: "Grills", ar: "المشويات" },
    "menu.desserts": { en: "Desserts", ar: "الحلويات" },
    "menu.beverages": { en: "Beverages", ar: "المشروبات" },
    "about.tag": { en: "Our Story", ar: "قصتنا" },
    "about.title": { en: "Tradition Meets<br>Excellence", ar: "التقالة<br>تواجه التميز" },
    "about.text1": { en: "Founded in 1985, <Insert Name> Restaurant has been serving authentic Middle Eastern cuisine to our beloved community for over three decades.", ar: "منذ عام 1985، كان مطعم أبو عبدو يقدم المطبخ الشرقي الأصيل لمجتمعتنا العزيزة لأكثر من ثلاثة عقود." },
    "about.text2": { en: "Every dish we serve is prepared with love and dedication.", ar: "كل طبق نقدمه محضر بحب وإخلاص." },
    "about.feature1": { en: "Fresh, locally-sourced ingredients", ar: "مكونات طازجة محلية" },
    "about.feature2": { en: "Authentic family recipes", ar: "وصفات عائلية أصلية" },
    "about.feature3": { en: "Warm, welcoming atmosphere", ar: "أجواء دافئة ومرحبة" },
    "about.feature4": { en: "Exceptional customer service", ar: "خدمة عملاء استثنائية" },
    "about.years": { en: "Years Experience", ar: "سنوات الخبرة" },
    "about.items": { en: "Menu Items", ar: "عناصر القائمة" },
    "about.customers": { en: "Happy Customers", ar: "عملاء سعيدون" },
    "contact.tag": { en: "Get In Touch", ar: "تواصل معنا" },
    "contact.title": { en: "Visit Us or<br>Order Online", ar: "زُرنا أو<br>اطلب عبر الإنترنت" },
    "contact.location": { en: "Location", ar: "الموقع" },
    "contact.hours": { en: "Opening Hours", ar: "ساعات العمل" },
    "contact.hoursText": { en: "Daily: 8:00 AM - 12:00 AM<br>Friday: 9:00 AM - 1:00 AM", ar: "يومياً: 8:00 صباحاً - 12:00 منتصف الليل<br>الجمعة: 9:00 صباحاً - 1:00 صباحاً" },
    "contact.phone": { en: "Phone", ar: "الهاتف" },
    "contact.email": { en: "Email", ar: "البريد الإلكتروني" },
    "footer.tagline": { en: "Authentic Middle Eastern cuisine since 1985", ar: "مطبخ شرقي أصيل منذ 1985" },
    "footer.quickLinks": { en: "Quick Links", ar: "روابط سريعة" },
    "footer.monThu": { en: "Monday - Thursday: 8AM - 11PM", ar: "الاثنين - الخميس: 8ص - 11م" },
    "footer.friSat": { en: "Friday - Saturday: 8AM - 1AM", ar: "الجمعة - السبت: 8ص - 1ص" },
    "footer.sunday": { en: "Sunday: 9AM - 10PM", ar: "الأحد: 9ص - 10م" }
};

// Fallback Menu Items (used when API is unavailable)
const fallbackMenuItems = [
    { name: { en: "Hummus with Pita", ar: "حمص مع بيتا" }, description: { en: "Creamy chickpea dip blended with tahini, garlic, and olive oil", ar: "طحينة حمص كريمية ممزوجة مع طحينة وثوم وزيت زيتون" }, price: "$8.99", category: "appetizers", tags: { en: ["Vegetarian", "Popular"], ar: ["نباتي", "شعبي"] }, badge: { en: null, ar: null } },
    { name: { en: "Baba Ganoush", ar: "بابا غنوج" }, description: { en: "Smoky roasted eggplant dip with tahini", ar: "باذنجان مشوي مدخن مع طحينة" }, price: "$9.99", category: "appetizers", tags: { en: ["Vegetarian", "Vegan"], ar: ["نباتي", "نباتي صرف"] }, badge: { en: null, ar: null } },
    { name: { en: "Chicken Shawarma", ar: "شاورما دجاج" }, description: { en: "Tender marinated chicken carved from the spit", ar: "دجاج طري ومتبل مشوي على السيخ" }, price: "$16.99", category: "mains", tags: { en: ["Popular", "Signature"], ar: ["شعبي", "مميز"] }, badge: { en: "Best Seller", ar: "الأكثر مبيعاً" } },
    { name: { en: "Beef Kebab", ar: "كباب لحم" }, description: { en: "Char-grilled skewers of seasoned ground beef", ar: "أسياخ لحم مفروم متبل مشوي على الفحم" }, price: "$18.99", category: "mains", tags: { en: ["Premium"], ar: ["فاخر"] }, badge: { en: null, ar: null } },
    { name: { en: "Lamb Chops", ar: "ضلع الحمل" }, description: { en: "Juicy grilled lamb chops", ar: "ضلع حمل مشوي وعصاري" }, price: "$28.99", category: "grills", tags: { en: ["Premium"], ar: ["فاخر"] }, badge: { en: null, ar: null } },
    { name: { en: "Baklava", ar: "بقلاوة" }, description: { en: "Layers of flaky phyllo filled with nuts", ar: "طبقات من العجين الهش محشوة بالمكسرات" }, price: "$7.99", category: "desserts", tags: { en: ["Sweet", "Traditional"], ar: ["حلو", "تقليدي"] }, badge: { en: "Sweet", ar: "حلو" } },
    { name: { en: "Arabic Coffee", ar: "قهوة عربية" }, description: { en: "Traditional coffee infused with cardamom", ar: "قهوة تقليدية ممزوجة بالهيل" }, price: "$4.99", category: "beverages", tags: { en: ["Traditional", "Hot"], ar: ["تقليدي", "ساخن"] }, badge: { en: null, ar: null } }
];

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

// API Base URL
const API_BASE =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
    ? '/api'
    : 'https://restaurant-system-backend-96lw.onrender.com/api';

// Initialize
async function init() {
    try {
        // Fetch translations and menu items from API
        await Promise.all([fetchTranslations(), fetchMenuItems()]);
        
        initMenu();
        setupCategoryButtons();
        setupNavigation();
        setupScrollEffects();
        setupSmoothScroll();
        setupLanguageSwitcher();
        applyTranslations();
    } catch (error) {
        // Fallback - use local data if API fails
    }
}

// Fetch Translations from API
async function fetchTranslations() {
    try {
        const response = await fetch(`${API_BASE}/translations`);
        if (!response.ok) throw new Error('Failed to fetch');
        const apiData = await response.json();
        
        // Check if API returned valid translations
        if (apiData && Object.keys(apiData).length > 0) {
            translations = apiData;
        } else {
            translations = fallbackTranslations;
        }
    } catch (error) {
        translations = fallbackTranslations;
    }
}

// Fetch Menu Items from API
async function fetchMenuItems() {
    try {
        const response = await fetch(`${API_BASE}/menu`);
        if (!response.ok) throw new Error('Failed to fetch');
        menuItems = await response.json();
    } catch (error) {
        // Use fallback menu items when API is unavailable
        menuItems = fallbackMenuItems;
    }
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

function getNestedTranslation(key) {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
        if (value && typeof value === 'object') {
            value = value[k];
        } else {
            return null;
        }
    }
    
    return value;
}

function applyTranslations() {
    // Use fallback if translations object is empty
    let translationSource = translations;
    if (Object.keys(translationSource).length === 0) {
        translationSource = fallbackTranslations;
    }
    
    // Apply translations to all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    // Helper function to get nested translation
    const getTrans = (key) => {
        // Check if key exists directly in translationSource (flat key format)
        if (translationSource[key]) {
            return translationSource[key];
        }
        // Otherwise try to split by dot for nested keys
        const keys = key.split('.');
        let value = translationSource;
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return null;
            }
        }
        return value;
    };
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const transObj = getTrans(key);
        
        if (transObj) {
            const value = transObj[currentLang] || transObj.en || transObj;
            if (value) {
                if (value.includes('<br>')) {
                    element.innerHTML = value;
                } else {
                    element.textContent = value;
                }
            }
        }
    });
    
    // Update language button text
    const enBtn = document.querySelector('.lang-en');
    const arBtn = document.querySelector('.lang-ar');
    if (enBtn) enBtn.textContent = currentLang === 'en' ? 'EN' : 'إنجليزية';
    if (arBtn) arBtn.textContent = currentLang === 'ar' ? 'عربي' : 'عربي';
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
    
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = '<p class="no-items">No items found</p>';
        return;
    }
    
    filteredItems.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.style.animationDelay = `${index * 0.1}s`;
        
        const name = item.name?.[currentLang] || item.name?.en || item.name || '';
        const description = item.description?.[currentLang] || item.description?.en || item.description || '';
        const tags = item.tags?.[currentLang] || item.tags?.en || item.tags || [];
        const badge = item.badge?.[currentLang] || item.badge?.en || item.badge;
        
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
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);
