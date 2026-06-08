(() => {
  const hamburger = document.querySelector('.nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;

  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function setOpen(open) {
    hamburger.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-modal', open ? 'true' : 'false');

    if (open) {
      const firstLink = menu.querySelector(focusableSelector);
      (firstLink || menu).focus?.();
    }
  }

  function toggle() {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  }

  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    const clickedInsideMenu = menu.contains(target);
    const clickedHamburger = hamburger.contains(target);
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';

    if (!isOpen) return;
    if (clickedInsideMenu || clickedHamburger) return;
    setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;

    if (e.key === 'Escape') {
      setOpen(false);
      hamburger.focus();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = Array.from(menu.querySelectorAll(focusableSelector));
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || active === menu) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });

  // Close when a mobile link is activated
  menu.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    setOpen(false);
  });
})();

