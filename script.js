document.addEventListener('DOMContentLoaded', () => {
  /* ========== Smooth scroll (sticky header offset’li) ========== */
  const header = document.querySelector('.site-header');
  const headerH = () => (header?.offsetHeight ?? 0);

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH() - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, { passive: true });
  });
  document.addEventListener('DOMContentLoaded', () => {
  /* ========== Smooth scroll (sticky header offset’li) ========== */
  const header = document.querySelector('.site-header');
  const headerH = () => (header?.offsetHeight ?? 0);

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH() - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, { passive: true });
  });


  /* ========== Mobil menü (burger toggle) ========== */
  const nav = header?.querySelector('nav');
  let burger = header?.querySelector('.burger');

  // Eğer HTML'de burger butonu yoksa oluştur
  if (!burger) {
    burger = document.createElement('button');
    burger.className = 'burger';
    burger.setAttribute('aria-label', 'Menüyü Aç/Kapat');
    burger.textContent = '☰';
    header?.insertBefore(burger, nav);
  }

  // Menü üst boşluğunu header yüksekliğine göre ayarla
  const placeNav = () => {
    if (!nav || !header) return;
    nav.style.top = header.offsetHeight + 'px';
  };
  placeNav();
  window.addEventListener('resize', placeNav);

  // Menü aç/kapa fonksiyonu
  const toggleMenu = (open) => {
    const isOpen = open ?? !nav.classList.contains('open');
    nav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('nav-open', isOpen);
  };

  burger.addEventListener('click', () => toggleMenu());
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
});


  /* ========== Header shadow on scroll ========== */
  const applyShadow = () => {
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

  /* ========== (Opsiyonel) WhatsApp butonu tıklama takibi ========== */
  const waBtn = document.querySelector('.whatsapp-button');
  waBtn?.addEventListener('click', () => {
    // ileride analytics eklersen burayı kullan
  });

  /* ========== Lightbox ========== */
  const lightbox = document.getElementById('lightbox');
  const glLinks = Array.from(document.querySelectorAll('a.gl'));
  const serviceCards = Array.from(document.querySelectorAll('.service-card[data-lb-src]'));

  if (lightbox && (glLinks.length || serviceCards.length)) {
    const imgEl = lightbox.querySelector('.lb-img');
    const captionEl = lightbox.querySelector('.lb-caption');
    const btnPrev = lightbox.querySelector('.lb-prev');
    const btnNext = lightbox.querySelector('.lb-next');
    const btnClose = lightbox.querySelector('.lb-close');
    const backdrop = lightbox.querySelector('.lb-backdrop');

    let idx = 0;
    let activeGroup = 'gl'; // 'gl' veya 'services'

    const currentList = () =>
      activeGroup === 'services'
        ? Array.from(document.querySelectorAll('.service-card[data-lb-src]'))
        : glLinks;

    const hrefOf = (a) => {
      const imgInside = a.querySelector?.('img');
      return a.getAttribute('data-lb-src')
          || a.getAttribute('href')
          || imgInside?.getAttribute('src')
          || '';
    };

    const captionOf = (a) =>
      a.getAttribute('data-caption') || a.querySelector('img')?.alt || '';

    const open = (i) => {
      const list = currentList();
      if (!list.length) return;
      idx = (i + list.length) % list.length;
      const a = list[idx];
      imgEl.src = hrefOf(a);
      if (captionEl) captionEl.textContent = captionOf(a);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      try { history.pushState({ lb: true }, '', '#'); } catch (_) {}
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      imgEl.src = '';
      document.body.style.overflow = '';
    };

    const move = (d) => open(idx + d);

    // Galeri linkleri
    glLinks.forEach((a, i) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        activeGroup = 'gl';
        open(i);
      });
    });

    // Hizmet kartları
    serviceCards.forEach((card, i) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        activeGroup = 'services';
        open(i);
      });
    });

    // Butonlar
    btnPrev?.addEventListener('click', () => move(-1));
    btnNext?.addEventListener('click', () => move(1));
    btnClose?.addEventListener('click', () => {
      if (history.state && history.state.lb) {
        history.back();
      } else {
        close();
      }
    });
    backdrop?.addEventListener('click', close);

    // Klavye
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') {
        if (history.state && history.state.lb) { history.back(); } else { close(); }
      } else if (e.key === 'ArrowLeft') {
        move(-1);
      } else if (e.key === 'ArrowRight') {
        move(1);
      }
    });

    // Geri tuşu ile kapatma
    window.addEventListener('popstate', () => {
      if (lightbox.classList.contains('open')) close();
    });

    // Dokunmatik swipe
    let touchStartX = 0;
    imgEl.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    imgEl.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) move(dx > 0 ? -1 : 1);
    }, { passive: true });
  }
});
