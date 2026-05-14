(() => {
  const header = document.querySelector('[data-site-header]');

  if (!header) {
    return;
  }

  const megaTrigger = header.querySelector('[data-mega-trigger]');
  const megaMenu = header.querySelector('[data-mega-menu]');
  const megaIcon = header.querySelector('[data-mega-icon]');
  const mobileTrigger = header.querySelector('[data-mobile-trigger]');
  const mobileMenu = header.querySelector('[data-mobile-menu]');

  const setExpanded = (trigger, panel, isOpen) => {
    if (!trigger || !panel) {
      return;
    }

    trigger.setAttribute('aria-expanded', String(isOpen));
    panel.classList.toggle('hidden', !isOpen);
  };

  const closeMega = () => {
    setExpanded(megaTrigger, megaMenu, false);

    if (megaIcon) {
      megaIcon.style.transform = '';
    }
  };

  const closeMobile = () => {
    setExpanded(mobileTrigger, mobileMenu, false);

    if (mobileTrigger) {
      mobileTrigger.setAttribute('aria-label', 'Open navigation menu');
    }
  };

  const openMega = () => {
    closeMobile();
    setExpanded(megaTrigger, megaMenu, true);

    if (megaIcon) {
      megaIcon.style.transform = 'rotate(45deg)';
    }
  };

  const openMobile = () => {
    closeMega();
    setExpanded(mobileTrigger, mobileMenu, true);

    if (mobileTrigger) {
      mobileTrigger.setAttribute('aria-label', 'Close navigation menu');
    }
  };

  if (megaTrigger && megaMenu) {
    megaTrigger.addEventListener('click', () => {
      const isOpen = megaTrigger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeMega();
      } else {
        openMega();
      }
    });
  }

  if (mobileTrigger && mobileMenu) {
    mobileTrigger.addEventListener('click', () => {
      const isOpen = mobileTrigger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        closeMobile();
      } else {
        openMobile();
      }
    });
  }

  document.addEventListener('click', (event) => {
    if (header.contains(event.target)) {
      return;
    }

    closeMega();
    closeMobile();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    closeMega();
    closeMobile();
  });

  header.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMega();
      closeMobile();
    });
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      closeMobile();
    } else {
      closeMega();
    }
  });
})();
