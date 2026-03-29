const cardContainer = document.querySelector('.visiting-card-container');

// Sticky navigation buttons
const navButtons = document.querySelectorAll('.nav-btn');

function setActiveNavButton(activeButton) {
    navButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

navButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        if (!cardContainer) return;

        // Expand the visiting card area to reveal content
        cardContainer.classList.add('expanded');

        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show the target section
        if (targetElement) {
            targetElement.classList.add('active');
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Mark current nav button active
        setActiveNavButton(this);
    });
});

// Optionally, set initial active state to the first nav button
if (navButtons.length > 0) {
    setActiveNavButton(navButtons[0]);
}
