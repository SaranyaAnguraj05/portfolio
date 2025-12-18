// ========== Typed Text Effect ==========
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = [
    'MCA Student',
    'Full Stack Developer',
    'MERN Stack Developer',
    'Flutter Developer',
    'Cloud Enthusiast',
    'Problem Solver'
];

const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    }

    // Add active state to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = '';
            });
            if (navLink) {
                navLink.style.color = '#667eea';
            }
        }
    });

    lastScroll = currentScroll;
});

// ========== Mobile Menu Toggle ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ========== Scroll Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Apply stagger effect to children
            if (entry.target.children.length > 0) {
                Array.from(entry.target.children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .skill-category, .project-card, .experience-card, .achievement-item, .info-box, .stat-item'
    );

    animatedElements.forEach(el => {
        el.setAttribute('data-animate', '');
        observer.observe(el);
    });
});

// ========== Counter Animation for Stats ==========
const statItems = document.querySelectorAll('.stat-item h4');

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const isDecimal = target.toString().includes('.');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = isDecimal ? target.toFixed(2) : Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? current.toFixed(2) : Math.ceil(current);
        }
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = target.getAttribute('data-target') || target.textContent;
            const numValue = parseFloat(value.replace('+', ''));
            const hasPlus = value.includes('+');

            animateCounter(target, numValue);

            if (hasPlus) {
                setTimeout(() => {
                    target.textContent += '+';
                }, 1500);
            }

            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statItems.forEach(item => {
    item.setAttribute('data-target', item.textContent);
    statsObserver.observe(item);
});

// ========== Parallax Effect for Hero Section ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-particles, .glow-effect');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== Dynamic Particles Effect ==========
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 5 + 2}px;
        height: ${Math.random() * 5 + 2}px;
        background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 10 + 10}s infinite ease-in-out;
    `;

    document.querySelector('.hero-particles').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Add particle animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
        }
        10%, 90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 1000);

// ========== Cursor Trail Effect (Optional) ==========
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (window.innerWidth > 768) {
    // Create cursor trail circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(circle);
    }

    const allCircles = document.querySelectorAll('.circle');

    allCircles.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        allCircles.forEach((circle, index) => {
            circle.style.opacity = (20 - index) / 20;
            circle.style.left = x - 4 + 'px';
            circle.style.top = y - 4 + 'px';
            circle.style.transform = `scale(${(20 - index) / 20})`;

            circle.x = x;
            circle.y = y;

            const nextCircle = allCircles[index + 1] || allCircles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// ========== Skill Tags Hover Effect ==========
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'wiggle 0.5s ease-in-out';
        }, 10);
    });
});

// Add wiggle animation
const wiggleStyle = document.createElement('style');
wiggleStyle.textContent = `
    @keyframes wiggle {
        0%, 100% { transform: translateY(-5px) rotate(0deg); }
        25% { transform: translateY(-5px) rotate(-5deg); }
        75% { transform: translateY(-5px) rotate(5deg); }
    }
`;
document.head.appendChild(wiggleStyle);

// ========== Project Cards 3D Tilt Effect ==========
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========== Theme Toggle (Optional Enhancement) ==========
// Uncomment if you want to add dark mode toggle
/*
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
});
*/

// ========== Loading Animation ==========
window.addEventListener('load', () => {
    // Remove loader if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }

    // Animate hero section
    document.querySelector('.hero').style.opacity = '1';
});

// ========== Back to Top Button ==========
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
`;

document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-5px) rotate(360deg)';
    backToTop.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.6)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0) rotate(0deg)';
    backToTop.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
});

// ========== Console Welcome Message ==========
console.log('%c Welcome to Saranya\'s Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Designed with ❤️ and creativity ', 'color: #667eea; font-size: 14px; font-weight: bold;');
