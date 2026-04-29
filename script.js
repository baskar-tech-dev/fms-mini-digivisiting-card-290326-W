// Hero Slider Data
const heroSlides = [
    {
        title: "Unleash Your <span class='highlight'>Creativity</span> Through Art",
        desc: "Learn drawing, painting, and digital art.",
        image: "assets/images/unlease-your-creativity.jpg"
    },
    {
        title: "Turn <span class='highlight'>Passion</span> Into Skill",
        desc: "From beginner to advanced courses.",
        image: "assets/images/turn-passion-into-skill.jpg"
    },
    {
        title: "Join <span class='highlight'>500+</span> Students",
        desc: "Build confidence and creativity.",
        image: "assets/images/build-confidence-and-creativity.jpg"
    }
];

let currentSlide = 0;

// DOM Elements
const heroTitle = document.getElementById('hero-title');
const heroDesc = document.getElementById('hero-desc');
const heroImage = document.getElementById('hero-image');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

// Function to update the slider
function updateSlider(index) {
    // Handle wrap-around
    if (index >= heroSlides.length) currentSlide = 0;
    else if (index < 0) currentSlide = heroSlides.length - 1;
    else currentSlide = index;

    // Update Content
    heroTitle.innerHTML = heroSlides[currentSlide].title;
    heroDesc.textContent = heroSlides[currentSlide].desc;
    
    // Add fade effect for image
    heroImage.style.opacity = 0;
    setTimeout(() => {
        heroImage.src = heroSlides[currentSlide].image;
        heroImage.style.opacity = 1;
    }, 300);

    // Update Dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Add CSS transition to image for smooth fading
heroImage.style.transition = 'opacity 0.3s ease';

// Event Listeners for Controls
nextBtn.addEventListener('click', () => {
    updateSlider(currentSlide + 1);
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    updateSlider(currentSlide - 1);
    resetInterval();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateSlider(index);
        resetInterval();
    });
});

// Auto-play functionality
let slideInterval = setInterval(() => {
    updateSlider(currentSlide + 1);
}, 5000); // Change slide every 5 seconds

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        updateSlider(currentSlide + 1);
    }, 5000);
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
