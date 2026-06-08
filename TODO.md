# TODO - Mobile-only navigation menu

- [x] Update navbar markup in all pages (index.html, work.html, tools.html, registration.html, login.html) to include hamburger button + mobile dropdown container with proper ARIA attributes.

- [x] Add required CSS to sphere.css to:

  - show hamburger only below 768px
  - hide desktop nav links below 768px
  - style hamburger button + animate icon
  - implement smooth full-width dropdown open/close transitions with rounded corners + hover effects
- [x] Add JS (inline or shared) to toggle dropdown state:

  - toggle aria-expanded
  - close on Escape
  - support keyboard navigation
  - close when clicking outside (overlay behavior)
- [x] Verify no desktop regressions and quick manual test steps for mobile/desktop breakpoints.


