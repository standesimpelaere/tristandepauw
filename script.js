// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in effect
    const fadeElements = document.querySelectorAll('.philosophy-card, .book-card, .platform-card, .influence-item');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (hero && heroVisual) {
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });

    // Dynamic typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 2000);
    }

    // Floating words animation enhancement
    const words = document.querySelectorAll('.word');
    words.forEach((word, index) => {
        word.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.opacity = '1';
            this.style.zIndex = '10';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        word.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.opacity = '0.8';
            this.style.zIndex = '';
            this.style.boxShadow = '';
        });
        
        // Add click functionality to show more info
        word.addEventListener('click', function() {
            const type = this.classList.contains('book-title') ? 'book' : 
                        this.classList.contains('song-title') ? 'song' : 'concept';
            const title = this.textContent;
            
            // Create a temporary info box
            const infoBox = document.createElement('div');
            infoBox.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 2rem;
                border-radius: 10px;
                z-index: 1000;
                max-width: 300px;
                text-align: center;
                backdrop-filter: blur(10px);
            `;
            infoBox.innerHTML = `
                <h3>${title}</h3>
                <p>${type === 'book' ? 'Literary work by Tristan de Pauw' : 
                   type === 'song' ? 'Track from Honest Songs & Kitchen Tapes' : 
                   'Core concept in Tristan\'s philosophy'}</p>
                <button onclick="this.parentElement.remove()" style="
                    background: var(--accent-color);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 1rem;
                ">Close</button>
            `;
            document.body.appendChild(infoBox);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                if (infoBox.parentElement) {
                    infoBox.remove();
                }
            }, 3000);
        });
    });

    // Vinyl record interaction
    const vinylRecord = document.querySelector('.vinyl-record');
    if (vinylRecord) {
        vinylRecord.addEventListener('click', function() {
            this.style.animationPlayState = this.style.animationPlayState === 'paused' ? 'running' : 'paused';
        });
        
        vinylRecord.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        vinylRecord.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Book cards flip effect
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });

    // Platform cards hover effect with dynamic light
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--x', x + '%');
            this.style.setProperty('--y', y + '%');
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--x', x + '%');
            this.style.setProperty('--y', y + '%');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Philosophy cards reveal effect
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Sound wave animation on scroll
    window.addEventListener('scroll', function() {
        const soundWave = document.querySelector('.sound-wave');
        if (soundWave) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.1;
            soundWave.style.transform = `rotate(${rate}deg)`;
        }
    });

    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: all 0.6s ease;
        }
        
        .philosophy-card,
        .book-card,
        .platform-card,
        .influence-item {
            opacity: 0;
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(style);
});

// Add some creative cursor effects
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.7;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const customCursor = document.querySelector('.custom-cursor');
    if (customCursor) {
        customCursor.style.left = e.clientX - 10 + 'px';
        customCursor.style.top = e.clientY - 10 + 'px';
    }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('a, button, .music-link, .platform-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'var(--music-color)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            const cursor = document.querySelector('.custom-cursor');
            if (cursor) {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--accent-color)';
            }
        });
    });
});
