/* ============================================
   Abu Abdou Restaurant - Interactive Script
   ============================================ */

// State
let translations = {};
let currentLang = 'en';
let menuItems = [];

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
const API_BASE = '/api';

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
        console.error('Error initializing app:', error);
        // Fallback to static data if API fails
        console.log('Using static fallback data');
    }
}

// Fetch Translations from API
async function fetchTranslations() {
    try {
        const response = await fetch(`${API_BASE}/translations`);
        translations = await response.json();
    } catch (error) {
        console.error('Failed to fetch translations:', error);
        // Use empty object as fallback
        translations = {};
    }
}

// Fetch Menu Items from API
async function fetchMenuItems() {
    try {
        const response = await fetch(`${API_BASE}/menu`);
        menuItems = await response.json();
    } catch (error) {
        console.error('Failed to fetch menu items:', error);
        // Use empty array as fallback
        menuItems = [];
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
    // Apply translations to all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const transObj = getNestedTranslation(key);
        
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
        console.log(`Added ${itemName} to cart`);
    }
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);
