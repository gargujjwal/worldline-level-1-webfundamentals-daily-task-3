// Carousel functionality
let currentSlide = 0;
const carousel = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".carousel-item");

function updateCarousel() {
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Animate statistics
function animateStats() {
  const stats = document.querySelectorAll(".stat-value");
  stats.forEach((stat) => {
    const target = parseInt(stat.dataset.value);
    let current = 0;
    const increment = target / 50;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      stat.textContent = Math.round(current);
    }, 40);
  });
}

// Trigger stats animation when in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateStats();
      observer.disconnect();
    }
  });
});

observer.observe(document.querySelector(".stats-container"));

// Form validation
function validateForm(event) {
  event.preventDefault();
  let isValid = true;
  const errors = document.querySelectorAll(".error");
  errors.forEach((error) => (error.textContent = ""));

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (name.value.length < 2) {
    document.querySelector("#name + .error").textContent =
      "Name must be at least 2 characters long";
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    document.querySelector("#email + .error").textContent =
      "Please enter a valid email address";
    isValid = false;
  }

  if (message.value.length < 10) {
    document.querySelector("#message + .error").textContent =
      "Message must be at least 10 characters long";
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
    event.target.reset();
  }

  return isValid;
}
