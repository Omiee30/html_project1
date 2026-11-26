
document.addEventListener("DOMContentLoaded", function () {

  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
      navbar.classList.toggle("show");
    });
  }

  // DARK AND LIGHT MODE
  const themeToggle = document.getElementById("themeToggle");

  if (localStorage.getItem("nest-theme") === "dark") {
    document.body.classList.add("dark");
  }

  function updateThemeIcon() {
    if (themeToggle) {
      themeToggle.textContent =
        document.body.classList.contains("dark") ? "☀" : "☾";
    }
  }

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");

      localStorage.setItem("nest-theme", isDark ? "dark" : "light");
      updateThemeIcon();
    });
  }

  // SHOPPING BAG
  let cart = JSON.parse(localStorage.getItem("nest-cart")) || [];

  const cartCount = document.getElementById("cartCount");

  function updateCart() {
    if (cartCount) {
      cartCount.textContent = cart.length;
    }

    localStorage.setItem("nest-cart", JSON.stringify(cart));
  }

  updateCart();

  document.querySelectorAll(".add-cart").forEach(function (button) {
    button.addEventListener("click", function () {
      const product = button.closest(".product-card");
      const productName = product.querySelector("h3").textContent;

      cart.push(productName);
      updateCart();

      const message = document.getElementById("cartMessage");

      if (message) {
        message.textContent = productName + " added to your bag!";
      }
    });
  });

  // PRODUCT CATEGORY FILTER
  const categoryFilter = document.getElementById("categoryFilter");
  const products = document.querySelectorAll(".product-card");

  function filterProducts(category) {
    products.forEach(function (product) {
      const productCategory = product.dataset.category;

      product.style.display =
        category === "All" || category === productCategory
          ? "block"
          : "none";
    });
  }

  if (categoryFilter) {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");

    const validCategories = ["Living", "Bedroom", "Dining", "Decor"];

    if (validCategories.includes(requestedCategory)) {
      categoryFilter.value = requestedCategory;
    }

    filterProducts(categoryFilter.value);

    categoryFilter.addEventListener("change", function () {
      filterProducts(categoryFilter.value);
    });
  }

  // GALLERY LIGHTBOX
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeLightbox = document.getElementById("closeLightbox");

  galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("show");
    });
  });

  function hideLightbox() {
    if (lightbox) {
      lightbox.classList.remove("show");
    }
  }

  if (closeLightbox) {
    closeLightbox.addEventListener("click", hideLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        hideLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideLightbox();
    }
  });

  // CONTACT FORM VALIDATION
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      formMessage.textContent =
        "Thank you! Your message has been submitted successfully.";

      contactForm.reset();
    });
  }

});
