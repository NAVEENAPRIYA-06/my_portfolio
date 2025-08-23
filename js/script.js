document.addEventListener('DOMContentLoaded', () => {
  // 📌 Set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // 📌 Theme toggle with preference persist
  const toggle = document.getElementById('theme-toggle');
  const applyTheme = (t) => document.documentElement.setAttribute('data-theme', t);
  const stored = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(stored);
  toggle.textContent = stored === 'dark' ? '🌞' : '🌙';

  toggle.onclick = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
    toggle.textContent = next === 'dark' ? '🌞' : '🌙';
  };

  // 📌 Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle'), nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => 
    a.addEventListener('click', () => nav.classList.remove('open'))
  );

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

  // 📌 Scroll reveal for .animate elements
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
});

// 📌 Modal Functions (Projects)
function openModal(id) {
  document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// 📌 Close modal if clicked outside content
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
}
