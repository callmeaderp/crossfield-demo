document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Menu ── */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOpen = document.getElementById('icon-menu');
  const menuClose = document.getElementById('icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const opening = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuOpen?.classList.toggle('hidden', opening);
      menuClose?.classList.toggle('hidden', !opening);
      document.body.style.overflow = opening ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuOpen?.classList.remove('hidden');
        menuClose?.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Sticky Nav Shadow ── */
  const nav = document.getElementById('main-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('nav-scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Scroll Animations ── */
  const animEls = document.querySelectorAll('.anim');
  if (animEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    animEls.forEach(el => obs.observe(el));
  }

  /* ── Counter Animation ── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const dur = 2200;
        const t0 = performance.now();

        const tick = now => {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.floor(eased * target).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cObs.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => cObs.observe(el));
  }

  /* ── Active Nav Highlighting ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      let cur = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
      });
    }, { passive: true });
  }

  /* ── Contact Form ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<svg class="inline w-5 h-5 mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>Sent! We\'ll be in touch.';
      btn.classList.replace('bg-blue-600', 'bg-green-600');
      btn.classList.replace('hover:bg-blue-700', 'hover:bg-green-700');
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.classList.replace('bg-green-600', 'bg-blue-600');
        btn.classList.replace('hover:bg-green-700', 'hover:bg-blue-700');
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  /* ── Dynamic Year ── */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
});
