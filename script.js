document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for in-page anchors
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const applyShadow = function () {
    if (!header) return;
    if (window.scrollY > 4) {
      header.classList.add('scrolled');
      header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
    } else {
      header.classList.remove('scrolled');
      header.style.boxShadow = 'none';
    }
  };
  applyShadow();
  window.addEventListener('scroll', applyShadow, { passive: true });

  // Optional: track clicks on the header WhatsApp button
  const waBtn = document.querySelector('.whatsapp-button');
  if (waBtn) {
    waBtn.addEventListener('click', function () {
      // Placeholder for analytics or future logic
      // console.log('WhatsApp button clicked');
    });
  }

  // Lightbox for any links with class .gl (gallery + tank section)
  const glLinks = Array.from(document.querySelectorAll('a.gl'));
  const lightbox = document.getElementById('lightbox');
  if (lightbox && glLinks.length) {
    const imgEl = lightbox.querySelector('.lb-img');
    const captionEl = lightbox.querySelector('.lb-caption');
    const btnPrev = lightbox.querySelector('.lb-prev');
    const btnNext = lightbox.querySelector('.lb-next');
    const btnClose = lightbox.querySelector('.lb-close');
    const backdrop = lightbox.querySelector('.lb-backdrop');
    let idx = 0;
    let activeGroup = 'gl';

    const open = (i) => {
      idx = i;
      const list = activeGroup === 'services' ? document.querySelectorAll('.service-card[data-lb-src]') : glLinks;
      const a = list[idx];
      const imgInside = a.querySelector ? a.querySelector('img') : null;
      const href = a.getAttribute('data-lb-src') || a.getAttribute('href') || (imgInside ? imgInside.getAttribute('src') : '');
      imgEl.src = href;
      const cap = a.getAttribute('data-caption') || a.querySelector('img')?.alt || '';
      if (captionEl) captionEl.textContent = cap;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      try { history.pushState({ lb: true }, '', '#'); } catch (_) {}
    };
    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      imgEl.src = '';
    };
    const move = (d) => {
      const list = activeGroup === 'services' ? document.querySelectorAll('.service-card[data-lb-src]') : glLinks;
      idx = (idx + d + list.length) % list.length;
      const a = list[idx];
      const imgInside = a.querySelector ? a.querySelector('img') : null;
      const href = a.getAttribute('data-lb-src') || a.getAttribute('href') || (imgInside ? imgInside.getAttribute('src') : '');
      imgEl.src = href;
      const cap = a.getAttribute('data-caption') || a.querySelector('img')?.alt || '';
      if (captionEl) captionEl.textContent = cap;
    };

    glLinks.forEach((a, i) => {
      a.addEventListener('click', (e) => { e.preventDefault(); activeGroup = 'gl'; open(i); });
    });
    btnPrev.addEventListener('click', () => move(-1));
    btnNext.addEventListener('click', () => move(1));
    btnClose.addEventListener('click', () => {
      if (history.state && history.state.lb) {
        history.back();
      } else {
        close();
      }
    });
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') {
        if (history.state && history.state.lb) { history.back(); } else { close(); }
      }
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    });

    // swipe support
    let touchStartX = 0;
    imgEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    imgEl.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx > 0) move(-1); else move(1);
      }
    }, { passive: true });

    // Enable service cards to open in lightbox and navigate within services
    const serviceCards = Array.from(document.querySelectorAll('.service-card[data-lb-src]'));
    if (serviceCards.length) {
      serviceCards.forEach((card, i) => {
        card.addEventListener('click', (e) => { e.preventDefault(); activeGroup = 'services'; open(i); });
      });
    }
  }

  // service card handlers moved into lightbox block to access open/activeGroup
});



document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for in-page anchors
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const applyShadow = function () {
    if (!header) return;
    if (window.scrollY > 4) {
      header.classList.add('scrolled');
      header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
    } else {
      header.classList.remove('scrolled');
      header.style.boxShadow = 'none';
    }
  };
  applyShadow();
  window.addEventListener('scroll', applyShadow, { passive: true });

  // Optional: track clicks on the header WhatsApp button
  const waBtn = document.querySelector('.whatsapp-button');
  if (waBtn) {
    waBtn.addEventListener('click', function () {
      // Placeholder for analytics or future logic
      // console.log('WhatsApp button clicked');
    });
  }

  // Lightbox for any links with class .gl (gallery + tank section)
  const glLinks = Array.from(document.querySelectorAll('a.gl'));
  const lightbox = document.getElementById('lightbox');
  if (lightbox && glLinks.length) {
    const imgEl = lightbox.querySelector('.lb-img');
    const captionEl = lightbox.querySelector('.lb-caption');
    const btnPrev = lightbox.querySelector('.lb-prev');
    const btnNext = lightbox.querySelector('.lb-next');
    const btnClose = lightbox.querySelector('.lb-close');
    const backdrop = lightbox.querySelector('.lb-backdrop');
    let idx = 0;
    let activeGroup = 'gl';

    const open = (i) => {
      idx = i;
      const list = activeGroup === 'services' ? document.querySelectorAll('.service-card[data-lb-src]') : glLinks;
      const a = list[idx];
      const imgInside = a.querySelector ? a.querySelector('img') : null;
      const href = a.getAttribute('data-lb-src') || a.getAttribute('href') || (imgInside ? imgInside.getAttribute('src') : '');
      imgEl.src = href;
      const cap = a.getAttribute('data-caption') || a.querySelector('img')?.alt || '';
      if (captionEl) captionEl.textContent = cap;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      try { history.pushState({ lb: true }, '', '#'); } catch (_) {}
    };
    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      imgEl.src = '';
    };
    const move = (d) => {
      const list = activeGroup === 'services' ? document.querySelectorAll('.service-card[data-lb-src]') : glLinks;
      idx = (idx + d + list.length) % list.length;
      const a = list[idx];
      const imgInside = a.querySelector ? a.querySelector('img') : null;
      const href = a.getAttribute('data-lb-src') || a.getAttribute('href') || (imgInside ? imgInside.getAttribute('src') : '');
      imgEl.src = href;
      const cap = a.getAttribute('data-caption') || a.querySelector('img')?.alt || '';
      if (captionEl) captionEl.textContent = cap;
    };

    glLinks.forEach((a, i) => {
      a.addEventListener('click', (e) => { e.preventDefault(); activeGroup = 'gl'; open(i); });
    });
    btnPrev.addEventListener('click', () => move(-1));
    btnNext.addEventListener('click', () => move(1));
    btnClose.addEventListener('click', () => {
      if (history.state && history.state.lb) {
        history.back();
      } else {
        close();
      }
    });
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') {
        if (history.state && history.state.lb) { history.back(); } else { close(); }
      }
      if (e.key === 'ArrowLeft') move(-1);
      if (e.key === 'ArrowRight') move(1);
    });

    // swipe support
    let touchStartX = 0;
    imgEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    imgEl.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx > 0) move(-1); else move(1);
      }
    }, { passive: true });

    // Enable service cards to open in lightbox and navigate within services
    const serviceCards = Array.from(document.querySelectorAll('.service-card[data-lb-src]'));
    if (serviceCards.length) {
      serviceCards.forEach((card, i) => {
        card.addEventListener('click', (e) => { e.preventDefault(); activeGroup = 'services'; open(i); });
      });
    }
  }

  // service card handlers moved into lightbox block to access open/activeGroup
});


