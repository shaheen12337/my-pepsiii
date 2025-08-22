// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 20, 25, 0.95)"
  } else {
    navbar.style.background = "rgba(15, 20, 25, 0.9)"
  }
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add scroll animation classes to elements
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to product cards
  document.querySelectorAll(".product-card").forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.1}s`
    observer.observe(card)
  })

  // Add animations to about section elements
  const aboutText = document.querySelector(".about-text")
  const aboutImage = document.querySelector(".about-image")

  if (aboutText) {
    aboutText.classList.add("slide-in-left")
    observer.observe(aboutText)
  }

  if (aboutImage) {
    aboutImage.classList.add("slide-in-right")
    observer.observe(aboutImage)
  }

  // Add animations to stats
  document.querySelectorAll(".stat").forEach((stat, index) => {
    stat.classList.add("fade-in")
    stat.style.transitionDelay = `${index * 0.2}s`
    observer.observe(stat)
  })

  // Contact Form Functionality
  const contactForm = document.getElementById("contactForm")
  const starRating = document.getElementById("starRating")
  const ratingText = document.getElementById("ratingText")
  let currentRating = 0

  // Form validation
  const validateForm = () => {
    let isValid = true
    const formData = new FormData(contactForm)

    // Name validation
    const name = formData.get("name").trim()
    const nameGroup = document.querySelector("#name").closest(".form-group")
    const nameError = document.getElementById("nameError")

    if (name.length < 2) {
      showError(nameGroup, nameError, "Please enter a valid name (at least 2 characters)")
      isValid = false
    } else {
      showSuccess(nameGroup, nameError)
    }

    // Email validation
    const email = formData.get("email").trim()
    const emailGroup = document.querySelector("#email").closest(".form-group")
    const emailError = document.getElementById("emailError")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      showError(emailGroup, emailError, "Please enter a valid email address")
      isValid = false
    } else {
      showSuccess(emailGroup, emailError)
    }

    // Address validation
    const address = formData.get("address").trim()
    const addressGroup = document.querySelector("#address").closest(".form-group")
    const addressError = document.getElementById("addressError")

    if (address.length < 10) {
      showError(addressGroup, addressError, "Please enter a complete address with pincode")
      isValid = false
    } else {
      showSuccess(addressGroup, addressError)
    }

    return isValid
  }

  const showError = (group, errorElement, message) => {
    group.classList.remove("success")
    group.classList.add("error")
    errorElement.textContent = message
    errorElement.classList.add("show")
  }

  const showSuccess = (group, errorElement) => {
    group.classList.remove("error")
    group.classList.add("success")
    errorElement.classList.remove("show")
  }

  // Form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateForm()) {
      const submitButton = contactForm.querySelector(".submit-button")
      submitButton.classList.add("loading")
      submitButton.querySelector("span").textContent = "Processing Order..."

      // Simulate form submission
      setTimeout(() => {
        submitButton.classList.remove("loading")
        submitButton.querySelector("span").textContent = "Order Placed!"
        submitButton.style.background = "linear-gradient(45deg, #4ecdc4, #45b7d1)"

        // Show success message
        const successMessage = document.createElement("div")
        successMessage.className = "success-message"
        successMessage.innerHTML = `
          <strong>🎉 Order Placed Successfully!</strong><br>
          Thank you for choosing Pepsi. Your order will be delivered on August 1st, 2024.
        `
        contactForm.appendChild(successMessage)

        setTimeout(() => {
          successMessage.classList.add("show")
        }, 100)

        // Reset form after 3 seconds
        setTimeout(() => {
          contactForm.reset()
          document.querySelectorAll(".form-group").forEach((group) => {
            group.classList.remove("success", "error")
          })
          submitButton.querySelector("span").textContent = "Place Order"
          submitButton.style.background = "linear-gradient(45deg, #ff6b6b, #4ecdc4)"
          successMessage.remove()
        }, 3000)
      }, 2000)
    }
  })

  // Real-time validation
  const inputs = contactForm.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", validateForm)
    input.addEventListener("input", () => {
      const group = input.closest(".form-group")
      if (group.classList.contains("error")) {
        validateForm()
      }
    })
  })

  // Star rating functionality
  const stars = starRating.querySelectorAll(".star")

  stars.forEach((star, index) => {
    star.addEventListener("mouseenter", () => {
      highlightStars(index + 1)
    })

    star.addEventListener("click", () => {
      currentRating = index + 1
      setRating(currentRating)
      updateRatingText(currentRating)
    })
  })

  starRating.addEventListener("mouseleave", () => {
    if (currentRating > 0) {
      highlightStars(currentRating)
    } else {
      highlightStars(0)
    }
  })

  const highlightStars = (rating) => {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add("active")
      } else {
        star.classList.remove("active")
      }
    })
  }

  const setRating = (rating) => {
    highlightStars(rating)

    // Add animation effect
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.animation = "none"
        setTimeout(() => {
          star.style.animation = "pulse 0.6s ease-in-out"
        }, index * 100)
      }
    })
  }

  const updateRatingText = (rating) => {
    const messages = [
      "Click to rate",
      "Poor - We'll do better! 😔",
      "Fair - Room for improvement 🤔",
      "Good - Thanks for the feedback! 😊",
      "Great - We're glad you like it! 😄",
      "Excellent - You're awesome! 🎉",
    ]
    ratingText.textContent = messages[rating]
    ratingText.style.color = rating > 3 ? "#4ecdc4" : rating > 1 ? "#ffd700" : "#ff6b6b"
  }

  // Add pulse animation for stars
  const starStyle = document.createElement("style")
  starStyle.textContent = `
    @keyframes pulse {
      0% { transform: scale(1.2); }
      50% { transform: scale(1.4); }
      100% { transform: scale(1.2); }
    }
  `
  document.head.appendChild(starStyle)

  // Add scroll animations to contact section
  const contactSection = document.querySelector(".contact-section")
  const contactFormContainer = document.querySelector(".contact-form-container")
  const orderInfoContainer = document.querySelector(".order-info")

  if (contactFormContainer) {
    contactFormContainer.classList.add("slide-in-left")
    observer.observe(contactFormContainer)
  }

  if (orderInfoContainer) {
    orderInfoContainer.classList.add("slide-in-right")
    observer.observe(orderInfoContainer)
  }

  // Add staggered animation to info cards
  document.querySelectorAll(".info-card").forEach((card, index) => {
    card.classList.add("fade-in")
    card.style.transitionDelay = `${index * 0.2}s`
    observer.observe(card)
  })
})

// Product card interactions
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Flavor highlighting
document.querySelectorAll(".flavor").forEach((flavor) => {
  flavor.addEventListener("click", () => {
    // Remove active class from all flavors
    document.querySelectorAll(".flavor").forEach((f) => f.classList.remove("active"))

    // Add active class to clicked flavor
    flavor.classList.add("active")

    // Find corresponding product card
    const flavorText = flavor.textContent.toLowerCase().replace(" ", "-")
    const productCard = document.querySelector(`[data-flavor="${flavorText}"]`)

    if (productCard) {
      // Remove highlight from all cards
      document.querySelectorAll(".product-card").forEach((card) => {
        card.classList.remove("highlighted")
      })

      // Highlight corresponding card
      productCard.classList.add("highlighted")

      // Scroll to products section
      productCard.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      // Remove highlight after 3 seconds
      setTimeout(() => {
        productCard.classList.remove("highlighted")
      }, 3000)
    }
  })
})

// Add CSS for highlighted product card
const style = document.createElement("style")
style.textContent = `
    .product-card.highlighted {
        transform: translateY(-15px) scale(1.05);
        box-shadow: 0 25px 50px rgba(78, 205, 196, 0.4);
        border-color: #4ecdc4;
    }
    
    .flavor.active {
        color: #4ecdc4;
        font-weight: 700;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(15, 20, 25, 0.95);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            backdrop-filter: blur(20px);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    }
`
document.head.appendChild(style)

// Parallax effect for floating circles
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = scrolled * 0.5

  document.querySelectorAll(".circle").forEach((circle, index) => {
    const speed = (index + 1) * 0.1
    circle.style.transform = `translateY(${parallax * speed}px) rotate(${scrolled * 0.1}deg)`
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Counter animation for stats
const animateCounter = (element, target) => {
  let current = 0
  const increment = target / 100
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current) + (element.textContent.includes("+") ? "+" : "")
  }, 20)
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const number = entry.target.querySelector(".stat-number")
      const text = number.textContent
      const target = Number.parseInt(text.replace(/\D/g, ""))
      animateCounter(number, target)
      statsObserver.unobserve(entry.target)
    }
  })
})

document.querySelectorAll(".stat").forEach((stat) => {
  statsObserver.observe(stat)
})
