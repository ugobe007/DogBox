// DogBox - Main JavaScript

// ===== Image Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
}

// Change slide every 4 seconds
setInterval(nextSlide, 4000);

// ===== Zip Code Form Handler =====
document.getElementById('zipForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const zipCode = document.getElementById('zipInput').value;
    
    if (zipCode.length === 5 && /^\d+$/.test(zipCode)) {
        showResults(zipCode);
    } else {
        alert('Please enter a valid 5-digit zip code');
    }
});

function showResults(zipCode) {
    const data = getWaterData(zipCode);
    
    // Update result zip code
    document.getElementById('resultZip').textContent = zipCode + ' (' + data.city + ')';
    
    // Display contaminants
    const contaminantsList = document.getElementById('contaminantsList');
    contaminantsList.innerHTML = '';
    
    data.contaminants.forEach(contaminant => {
        const contaminantDiv = document.createElement('div');
        contaminantDiv.className = 'contaminant-item';
        contaminantDiv.innerHTML = `
            <h4>${contaminant.name} - ${contaminant.level} Level</h4>
            <p>${contaminant.description}</p>
        `;
        contaminantsList.appendChild(contaminantDiv);
    });
    
    // Display health impacts
    const healthImpactList = document.getElementById('healthImpactList');
    healthImpactList.innerHTML = '';
    
    data.healthImpacts.forEach(impact => {
        const li = document.createElement('li');
        li.textContent = impact;
        healthImpactList.appendChild(li);
    });
    
    // Show results section
    document.getElementById('results').classList.remove('hidden');
    
    // Smooth scroll to results
    setTimeout(() => {
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// ===== Email Signup Form Handler =====
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const name = document.getElementById('nameInput').value;
    const dogName = document.getElementById('dogNameInput').value;
    
    // Store data (in real implementation, send to backend)
    const userData = {
        email: email,
        name: name,
        dogName: dogName,
        zipCode: document.getElementById('zipInput').value,
        timestamp: new Date().toISOString()
    };
    
    console.log('User signup data:', userData);
    
    // Save to localStorage for demo purposes
    let subscribers = JSON.parse(localStorage.getItem('dogboxSubscribers') || '[]');
    subscribers.push(userData);
    localStorage.setItem('dogboxSubscribers', JSON.stringify(subscribers));
    
    // Hide results, show thank you
    document.getElementById('results').classList.add('hidden');
    document.getElementById('thankyou').classList.remove('hidden');
    
    // Scroll to thank you
    setTimeout(() => {
        document.getElementById('thankyou').scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    // Reset form
    document.getElementById('signupForm').reset();
});

// ===== Community Post Form Handler =====
document.getElementById('communityPostForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const dogName = document.getElementById('postDogName').value;
    const waterType = document.getElementById('postWaterType').value;
    const message = document.getElementById('postMessage').value;
    const imageFile = document.getElementById('postImage').files[0];
    
    // Create new post
    const communityGrid = document.getElementById('communityPosts');
    const newPost = document.createElement('div');
    newPost.className = 'community-post';
    
    // Handle image
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            newPost.innerHTML = `
                <div class="post-image">
                    <img src="${event.target.result}" alt="${dogName}">
                </div>
                <div class="post-content">
                    <h4>${dogName}</h4>
                    <p class="water-type">💧 ${waterType}</p>
                    <p class="post-message">"${message}"</p>
                    <p class="post-author">- Just posted</p>
                </div>
            `;
            
            // Insert at beginning
            communityGrid.insertBefore(newPost, communityGrid.firstChild);
            
            // Add animation
            newPost.style.opacity = '0';
            newPost.style.transform = 'translateY(20px)';
            setTimeout(() => {
                newPost.style.transition = 'all 0.5s ease';
                newPost.style.opacity = '1';
                newPost.style.transform = 'translateY(0)';
            }, 10);
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Default image if none uploaded
        newPost.innerHTML = `
            <div class="post-image">
                <img src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=400&fit=crop" alt="${dogName}">
            </div>
            <div class="post-content">
                <h4>${dogName}</h4>
                <p class="water-type">💧 ${waterType}</p>
                <p class="post-message">"${message}"</p>
                <p class="post-author">- Just posted</p>
            </div>
        `;
        communityGrid.insertBefore(newPost, communityGrid.firstChild);
    }
    
    // Save to localStorage
    const post = {
        dogName: dogName,
        waterType: waterType,
        message: message,
        timestamp: new Date().toISOString()
    };
    
    let posts = JSON.parse(localStorage.getItem('dogboxPosts') || '[]');
    posts.unshift(post);
    localStorage.setItem('dogboxPosts', JSON.stringify(posts));
    
    // Reset form
    document.getElementById('communityPostForm').reset();
    
    // Show success message
    alert('Thank you for sharing! Your post has been added to the community.');
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip external links (like about.html button)
    if (anchor.hasAttribute('data-external-link')) return;
    
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 70;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Load saved posts on page load =====
window.addEventListener('DOMContentLoaded', function() {
    // Dog images array for community posts
    const dogImages = ['dog_1.jpg', 'dog_2.jpg', 'dog_3.jpg', 'dog_4.jpg'];
    
    // Load community posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('dogboxPosts') || '[]');
    const communityGrid = document.getElementById('communityPosts');
    
    savedPosts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'community-post';
        // Cycle through dog images
        const dogImage = dogImages[index % dogImages.length];
        postDiv.innerHTML = `
            <div class="post-image">
                <img src="${dogImage}" alt="${post.dogName}">
            </div>
            <div class="post-content">
                <h4>${post.dogName}</h4>
                <p class="water-type">💧 ${post.waterType}</p>
                <p class="post-message">"${post.message}"</p>
                <p class="post-author">- Posted ${new Date(post.timestamp).toLocaleDateString()}</p>
            </div>
        `;
        communityGrid.insertBefore(postDiv, communityGrid.firstChild);
    });
    
    console.log('🐕 DogBox loaded! Check your water quality now! 💧');
});

// ===== Analytics tracking (placeholder) =====
function trackEvent(category, action, label) {
    console.log('Event tracked:', category, action, label);
    // In production, send to analytics service
    // gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track zip code checks
document.getElementById('zipForm').addEventListener('submit', function() {
    trackEvent('Water Check', 'Check Zip Code', document.getElementById('zipInput').value);
});

// Track signups
document.getElementById('signupForm').addEventListener('submit', function() {
    trackEvent('Signup', 'Newsletter Subscribe', 'Email Signup');
});

// Track community posts
document.getElementById('communityPostForm').addEventListener('submit', function() {
    trackEvent('Community', 'New Post', 'Dog Photo Share');
});

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const hamburgerNav = document.getElementById('hamburgerNav');
  const hamburgerClose = document.getElementById('hamburgerClose');
  const hamburgerOverlay = document.getElementById('hamburgerOverlay');

  if (hamburgerBtn && hamburgerNav && hamburgerOverlay) {
    // Open menu
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.add('active');
      hamburgerNav.classList.add('active');
      hamburgerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Close menu
    const closeMenu = () => {
      hamburgerBtn.classList.remove('active');
      hamburgerNav.classList.remove('active');
      hamburgerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (hamburgerClose) {
      hamburgerClose.addEventListener('click', closeMenu);
    }

    hamburgerOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    const menuLinks = hamburgerNav.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburgerNav.classList.contains('active')) {
        closeMenu();
      }
    });
  }
});
