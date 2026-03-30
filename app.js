const STORAGE_KEY = 'uniqueenterprises_products';
const CONTENT_KEY = 'uniqueenterprises_content';
const ADMIN_PASSWORD = 'unique2024';
const WHATSAPP_NUMBER = '918421001263';

const defaultContent = {
    logo: "UNIQUE ENTERPRISES",
    nav: {
        about: "About",
        products: "Products",
        strength: "Strength",
        contact: "Contact"
    },
    hero: {
        badge: "Premium Quality Since 2010",
        line1: "Heavy Duty",
        line2: "Industrial",
        line3: "Air Coolers",
        subtitle: "Engineered for extreme conditions. Built for industries that demand reliable cooling under pressure.",
        btn1: "View Products",
        btn2: "Get Quote",
        stat0Value: "50+",
        stat0Label: "Models",
        stat1Value: "15k+",
        stat1Label: "Deployed"
    },
    scroll: "Scroll",
    about: {
        label: "01 — About Us",
        title: "Built to Perform.<br>Designed to Last.",
        lead: "We engineer industrial air cooling solutions that operate where others fail—in foundries, steel mills, textile plants, and outdoor environments facing 50°C+ temperatures.",
        body: "Every Unique Enterprises air cooler undergoes rigorous testing in simulated extreme conditions. Our patented honeycomb cooling pads and corrosion-resistant housings are manufactured in-house, ensuring complete quality control from raw materials to finished product.",
        stat0Value: "16",
        stat0Suffix: "+",
        stat0Label: "Years Experience",
        stat1Value: "50",
        stat1Suffix: "+",
        stat1Label: "Product Models",
        stat2Value: "15",
        stat2Suffix: "k+",
        stat2Label: "Units Deployed",
        stat3Value: "98",
        stat3Suffix: "%",
        stat3Label: "Client Retention"
    },
    products: {
        label: "02 — Products",
        title: "Industrial Cooling Solutions",
        subtitle: "From compact spot coolers to massive tunnel ventilation systems, we have the right cooling technology for your operation."
    },
    strength: {
        label: "03 — Why Us",
        title: "Engineered for Excellence",
        cards: [
            { title: "Triple-Layer Cooling", desc: "Proprietary honeycomb pads with nano-gel coating provide 40% more cooling efficiency than conventional systems." },
            { title: "IP55 Certified", desc: "Dust-tight and protected against water jets. Operates flawlessly in dusty foundries and humid chemical plants." },
            { title: "Operation", highlight: "24/7", desc: "Industrial-grade motors rated for continuous operation. Built to run 8,760 hours a year without compromise." },
            { title: "Modular Design", desc: "Every component is field-replaceable. No special tools required. Minimum downtime, maximum reliability." },
            { title: "Low Power Draw", desc: "Advanced motor technology reduces energy consumption by 35% compared to traditional industrial coolers." },
            { title: "Pan-India Service", desc: "200+ service touchpoints. Same-day spare availability in metro cities. 48-hour response guarantee." }
        ]
    },
    contact: {
        label: "04 — Contact",
        title: "Let's Discuss Your Cooling Requirements",
        desc: "Our engineering team provides custom solutions for unique industrial cooling challenges. Share your requirements and we'll recommend the optimal configuration.",
        phoneLabel: "Phone",
        phoneValue: "+91 84210 01263",
        emailLabel: "Email",
        emailValue: "unique8421@gmail.com",
        addressLabel: "Factory",
        mapText: "View on Google Maps",
        mapUrl: "https://www.google.com/maps/place/Unique+Enterprises+Air+Coolers+Industries/@19.895405,75.3932753,19z/data=!4m6!3m5!1s0x3bdba32420e88629:0x215546088b850a7!8m2!3d19.8954869!4d75.3938143!16s%2Fg%2F11f126cctx"
    },
    form: {
        title: "Request a Quote",
        nameLabel: "Full Name",
        emailLabel: "Email Address",
        phoneLabel: "Phone Number",
        messageLabel: "Your Requirements",
        submitText: "Send Message"
    },
    modal: {
        specsTitle: "Specifications",
        capacityLabel: "Cooling Capacity",
        sizeLabel: "Dimensions",
        usageLabel: "Ideal For",
        ctaText: "Contact for Price"
    },
    footer: {
        brand: "UNIQUE ENTERPRISES",
        tagline: "Industrial Cooling Solutions",
        link1: "About",
        link2: "Products",
        link3: "Strength",
        link4: "Contact",
        copyright: "© 2024 Unique Enterprises. All rights reserved."
    },
    whatsapp: {
        url: "https://wa.me/918421001263"
    },
    login: {
        title: "Admin Access",
        subtitle: "Enter password to continue",
        btn: "Login",
        cancel: "Cancel"
    },
    admin: {
        title: "Admin Panel",
        tabAdd: "Add Product",
        tabManage: "Manage Products",
        tabEdit: "Visual Edit"
    },
    delete: {
        title: "Delete Product?",
        message: "This action cannot be undone. The product will be permanently removed.",
        cancel: "Cancel",
        confirm: "Delete"
    }
};

const defaultProducts = [
    {
        id: 'prod-001',
        name: 'COOLMAX Pro 5000',
        description: 'Heavy-duty industrial air cooler designed for large factory floors and warehouses. Features triple-layer honeycomb cooling pads with enhanced airflow design for maximum cooling efficiency in extreme conditions.',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=450&fit=crop',
        videoLink: null,
        specs: {
            capacity: '5000 CFM',
            size: '120 x 80 x 180 cm',
            usage: 'Factory floors, Large warehouses, Production lines'
        },
        available: true,
        createdAt: Date.now()
    },
    {
        id: 'prod-002',
        name: 'COOLMAX Compact 2000',
        description: 'Space-efficient industrial cooler perfect for workshops and smaller production areas. Maintains robust cooling capacity while fitting into compact spaces without compromising performance.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop',
        videoLink: null,
        specs: {
            capacity: '2000 CFM',
            size: '80 x 60 x 140 cm',
            usage: 'Workshops, Small factories, Assembly stations'
        },
        available: true,
        createdAt: Date.now()
    },
    {
        id: 'prod-003',
        name: 'COOLMAX Mobile 3000',
        description: 'Portable industrial cooler with heavy-duty castor wheels for facility-wide mobility. Ideal for changing work zones and multi-area cooling requirements in dynamic industrial environments.',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=450&fit=crop',
        videoLink: null,
        specs: {
            capacity: '3000 CFM',
            size: '90 x 70 x 160 cm',
            usage: 'Multiple zones, Construction sites, Event spaces'
        },
        available: false,
        createdAt: Date.now()
    }
];

class App {
    constructor() {
        this.products = this.loadProducts();
        this.content = this.loadContent();
        this.isAdminLoggedIn = sessionStorage.getItem('unique_admin_session') === 'true';
        this.isEditMode = false;
        this.pendingDeleteId = null;
        this.selectedImage = null;
        this.hasUnsavedChanges = false;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupGSAPAnimations();
        this.renderContent();
        this.renderProducts();
        if (this.isAdminLoggedIn) {
            this.renderAdminProducts();
        }
        this.setupProductModal();
        this.setupContactForm();
        this.setupAdminFeatures();
        this.setupLoginModal();
        this.setupDeleteModal();
        this.setupVisualEditor();
        this.setupToastSystem();
        this.setupAlternativeAdminAccess();
    }

    loadProducts() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
        return defaultProducts;
    }

    loadContent() {
        const stored = localStorage.getItem(CONTENT_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        localStorage.setItem(CONTENT_KEY, JSON.stringify(defaultContent));
        return JSON.parse(JSON.stringify(defaultContent));
    }

    saveContent() {
        localStorage.setItem(CONTENT_KEY, JSON.stringify(this.content));
    }

    saveProducts() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products));
    }

    resetContent() {
        localStorage.removeItem(CONTENT_KEY);
        this.content = JSON.parse(JSON.stringify(defaultContent));
        this.renderContent();
        this.showToast('Content reset to default', 'success');
    }

    renderContent() {
        const c = this.content;

        const logoText = document.querySelector('[data-content="logo-text"]');
        if (logoText) logoText.textContent = c.logo;

        const navAbout = document.querySelector('[data-content="nav-about"]');
        if (navAbout) navAbout.textContent = c.nav.about;
        const navProducts = document.querySelector('[data-content="nav-products"]');
        if (navProducts) navProducts.textContent = c.nav.products;
        const navStrength = document.querySelector('[data-content="nav-strength"]');
        if (navStrength) navStrength.textContent = c.nav.strength;
        const navContact = document.querySelector('[data-content="nav-contact"]');
        if (navContact) navContact.textContent = c.nav.contact;

        const heroBadge = document.querySelector('[data-content="hero-badge"]');
        if (heroBadge) heroBadge.textContent = c.hero.badge;
        const heroLine1 = document.querySelector('[data-content="hero-line1"]');
        if (heroLine1) heroLine1.textContent = c.hero.line1;
        const heroLine2 = document.querySelector('[data-content="hero-line2"]');
        if (heroLine2) heroLine2.textContent = c.hero.line2;
        const heroLine3 = document.querySelector('[data-content="hero-line3"]');
        if (heroLine3) heroLine3.textContent = c.hero.line3;
        const heroSubtitle = document.querySelector('[data-content="hero-subtitle"]');
        if (heroSubtitle) heroSubtitle.textContent = c.hero.subtitle;
        const heroBtn1 = document.querySelector('[data-content="hero-btn1"]');
        if (heroBtn1) heroBtn1.textContent = c.hero.btn1;
        const heroBtn2 = document.querySelector('[data-content="hero-btn2"]');
        if (heroBtn2) heroBtn2.textContent = c.hero.btn2;

        const heroStat0Value = document.querySelector('[data-content="hero-stat0-value"]');
        if (heroStat0Value) heroStat0Value.textContent = c.hero.stat0Value;
        const heroStat0Label = document.querySelector('[data-content="hero-stat0-label"]');
        if (heroStat0Label) heroStat0Label.textContent = c.hero.stat0Label;
        const heroStat1Value = document.querySelector('[data-content="hero-stat1-value"]');
        if (heroStat1Value) heroStat1Value.textContent = c.hero.stat1Value;
        const heroStat1Label = document.querySelector('[data-content="hero-stat1-label"]');
        if (heroStat1Label) heroStat1Label.textContent = c.hero.stat1Label;

        const scrollText = document.querySelector('[data-content="scroll-text"]');
        if (scrollText) scrollText.textContent = c.scroll;

        const aboutLabel = document.querySelector('[data-content="about-label"]');
        if (aboutLabel) aboutLabel.textContent = c.about.label;
        const aboutTitle = document.querySelector('[data-content="about-title"]');
        if (aboutTitle) aboutTitle.innerHTML = c.about.title;
        const aboutLead = document.querySelector('[data-content="about-lead"]');
        if (aboutLead) aboutLead.textContent = c.about.lead;
        const aboutBody = document.querySelector('[data-content="about-body"]');
        if (aboutBody) aboutBody.textContent = c.about.body;

        const aboutStat0Value = document.querySelector('[data-content="about-stat0-value"]');
        if (aboutStat0Value) aboutStat0Value.textContent = c.about.stat0Value;
        const aboutStat0Suffix = document.querySelector('[data-content="about-stat0-suffix"]');
        if (aboutStat0Suffix) aboutStat0Suffix.textContent = c.about.stat0Suffix;
        const aboutStat0Label = document.querySelector('[data-content="about-stat0-label"]');
        if (aboutStat0Label) aboutStat0Label.textContent = c.about.stat0Label;

        const aboutStat1Value = document.querySelector('[data-content="about-stat1-value"]');
        if (aboutStat1Value) aboutStat1Value.textContent = c.about.stat1Value;
        const aboutStat1Suffix = document.querySelector('[data-content="about-stat1-suffix"]');
        if (aboutStat1Suffix) aboutStat1Suffix.textContent = c.about.stat1Suffix;
        const aboutStat1Label = document.querySelector('[data-content="about-stat1-label"]');
        if (aboutStat1Label) aboutStat1Label.textContent = c.about.stat1Label;

        const aboutStat2Value = document.querySelector('[data-content="about-stat2-value"]');
        if (aboutStat2Value) aboutStat2Value.textContent = c.about.stat2Value;
        const aboutStat2Suffix = document.querySelector('[data-content="about-stat2-suffix"]');
        if (aboutStat2Suffix) aboutStat2Suffix.textContent = c.about.stat2Suffix;
        const aboutStat2Label = document.querySelector('[data-content="about-stat2-label"]');
        if (aboutStat2Label) aboutStat2Label.textContent = c.about.stat2Label;

        const aboutStat3Value = document.querySelector('[data-content="about-stat3-value"]');
        if (aboutStat3Value) aboutStat3Value.textContent = c.about.stat3Value;
        const aboutStat3Suffix = document.querySelector('[data-content="about-stat3-suffix"]');
        if (aboutStat3Suffix) aboutStat3Suffix.textContent = c.about.stat3Suffix;
        const aboutStat3Label = document.querySelector('[data-content="about-stat3-label"]');
        if (aboutStat3Label) aboutStat3Label.textContent = c.about.stat3Label;

        const productsLabel = document.querySelector('[data-content="products-label"]');
        if (productsLabel) productsLabel.textContent = c.products.label;
        const productsTitle = document.querySelector('[data-content="products-title"]');
        if (productsTitle) productsTitle.textContent = c.products.title;
        const productsSubtitle = document.querySelector('[data-content="products-subtitle"]');
        if (productsSubtitle) productsSubtitle.textContent = c.products.subtitle;

        const strengthLabel = document.querySelector('[data-content="strength-label"]');
        if (strengthLabel) strengthLabel.textContent = c.strength.label;
        const strengthTitle = document.querySelector('[data-content="strength-title"]');
        if (strengthTitle) strengthTitle.textContent = c.strength.title;

        for (let i = 0; i < 6; i++) {
            const cardTitle = document.querySelector(`[data-content="strength-card-${i}-title"]`);
            if (cardTitle) cardTitle.textContent = c.strength.cards[i].title;
            if (i === 1) {
                const cardHighlight = document.querySelector(`[data-content="strength-card-${i}-highlight"]`);
                if (cardHighlight) cardHighlight.textContent = c.strength.cards[i].highlight || '';
            }
            const cardDesc = document.querySelector(`[data-content="strength-card-${i}-desc"]`);
            if (cardDesc) cardDesc.textContent = c.strength.cards[i].desc;
        }

        const contactLabel = document.querySelector('[data-content="contact-label"]');
        if (contactLabel) contactLabel.textContent = c.contact.label;
        const contactTitle = document.querySelector('[data-content="contact-title"]');
        if (contactTitle) contactTitle.textContent = c.contact.title;
        const contactDesc = document.querySelector('[data-content="contact-desc"]');
        if (contactDesc) contactDesc.textContent = c.contact.desc;

        const contactPhoneLabel = document.querySelector('[data-content="contact-phone-label"]');
        if (contactPhoneLabel) contactPhoneLabel.textContent = c.contact.phoneLabel;
        const contactPhoneValue = document.querySelector('[data-content="contact-phone-value"]');
        if (contactPhoneValue) {
            contactPhoneValue.textContent = c.contact.phoneValue;
            contactPhoneValue.href = `tel:${c.contact.phoneValue.replace(/\s/g, '')}`;
        }
        const contactEmailLabel = document.querySelector('[data-content="contact-email-label"]');
        if (contactEmailLabel) contactEmailLabel.textContent = c.contact.emailLabel;
        const contactEmailValue = document.querySelector('[data-content="contact-email-value"]');
        if (contactEmailValue) {
            contactEmailValue.textContent = c.contact.emailValue;
            contactEmailValue.href = `mailto:${c.contact.emailValue}`;
        }
        const contactAddressLabel = document.querySelector('[data-content="contact-address-label"]');
        if (contactAddressLabel) contactAddressLabel.textContent = c.contact.addressLabel;
        const contactMapText = document.querySelector('[data-content="contact-map-text"]');
        if (contactMapText) contactMapText.textContent = c.contact.mapText;
        const contactMapLink = document.querySelector('[data-content="contact-map-text"]');
        if (contactMapLink && contactMapLink.tagName === 'A') {
            contactMapLink.href = c.contact.mapUrl;
        }

        const formTitle = document.querySelector('[data-content="form-title"]');
        if (formTitle) formTitle.textContent = c.form.title;
        const formNameLabel = document.querySelector('[data-content="form-name-label"]');
        if (formNameLabel) formNameLabel.textContent = c.form.nameLabel;
        const formEmailLabel = document.querySelector('[data-content="form-email-label"]');
        if (formEmailLabel) formEmailLabel.textContent = c.form.emailLabel;
        const formPhoneLabel = document.querySelector('[data-content="form-phone-label"]');
        if (formPhoneLabel) formPhoneLabel.textContent = c.form.phoneLabel;
        const formMessageLabel = document.querySelector('[data-content="form-message-label"]');
        if (formMessageLabel) formMessageLabel.textContent = c.form.messageLabel;
        const formSubmitText = document.querySelector('[data-content="form-submit-text"]');
        if (formSubmitText) formSubmitText.textContent = c.form.submitText;

        const modalSpecsTitle = document.querySelector('[data-content="modal-specs-title"]');
        if (modalSpecsTitle) modalSpecsTitle.textContent = c.modal.specsTitle;
        const modalCapacityLabel = document.querySelector('[data-content="modal-capacity-label"]');
        if (modalCapacityLabel) modalCapacityLabel.textContent = c.modal.capacityLabel;
        const modalSizeLabel = document.querySelector('[data-content="modal-size-label"]');
        if (modalSizeLabel) modalSizeLabel.textContent = c.modal.sizeLabel;
        const modalUsageLabel = document.querySelector('[data-content="modal-usage-label"]');
        if (modalUsageLabel) modalUsageLabel.textContent = c.modal.usageLabel;
        const modalCtaText = document.querySelector('[data-content="modal-cta-text"]');
        if (modalCtaText) modalCtaText.textContent = c.modal.ctaText;

        const footerBrand = document.querySelector('[data-content="footer-brand"]');
        if (footerBrand) footerBrand.textContent = c.footer.brand;
        const footerTagline = document.querySelector('[data-content="footer-tagline"]');
        if (footerTagline) footerTagline.textContent = c.footer.tagline;
        const footerLink1 = document.querySelector('[data-content="footer-link1"]');
        if (footerLink1) footerLink1.textContent = c.footer.link1;
        const footerLink2 = document.querySelector('[data-content="footer-link2"]');
        if (footerLink2) footerLink2.textContent = c.footer.link2;
        const footerLink3 = document.querySelector('[data-content="footer-link3"]');
        if (footerLink3) footerLink3.textContent = c.footer.link3;
        const footerLink4 = document.querySelector('[data-content="footer-link4"]');
        if (footerLink4) footerLink4.textContent = c.footer.link4;
        const footerCopyright = document.querySelector('[data-content="footer-copyright"]');
        if (footerCopyright) footerCopyright.textContent = c.footer.copyright;

        const whatsappFab = document.getElementById('whatsappFab');
        if (whatsappFab) whatsappFab.href = c.whatsapp.url;

        const loginTitle = document.querySelector('[data-content="login-title"]');
        if (loginTitle) loginTitle.textContent = c.login.title;
        const loginSubtitle = document.querySelector('[data-content="login-subtitle"]');
        if (loginSubtitle) loginSubtitle.textContent = c.login.subtitle;
        const loginBtn = document.querySelector('[data-content="login-btn"]');
        if (loginBtn) loginBtn.textContent = c.login.btn;
        const loginCancel = document.querySelector('[data-content="login-cancel"]');
        if (loginCancel) loginCancel.textContent = c.login.cancel;

        const adminTitleText = document.querySelector('[data-content="admin-title-text"]');
        if (adminTitleText) adminTitleText.textContent = c.admin.title;
        const tabAdd = document.querySelector('[data-content="tab-add"]');
        if (tabAdd) tabAdd.textContent = c.admin.tabAdd;
        const tabManage = document.querySelector('[data-content="tab-manage"]');
        if (tabManage) tabManage.textContent = c.admin.tabManage;
        const tabEdit = document.querySelector('[data-content="tab-edit"]');
        if (tabEdit) tabEdit.textContent = c.admin.tabEdit;

        const deleteTitle = document.querySelector('[data-content="delete-title"]');
        if (deleteTitle) deleteTitle.textContent = c.delete.title;
        const deleteMessage = document.querySelector('[data-content="delete-message"]');
        if (deleteMessage) deleteMessage.textContent = c.delete.message;
        const deleteCancel = document.querySelector('[data-content="delete-cancel"]');
        if (deleteCancel) deleteCancel.textContent = c.delete.cancel;
        const deleteConfirm = document.querySelector('[data-content="delete-confirm"]');
        if (deleteConfirm) deleteConfirm.textContent = c.delete.confirm;
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    setupGSAPAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.title-line', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.2
        });

        gsap.from('.hero-badge', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.5
        });

        gsap.from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.7
        });

        gsap.from('.hero-cta', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.9
        });

        gsap.from('.hero-visual', {
            x: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.3
        });

        gsap.from('.scroll-indicator', {
            opacity: 0,
            duration: 0.6,
            delay: 1.5
        });

        gsap.utils.toArray('.section-label').forEach(label => {
            gsap.from(label, {
                ScrollTrigger: {
                    trigger: label,
                    start: 'top 90%'
                },
                opacity: 0,
                x: -20,
                duration: 0.6
            });
        });

        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                ScrollTrigger: {
                    trigger: title,
                    start: 'top 90%'
                },
                opacity: 0,
                y: 30,
                duration: 0.6
            });
        });

        gsap.from('.about-text', {
            ScrollTrigger: {
                trigger: '.about-text',
                start: 'top 80%'
            },
            opacity: 0,
            x: -40,
            duration: 0.8
        });

        gsap.from('.stat-card', {
            ScrollTrigger: {
                trigger: '.about-stats',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1
        });

        gsap.from('.strength-card', {
            ScrollTrigger: {
                trigger: '.strength-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.1
        });

        gsap.from('.contact-info', {
            ScrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 80%'
            },
            opacity: 0,
            x: -40,
            duration: 0.8
        });

        gsap.from('.contact-form-wrapper', {
            ScrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 80%'
            },
            opacity: 0,
            x: 40,
            duration: 0.8
        });
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = '';

        if (this.products.length === 0) {
            grid.innerHTML = '<p class="no-products">No products added yet. Use Admin Panel to add products.</p>';
            return;
        }

        this.products.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = `product-card${product.available ? '' : ' out-of-stock'}`;
            card.dataset.id = product.id;
            
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                    <span class="product-badge${product.available ? '' : ' unavailable'}">
                        ${product.available ? 'Available' : 'Out of Stock'}
                    </span>
                </div>
                <div class="product-content">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-specs">
                        <span class="product-spec">${product.specs.capacity}</span>
                        <span class="product-spec">${product.specs.size}</span>
                    </div>
                    <button class="product-cta" data-product="${product.id}">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span>Contact for Price</span>
                    </button>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (!e.target.closest('.product-cta')) {
                    this.openProductModal(product.id);
                }
            });

            card.querySelector('.product-cta').addEventListener('click', (e) => {
                e.stopPropagation();
                const message = encodeURIComponent(`Hi, I'm interested in the ${product.name}. Please share the pricing details.`);
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
            });

            grid.appendChild(card);

            gsap.to(card, {
                ScrollTrigger: {
                    trigger: card,
                    start: 'top 90%'
                },
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1
            });
        });
    }

    setupProductModal() {
        const modal = document.getElementById('productModal');
        const backdrop = modal.querySelector('.modal-backdrop');
        const closeBtn = document.getElementById('modalClose');

        backdrop.addEventListener('click', () => this.closeProductModal());
        closeBtn.addEventListener('click', () => this.closeProductModal());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeProductModal();
            }
        });
    }

    openProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('productModal');
        
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalImage').alt = product.name;
        document.getElementById('modalBadge').textContent = product.available ? 'Available' : 'Out of Stock';
        document.getElementById('modalBadge').className = `modal-badge${product.available ? '' : ' unavailable'}`;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalCapacity').textContent = product.specs.capacity;
        document.getElementById('modalSize').textContent = product.specs.size;
        document.getElementById('modalUsage').textContent = product.specs.usage;

        const videoContainer = document.getElementById('modalVideoContainer');
        const videoFrame = document.getElementById('modalVideo');
        
        if (product.videoLink) {
            let embedUrl = product.videoLink;
            if (product.videoLink.includes('youtube.com/watch')) {
                const videoId = new URL(product.videoLink).searchParams.get('v');
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            } else if (product.videoLink.includes('youtu.be')) {
                const videoId = product.videoLink.split('/').pop();
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            }
            videoFrame.src = embedUrl;
            videoContainer.style.display = 'block';
        } else {
            videoFrame.src = '';
            videoContainer.style.display = 'none';
        }

        const message = encodeURIComponent(`Hi, I'm interested in the ${product.name}. Please share the pricing details.`);
        document.getElementById('modalWhatsApp').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeProductModal() {
        const modal = document.getElementById('productModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('modalVideo').src = '';
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            this.showToast(`Thank you ${data.name}! We'll contact you shortly.`, 'success');
            form.reset();
        });
    }

    setupVisualEditor() {
        const enterBtn = document.getElementById('enterEditMode');
        const exitBtn = document.getElementById('exitEditMode');
        const saveBtn = document.getElementById('saveEdits');
        const resetBtn = document.getElementById('resetContent');
        const toggleHighlightBtn = document.getElementById('toggleHighlight');

        if (enterBtn) {
            enterBtn.addEventListener('click', () => this.enterEditMode());
        }

        if (exitBtn) {
            exitBtn.addEventListener('click', () => this.exitEditMode());
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveVisualEdits());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetContent());
        }

        if (toggleHighlightBtn) {
            toggleHighlightBtn.addEventListener('click', () => this.toggleHighlights());
        }

        document.querySelectorAll('.editable, .editable-title').forEach(el => {
            el.addEventListener('blur', () => {
                if (this.isEditMode) {
                    this.hasUnsavedChanges = true;
                }
            });

            el.addEventListener('input', () => {
                this.hasUnsavedChanges = true;
            });
        });
    }

    enterEditMode() {
        this.isEditMode = true;
        document.body.classList.add('edit-mode');
        document.body.classList.add('highlight-mode');
        
        const toggleBtn = document.getElementById('toggleHighlight');
        if (toggleBtn) toggleBtn.classList.add('active');
        
        this.closeAdminPanel();

        document.querySelectorAll('.editable, .editable-title').forEach(el => {
            el.contentEditable = 'true';
        });

        this.showToast('Edit mode activated! Click Toggle Highlight to show/hide editable areas.', 'success');
    }

    exitEditMode() {
        if (this.hasUnsavedChanges) {
            if (confirm('You have unsaved changes. Do you want to save before exiting?')) {
                this.saveVisualEdits();
            }
        }

        this.isEditMode = false;
        this.hasUnsavedChanges = false;
        document.body.classList.remove('edit-mode');
        document.body.classList.remove('highlight-mode');

        const toggleBtn = document.getElementById('toggleHighlight');
        if (toggleBtn) toggleBtn.classList.remove('active');

        document.querySelectorAll('.editable, .editable-title').forEach(el => {
            el.contentEditable = 'false';
        });
    }

    toggleHighlights() {
        const toggleBtn = document.getElementById('toggleHighlight');
        if (toggleBtn) {
            toggleBtn.classList.toggle('active');
        }
        document.body.classList.toggle('highlight-mode');
    }

    saveVisualEdits() {
        const c = this.content;

        c.logo = (document.querySelector('[data-content="logo-text"]')?.textContent || '').trim();
        c.nav.about = (document.querySelector('[data-content="nav-about"]')?.textContent || '').trim();
        c.nav.products = (document.querySelector('[data-content="nav-products"]')?.textContent || '').trim();
        c.nav.strength = (document.querySelector('[data-content="nav-strength"]')?.textContent || '').trim();
        c.nav.contact = (document.querySelector('[data-content="nav-contact"]')?.textContent || '').trim();

        c.hero.badge = (document.querySelector('[data-content="hero-badge"]')?.textContent || '').trim();
        c.hero.line1 = (document.querySelector('[data-content="hero-line1"]')?.textContent || '').trim();
        c.hero.line2 = (document.querySelector('[data-content="hero-line2"]')?.textContent || '').trim();
        c.hero.line3 = (document.querySelector('[data-content="hero-line3"]')?.textContent || '').trim();
        c.hero.subtitle = (document.querySelector('[data-content="hero-subtitle"]')?.textContent || '').trim();
        c.hero.btn1 = (document.querySelector('[data-content="hero-btn1"]')?.textContent || '').trim();
        c.hero.btn2 = (document.querySelector('[data-content="hero-btn2"]')?.textContent || '').trim();
        c.hero.stat0Value = (document.querySelector('[data-content="hero-stat0-value"]')?.textContent || '').trim();
        c.hero.stat0Label = (document.querySelector('[data-content="hero-stat0-label"]')?.textContent || '').trim();
        c.hero.stat1Value = (document.querySelector('[data-content="hero-stat1-value"]')?.textContent || '').trim();
        c.hero.stat1Label = (document.querySelector('[data-content="hero-stat1-label"]')?.textContent || '').trim();

        c.scroll = (document.querySelector('[data-content="scroll-text"]')?.textContent || '').trim();

        c.about.label = (document.querySelector('[data-content="about-label"]')?.textContent || '').trim();
        c.about.title = document.querySelector('[data-content="about-title"]')?.innerHTML || '';
        c.about.lead = (document.querySelector('[data-content="about-lead"]')?.textContent || '').trim();
        c.about.body = (document.querySelector('[data-content="about-body"]')?.textContent || '').trim();

        c.about.stat0Value = (document.querySelector('[data-content="about-stat0-value"]')?.textContent || '').trim();
        c.about.stat0Suffix = (document.querySelector('[data-content="about-stat0-suffix"]')?.textContent || '').trim();
        c.about.stat0Label = (document.querySelector('[data-content="about-stat0-label"]')?.textContent || '').trim();
        c.about.stat1Value = (document.querySelector('[data-content="about-stat1-value"]')?.textContent || '').trim();
        c.about.stat1Suffix = (document.querySelector('[data-content="about-stat1-suffix"]')?.textContent || '').trim();
        c.about.stat1Label = (document.querySelector('[data-content="about-stat1-label"]')?.textContent || '').trim();
        c.about.stat2Value = (document.querySelector('[data-content="about-stat2-value"]')?.textContent || '').trim();
        c.about.stat2Suffix = (document.querySelector('[data-content="about-stat2-suffix"]')?.textContent || '').trim();
        c.about.stat2Label = (document.querySelector('[data-content="about-stat2-label"]')?.textContent || '').trim();
        c.about.stat3Value = (document.querySelector('[data-content="about-stat3-value"]')?.textContent || '').trim();
        c.about.stat3Suffix = (document.querySelector('[data-content="about-stat3-suffix"]')?.textContent || '').trim();
        c.about.stat3Label = (document.querySelector('[data-content="about-stat3-label"]')?.textContent || '').trim();

        c.products.label = (document.querySelector('[data-content="products-label"]')?.textContent || '').trim();
        c.products.title = (document.querySelector('[data-content="products-title"]')?.textContent || '').trim();
        c.products.subtitle = (document.querySelector('[data-content="products-subtitle"]')?.textContent || '').trim();

        c.strength.label = (document.querySelector('[data-content="strength-label"]')?.textContent || '').trim();
        c.strength.title = (document.querySelector('[data-content="strength-title"]')?.textContent || '').trim();

        for (let i = 0; i < 6; i++) {
            const titleEl = document.querySelector(`[data-content="strength-card-${i}-title"]`);
            const descEl = document.querySelector(`[data-content="strength-card-${i}-desc"]`);
            if (titleEl) c.strength.cards[i].title = titleEl.textContent.trim();
            if (descEl) c.strength.cards[i].desc = descEl.textContent.trim();
            if (i === 1) {
                const highlightEl = document.querySelector(`[data-content="strength-card-${i}-highlight"]`);
                if (highlightEl) c.strength.cards[i].highlight = highlightEl.textContent.trim();
            }
        }

        c.contact.label = (document.querySelector('[data-content="contact-label"]')?.textContent || '').trim();
        c.contact.title = (document.querySelector('[data-content="contact-title"]')?.textContent || '').trim();
        c.contact.desc = (document.querySelector('[data-content="contact-desc"]')?.textContent || '').trim();
        c.contact.phoneLabel = (document.querySelector('[data-content="contact-phone-label"]')?.textContent || '').trim();
        c.contact.phoneValue = (document.querySelector('[data-content="contact-phone-value"]')?.textContent || '').trim();
        c.contact.emailLabel = (document.querySelector('[data-content="contact-email-label"]')?.textContent || '').trim();
        c.contact.emailValue = (document.querySelector('[data-content="contact-email-value"]')?.textContent || '').trim();
        c.contact.addressLabel = (document.querySelector('[data-content="contact-address-label"]')?.textContent || '').trim();
        c.contact.mapText = (document.querySelector('[data-content="contact-map-text"]')?.textContent || '').trim();

        c.form.title = (document.querySelector('[data-content="form-title"]')?.textContent || '').trim();
        c.form.nameLabel = (document.querySelector('[data-content="form-name-label"]')?.textContent || '').trim();
        c.form.emailLabel = (document.querySelector('[data-content="form-email-label"]')?.textContent || '').trim();
        c.form.phoneLabel = (document.querySelector('[data-content="form-phone-label"]')?.textContent || '').trim();
        c.form.messageLabel = (document.querySelector('[data-content="form-message-label"]')?.textContent || '').trim();
        c.form.submitText = (document.querySelector('[data-content="form-submit-text"]')?.textContent || '').trim();

        c.modal.specsTitle = (document.querySelector('[data-content="modal-specs-title"]')?.textContent || '').trim();
        c.modal.capacityLabel = (document.querySelector('[data-content="modal-capacity-label"]')?.textContent || '').trim();
        c.modal.sizeLabel = (document.querySelector('[data-content="modal-size-label"]')?.textContent || '').trim();
        c.modal.usageLabel = (document.querySelector('[data-content="modal-usage-label"]')?.textContent || '').trim();
        c.modal.ctaText = (document.querySelector('[data-content="modal-cta-text"]')?.textContent || '').trim();

        c.footer.brand = (document.querySelector('[data-content="footer-brand"]')?.textContent || '').trim();
        c.footer.tagline = (document.querySelector('[data-content="footer-tagline"]')?.textContent || '').trim();
        c.footer.link1 = (document.querySelector('[data-content="footer-link1"]')?.textContent || '').trim();
        c.footer.link2 = (document.querySelector('[data-content="footer-link2"]')?.textContent || '').trim();
        c.footer.link3 = (document.querySelector('[data-content="footer-link3"]')?.textContent || '').trim();
        c.footer.link4 = (document.querySelector('[data-content="footer-link4"]')?.textContent || '').trim();
        c.footer.copyright = (document.querySelector('[data-content="footer-copyright"]')?.textContent || '').trim();

        c.login.title = (document.querySelector('[data-content="login-title"]')?.textContent || '').trim();
        c.login.subtitle = (document.querySelector('[data-content="login-subtitle"]')?.textContent || '').trim();
        c.login.btn = (document.querySelector('[data-content="login-btn"]')?.textContent || '').trim();
        c.login.cancel = (document.querySelector('[data-content="login-cancel"]')?.textContent || '').trim();

        c.admin.title = (document.querySelector('[data-content="admin-title-text"]')?.textContent || '').trim();
        c.admin.tabAdd = (document.querySelector('[data-content="tab-add"]')?.textContent || '').trim();
        c.admin.tabManage = (document.querySelector('[data-content="tab-manage"]')?.textContent || '').trim();
        c.admin.tabEdit = (document.querySelector('[data-content="tab-edit"]')?.textContent || '').trim();

        c.delete.title = (document.querySelector('[data-content="delete-title"]')?.textContent || '').trim();
        c.delete.message = (document.querySelector('[data-content="delete-message"]')?.textContent || '').trim();
        c.delete.cancel = (document.querySelector('[data-content="delete-cancel"]')?.textContent || '').trim();
        c.delete.confirm = (document.querySelector('[data-content="delete-confirm"]')?.textContent || '').trim();

        this.saveContent();
        this.hasUnsavedChanges = false;

        const indicator = document.getElementById('saveIndicator');
        if (indicator) {
            indicator.classList.add('show');
            setTimeout(() => indicator.classList.remove('show'), 2000);
        }

        this.showToast('All changes saved successfully!', 'success');
    }

    setupAdminFeatures() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.altKey && e.key === 'O') {
                e.preventDefault();
                this.triggerAdminLogin();
            }
        });

        document.getElementById('adminClose')?.addEventListener('click', () => this.closeAdminPanel());
        document.getElementById('adminBackdrop')?.addEventListener('click', () => this.closeAdminPanel());
        document.getElementById('adminLogout')?.addEventListener('click', () => this.logoutAdmin());

        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchAdminTab(tab.dataset.tab));
        });

        this.setupAddProductForm();
        this.setupImageUpload();
    }

    setupAlternativeAdminAccess() {
        const floatBtn = document.getElementById('adminFloatBtn');
        if (floatBtn) {
            floatBtn.addEventListener('click', () => this.triggerAdminLogin());
        }

        if (window.location.search.includes('admin')) {
            this.triggerAdminLogin();
        }

        let logoClickCount = 0;
        let logoClickTimer = null;
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                logoClickCount++;
                if (logoClickTimer) clearTimeout(logoClickTimer);
                logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 2000);
                if (logoClickCount >= 5) {
                    logoClickCount = 0;
                    this.triggerAdminLogin();
                }
            });
        }
    }

    setupLoginModal() {
        const form = document.getElementById('loginForm');
        const cancelBtn = document.getElementById('loginCancel');
        const passwordInput = document.getElementById('loginPassword');
        const errorMsg = document.getElementById('loginError');

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeLoginModal());
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (passwordInput.value === ADMIN_PASSWORD) {
                    sessionStorage.setItem('unique_admin_session', 'true');
                    this.isAdminLoggedIn = true;
                    this.closeLoginModal();
                    this.openAdminPanel();
                    this.renderAdminProducts();
                    this.showToast('Admin access granted', 'success');
                    passwordInput.value = '';
                    if (errorMsg) errorMsg.style.display = 'none';
                } else {
                    if (errorMsg) {
                        errorMsg.style.display = 'block';
                        gsap.from(errorMsg, { x: -10, duration: 0.3, ease: 'elastic.out' });
                    }
                }
            });
        }
    }

    triggerAdminLogin() {
        if (this.isAdminLoggedIn) {
            this.openAdminPanel();
        } else {
            document.getElementById('loginModal')?.classList.add('active');
            document.getElementById('loginPassword')?.focus();
        }
    }

    closeLoginModal() {
        const modal = document.getElementById('loginModal');
        const passwordInput = document.getElementById('loginPassword');
        const errorMsg = document.getElementById('loginError');
        
        if (modal) modal.classList.remove('active');
        if (passwordInput) passwordInput.value = '';
        if (errorMsg) errorMsg.style.display = 'none';
    }

    openAdminPanel() {
        document.getElementById('adminPanel')?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeAdminPanel() {
        const panel = document.getElementById('adminPanel');
        if (panel) panel.classList.remove('active');
        document.body.style.overflow = '';
    }

    logoutAdmin() {
        sessionStorage.removeItem('unique_admin_session');
        this.isAdminLoggedIn = false;
        this.exitEditMode();
        this.closeAdminPanel();
        this.showToast('Logged out successfully', 'success');
    }

    switchAdminTab(tabName) {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        const tab = document.querySelector(`.admin-tab[data-tab="${tabName}"]`);
        const content = document.getElementById(`tab-${tabName}`);
        
        if (tab) tab.classList.add('active');
        if (content) content.classList.add('active');
    }

    setupAddProductForm() {
        const form = document.getElementById('addProductForm');

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.selectedImage) {
                this.showToast('Please select a product image', 'error');
                return;
            }

            const newProduct = {
                id: 'prod-' + Date.now(),
                name: document.getElementById('productName').value,
                description: document.getElementById('productDescription').value,
                image: this.selectedImage,
                videoLink: document.getElementById('productVideo').value || null,
                specs: {
                    capacity: document.getElementById('productCapacity').value,
                    size: document.getElementById('productSize').value,
                    usage: document.getElementById('productUsage').value
                },
                available: document.getElementById('productAvailable').checked,
                createdAt: Date.now()
            };

            this.products.unshift(newProduct);
            this.saveProducts();
            this.renderProducts();
            this.renderAdminProducts();
            
            form.reset();
            this.selectedImage = null;
            const preview = document.getElementById('imagePreview');
            const fileName = document.getElementById('fileName');
            if (preview) {
                preview.classList.remove('active');
                preview.innerHTML = '';
            }
            if (fileName) fileName.textContent = 'Choose image...';
            
            this.showToast('Product added successfully', 'success');
            this.switchAdminTab('manage');
        });
    }

    setupImageUpload() {
        const input = document.getElementById('productImage');
        const preview = document.getElementById('imagePreview');
        const fileName = document.getElementById('fileName');

        if (!input) return;

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (fileName) fileName.textContent = file.name;
                
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.selectedImage = event.target.result;
                    if (preview) {
                        preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                        preview.classList.add('active');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    renderAdminProducts() {
        const list = document.getElementById('adminProductList');
        if (!list) return;
        
        list.innerHTML = '';

        if (this.products.length === 0) {
            list.innerHTML = '<p class="no-products-admin">No products added yet.</p>';
            return;
        }

        this.products.forEach(product => {
            const item = document.createElement('div');
            item.className = 'admin-product-item';
            item.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="admin-product-image">
                <div class="admin-product-info">
                    <div class="admin-product-name">${product.name}</div>
                    <div class="admin-product-status${product.available ? '' : ' unavailable'}">
                        ${product.available ? 'In Stock' : 'Out of Stock'}
                    </div>
                </div>
                <div class="admin-product-actions">
                    <div class="admin-toggle${product.available ? ' active' : ''}" data-id="${product.id}" title="Toggle availability"></div>
                    <button class="admin-delete-btn" data-id="${product.id}" title="Delete product">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            `;

            const toggle = item.querySelector('.admin-toggle');
            toggle.addEventListener('click', () => this.toggleProductAvailability(product.id));

            const deleteBtn = item.querySelector('.admin-delete-btn');
            deleteBtn.addEventListener('click', () => this.confirmDelete(product.id));

            list.appendChild(item);
        });
    }

    toggleProductAvailability(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.available = !product.available;
            this.saveProducts();
            this.renderProducts();
            this.renderAdminProducts();
            this.showToast(`Product ${product.available ? 'now available' : 'marked as unavailable'}`, 'success');
        }
    }

    setupDeleteModal() {
        document.getElementById('deleteCancel')?.addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('deleteConfirm')?.addEventListener('click', () => this.deleteProduct());
        document.querySelector('.delete-backdrop')?.addEventListener('click', () => this.closeDeleteModal());
    }

    confirmDelete(productId) {
        this.pendingDeleteId = productId;
        document.getElementById('deleteModal')?.classList.add('active');
    }

    closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        if (modal) modal.classList.remove('active');
        this.pendingDeleteId = null;
    }

    deleteProduct() {
        if (this.pendingDeleteId) {
            this.products = this.products.filter(p => p.id !== this.pendingDeleteId);
            this.saveProducts();
            this.renderProducts();
            this.renderAdminProducts();
            this.closeDeleteModal();
            this.showToast('Product deleted successfully', 'success');
        }
    }

    setupToastSystem() {
        this.toastContainer = document.getElementById('toastContainer');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        if (this.toastContainer) {
            this.toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
