const WHATSAPP_NUMBER = '918421001263';

class App {
    constructor() {
        this.products = [];
        this.init();
    }

    async init() {
        this.setupNavigation();
        this.setupGSAPAnimations();
        await this.loadProducts();
        this.renderProducts();
        this.setupProductModal();
        this.setupContactForm();
        this.setupToastSystem();
    }

    async loadProducts() {
        try {
            const response = await fetch('/public/products.json');
            if (!response.ok) {
                throw new Error('Failed to load products');
            }
            this.products = await response.json();
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = [];
        }
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

    parseSpecs(specString) {
        const parts = specString.split('|').map(s => s.trim());
        return {
            capacity: parts[0] || '',
            size: parts[1] || '',
            usage: parts[2] || ''
        };
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;
        grid.innerHTML = '';

        if (this.products.length === 0) {
            grid.innerHTML = '<p class="no-products">No products available.</p>';
            return;
        }

        this.products.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = `product-card${product.available ? '' : ' out-of-stock'}`;
            
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
                        <span class="product-spec">${this.parseSpecs(product.specifications).capacity}</span>
                        <span class="product-spec">${this.parseSpecs(product.specifications).size}</span>
                    </div>
                    <button class="product-cta" data-product="${index}">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span>Contact for Price</span>
                    </button>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (!e.target.closest('.product-cta')) {
                    this.openProductModal(index);
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
        if (!modal) return;
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

    openProductModal(productIndex) {
        const product = this.products[productIndex];
        if (!product) return;

        const specs = this.parseSpecs(product.specifications);
        const modal = document.getElementById('productModal');
        
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalImage').alt = product.name;
        document.getElementById('modalBadge').textContent = product.available ? 'Available' : 'Out of Stock';
        document.getElementById('modalBadge').className = `modal-badge${product.available ? '' : ' unavailable'}`;
        document.getElementById('modalTitle').textContent = product.name;
        document.getElementById('modalDescription').textContent = product.description;
        document.getElementById('modalCapacity').textContent = specs.capacity;
        document.getElementById('modalSize').textContent = specs.size;
        document.getElementById('modalUsage').textContent = specs.usage;

        const videoContainer = document.getElementById('modalVideoContainer');
        const videoFrame = document.getElementById('modalVideo');
        
        if (product.video) {
            let embedUrl = product.video;
            if (product.video.includes('youtube.com/watch')) {
                const videoId = new URL(product.video).searchParams.get('v');
                embedUrl = `https://www.youtube.com/embed/${videoId}`;
            } else if (product.video.includes('youtu.be')) {
                const videoId = product.video.split('/').pop();
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
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    this.showToast('Thank you! Your message has been sent successfully.', 'success');
                    form.reset();
                } else {
                    this.showToast('Something went wrong. Please try again.', 'error');
                }
            } catch (error) {
                this.showToast('Error sending message. Please try again.', 'error');
            }
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
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
