// Enhanced JavaScript for Ultra-Modern Landing Page

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Custom Cursor
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    }
    if (cursorFollower) {
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    }
    
    requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Start cursor animation
updateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform += ' scale(2)';
        if (cursorFollower) cursorFollower.style.transform += ' scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
        if (cursorFollower) cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    });
});

// Enhanced Navigation Scroll Effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
        
        // Add parallax effect to navigation
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        navbar.style.transform = `translateX(-50%) translateY(${scrollDirection === 'down' ? '-5px' : '0px'})`;
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateX(-50%) translateY(0px)';
    }
    
    lastScrollY = currentScrollY;
});

// Mobile menu toggle with enhanced animation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// Enhanced smooth scrolling with offset
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
});

// Advanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Trigger specific animations based on element type
            if (entry.target.classList.contains('service-card')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            }
            
            if (entry.target.classList.contains('stat-item')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-value'));
    const counter = element.querySelector('.stat-number');
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target + (target === 98 ? '%' : '+');
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
        }
    }, stepTime);
}

// Parallax Effect for Hero Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Floating dashboard parallax
    const dashboard = document.querySelector('.floating-dashboard');
    if (dashboard) {
        dashboard.style.transform = `translateY(${scrolled * 0.3}px) rotateX(${scrolled * 0.01}deg)`;
    }
});

// Dynamic Background Particles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    
    const particleContainer = document.querySelector('.bg-particles');
    if (particleContainer) {
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
}

// Create particles periodically
setInterval(createParticle, 2000);

// Enhanced Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', (e) => {
            if (!e.target.value) {
                e.target.parentNode.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', (e) => {
            if (e.target.value) {
                e.target.parentNode.classList.add('has-value');
            } else {
                e.target.parentNode.classList.remove('has-value');
            }
        });
    });
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Animation sequence
        submitBtn.querySelector('span').textContent = 'Launching...';
        submitBtn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        submitBtn.querySelector('span').textContent = 'Launched! 🚀';
        
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            contactForm.reset();
            
            inputs.forEach(input => {
                input.parentNode.classList.remove('focused', 'has-value');
            });
        }, 2000);
    });
}

// Advanced Tilt Effect
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Portfolio Item Hover Effects
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.image-overlay');
        const content = item.querySelector('.image-content');
        
        overlay.style.background = 'rgba(0, 0, 0, 0.8)';
        content.style.transform = 'translateY(0) scale(1)';
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.image-overlay');
        const content = item.querySelector('.image-content');
        
        overlay.style.background = 'rgba(0, 0, 0, 0.7)';
        content.style.transform = 'translateY(20px) scale(0.95)';
    });
});

// Loading Animation
window.addEventListener('load', () => {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }, 1500);
    
    // Initialize tilt effect after load
    initTiltEffect();
});

// Page Visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is hidden
        document.querySelectorAll('.gradient-orb').forEach(orb => {
            orb.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab is visible
        document.querySelectorAll('.gradient-orb').forEach(orb => {
            orb.style.animationPlayState = 'running';
        });
    }
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Service Cards Interactive Effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    const icon = card.querySelector('.icon-shape svg');
    
    card.addEventListener('mouseenter', () => {
        if (icon) {
            icon.style.animationDuration = '2s';
        }
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'all 0.6s ease';
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '300px';
            ripple.style.height = '300px';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    });
    
    card.addEventListener('mouseleave', () => {
        if (icon) {
            icon.style.animationDuration = '10s';
        }
    });
});

// Enhanced Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 10) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
}

// Tech Stack Items Animation
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    
    item.addEventListener('mouseenter', () => {
        item.style.background = 'rgba(102, 126, 234, 0.2)';
        item.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.background = 'rgba(102, 126, 234, 0.1)';
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic Text Animation
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize Observers
document.addEventListener('DOMContentLoaded', () => {
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .metric-card, .tech-item');
    
    animatableElements.forEach(el => {
        el.classList.add('reveal');
        animationObserver.observe(el);
    });
    
    // Add glitch effect to specific elements
    const glitchElements = document.querySelectorAll('.hero-title .title-line:first-child');
    glitchElements.forEach(el => {
        el.classList.add('glitch');
        el.setAttribute('data-text', el.textContent);
    });
});

// Performance optimization
let ticking = false;

function updateAnimations() {
    // Your animation updates here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

// Easter Egg - Konami Code
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Activate rainbow mode
            document.body.style.filter = 'hue-rotate(0deg)';
            let hue = 0;
            
            const rainbowInterval = setInterval(() => {
                hue += 10;
                document.body.style.filter = `hue-rotate(${hue}deg)`;
                
                if (hue >= 360) {
                    hue = 0;
                    clearInterval(rainbowInterval);
                    document.body.style.filter = 'none';
                }
            }, 100);
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Navigation Active Link Detection
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Hero Buttons Click Handlers
const btnPrimary = document.querySelector('.btn-primary');
const btnSecondary = document.querySelector('.btn-secondary');

if (btnPrimary) {
    btnPrimary.addEventListener('click', () => {
        // Animate to services section
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

if (btnSecondary) {
    btnSecondary.addEventListener('click', () => {
        // Animate to portfolio section
        const portfolioSection = document.querySelector('#portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Enhanced Mouse Tracking for Cards
function addMouseTracking() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .info-card, .contact-form-container');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (x - centerX) / centerX * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Intersection Observer for Stats Counter
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item');
            statItems.forEach(item => {
                if (!item.classList.contains('animated')) {
                    item.classList.add('animated');
                    animateCounter(item);
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observe stats container
const statsContainer = document.querySelector('.holographic-card');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

// Enhanced Portfolio Filtering (if you want to add categories later)
function initPortfolioFilter() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add click handlers for future filter buttons
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // Future: Open modal or navigate to project detail
            console.log('Portfolio item clicked:', item);
        });
    });
}

// Smooth Reveal Animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.section-header, .about-text, .service-card, .portfolio-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        revealObserver.observe(el);
    });
}

// Enhanced Form Validation
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldContainer = field.parentNode;
        
        // Remove existing error states
        fieldContainer.classList.remove('error');
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(fieldContainer, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldContainer, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(container, message) {
        container.classList.add('error');
        
        let errorElement = container.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.color = '#ff6b6b';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '0.5rem';
            container.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    // Enhanced form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Start loading animation
        submitBtn.querySelector('span').textContent = 'Launching...';
        submitBtn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success state
            submitBtn.querySelector('span').textContent = 'Launched! 🚀';
            
            // Reset form after success
            setTimeout(() => {
                form.reset();
                inputs.forEach(input => {
                    input.parentNode.classList.remove('focused', 'has-value', 'error');
                    const errorElement = input.parentNode.querySelector('.field-error');
                    if (errorElement) {
                        errorElement.remove();
                    }
                });
                
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Error state
            submitBtn.querySelector('span').textContent = 'Error! Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ffa726)';
            
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    addMouseTracking();
    initPortfolioFilter();
    initRevealAnimations();
    initFormValidation();
    updateActiveNavLink();
});

// Cleanup function for better performance
window.addEventListener('beforeunload', () => {
    // Clean up any intervals or timeouts
    animationObserver.disconnect();
    if (statsObserver) statsObserver.disconnect();
});

// Performance monitoring
let performanceMetrics = {
    startTime: performance.now(),
    animations: 0,
    scrollEvents: 0
};

// Track performance
window.addEventListener('load', () => {
    performanceMetrics.loadTime = performance.now() - performanceMetrics.startTime;
    console.log('Page loaded in:', performanceMetrics.loadTime.toFixed(2), 'ms');
});

// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    performanceMetrics.scrollEvents++;
    updateActiveNavLink();
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Debug mode (remove in production)
if (window.location.search.includes('debug=true')) {
    console.log('Debug mode enabled');
    
    // Add performance monitor
    setInterval(() => {
        console.log('Performance metrics:', performanceMetrics);
    }, 5000);
    
    // Add visual indicators for scroll sections
    document.querySelectorAll('section[id]').forEach(section => {
        const indicator = document.createElement('div');
        indicator.style.position = 'fixed';
        indicator.style.top = '10px';
        indicator.style.right = '10px';
        indicator.style.background = 'rgba(102, 126, 234, 0.8)';
        indicator.style.color = 'white';
        indicator.style.padding = '5px 10px';
        indicator.style.borderRadius = '5px';
        indicator.style.fontSize = '12px';
        indicator.style.zIndex = '10000';
        indicator.style.display = 'none';
        indicator.textContent = section.id;
        document.body.appendChild(indicator);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('[data-section-indicator]').forEach(el => el.style.display = 'none');
                    indicator.style.display = 'block';
                }
            });
        }, { threshold: 0.5 });
        
        indicator.setAttribute('data-section-indicator', '');
        observer.observe(section);
    });
}
