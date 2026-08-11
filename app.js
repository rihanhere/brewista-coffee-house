/* ==========================================================================
   BREWISTA COFFEE HOUSE - JAVASCRIPT APPLICATION LOGIC
   Handles GSAP Animations, Custom Cursor, Cart State, Drawer & Toasts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- STATE MANAGEMENT ---
  const state = {
    cart: [],
    taxRate: 0.08
  };

  // --- DOM ELEMENTS ---
  const navbar = document.getElementById('navbar');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartCountBubble = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTaxEl = document.getElementById('cart-tax');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const toastContainer = document.getElementById('toast-container');
  const newsletterForm = document.getElementById('newsletter-form');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  // --- AWWWARDS-TIER MAGNETIC CURSOR ENGINE ---
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  if (cursor && follower && window.innerWidth > 1024) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .product-card, .feature-col, .why-card, .social-btn');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  // --- GSAP ANIMATION ENGINE (LUXURY EXPRESSIVE REVEALS) ---
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Floating Navbar Card Drop-in
    gsap.from('.navbar-card', {
      y: -40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // 2. Hero Section Stagger Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    heroTl
      .from('.hero-title', {
        y: 50,
        opacity: 0,
        delay: 0.2
      })
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1
      }, '-=0.8')
      .from('.hero-btns-row .btn-primary-dark, .hero-btns-row .btn-secondary-outline', {
        y: 24,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8
      }, '-=0.7')
      .from('.social-btn', {
        scale: 0.5,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.5')
      .from('.highlights-floating-box', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.9');

    // 3. Hero Background Artwork Organic Floating Loop
    gsap.to('.hero-bg-artwork', {
      y: -10,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 4. Sage Organic Blobs Breathing Motion
    gsap.to('.blob-top-right', {
      scale: 1.06,
      rotate: 2,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.blob-bottom-left', {
      scale: 1.05,
      rotate: -2,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 5. Signature Products Grid Scroll Reveal
    gsap.from('.signature-card-box, .product-card', {
      scrollTrigger: {
        trigger: '.signature-section',
        start: 'top 85%'
      },
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'all'
    });

    // 6. Why Choose Us Section Scroll Reveal
    gsap.from('.why-us-left', {
      scrollTrigger: {
        trigger: '.why-us-section',
        start: 'top 85%'
      },
      x: -30,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      clearProps: 'all'
    });

    gsap.from('.why-card', {
      scrollTrigger: {
        trigger: '.why-us-section',
        start: 'top 85%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all'
    });

    // 7. Coffee Club Banner Scroll Reveal
    gsap.from('.club-card', {
      scrollTrigger: {
        trigger: '.club-banner-section',
        start: 'top 80%'
      },
      scale: 0.96,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
  }

  // --- NAVBAR SCROLL GLASSMORPHISM ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy for Active Links
    const sections = document.querySelectorAll('section, footer');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- MOBILE MENU TOGGLE ---
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
    });
  }

  // --- CART DRAWER OPEN / CLOSE ---
  function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // --- ADD TO CART FUNCTIONALITY ---
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const productCard = button.closest('.product-card');
      const id = productCard.dataset.id;
      const name = productCard.dataset.name;
      const price = parseFloat(productCard.dataset.price);
      const img = productCard.dataset.img;

      addItemToCart(id, name, price, img);
      showToast(`Added ${name} to your order! ☕`);
    });
  });

  function addItemToCart(id, name, price, img) {
    const existingItem = state.cart.find(item => item.id === id);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      state.cart.push({ id, name, price, img, qty: 1 });
    }
    renderCart();
  }

  function updateItemQty(id, delta) {
    const item = state.cart.find(item => item.id === id);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        state.cart = state.cart.filter(item => item.id !== id);
      }
    }
    renderCart();
  }

  // --- RENDER CART ---
  function renderCart() {
    // Update Cart Count Bubble
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBubble.textContent = totalItems;

    // Render Items
    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-icon">☕</div>
          <p class="empty-title">Your cart is empty</p>
          <p class="empty-sub">Add some handcrafted coffee to get started!</p>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = state.cart.map(item => `
        <div class="cart-item-row">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
          </div>
          <div class="cart-qty-controls">
            <button class="qty-btn minus-btn" data-id="${item.id}">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn plus-btn" data-id="${item.id}">+</button>
          </div>
        </div>
      `).join('');

      // Add Quantity Listeners
      cartItemsContainer.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', () => updateItemQty(btn.dataset.id, -1));
      });
      cartItemsContainer.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', () => updateItemQty(btn.dataset.id, 1));
      });
    }

    // Calculations
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = subtotal * state.taxRate;
    const total = subtotal + tax;

    cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    cartTaxEl.textContent = `$${tax.toFixed(2)}`;
    cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }

  // --- CHECKOUT SIMULATION ---
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Your cart is empty! Add items first.');
        return;
      }
      showToast('🎉 Order placed successfully! Thank you!');
      state.cart = [];
      renderCart();
      setTimeout(closeCart, 1500);
    });
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // --- NEWSLETTER SUBMISSION ---
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      if (email) {
        showToast(`✨ Welcome to the Coffee Club, ${email.split('@')[0]}! Check your inbox for 10% off.`);
        newsletterForm.reset();
      }
    });
  }

});
