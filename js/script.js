document.addEventListener('DOMContentLoaded', () => {
  // 📌 Theme toggle with preference persist
  const toggle = document.getElementById('theme-toggle');
  const applyTheme = (t) => document.documentElement.setAttribute('data-theme', t);
  
  // Logic to determine initial theme
  const stored = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                 
  if (stored === 'dark') {
      document.body.classList.add('dark');
  }

  if(toggle) {
      toggle.textContent = stored === 'dark' ? '🌞' : '🌙';

      toggle.onclick = () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        const theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        toggle.textContent = isDark ? '🌞' : '🌙';
      };
  }

  // 📌 Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle'), nav = document.getElementById('nav');
  if(navToggle) {
      navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // 📌 Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 📌 Scroll reveal animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));

  
  /* =====================================================
     📌 NEW: Active Link Switcher (Click Handler)
     ===================================================== */
  const navLinks = document.querySelectorAll('.aside .nav li a');
  
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          // 1. Remove 'active' class from ALL links
          navLinks.forEach(nav => nav.classList.remove('active'));
          
          // 2. Add 'active' class to the CLICKED link
          this.classList.add('active');

          // 3. Close mobile menu if open
          if(nav) nav.classList.remove('open');
      });
  });

});

// 📌 Modal Functions
function openModal(id) {
  const modal = document.getElementById(id);
  if(modal) modal.style.display = 'block';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if(modal) modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
}