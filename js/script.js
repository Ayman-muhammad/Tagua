// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navCta = document.getElementById('nav-cta');

    if (toggle) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navCta.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll animation (fade-up)
    const faders = document.querySelectorAll('.fade-up');
    const appearOptions = { threshold: 0.3, rootMargin: '0px 0px -50px 0px' };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // Toast notification helper
    window.showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.background = type === 'error' ? '#dc3545' : '#0a4d8c';
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Handle login form submission (if on login page)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const phone = document.getElementById('phone').value;
            const pin = document.getElementById('pin').value;

            // Simulate API call
            showToast('Logging in...', 'success');
            // Here you would actually call your backend:
            // const response = await fetch('/auth/login', { method: 'POST', body: JSON.stringify({ phone, pin }) });
            // For demo, just redirect to dashboard after short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const pin = document.getElementById('pin').value;
            const consent = document.getElementById('consent').checked;

            if (!consent) {
                showToast('You must accept the privacy policy', 'error');
                return;
            }

            showToast('Creating account...', 'success');
            // Simulate API call
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Handle "Get Started" buttons (on index)
    const getStartedBtns = document.querySelectorAll('[data-action="get-started"]');
    getStartedBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'signup.html';
        });
    });

    // Handle "Log in" buttons
    const loginBtns = document.querySelectorAll('[data-action="login"]');
    loginBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    });

    // Logout button on dashboard
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});