// Function to show the custom alert modal
function showCustomAlert(message) {
    const overlay = document.getElementById('customAlertOverlay');
    const messageElement = document.getElementById('customAlertMessage');
    messageElement.textContent = message;
    overlay.classList.add('visible');
}

// Function to hide the custom alert modal
function hideCustomAlert() {
    const overlay = document.getElementById('customAlertOverlay');
    overlay.classList.remove('visible');
}

// Function to open the card modal
function openCardModal(imageSrc, title, date) {
    const modalOverlay = document.getElementById('cardModalOverlay');
    const modalImage = document.getElementById('cardModalImage');
    const modalTitle = document.getElementById('cardModalTitle');
    const modalDate = document.getElementById('cardModalDate');

    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalDate.textContent = date;

    modalOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Function to close the card modal
function closeCardModal() {
    const modalOverlay = document.getElementById('cardModalOverlay');
    modalOverlay.classList.remove('visible');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const href = this.getAttribute('href');
        if (href && href !== '#') { // Check if href exists and is not just '#'
            const target = document.querySelector(href); // Get target element
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll animation
                    block: 'start' // Scroll to the start of the element
                });
            }
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) { // If scrolled more than 100px
        navbar.style.background = 'rgba(0, 0, 0, 0.95)'; // Make background darker
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.85)'; // Revert to original
    }
});

// Intersection Observer for scroll animations
const scrollObserverOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Adjust root margin
};

const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // If element is in viewport
            const target = entry.target;
            const animationClass = target.dataset.animation; // Get animation type from data-attribute

            // Remove existing animation classes to prevent conflicts
            target.classList.remove('fade-in-up', 'slide-in-left', 'slide-in-right', 'scale-up');

            // Add the specified animation class
            if (animationClass) {
                target.classList.add(animationClass);
            }
            target.classList.add('is-visible'); // Always add is-visible to trigger animation
            scrollObserver.unobserve(target); // Stop observing once animated
        }
    });
}, scrollObserverOptions);

// Observe all elements with 'scroll-animated' class
document.querySelectorAll('.scroll-animated').forEach(el => {
    scrollObserver.observe(el); // Start observing
});

// Observe the Apple Music card specifically for the helix animation
const appleMusicCard = document.querySelector('.apple-music-card');
if (appleMusicCard) {
    const appleMusicObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'is-visible' class to trigger the helix animation
                entry.target.classList.add('is-visible');
                appleMusicObserver.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the card is visible
    });
    appleMusicObserver.observe(appleMusicCard);
}


// Dynamic message animation for messages demo
function addMessage() {
    const messagesDemo = document.querySelector('.messages-demo');
    const messages = [
        'AutoMix in Apple Music ist fantastisch! 🎵',
        'Die neuen Liquid Glass Symbole sehen toll aus! ✨',
        'Visuelle Intelligenz macht alles so viel einfacher 🤖'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]; // Get a random message
    const newBubble = document.createElement('div');
    newBubble.className = 'message-bubble'; // Assign class for styling
    newBubble.textContent = randomMessage; // Set message text
    
    messagesDemo.appendChild(newBubble); // Add new message to the demo
    
    // Remove old messages to prevent overflow
    const bubbles = messagesDemo.querySelectorAll('.message-bubble');
    if (bubbles.length > 6) { // Keep only a certain number of messages
        bubbles[0].remove(); // Remove the oldest message
    }
}

// Add new message every 5 seconds
setInterval(addMessage, 5000);

// Get the Apple Music button by its ID
const appleMusicButton = document.getElementById('appleMusicButton');

// Add event listener for click animation
if (appleMusicButton) {
    appleMusicButton.addEventListener('click', function() {
        this.classList.add('clicked'); // Add the 'clicked' class
        setTimeout(() => {
            this.classList.remove('clicked'); // Remove the 'clicked' class after a short delay
        }, 100); // Animation duration
    });
}

// Add ripple animation CSS to the head
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4); /* Enlarge ripple */
            opacity: 0; /* Fade out */
        }
    }
`;
document.head.appendChild(style);

// Ensure scrolling is enabled on page load/refresh
document.addEventListener('DOMContentLoaded', (event) => {
    document.body.style.overflow = ''; // Reset overflow to default
});
