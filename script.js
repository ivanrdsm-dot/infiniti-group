/* ============================================
   INFINITI GROUP — Premium UX & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- LOADING SCREEN ---
    const loader = document.getElementById('loader');
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
            initHeroAnimations();
        }, 2200);
    });

    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
            initHeroAnimations();
        }, 2200);
    }

    // --- CUSTOM CURSOR ---
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    if (window.matchMedia('(pointer: fine)').matches && cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effects
        const hoverTargets = document.querySelectorAll('a, button, .btn-primary, .btn-outline, .magnetic, .eco-card, .token-feature, .gallery-btn');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('hover'));
            el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
        });
    }

    // --- NAVBAR SCROLL ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // --- MOBILE MENU ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // --- HERO ANIMATIONS ---
    function initHeroAnimations() {
        const hero = document.querySelector('.hero');
        hero.classList.add('visible');

        // Fade up hero elements with staggered timing
        const heroEyebrow = document.querySelector('.hero-eyebrow');
        const heroLogo = document.querySelector('.hero-logo');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-ctas');

        setTimeout(() => {
            if (heroEyebrow) { heroEyebrow.style.transition = 'opacity 0.8s, transform 0.8s'; heroEyebrow.style.opacity = '1'; heroEyebrow.style.transform = 'translateY(0)'; }
        }, 300);
        setTimeout(() => {
            if (heroLogo) { heroLogo.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)'; heroLogo.style.opacity = '1'; heroLogo.style.transform = 'translateY(0)'; }
        }, 500);
        setTimeout(() => {
            if (heroSubtitle) { heroSubtitle.style.transition = 'opacity 0.8s, transform 0.8s'; heroSubtitle.style.opacity = '1'; heroSubtitle.style.transform = 'translateY(0)'; }
        }, 900);
        setTimeout(() => {
            if (heroCta) { heroCta.style.transition = 'opacity 0.8s, transform 0.8s'; heroCta.style.opacity = '1'; heroCta.style.transform = 'translateY(0)'; }
        }, 1200);
    }

    // --- SCROLL REVEAL ANIMATIONS ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    // Fade up elements
    const fadeUpElements = document.querySelectorAll('[data-animate="fade-up"]');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay || 0);
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay * 1000);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeUpElements.forEach(el => fadeObserver.observe(el));

    // Reveal text (word by word)
    const revealTextElements = document.querySelectorAll('[data-animate="reveal-text"]');
    revealTextElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        text.split(' ').forEach((word, i) => {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('word');
            const inner = document.createElement('span');
            inner.classList.add('word-inner');
            inner.textContent = word;
            inner.style.transitionDelay = `${i * 0.06}s`;
            wordSpan.appendChild(inner);
            el.appendChild(wordSpan);
        });
    });

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                textObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    revealTextElements.forEach(el => textObserver.observe(el));

    // Blockchain chain line animation
    const blockchainVisual = document.querySelector('.blockchain-visual');
    if (blockchainVisual) {
        const chainObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    chainObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        chainObserver.observe(blockchainVisual);
    }

    // --- COUNT UP ANIMATION ---
    const countElements = document.querySelectorAll('[data-animate="count-up"]');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCount(entry.target, 0, target, 1500);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    countElements.forEach(el => countObserver.observe(el));

    function animateCount(el, start, end, duration) {
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
            const current = Math.round(start + (end - start) * eased);
            el.textContent = current;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // --- PARALLAX ON HERO ---
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg-img');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        if (scrollY < window.innerHeight * 1.2) {
            const opacity = 1 - (scrollY / window.innerHeight) * 0.9;
            const translate = scrollY * 0.25;
            if (heroContent) {
                heroContent.style.opacity = Math.max(0, opacity);
                heroContent.style.transform = `translateY(${translate}px)`;
            }
            if (heroBg) {
                heroBg.style.transform = `scale(${1.1 - scrollY * 0.0001}) translateY(${scrollY * 0.15}px)`;
            }
        }
    }, { passive: true });

    // --- GALLERY / SLIDER ---
    document.querySelectorAll('.gallery').forEach(gallery => {
        const slides = gallery.querySelectorAll('.gallery-slide');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const currentEl = gallery.querySelector('.gallery-current');
        let current = 0;
        let isAnimating = false;

        function goTo(index) {
            if (isAnimating) return;
            isAnimating = true;

            slides[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');
            currentEl.textContent = current + 1;

            setTimeout(() => { isAnimating = false; }, 800);
        }

        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });

        // Touch support
        let touchStartX = 0;
        gallery.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
        gallery.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goTo(current + 1);
                else goTo(current - 1);
            }
        }, { passive: true });

        // Auto-advance
        let autoInterval = setInterval(() => goTo(current + 1), 5000);
        gallery.addEventListener('mouseenter', () => clearInterval(autoInterval));
        gallery.addEventListener('mouseleave', () => {
            autoInterval = setInterval(() => goTo(current + 1), 5000);
        });
    });

    // --- FAQ ACCORDION ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-primary');
        const originalText = btn.textContent;
        btn.textContent = 'Mensaje enviado';
        btn.style.background = 'transparent';
        btn.style.color = 'var(--color-gold)';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            contactForm.reset();
        }, 3000);
    });

    // --- ACTIVE NAV LINK ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + section.offsetHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    // --- MAGNETIC BUTTONS ---
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            });
            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'transform 0.1s';
            });
        });
    }

    // --- SMOOTH SECTION DIVIDERS (horizontal line animation on section enter) ---
    document.querySelectorAll('.pillar').forEach(pillar => {
        const pObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseFloat(entry.target.dataset.delay || 0);
                    setTimeout(() => entry.target.classList.add('animated'), delay * 1000);
                    pObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        pObserver.observe(pillar);
    });

});
