// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const navEl = document.querySelector('.navbar nav');
menuBtn.addEventListener('click', () => {
  navEl.classList.toggle('open');
  menuBtn.textContent = navEl.classList.contains('open') ? '✕' : '☰';
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navEl.classList.remove('open');
    menuBtn.textContent = '☰';
  });
});

// ---------- Navbar shadow, back-to-top, active link ----------
const navbar = document.getElementById('navbar');
const toTop = document.getElementById('toTop');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  toTop.classList.toggle('show', window.scrollY > 500);

  let currentId = 'home';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) currentId = sec.id;
  });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + currentId));
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Typing effect ----------
const roles = ['Frontend Developer', 'React Developer', 'Web Designer', 'JavaScript Enthusiast'];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = roles[roleIndex];
  typedEl.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);

  let delay = deleting ? 50 : 100;
  if (!deleting && charIndex > word.length) { deleting = true; delay = 1500; }
  else if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// ---------- Scroll reveal + skill bars ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      entry.target.querySelectorAll('.bar div').forEach(bar => {
        bar.style.width = bar.dataset.w;
      });
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const success = document.getElementById('success');

function setError(input, message) {
  input.classList.toggle('invalid', Boolean(message));
  input.parentElement.querySelector('.error').textContent = message || '';
}

form.addEventListener('submit', e => {
  e.preventDefault();
  success.classList.remove('show');

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  let valid = true;

  if (name.value.trim().length < 2) { setError(name, 'Please enter your name.'); valid = false; }
  else setError(name);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, 'Please enter a valid email.'); valid = false; }
  else setError(email);

  if (message.value.trim().length < 10) { setError(message, 'Message should be at least 10 characters.'); valid = false; }
  else setError(message);

  if (valid) {
    // Demo only: to receive real messages, connect a service like Formspree or EmailJS.
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
