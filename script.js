// Hero Carousel Data
const heroImages = [
    {
        image: "assets/images/hero-1.png"
    },
    {
        image: "assets/images/hero-2.png"
    },
    {
        image: "assets/images/hero-3.png"
    },
     {
        image: "assets/images/hero-4.png"
    }
];

let currentSlide = 0;

// DOM Elements for Hero Banner
const heroSlideElements = document.querySelectorAll('.hero-slide');
const carouselDots = document.querySelectorAll('.carousel-dot');
const prevCarouselBtn = document.querySelector('.prev-carousel');
const nextCarouselBtn = document.querySelector('.next-carousel');

// Function to update carousel
function updateCarousel(index) {
    // Handle wrap-around
    if (index >= heroImages.length) currentSlide = 0;
    else if (index < 0) currentSlide = heroImages.length - 1;
    else currentSlide = index;

    // Update slides visibility
    heroSlideElements.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    // Update dots
    carouselDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Event Listeners for Carousel Controls
if (nextCarouselBtn) {
    nextCarouselBtn.addEventListener('click', () => {
        updateCarousel(currentSlide + 1);
        resetInterval();
    });
}

if (prevCarouselBtn) {
    prevCarouselBtn.addEventListener('click', () => {
        updateCarousel(currentSlide - 1);
        resetInterval();
    });
}

// Dots click listeners
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateCarousel(index);
        resetInterval();
    });
});

// Auto-play functionality
let slideInterval = setInterval(() => {
    updateCarousel(currentSlide + 1);
}, 60000); // Change slide every 60 seconds

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        updateCarousel(currentSlide + 1);
    }, 60000);
}

// Mobile Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-links a');

if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
        const isVisible = mainNav.style.display === 'block';
        mainNav.style.display = isVisible ? 'none' : 'block';
        mainNav.style.position = 'absolute';
        mainNav.style.top = '100%';
        mainNav.style.left = '0';
        mainNav.style.width = '100%';
        mainNav.style.backgroundColor = 'var(--bg-white)';
        mainNav.style.padding = '20px';
        mainNav.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
        mainNav.style.zIndex = '999';
        
        // Reset specific styles for mobile menu
        const ul = mainNav.querySelector('ul');
        if (ul) {
            ul.style.flexDirection = 'column';
            ul.style.gap = '15px';
            ul.style.textAlign = 'center';
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.style.display = 'none';
            }
        });
    });
}

// Reset nav display on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mainNav) {
        mainNav.style.display = 'flex';
        mainNav.style.position = 'static';
        mainNav.style.padding = '0';
        mainNav.style.boxShadow = 'none';
        
        const ul = mainNav.querySelector('ul');
        if (ul) {
            ul.style.flexDirection = 'row';
            ul.style.gap = '30px';
        }
    } else if (mainNav) {
        mainNav.style.display = 'none';
    }
});

// Smooth scroll + active menu highlighting
const pageLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-links a[href="#"]');
const sections = document.querySelectorAll('section[id]');
const header = document.querySelector('.header');

function setActiveLink(targetLink) {
    navLinks.forEach(link => link.classList.toggle('active', link === targetLink));
}

function getScrollOffset() {
    return header ? header.offsetHeight + 10 : 10;
}

function smoothScroll(event) {
    const link = event.currentTarget;
    const href = link.getAttribute('href');

    if (href === '#' || href === '') {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveLink(link);
        if (window.innerWidth <= 768 && mainNav) {
            mainNav.style.display = 'none';
        }
        return;
    }

    const targetSection = document.querySelector(href);
    if (targetSection) {
        event.preventDefault();
        const top = targetSection.offsetTop - getScrollOffset();
        window.scrollTo({ top, behavior: 'smooth' });
        setActiveLink(link);
        if (window.innerWidth <= 768 && mainNav) {
            mainNav.style.display = 'none';
        }
    }
}

function updateActiveMenu() {
    const scrollPosition = window.scrollY + getScrollOffset() + 60;
    let activeLink = document.querySelector('.nav-links a[href="#"]');

    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition) {
            const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (link) {
                activeLink = link;
            }
        }
    });

    if (activeLink) {
        setActiveLink(activeLink);
    }
}

pageLinks.forEach(link => link.addEventListener('click', smoothScroll));
window.addEventListener('scroll', updateActiveMenu);
window.addEventListener('load', updateActiveMenu);
window.addEventListener('resize', updateActiveMenu);
