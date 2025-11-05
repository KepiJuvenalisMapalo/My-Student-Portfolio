// Login Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Clear previous errors
            clearErrors();
            
            let isValid = true;
            
            // Username validation
            if (username === '') {
                showError('usernameError', 'Username is required');
                isValid = false;
            } else if (username.length < 4) {
                showError('usernameError', 'Username must be at least 4 characters long');
                isValid = false;
            }
            
            // Password validation
            if (password === '') {
                showError('passwordError', 'Password is required');
                isValid = false;
            } else if (password.length < 6) {
                showError('passwordError', 'Password must be at least 6 characters long');
                isValid = false;
            }
            
            if (isValid) {
                // Store login info if remember me is checked
                if (rememberMe) {
                    localStorage.setItem('rememberedUsername', username);
                }
                
                // Redirect to home page
                window.location.href = 'home.html';
            }
        });
        
        // Load remembered username
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        if (rememberedUsername) {
            document.getElementById('username').value = rememberedUsername;
            document.getElementById('rememberMe').checked = true;
        }
    }
});

// Error handling functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Date and Time Display
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    const dateTimeString = now.toLocaleDateString('en-US', options);
    const dateTimeElement = document.getElementById('currentDateTime');
    
    if (dateTimeElement) {
        dateTimeElement.textContent = `Current Date & Time: ${dateTimeString}`;
    }
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initialize date and time on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
});

// Slideshow functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-play slideshow
function autoPlaySlideshow() {
    if (slides.length > 0) {
        setInterval(() => {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        showSlide(0); // Show first slide
        autoPlaySlideshow(); // Start auto-play
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Table hover effects enhancement
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('.results-table tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'all 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Form validation enhancement
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Add loading states to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add fade-in animation to elements
function addFadeInAnimation() {
    const elements = document.querySelectorAll('.hobby-card, .goal-card, .profile-section, .academic-results');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    addFadeInAnimation();
});

// Add keyboard navigation for slideshow
document.addEventListener('keydown', function(e) {
    if (slides.length > 0) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});

// Add touch/swipe support for mobile slideshow
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Add print styles functionality
function printPage() {
    window.print();
}

// Add print button event listener
document.addEventListener('DOMContentLoaded', function() {
    const printButtons = document.querySelectorAll('.print-btn');
    printButtons.forEach(button => {
        button.addEventListener('click', printPage);
    });
});

// Add search functionality for tables
function addTableSearch() {
    const tables = document.querySelectorAll('.results-table');
    
    tables.forEach(table => {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search table...';
        searchInput.style.marginBottom = '1rem';
        searchInput.style.padding = '0.5rem';
        searchInput.style.width = '100%';
        searchInput.style.border = '1px solid #ddd';
        searchInput.style.borderRadius = '5px';
        
        searchInput.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(filter) ? '' : 'none';
            });
        });
        
        table.parentNode.insertBefore(searchInput, table);
    });
}

// Initialize table search
document.addEventListener('DOMContentLoaded', function() {
    addTableSearch();
});

// Add copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const message = document.createElement('div');
        message.textContent = 'Copied to clipboard!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 2000);
    });
}

// Add copy buttons to code blocks or important text
document.addEventListener('DOMContentLoaded', function() {
    const copyElements = document.querySelectorAll('[data-copy]');
    
    copyElements.forEach(element => {
        element.addEventListener('click', function() {
            const textToCopy = this.dataset.copy;
            copyToClipboard(textToCopy);
        });
    });
});

// Video Tutorial Functionality
function playVideo() {
    const video = document.getElementById('tutorialVideo');
    const overlay = document.querySelector('.video-overlay');
    
    if (video && overlay) {
        video.play();
        overlay.classList.add('hidden');
    }
}

// Hide overlay when video starts playing
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('tutorialVideo');
    const overlay = document.querySelector('.video-overlay');
    
    if (video && overlay) {
        video.addEventListener('play', function() {
            overlay.classList.add('hidden');
        });
        
        video.addEventListener('pause', function() {
            overlay.classList.remove('hidden');
        });
        
        video.addEventListener('ended', function() {
            overlay.classList.remove('hidden');
        });
    }
});

// Console welcome message
console.log('%cWelcome to Student Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cThis website was built with HTML, CSS, and JavaScript.', 'color: #666; font-size: 14px;');
