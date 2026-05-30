const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; });
function animateFollower() { followerX += (mouseX - followerX) * 0.12; followerY += (mouseY - followerY) * 0.12; follower.style.left = followerX + 'px'; follower.style.top = followerY + 'px'; requestAnimationFrame(animateFollower); }
animateFollower();
document.querySelectorAll('a, button, input, textarea, .work-card, .blog-card, .about-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '18px'; cursor.style.height = '18px'; follower.style.width = '52px'; follower.style.height = '52px'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '10px'; cursor.style.height = '10px'; follower.style.width = '36px'; follower.style.height = '36px'; });
});

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id'); });
    navLinks.forEach(l => { l.classList.remove('active'); if (l.getAttribute('href') === '#' + current) l.classList.add('active'); });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => { hamburger.classList.toggle('open'); navLinksEl.classList.toggle('open'); document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : ''; });
navLinks.forEach(l => l.addEventListener('click', () => { hamburger.classList.remove('open'); navLinksEl.classList.remove('open'); document.body.style.overflow = ''; }));

const revealEls = document.querySelectorAll('.about-card, .work-card, .blog-card, .contact-item, .contact-form, .about-text, .section-title, .section-label');
revealEls.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.closest('.works-grid, .blog-grid, .about-cards, .contact-items') ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80 : 0;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

const statNums = document.querySelectorAll('.stat-num[data-target]');
function animateCount(el) {
    const target = parseInt(el.dataset.target), duration = 1800, startTime = performance.now();
    function update(t) { const p = Math.min((t - startTime) / duration, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.floor(e * target); if (p < 1) requestAnimationFrame(update); else el.textContent = target; }
    requestAnimationFrame(update);
}
const statsObserver = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); statsObserver.unobserve(e.target); } }), { threshold: 0.5 });
statNums.forEach(el => statsObserver.observe(el));

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    await new Promise(r => setTimeout(r, 1800));
    submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    submitBtn.style.background = 'linear-gradient(135deg, #3ecfcf, #2aa8a8)';
    formSuccess.classList.add('show');
    setTimeout(() => { contactForm.reset(); submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>'; submitBtn.style.background = ''; submitBtn.disabled = false; formSuccess.classList.remove('show'); }, 4000);
});

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) { const t = document.querySelector(this.getAttribute('href')); if (t && this.getAttribute('href') !== '#') { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' }); } }));

document.querySelectorAll('.work-card, .blog-card').forEach(card => {
    card.addEventListener('mousemove', (e) => { const r = card.getBoundingClientRect(), rx = (e.clientY - r.top - r.height/2) / (r.height/2) * -5, ry = (e.clientX - r.left - r.width/2) / (r.width/2) * 5; card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`; card.style.transition = 'transform 0.1s ease'; });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1)'; });
});