// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    const desktopMenu = document.querySelector('.desktop-menu');

    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
        desktopMenu.classList.add('scrolled');

      } else {
        navbar.classList.remove('scrolled');
        desktopMenu.classList.remove('scrolled');
        
      }
      
      // Scroll reveal animation
      revealElements();
    });
    
    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    
    menuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Change menu icon based on menu state
      if (mobileMenu.classList.contains('active')) {
        menuButton.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
    
    // Close mobile menu when clicking on menu items
    mobileMenuItems.forEach(item => {
      item.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
    
    // Testimonial slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the current slide
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Update current slide index
      currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
      if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
      } else {
        showSlide(0);
      }
    }
    
    // Previous slide
    function prevSlide() {
      if (currentSlide > 0) {
        showSlide(currentSlide - 1);
      } else {
        showSlide(slides.length - 1);
      }
    }
    
    // Event listeners for buttons
    if (prevBtn && nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Auto slide change every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = contactForm.querySelector('#name').value;
        const email = contactForm.querySelector('#email').value;
        const subject = contactForm.querySelector('#subject').value;
        const message = contactForm.querySelector('#message').value;
        
        // Here you would typically send this data to a server
        // For now, we'll just log it and show an alert
        console.log({
          name,
          email,
          subject,
          message
        });
        
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        contactForm.reset();
      });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to a server
        // For now, just log and alert
        console.log({
          newsletterEmail: email
        });
        
        alert('Email cadastrado com sucesso!');
        newsletterForm.reset();
      });
    }
    
    // Scroll reveal function
    function revealElements() {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      
      reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    }
    
    // Run reveal once on page load
    revealElements();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });