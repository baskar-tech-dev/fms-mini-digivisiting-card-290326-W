const cardContainer = document.getElementById('cardContainer');

// Remove scroll logic since no scrolling

// Sticky navigation buttons
const navButtons = document.querySelectorAll('.nav-btn');

function setActiveNavButton(activeButton) {
    navButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
}

document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        // Add expanded class to container
        cardContainer.classList.add('expanded');

        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show the target section
        if (targetElement) {
            targetElement.classList.add('active');
        }

        // Mark current nav button active
        setActiveNavButton(this);
    });
});

// Optionally, set initial active state to first nav button on load
if (navButtons.length > 0) {
    setActiveNavButton(navButtons[0]);
}
