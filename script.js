// Enhanced Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initSkillAnimations();
  initScrollAnimations();
  initContactForm();
  initThemeSystem();
  initEnhancedBackground();
  initParticleSystem();
});

// Navigation functionality
function initNavigation() {
  const header = document.querySelector('header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('nav ul');
  
  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }
  
  // Header background on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(15, 23, 42, 0.98)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = 'rgba(15, 23, 42, 0.95)';
    }
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          mobileToggle.classList.remove('active');
        }
        
        // Scroll to section
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Skill bar animations
function initSkillAnimations() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const width = skillBar.getAttribute('data-width') + '%';
        
        // Animate skill bar
        setTimeout(() => {
          skillBar.style.width = width;
        }, 200);
        
        // Stop observing after animation
        observer.unobserve(skillBar);
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

// Scroll animations for elements
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Set initial state and observe
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Enhanced Theme System with Automatic Cycling
function initThemeSystem() {
  const themeToggle = document.getElementById('themeToggle');
  
  // Define all available themes
  const themes = [
    {
      name: 'dark-blue',
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#06b6d4',
      dark: '#0f172a',
      darkLight: '#1e293b'
    },
    {
      name: 'purple-dream',
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#c084fc',
      dark: '#0f172a',
      darkLight: '#1e293b'
    },
    {
      name: 'green-nature',
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#14b8a6',
      dark: '#0f172a',
      darkLight: '#1e293b'
    },
    {
      name: 'sunset-orange',
      primary: '#ea580c',
      secondary: '#dc2626',
      accent: '#f97316',
      dark: '#0f172a',
      darkLight: '#1e293b'
    },
    {
      name: 'pink-bliss',
      primary: '#db2777',
      secondary: '#ec4899',
      accent: '#f472b6',
      dark: '#0f172a',
      darkLight: '#1e293b'
    },
    {
      name: 'cyberpunk',
      primary: '#06b6d4',
      secondary: '#3b82f6',
      accent: '#8b5cf6',
      dark: '#0a0a0a',
      darkLight: '#1a1a1a'
    },
    {
      name: 'golden-hour',
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#fbbf24',
      dark: '#0f172a',
      darkLight: '#1e293b'
    },
    {
      name: 'deep-space',
      primary: '#4f46e5',
      secondary: '#6366f1',
      accent: '#8b5cf6',
      dark: '#030712',
      darkLight: '#111827'
    },
    {
      name: 'forest-green',
      primary: '#16a34a',
      secondary: '#22c55e',
      accent: '#4ade80',
      dark: '#0f172a',
      darkLight: '#1e293b'
    },
    {
      name: 'royal-purple',
      primary: '#9333ea',
      secondary: '#a855f7',
      accent: '#c084fc',
      dark: '#0f172a',
      darkLight: '#1e293b'
    },
    {
      name: 'crimson-red',
      primary: '#dc2626',
      secondary: '#ef4444',
      accent: '#f87171',
      dark: '#0f172a',
      darkLight: '#1e293b'
    },
    {
      name: 'light-mode',
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#06b6d4',
      dark: '#f8fafc',
      darkLight: '#e2e8f0',
      light: '#0f172a',
      gray: '#475569'
    }
  ];

  // Load saved theme or set default to dark-blue
  let currentThemeIndex = parseInt(localStorage.getItem('currentThemeIndex')) || 0;
  setTheme(themes[currentThemeIndex]);

  // Theme toggle click handler
  themeToggle.addEventListener('click', function() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[currentThemeIndex]);
    localStorage.setItem('currentThemeIndex', currentThemeIndex.toString());
    
    // Show theme change notification
    showNotification(`Theme: ${getThemeDisplayName(themes[currentThemeIndex].name)}`, 'success');
  });

  // Add theme transition styles
  const style = document.createElement('style');
  style.textContent = `
    .theme-transition * {
      transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease !important;
    }
  `;
  document.head.appendChild(style);
}

function setTheme(theme) {
  const root = document.documentElement;
  
  // Add transition class
  document.body.classList.add('theme-transition');
  
  // Set CSS custom properties
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--dark', theme.dark);
  root.style.setProperty('--dark-light', theme.darkLight);
  
  if (theme.light) {
    root.style.setProperty('--light', theme.light);
  }
  if (theme.gray) {
    root.style.setProperty('--gray', theme.gray);
  }
  
  // Set data attribute for theme-specific styling
  document.body.setAttribute('data-theme', theme.name);
  
  // Update background effects
  updateBackgroundEffects(theme.name);
  
  // Remove transition class after animation
  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 500);
}

function getThemeDisplayName(themeName) {
  const themeNames = {
    'dark-blue': 'Dark Blue',
    'light-mode': 'Light Mode',
    'purple-dream': 'Purple Dream',
    'green-nature': 'Green Nature',
    'sunset-orange': 'Sunset Orange',
    'pink-bliss': 'Pink Bliss',
    'cyberpunk': 'Cyberpunk',
    'golden-hour': 'Golden Hour',
    'deep-space': 'Deep Space',
    'forest-green': 'Forest Green',
    'royal-purple': 'Royal Purple',
    'crimson-red': 'Crimson Red'
  };
  return themeNames[themeName] || themeName;
}

// Enhanced Background System
function initEnhancedBackground() {
  createParticles(30);
  startLightningEffect();
}

function initParticleSystem() {
  // Additional particles for cyberpunk theme
  setInterval(() => {
    if (document.body.getAttribute('data-theme') === 'cyberpunk') {
      createCyberParticles(5);
    }
  }, 1000);
}

function createParticles(count) {
  const container = document.querySelector('.particles-container');
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.animationDuration = `${4 + Math.random() * 4}s`;
    container.appendChild(particle);
  }
}

function createCyberParticles(count) {
  const container = document.querySelector('.particles-container');
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle cyber-particle';
    particle.style.cssText = `
      width: 2px;
      height: 20px;
      background: linear-gradient(to bottom, transparent, #06b6d4, transparent);
      border-radius: 0;
      left: ${Math.random() * 100}%;
      animation: cyberFloat 3s linear forwards;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 3000);
  }
  
  // Add cyber float animation
  if (!document.querySelector('#cyber-animation')) {
    const style = document.createElement('style');
    style.id = 'cyber-animation';
    style.textContent = `
      @keyframes cyberFloat {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function startLightningEffect() {
  const lightning = document.querySelector('.lightning-effect');
  
  setInterval(() => {
    lightning.style.animation = 'none';
    setTimeout(() => {
      lightning.style.animation = 'lightning 8s infinite';
    }, 10);
  }, 8000);
}

function updateBackgroundEffects(themeName) {
  // Update particles and effects based on theme
  const particles = document.querySelectorAll('.particle');
  
  particles.forEach(particle => {
    if (themeName === 'cyberpunk') {
      particle.style.background = '#06b6d4';
    } else if (themeName === 'deep-space') {
      particle.style.background = '#8b5cf6';
    } else {
      particle.style.background = 'var(--accent)';
    }
  });
}

// Contact Form Handling
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const company = formData.get('company');
      const budget = formData.get('budget');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        showNotification('Proposal request sent successfully! I\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Log form data (in real implementation, send to server)
        console.log('Form submission:', {
          name,
          email,
          company,
          budget,
          message,
          timestamp: new Date().toISOString()
        });
      }, 2000);
    });
  }
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="bi ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  const isLightMode = document.body.getAttribute('data-theme') === 'light-mode';
  const backgroundColor = isLightMode ? getLightModeNotificationColor(type) : getNotificationColor(type);
  const textColor = isLightMode ? '#0f172a' : 'white';
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${backgroundColor};
    color: ${textColor};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
    border: ${isLightMode ? '1px solid #e2e8f0' : 'none'};
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after delay
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'bi-check-circle-fill',
    error: 'bi-exclamation-circle-fill',
    info: 'bi-info-circle-fill'
  };
  return icons[type] || 'bi-info-circle-fill';
}

function getNotificationColor(type) {
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6'
  };
  return colors[type] || '#3b82f6';
}

function getLightModeNotificationColor(type) {
  const colors = {
    success: '#d1fae5',
    error: '#fee2e2',
    info: '#dbeafe'
  };
  return colors[type] || '#dbeafe';
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add loading class
    img.classList.add('loading');
    
    // Remove loading class when image is loaded
    if (img.complete) {
      img.classList.remove('loading');
    } else {
      img.addEventListener('load', function() {
        this.classList.remove('loading');
      });
      
      img.addEventListener('error', function() {
        this.classList.remove('loading');
        // You could set a placeholder image here
      });
    }
  });
});

// Add CSS for loading state
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
  img.loading {
    opacity: 0.5;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  .bi-arrow-repeat.spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(loadingStyles);

// Performance optimization: Lazy load images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();