
'use strict';

const elementToggleFunc = (elem) => elem && elem.classList.toggle('active');

/* Sidebar */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
}

/* Testimonials modal */
const testimonialItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const toggleModal = () => {
  modalContainer?.classList.toggle('active');
  overlay?.classList.toggle('active');
};

testimonialItems.forEach((item) => {
  item.addEventListener('click', () => {
    const avatar = item.querySelector('[data-testimonials-avatar]');
    const title = item.querySelector('[data-testimonials-title]');
    const text = item.querySelector('[data-testimonials-text]');

    if (avatar && modalImg) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
    if (text && modalText) modalText.innerHTML = text.innerHTML;
    toggleModal();
  });
});

modalCloseBtn?.addEventListener('click', toggleModal);
overlay?.addEventListener('click', toggleModal);

/* Portfolio filter */
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = (value) => {
  filterItems.forEach((item) => {
    item.classList.toggle('active', value === 'all' || value === item.dataset.category);
  });
};

select?.addEventListener('click', () => elementToggleFunc(select));

selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const value = item.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(value);
  });
});

let lastClickedBtn = filterBtns[0];
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const value = btn.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = btn.innerText;
    filterFunc(value);
    lastClickedBtn?.classList.remove('active');
    btn.classList.add('active');
    lastClickedBtn = btn;
  });
});

/* Contact form */
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const formStatus = document.querySelector('[data-form-status]');

const validateForm = () => {
  if (formBtn) formBtn.disabled = !form?.checkValidity();
};

formInputs.forEach((input) => input.addEventListener('input', validateForm));

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const fullname = form.querySelector('[name="fullname"]')?.value.trim() || '';
  const email = form.querySelector('[name="email"]')?.value.trim() || '';
  const message = form.querySelector('[name="message"]')?.value.trim() || '';

  const subject = encodeURIComponent(`Portfolio enquiry from ${fullname}`);
  const body = encodeURIComponent(`Name: ${fullname}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:alkafirony@gmail.com?subject=${subject}&body=${body}`;

  if (formStatus) {
    formStatus.textContent = 'Your email application should open with the message prepared.';
    formStatus.classList.add('active');
  }
});

/* Page navigation */
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.innerHTML.toLowerCase();

    pages.forEach((page) => {
      const active = target === page.dataset.page;
      page.classList.toggle('active', active);
      if (active) window.scrollTo(0, 0);
    });

    navigationLinks.forEach((nav) => {
      nav.classList.toggle('active', nav === link);
    });
  });
});
