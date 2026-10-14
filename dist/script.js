// MODAL DE NOTÍCIAS INTERNAS
const modal = document.getElementById("news-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDate = document.getElementById("modal-date");
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".news-modal-close");

// Carrossel do modal
const carousel = document.getElementById("modal-carousel");
const carouselSlide = document.getElementById("mc-slide");
const carouselCounter = document.getElementById("mc-counter");
const carouselThumbs = document.getElementById("mc-thumbs");
let carouselItems = [];
let carouselIndex = 0;

function isVideo(src) {
  return /\.(mp4|webm|mov|m4v)$/i.test(src);
}

function showCarouselItem(index) {
  const total = carouselItems.length;
  carouselIndex = (index + total) % total;
  const src = carouselItems[carouselIndex];

  carouselSlide.innerHTML = "";
  let el;
  if (isVideo(src)) {
    el = document.createElement("video");
    el.src = src + "#t=0.1"; // mostra o primeiro quadro (Safari/iOS)
    el.controls = true;
    el.playsInline = true;
    el.preload = "metadata";
  } else {
    el = document.createElement("img");
    el.src = src;
    el.alt = `Foto ${carouselIndex + 1} de ${total}`;
  }
  carouselSlide.appendChild(el);

  carouselCounter.textContent = `${carouselIndex + 1} / ${total}`;

  carouselThumbs.querySelectorAll(".mc-thumb").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === carouselIndex);
  });
  const activeThumb = carouselThumbs.children[carouselIndex];
  if (activeThumb) {
    carouselThumbs.scrollTo({
      left: activeThumb.offsetLeft - carouselThumbs.clientWidth / 2 + activeThumb.clientWidth / 2,
      behavior: "smooth"
    });
  }
}

function buildCarousel(media) {
  carouselItems = media;
  carouselThumbs.innerHTML = "";

  media.forEach((src, i) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "mc-thumb";
    thumb.setAttribute("aria-label", `Ir para item ${i + 1}`);
    if (isVideo(src)) {
      thumb.classList.add("is-video");
      thumb.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      thumb.appendChild(img);
    }
    thumb.addEventListener("click", () => showCarouselItem(i));
    carouselThumbs.appendChild(thumb);
  });

  showCarouselItem(0);
}

function closeNews() {
  modal.style.display = "none";
  // Para qualquer vídeo que esteja tocando
  if (carouselSlide) carouselSlide.innerHTML = "";
}

if (carousel) {
  carousel.querySelector(".mc-prev").addEventListener("click", () => showCarouselItem(carouselIndex - 1));
  carousel.querySelector(".mc-next").addEventListener("click", () => showCarouselItem(carouselIndex + 1));

  // Arrastar com o dedo no celular
  let touchStartX = null;
  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  carousel.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) showCarouselItem(carouselIndex + (dx < 0 ? 1 : -1));
    touchStartX = null;
  });

  // Setas do teclado
  document.addEventListener("keydown", (e) => {
    if (!modal || modal.style.display !== "flex") return;
    if (e.key === "Escape") closeNews();
    if (carousel.hidden) return;
    if (e.key === "ArrowLeft") showCarouselItem(carouselIndex - 1);
    if (e.key === "ArrowRight") showCarouselItem(carouselIndex + 1);
  });
}


// Abre modal
function openNews(key) {
  const news = internalNews[key];

  if (!modal) return; // impede erro em páginas sem modal

  if (carousel && news.media && news.media.length) {
    modalImage.style.display = "none";
    carousel.hidden = false;
    buildCarousel(news.media);
  } else {
    if (carousel) carousel.hidden = true;
    modalImage.style.display = "";
    modalImage.src = news.image;
  }

  modalTitle.textContent = news.title;
  modalDate.textContent = news.date;
  modalText.innerHTML = news.text;

  modal.querySelector(".news-modal-content").scrollTop = 0;
  modal.style.display = "flex";
}


if (closeBtn && modal) {
  closeBtn.onclick = closeNews;

  window.onclick = (e) => {
    if (e.target === modal) closeNews();
  };
}


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    const desktopMenu = document.querySelector('.desktop-menu');

   window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  const desktopMenu = document.querySelector('.desktop-menu');
  const logoWhite = document.querySelector('.logo-white'); // CORRETO

  if (window.scrollY > 20) {
    navbar?.classList.add('scrolled');
    desktopMenu?.classList.add('scrolled');
    logoWhite?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
    desktopMenu?.classList.remove('scrolled');
    logoWhite?.classList.remove('scrolled');
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

    window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
      
  });