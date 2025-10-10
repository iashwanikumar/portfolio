/**
 * ============================================================================
 * ASHWANI KUMAR - PORTFOLIO WEBSITE JAVASCRIPT
 * ============================================================================
 * A modern, interactive portfolio with advanced animations and effects
 * Features: Particle systems, smooth scrolling, reveal animations, and more
 * 
 * Author: Ashwani Kumar
 * Version: 1.0.0
 * ============================================================================
 */

(function() {
    'use strict';

    // ========================================================================
    // CONFIGURATION & CONSTANTS
    // Centralized configuration for easy customization
    // ========================================================================
    
    const CONFIG = {
        // Particle system configuration
        particles: {
            maxCount: 26,              // Maximum number of particles
            sizeMin: 2,                // Minimum particle size in pixels
            sizeMax: 4,                // Maximum particle size in pixels
            speedRange: 1,             // Speed range for particle movement
            opacityMin: 0.2,           // Minimum opacity
            opacityMax: 0.8,           // Maximum opacity
            decayMin: 0.002,           // Minimum life decay rate
            decayMax: 0.007            // Maximum life decay rate
        },
        
        // Animation timing configuration
        animations: {
            scrollThreshold: 50,       // Pixels scrolled to trigger effects
            scrollTopDuration: 900,    // Duration of scroll-to-top animation
            skillDelay: 100,           // Delay between skill animations (ms)
            projectDelay: 200,         // Delay between project animations (ms)
            educationDelay: 300,       // Delay between education items (ms)
            shapeColorInterval: 3000,  // Color change interval for shapes (ms)
            typingSpeed: 70,           // Typing speed for typewriter effect (ms)
            typingDelay: 1500,         // Delay before restarting typing (ms)
            typingStartDelay: 2000     // Initial delay before typing starts (ms)
        },
        
        // Color palette configuration
        colors: {
            primary: ['#c5620c99', '#d641189c', '#A47F6F', '#415057', '#32373D'],
            accent: ['#ffd90096', '#ff6b6ba4', '#4ecdc591', '#ffffff5f'],
            stars: ['#C5630C', '#D64218', '#A47F6F', '#FFD700', '#FF6B6B', 
                   '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3']
        },
        
        // Performance optimization settings
        performance: {
            scrollThrottle: 16,        // Throttle delay for scroll events (60fps)
            resizeDebounce: 250        // Debounce delay for resize events (ms)
        }
    };

    // ========================================================================
    // MAIN INITIALIZATION
    // Bootstrap all portfolio features when DOM is ready
    // ========================================================================
    
    document.addEventListener('DOMContentLoaded', initializePortfolio);

    /**
     * Master initialization function
     * Bootstraps all portfolio features in correct order
     */
    function initializePortfolio() {
        console.log('🚀 Initializing Ashwani Kumar Portfolio...');
        
        try {
            // Initialize all modules in sequence
            Navigation.init();
            ScrollEffects.init();
            ParticleSystem.init();
            Animations.init();
            ContactForm.init();
            Accessibility.init();
            Performance.init();
            Enhancements.init();
            
            console.log('✨ Portfolio loaded successfully!');
        } catch (error) {
            console.error('❌ Initialization error:', error);
        }
    }

    // ========================================================================
    // NAVIGATION MODULE
    // Handles mobile menu, navbar behavior, and smooth scrolling
    // ========================================================================
    
    const Navigation = {
        elements: {},
        
        /**
         * Initialize all navigation features
         */
        init() {
            this.cacheElements();
            this.setupMobileMenu();
            this.setupNavbarScroll();
            this.setupSmoothScroll();
        },

        /**
         * Cache DOM elements for better performance
         * Prevents repeated DOM queries
         */
        cacheElements() {
            this.elements = {
                menuToggle: document.querySelector('.menu-toggle'),
                navMenu: document.querySelector('.nav-menu'),
                navbar: document.querySelector('.navbar'),
                navLinks: document.querySelectorAll('.nav-link'),
                menuIcon: document.querySelector('.menu-toggle i')
            };
        },

        /**
         * Setup mobile hamburger menu toggle
         * Handles opening/closing and icon animation
         */
        setupMobileMenu() {
            const { menuToggle, navMenu, navLinks, menuIcon } = this.elements;
            if (!menuToggle || !navMenu) return;

            // Toggle menu on hamburger button click
            menuToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.toggle('active');
                
                // Animate hamburger icon to X and back
                menuIcon.classList.toggle('fa-bars', !isActive);
                menuIcon.classList.toggle('fa-times', isActive);
            });

            // Close menu when clicking any navigation link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                });
            });
        },

        /**
         * Control navbar visibility based on scroll position
         * Shows navbar only at top of page
         */
        setupNavbarScroll() {
            const { navbar } = this.elements;
            if (!navbar) return;

            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Hide navbar when scrolled down past threshold
                navbar.classList.toggle('hidden', scrollTop > CONFIG.animations.scrollThreshold);
            }, { passive: true }); // Passive for better scroll performance
        },

        /**
         * Enable smooth scrolling for anchor links
         * Accounts for fixed navbar height
         */
        setupSmoothScroll() {
            // Select all anchor links that start with #
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    
                    if (target) {
                        // Smooth scroll with offset for fixed navbar
                        window.scrollTo({
                            top: target.offsetTop - 80, // 80px navbar offset
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    };

    // ========================================================================
    // SCROLL EFFECTS MODULE
    // Manages scroll-to-top button and reveal animations
    // ========================================================================
    
    const ScrollEffects = {
        observer: null,
        
        /**
         * Initialize all scroll-based effects
         */
        init() {
            this.setupScrollToTop();
            this.setupRevealAnimations();
            this.setupEducationTimeline();
        },

        /**
         * Create and manage scroll-to-top button
         * Appears after scrolling down, smoothly returns to top
         */
        setupScrollToTop() {
            const scrollTopBtn = document.getElementById('scrollTop');
            if (!scrollTopBtn) return;

            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                const shouldShow = window.pageYOffset > 50;
                scrollTopBtn.classList.toggle('visible', shouldShow);
            }, { passive: true });

            // Smooth scroll to top with custom animation
            scrollTopBtn.addEventListener('click', () => {
                const duration = CONFIG.animations.scrollTopDuration;
                const scrollStep = -window.scrollY / (duration / 15);
                
                // Custom scroll animation using intervals
                const scrollInterval = setInterval(() => {
                    if (window.scrollY !== 0) {
                        window.scrollBy(0, scrollStep);
                    } else {
                        clearInterval(scrollInterval);
                    }
                }, 15);
            });
        },

        /**
         * Setup Intersection Observer for reveal animations
         * Elements fade in and slide up when entering viewport
         */
        setupRevealAnimations() {
            // Observer configuration
            const options = {
                threshold: 0.1,                    // Trigger when 10% visible
                rootMargin: '0px 0px -50px 0px'   // Trigger slightly before element enters
            };

            // Create intersection observer
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add 'active' class to trigger CSS animation
                        entry.target.classList.add('active');
                    }
                });
            }, options);

            // Observe all elements with 'reveal' class
            document.querySelectorAll('.reveal').forEach(el => {
                this.observer.observe(el);
            });

            // Fallback for browsers without Intersection Observer
            if (!('IntersectionObserver' in window)) {
                window.addEventListener('scroll', this.revealFallback, { passive: true });
            }
        },

        /**
         * Fallback reveal function for browsers without Intersection Observer
         * Uses getBoundingClientRect to detect visibility
         */
        revealFallback() {
            document.querySelectorAll('.reveal').forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    element.classList.add('active');
                }
            });
        },

        /**
         * Apply staggered animation delays to education timeline
         * Creates cascading effect for timeline items
         */
        setupEducationTimeline() {
            document.querySelectorAll('.education-item').forEach((item, index) => {
                // Calculate delay based on item index
                const delay = index * CONFIG.animations.educationDelay / 1000;
                item.style.animationDelay = `${delay}s`;
            });
        }
    };

    // ========================================================================
    // PARTICLE SYSTEM MODULE
    // Advanced particle system with scroll interaction
    // ========================================================================
    
    const ParticleSystem = {
        instances: [],
        
        /**
         * Initialize particle systems in all containers
         * Finds all .particle-container elements and creates systems
         */
        init() {
            document.querySelectorAll('.particle-container').forEach(container => {
                this.createSystem(container);
            });
        },

        /**
         * Create a new particle system in specified container
         * @param {HTMLElement} container - Container element for particles
         */
        createSystem(container) {
            const particles = [];
            const config = CONFIG.particles;
            let lastScrollY = window.pageYOffset;

            /**
             * Individual Particle class
             * Manages particle lifecycle, movement, and rendering
             */
            class Particle {
                constructor() {
                    this.reset();
                    this.element = this.createElement();
                }

                /**
                 * Reset particle properties to random values
                 * Called when particle is created or when life depletes
                 */
                reset() {
                    this.x = Math.random() * window.innerWidth;
                    this.y = Math.random() * window.innerHeight;
                    this.size = Math.random() * (config.sizeMax - config.sizeMin) + config.sizeMin;
                    this.speedX = (Math.random() - 0.5) * config.speedRange;
                    this.speedY = (Math.random() - 0.5) * config.speedRange;
                    this.opacity = Math.random() * (config.opacityMax - config.opacityMin) + config.opacityMin;
                    this.life = 1;
                    this.decay = Math.random() * (config.decayMax - config.decayMin) + config.decayMin;
                    this.color = this.getRandomColor();
                }

                /**
                 * Get random color from palette
                 * @returns {string} Random color from config
                 */
                getRandomColor() {
                    const allColors = [...CONFIG.colors.primary, ...CONFIG.colors.accent];
                    return allColors[Math.floor(Math.random() * allColors.length)];
                }

                /**
                 * Create DOM element for particle
                 * @returns {HTMLElement} Particle div element
                 */
                createElement() {
                    const el = document.createElement('div');
                    el.className = 'particle';
                    el.style.cssText = `
                        position: absolute;
                        width: ${this.size}px;
                        height: ${this.size}px;
                        background: ${this.color};
                        border-radius: 50%;
                        opacity: ${this.opacity};
                        left: ${this.x}px;
                        top: ${this.y}px;
                        pointer-events: none;
                        box-shadow: 0 0 6px ${this.color};
                        transition: opacity 0.1s ease;
                    `;
                    return el;
                }

                /**
                 * Update particle position and state
                 * Called on every animation frame
                 */
                update() {
                    // Move particle based on velocity
                    this.x += this.speedX;
                    this.y += this.speedY;
                    this.life -= this.decay;

                    // Wrap around screen edges (teleport to opposite side)
                    if (this.x < -10) this.x = window.innerWidth + 10;
                    if (this.x > window.innerWidth + 10) this.x = -10;
                    if (this.y < -10) this.y = window.innerHeight + 10;
                    if (this.y > window.innerHeight + 10) this.y = -10;

                    // Reset particle when life is depleted
                    if (this.life <= 0) {
                        this.reset();
                        this.element.style.width = this.size + 'px';
                        this.element.style.height = this.size + 'px';
                        this.element.style.background = this.color;
                        this.element.style.boxShadow = `0 0 6px ${this.color}`;
                    }

                    // Update DOM element position and opacity
                    this.element.style.left = this.x + 'px';
                    this.element.style.top = this.y + 'px';
                    this.element.style.opacity = this.opacity * this.life;
                }
            }

            /**
             * Initialize particles in the container
             * Creates specified number of particles
             */
            function createParticles() {
                container.innerHTML = '';
                particles.length = 0;
                
                for (let i = 0; i < config.maxCount; i++) {
                    const particle = new Particle();
                    particles.push(particle);
                    container.appendChild(particle.element);
                }
            }

            /**
             * Animation loop using requestAnimationFrame
             * Updates all particles on every frame
             */
            function animate() {
                particles.forEach(p => p.update());
                requestAnimationFrame(animate);
            }

            /**
             * Handle window resize
             * Ensures particles stay within bounds after resize
             */
            function handleResize() {
                particles.forEach(p => {
                    if (p.x > window.innerWidth) p.x = window.innerWidth;
                    if (p.y > window.innerHeight) p.y = window.innerHeight;
                });
            }

            /**
             * Add scroll interaction
             * Particles speed up based on scroll velocity
             */
            function handleScroll() {
                const currentScrollY = window.pageYOffset;
                const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
                lastScrollY = currentScrollY;
                
                // Speed multiplier based on scroll speed (capped at 2x)
                const multiplier = Math.min(scrollSpeed * 0.1, 2);
                
                particles.forEach(p => {
                    p.speedX *= (1 + multiplier * 0.1);
                    p.speedY *= (1 + multiplier * 0.1);
                });
                
                // Gradually reduce speed back to normal
                setTimeout(() => {
                    particles.forEach(p => {
                        p.speedX *= 0.95;
                        p.speedY *= 0.95;
                    });
                }, 100);
            }

            // Start the particle system
            createParticles();
            animate();
            
            // Add event listeners
            window.addEventListener('resize', handleResize, { passive: true });
            window.addEventListener('scroll', handleScroll, { passive: true });
            
            // Store instance for cleanup
            ParticleSystem.instances.push({ container, particles });
        }
    };

    // ========================================================================
    // ANIMATIONS MODULE
    // Manages various animation effects throughout the site
    // ========================================================================
    
    const Animations = {
        /**
         * Initialize all animation systems
         */
        init() {
            this.setupStaggeredAnimations();
            this.setupFloatingShapes();
            this.setupFooterParticles();
            this.setupTypingEffect();
        },

        /**
         * Apply staggered delays to skill categories and project cards
         * Creates smooth cascading effect when elements appear
         */
        setupStaggeredAnimations() {
            // Stagger skill category animations
            document.querySelectorAll('.skill-category').forEach((el, i) => {
                const delay = i * CONFIG.animations.skillDelay / 1000;
                el.style.animationDelay = `${delay}s`;
            });

            // Stagger project card animations
            document.querySelectorAll('.project-card').forEach((el, i) => {
                const delay = i * CONFIG.animations.projectDelay / 1000;
                el.style.animationDelay = `${delay}s`;
            });
        },

        /**
         * Animate floating background shapes with color changes
         * Periodically changes shape colors for visual interest
         */
        setupFloatingShapes() {
            const shapes = document.querySelectorAll('.floating-shape');
            const colors = ['#C5630C', '#D64218', '#A47F6F', '#415057'];
            
            // Change colors at regular intervals
            setInterval(() => {
                shapes.forEach(shape => {
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    shape.style.background = randomColor;
                });
            }, CONFIG.animations.shapeColorInterval);
        },

        /**
         * Create decorative particles in footer and skills sections
         * Static decorative particles (not animated like main particle system)
         */
        setupFooterParticles() {
            const footerContainer = document.querySelector('.footer-particles');
            const skillsContainer = document.querySelector('.floating-particles');
            
            if (footerContainer) this.createParticles(footerContainer, 12);
            if (skillsContainer) this.createParticles(skillsContainer, 15);
        },

        /**
         * Create static decorative particles
         * @param {HTMLElement} container - Container for particles
         * @param {number} count - Number of particles to create
         */
        createParticles(container, count) {
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size and position
                const size = Math.random() * 3 + 3;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                
                container.appendChild(particle);
            }
        },

        /**
         * Setup looping typewriter effect for tagline
         * Types out text character by character, then repeats
         */
        setupTypingEffect() {
            setTimeout(() => {
                const tagline = document.querySelector('.tagline');
                if (tagline) {
                    const text = tagline.textContent;
                    this.typeWriter(tagline, text);
                }
            }, CONFIG.animations.typingStartDelay);
        },

        /**
         * Typewriter effect with continuous loop
         * @param {HTMLElement} element - Element to type into
         * @param {string} text - Text to type
         */
        typeWriter(element, text) {
            let index = 0;
            element.textContent = '';

            const type = () => {
                if (index < text.length) {
                    // Add one character at a time
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, CONFIG.animations.typingSpeed);
                } else {
                    // Restart after delay when complete
                    setTimeout(() => {
                        index = 0;
                        element.textContent = '';
                        type();
                    }, CONFIG.animations.typingDelay);
                }
            };

            type();
        }
    };

    // ========================================================================
    // CONTACT FORM MODULE
    // Handles form submission with animated feedback
    // ========================================================================
    
    const ContactForm = {
        /**
         * Initialize contact form functionality
         */
        init() {
            const form = document.getElementById('contactForm');
            if (!form) return;

            // Prevent default form submission and handle with custom logic
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(form);
            });
        },

        /**
         * Handle form submission with loading and success states
         * @param {HTMLFormElement} form - Form element
         */
        handleSubmit(form) {
            const button = form.querySelector('.form-btn');
            const text = button.querySelector('span');
            const icon = button.querySelector('i');

            // Show loading state
            this.setLoadingState(button, text, icon);

            // Simulate API call (replace with actual submission logic)
            setTimeout(() => {
                this.setSuccessState(form, button, text, icon);
            }, 2000);
        },

        /**
         * Set button to loading state
         * @param {HTMLElement} button - Submit button
         * @param {HTMLElement} text - Button text element
         * @param {HTMLElement} icon - Button icon element
         */
        setLoadingState(button, text, icon) {
            text.textContent = 'Sending...';
            icon.className = 'fas fa-spinner fa-spin';
            button.disabled = true;
        },

        /**
         * Set button to success state and reset form
         * @param {HTMLFormElement} form - Form element
         * @param {HTMLElement} button - Submit button
         * @param {HTMLElement} text - Button text element
         * @param {HTMLElement} icon - Button icon element
         */
        setSuccessState(form, button, text, icon) {
            text.textContent = 'Message Sent!';
            icon.className = 'fas fa-check';
            button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            
            // Reset form fields
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                this.resetButton(button, text, icon);
            }, 3000);
        },

        /**
         * Reset button to original state
         * @param {HTMLElement} button - Submit button
         * @param {HTMLElement} text - Button text element
         * @param {HTMLElement} icon - Button icon element
         */
        resetButton(button, text, icon) {
            text.textContent = 'Send Message';
            icon.className = 'fas fa-paper-plane';
            button.style.background = 'linear-gradient(45deg, var(--primary-orange), var(--bright-orange))';
            button.disabled = false;
        }
    };

    // ========================================================================
    // ACCESSIBILITY MODULE
    // Enhances keyboard navigation and focus indicators
    // ========================================================================
    
    const Accessibility = {
        /**
         * Initialize accessibility features
         */
        init() {
            this.setupKeyboardNavigation();
            this.setupFocusIndicators();
        },

        /**
         * Add visual feedback for keyboard navigation
         * Detects when user is navigating with keyboard vs mouse
         */
        setupKeyboardNavigation() {
            // Add class when Tab key is pressed
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });

            // Remove class when mouse is used
            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
        },

        /**
         * Add custom focus indicators for keyboard navigation
         * Improves visibility of focused elements
         */
        setupFocusIndicators() {
            const style = document.createElement('style');
            style.textContent = `
                .keyboard-navigation *:focus {
                    outline: 2px solid #C5630C;
                    outline-offset: 2px;
                }
            `;
            document.head.appendChild(style);
        }
    };

    // ========================================================================
    // PERFORMANCE MODULE
    // Monitors performance and handles errors
    // ========================================================================
    
    const Performance = {
        /**
         * Initialize performance monitoring
         */
        init() {
            this.logMetrics();
            this.setupErrorHandling();
            this.setupCleanup();
            this.optimizeScrolling();
        },

        /**
         * Log performance metrics after page load
         * Uses Performance API to measure load times
         */
        logMetrics() {
            if (!('performance' in window)) return;

            window.addEventListener('load', () => {
                setTimeout(() => {
                    const [perfData] = performance.getEntriesByType('navigation');
                    
                    console.log('📊 Performance Metrics:');
                    console.log(`DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`);
                    console.log(`Page Load: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
                    console.log(`Total Time: ${Math.round(perfData.loadEventEnd - perfData.navigationStart)}ms`);
                }, 0);
            });
        },

        /**
         * Setup global error handling
         * Catches and logs errors without breaking the app
         */
        setupErrorHandling() {
            // Catch runtime errors
            window.addEventListener('error', (e) => {
                console.warn('🚫 Error caught:', e.error);
            });

            // Catch unhandled promise rejections
            window.addEventListener('unhandledrejection', (e) => {
                console.warn('🚫 Unhandled rejection:', e.reason);
            });
        },

        /**
         * Setup cleanup on page unload
         * Removes particles and cleans up memory
         */
        setupCleanup() {
            window.addEventListener('beforeunload', () => {
                // Clean up particle systems
                ParticleSystem.instances.forEach(instance => {
                    instance.container.innerHTML = '';
                });
                console.log('🧹 Portfolio cleaned up');
            });
        },

        /**
         * Throttle scroll events for better performance
         * Uses requestAnimationFrame for smooth 60fps scrolling
         */
        optimizeScrolling() {
            let ticking = false;
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        // Additional scroll optimizations can be added here
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }
    };

    // ========================================================================
    // ENHANCEMENTS MODULE
    // Additional features like preloader, cursor effects, and easter eggs
    // ========================================================================
    
    const Enhancements = {
        /**
         * Initialize all enhancement features
         */
        init() {
            this.showPreloader();
            this.initCursorStars();
            this.setupEasterEgg();
        },

        /**
         * Show loading animation during initial page load
         * Displays spinner until page is fully loaded
         */
        showPreloader() {
            const preloader = document.createElement('div');
            preloader.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #1A1F24 0%, #33353A 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    flex-direction: column;
                    transition: opacity 0.5s ease;
                ">
                    <div style="
                        width: 50px;
                        height: 50px;
                        border: 3px solid rgba(197, 99, 12, 0.3);
                        border-top: 3px solid #C5630C;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin-bottom: 20px;
                    "></div>
                    <p style="color: #A5ABAF; font-size: 1.1rem;">Loading Portfolio...</p>
                </div>
            `;
            
            document.body.appendChild(preloader);
            
            // Add spin animation for loader
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Remove preloader after page loads
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => preloader.remove(), 500);
                }, 1000);
            });
        },

        /**
         * Initialize cursor star trail effect (desktop only)
         * Creates sparkle effect that follows cursor
         */
        initCursorStars() {
            // Only enable on desktop, not on touch devices
            if (window.innerWidth <= 768 || 'ontouchstart' in window) return;

            document.addEventListener('mousemove', (e) => {
                // 15% chance to create star on each mouse move
                if (Math.random() < 0.15) {
                    this.createStar(e.clientX, e.clientY);
                }
            });
        },

        /**
         * Create individual cursor star
         * @param {number} x - X coordinate
         * @param {number} y - Y coordinate
         */
        createStar(x, y) {
            const star = document.createElement('div');
            star.className = 'cursor-star';
            
            // Random color from star palette
            const color = CONFIG.colors.stars[Math.floor(Math.random() * CONFIG.colors.stars.length)];
            
            // Random offset for natural spread
            const offsetX = (Math.random() - 0.5) * 15;
            const offsetY = (Math.random() - 0.5) * 15;
            
            star.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                color: ${color};
                text-shadow: 0 0 8px ${color};
                transform: translate(${offsetX}px, ${offsetY}px) rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(star);
            
            // Remove star after animation completes
            setTimeout(() => star.remove(), 1500);
        },

        /**
         * Setup Konami Code easter egg
         * Triggers rainbow animation on correct sequence
         * Sequence: Up Up Down Down Left Right Left Right B A
         */
        setupEasterEgg() {
            const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
            let input = [];

            document.addEventListener('keydown', (e) => {
                input.push(e.keyCode);
                if (input.length > code.length) input.shift();
                
                // Check if input matches Konami code
                if (input.join(',') === code.join(',')) {
                    this.activateRainbow();
                    input = []; // Reset input
                }
            });
        },

        /**
         * Activate rainbow animation easter egg
         * Applies rainbow hue rotation to entire page
         */
        activateRainbow() {
            console.log('🎉 Easter egg activated!');
            
            // Add rainbow animation CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    25% { filter: hue-rotate(90deg); }
                    50% { filter: hue-rotate(180deg); }
                    75% { filter: hue-rotate(270deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            // Apply animation to body
            document.body.style.animation = 'rainbow 2s ease-in-out';
            
            // Remove animation after 7 seconds
            setTimeout(() => {
                document.body.style.animation = '';
            }, 7000);
        }
    };

})();

/**
 * ============================================================================
 * END OF SCRIPT
 * ============================================================================
 */