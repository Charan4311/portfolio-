// Modern Portfolio JavaScript - Fixed & Simplified

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio JavaScript loaded!');
    
    // Initialize all functionality
    initializeTheme();
    initializeNavigation();
    initializeButtons();
    initializeContactForm();
    initializeAnimations();
    initializeLoadingScreen();
});

// Theme Management
function initializeTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeToggle = document.getElementById('theme-switcher');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add smooth transition
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
}

// Navigation
function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                if (navLinks && menuToggle) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        updateActiveNavLink();
        updateScrollProgress();
    });
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Scroll progress bar
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrollPercent}%;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Button functionality
function initializeButtons() {
    console.log('Initializing buttons...');
    
    // Download CV button
    const downloadBtn = document.getElementById('download-cv');
    const footerResumeBtn = document.getElementById('footer-resume');
    
    if (downloadBtn) {
        console.log('Download CV button found');
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Download CV clicked');
            downloadCV();
        });
    } else {
        console.log('Download CV button NOT found');
    }
    
    if (footerResumeBtn) {
        footerResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadCV();
        });
    }
    
    // View Work button
    const viewWorkBtn = document.getElementById('view-work');
    if (viewWorkBtn) {
        console.log('View Work button found');
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('View Work clicked');
            const workSection = document.getElementById('work');
            if (workSection) {
                console.log('Work section found, scrolling...');
                workSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.log('Work section NOT found');
            }
        });
    } else {
        console.log('View Work button NOT found');
    }
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn-ripple');
            if (ripple) {
                ripple.style.width = '0';
                ripple.style.height = '0';
                
                setTimeout(() => {
                    ripple.style.width = '300px';
                    ripple.style.height = '300px';
                }, 10);
                
                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 300);
            }
        });
    });
}

// Download CV function
function downloadCV() {
    console.log('Downloading CV...');
    try {
        const cvContent = generateCVContent();
        const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Charan_Teja_Kumpatla_CV.txt';
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
        showNotification('CV downloaded successfully!', 'success');
        console.log('CV download completed');
    } catch (error) {
        console.error('Download failed:', error);
        showNotification('Download failed. Please try again.', 'error');
    }
}

// Generate CV content
function generateCVContent() {
    return `
CHARAN TEJA KUMPATLA
AI Developer & Python Enthusiast
=====================================

CONTACT INFORMATION
-------------------
Email: charannaidukumpatla104@gmail.com
Phone: +91 91822 42104
LinkedIn: https://linkedin.com/in/charan-kumpatla-350141302
GitHub: https://github.com/Charan4311
Location: Andhra Pradesh, India

PROFESSIONAL SUMMARY
--------------------
Passionate Computer Science student specializing in Artificial Intelligence with strong 
fundamentals in Python programming and backend development. Experienced in machine learning, 
web development, and leadership roles. Committed to building innovative solutions that make 
a positive impact.

EDUCATION
---------
B.Tech in Computer Science & Engineering (Artificial Intelligence)
KIET - Kakinada Institute of Engineering & Technology
2023 - 2027 | CGPA: 7.8

Intermediate Education (MPC)
VSM Junior College
2020 - 2022 | Score: 718/1000

TECHNICAL SKILLS
----------------
Programming Languages:
• Python (Proficient) - 90%
• JavaScript (Intermediate) - 70%
• Java (Basic) - 60%
• Node.js (Basic) - 55%

Frontend Technologies:
• HTML5 (Advanced) - 85%
• CSS3 (Advanced) - 80%
• Responsive Design
• Modern UI/UX Principles

Backend & AI:
• Flask Framework - 75%
• Machine Learning - 75%
• Computer Vision - 70%
• Data Analysis - 65%
• REST API Development

Soft Skills:
• Leadership
• Team Collaboration
• Problem Solving
• Communication
• Time Management
• Innovation

FEATURED PROJECTS
-----------------
1. Hand Gesture Recognition System
   • ML-powered web application for real-time gesture recognition
   • Technologies: Python, Flask, HTML, CSS, JavaScript, Machine Learning
   • Features: Real-time processing, responsive design, action suggestions

2. Data Analytics Dashboard (In Progress)
   • Comprehensive dashboard for data visualization
   • Technologies: Python, React, Node.js, MongoDB
   • Features: Interactive charts, real-time data processing

3. AI Chatbot Assistant (Planned)
   • Intelligent chatbot with natural language processing
   • Technologies: Python, NLP, REST API, Docker
   • Features: Automated responses, customer support

ACHIEVEMENTS & HIGHLIGHTS
-------------------------
• Maintained CGPA of 7.8 in specialized AI curriculum
• Developed multiple web applications with modern technologies
• Active contributor to open-source projects
• Strong foundation in mathematics and analytical thinking
• Leadership experience in academic and project environments

INTERESTS
---------
• Artificial Intelligence & Machine Learning
• Web Development & Modern Frameworks
• Open Source Contribution
• Technology Innovation
• Problem Solving & Algorithm Design

LANGUAGES
---------
• English (Fluent)
• Telugu (Native)
• Hindi (Conversational)

=====================================
Generated on: ${new Date().toLocaleDateString()}
Portfolio: https://charan-teja-portfolio.com
=====================================
    `.trim();
}



// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            handleContactForm(e);
        });
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Reset form labels
        form.querySelectorAll('.form-group').forEach(function(group) {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            if (input && label && !input.value) {
                label.style.top = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-muted)';
            }
        });
    }, 2000);
}

function validateContactForm(data) {
    const { firstName, lastName, email, subject, message } = data;
    
    if (!firstName.trim()) {
        showNotification('Please enter your first name', 'error');
        return false;
    }
    
    if (!lastName.trim()) {
        showNotification('Please enter your last name', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!subject.trim()) {
        showNotification('Please enter a subject', 'error');
        return false;
    }
    
    if (!message.trim()) {
        showNotification('Please enter your message', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animations
function initializeAnimations() {
    // Counter animation
    animateCounters();
    
    // Skill bars animation
    animateSkillBars();
    
    // Role slider
    startRoleSlider();
    
    // Scroll animations
    observeElements();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    function updateCounter() {
        if (current < target) {
            current += step;
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    }
    
    updateCounter();
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

function startRoleSlider() {
    const roleItems = document.querySelectorAll('.role-item');
    if (roleItems.length === 0) return;
    
    let currentRoleIndex = 0;
    
    setInterval(() => {
        // Remove active class from current role
        roleItems[currentRoleIndex].classList.remove('active');
        
        // Move to next role
        currentRoleIndex = (currentRoleIndex + 1) % roleItems.length;
        
        // Add active class to new role
        roleItems[currentRoleIndex].classList.add('active');
    }, 3000);
}

function observeElements() {
    const animatedElements = document.querySelectorAll(`
        .hero-left, .hero-right, .text-block, .highlight-item,
        .code-window, .timeline-item, .expertise-category,
        .project-card, .info-card
    `);
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Loading Screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.loading-progress');
    
    if (progressBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Hide loading screen after completion
                setTimeout(() => {
                    if (loadingScreen) {
                        loadingScreen.classList.add('hidden');
                        document.body.style.overflow = 'visible';
                    }
                }, 500);
            }
            progressBar.style.width = progress + '%';
        }, 100);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(function(notification) {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    
    const icon = type === 'success' ? 'check-circle' : 
                type === 'error' ? 'exclamation-circle' : 
                'info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s ease;
    `;
    
    closeBtn.addEventListener('click', function() {
        hideNotification(notification);
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Form label animations
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(function(input) {
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.top = '0';
                label.style.fontSize = '0.8rem';
                label.style.color = 'var(--primary-gradient)';
            }
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                const label = this.nextElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-muted)';
                }
            }
        });
    });
});

console.log('Portfolio JavaScript fully loaded and ready!');