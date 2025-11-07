// Fred AI Assistant - Persistent across pages
(function() {
  const chatButton = document.getElementById('aiChatButton');
  const chatWindow = document.getElementById('aiChatWindow');
  const chatClose = document.getElementById('aiChatClose');
  const chatInput = document.getElementById('aiChatInput');
  const chatSend = document.getElementById('aiChatSend');
  const chatMessages = document.getElementById('aiChatMessages');
  const acceptModal = document.getElementById('aiAcceptModal');

  // Fred is always available in the background - show the button immediately
  chatButton.style.display = 'flex';

  // Remove the accept modal since Fred is optional background help
  if (acceptModal) {
    acceptModal.remove();
  }

  // Open chat
  chatButton.addEventListener('click', () => {
    chatWindow.classList.add('active');
    chatButton.style.display = 'none';
    chatInput.focus();
  });

  // Close chat
  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
    chatWindow.classList.remove('expanded');
    chatButton.style.display = 'flex';
  });

  // Add message to chat
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'ai-message';
    
    if (!isUser) {
      const avatar = document.createElement('div');
      avatar.className = 'ai-avatar';
      avatar.textContent = '🐕';
      messageDiv.appendChild(avatar);
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.className = isUser ? 'user-message-content' : 'ai-message-content';
    contentDiv.innerHTML = content;
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Expand window when Fred responds (not for user messages)
    if (!isUser) {
      chatWindow.classList.add('expanded');
    }
  }

  // Analyze user input and provide response
  function analyzeUserInput(input) {
    const lowerInput = input.toLowerCase();
    
    // Check if on products page or home page
    const isProductsPage = window.location.pathname.includes('products');
    
    // Help with navigation
    if (lowerInput.includes('product') && !isProductsPage) {
      return '<p>Looking for hydration products? Let me take you to our products page!</p><p><a href="products.html" style="color: var(--primary); font-weight: 600;">View Products →</a></p>';
    }
    
    if (lowerInput.includes('home') && isProductsPage) {
      return '<p>Want to go back home? No problem!</p><p><a href="index.html" style="color: var(--primary); font-weight: 600;">Go to Home →</a></p>';
    }
    
    if (lowerInput.includes('zip') || lowerInput.includes('area') || lowerInput.includes('location')) {
      return '<p>I can help you check the water quality in your area! Head to the <a href="index.html#home" style="color: var(--primary); font-weight: 600;">homepage</a> and enter your ZIP code in the water quality checker.</p><p>I have data for major cities like Las Vegas, Los Angeles, New York, Houston, Chicago, Phoenix, Philadelphia, and San Antonio!</p>';
    }
    
    // Water type recommendations
    if (lowerInput.includes('water type') || lowerInput.includes('filtered') || lowerInput.includes('mineral') || lowerInput.includes('tap water') || lowerInput.includes('bottled')) {
      return '<p><strong>🚰 Best Water Types for Your Dog:</strong></p><ul><li><strong>Filtered Water:</strong> Best choice! Removes contaminants while retaining beneficial minerals. Use a quality filter on your tap.</li><li><strong>Mineral Water:</strong> Good option - contains natural minerals that support health, but check sodium levels.</li><li><strong>Tap Water:</strong> OK if your area has clean water (check your ZIP code!). Consider filtering to remove chlorine and contaminants.</li><li><strong>Distilled Water:</strong> Not recommended long-term - lacks essential minerals.</li></ul><p>💡 <strong>Daily Tip:</strong> Use filtered or mineral water, and always keep it fresh!</p>';
    }
    
    // Dehydration symptoms
    if (lowerInput.includes('dehydrat') || lowerInput.includes('symptom') || lowerInput.includes('sick') || lowerInput.includes('lethargic') || lowerInput.includes('breathing')) {
      return '<p><strong>⚠️ Watch for These Dehydration Symptoms:</strong></p><ul><li><strong>Heavy Panting:</strong> Excessive breathing even when not hot or exercising</li><li><strong>Lethargy:</strong> Unusual tiredness, weakness, or lack of energy</li><li><strong>Dry Gums:</strong> Sticky or dry mouth instead of moist</li><li><strong>Sunken Eyes:</strong> Eyes appear dull or set back</li><li><strong>Loss of Skin Elasticity:</strong> Pinch neck skin - it should snap back quickly</li><li><strong>Guttural Sounds:</strong> Unusual throat noises or difficulty swallowing</li><li><strong>Dark Urine:</strong> Concentrated, darker than usual</li></ul><p>🚨 <strong>Emergency Signs:</strong> Vomiting, diarrhea, collapse, or extreme lethargy - see a vet immediately!</p>';
    }
    
    // Portable water solutions
    if (lowerInput.includes('portable') || lowerInput.includes('travel') || lowerInput.includes('walk') || lowerInput.includes('hike') || lowerInput.includes('pouch') || lowerInput.includes('bag')) {
      return '<p><strong>🎒 Portable Hydration Solutions:</strong></p><ul><li><strong>Collapsible Bowls:</strong> Silicone bowls that fold flat - perfect for walks</li><li><strong>Water Bottles with Built-in Bowl:</strong> Squeeze bottles with attached drinking tray</li><li><strong>Hydration Packs:</strong> Dog backpacks with water bladder compartments</li><li><strong>Water Pouches:</strong> Single-use portable water packets for emergencies</li><li><strong>Freeze-Dried Treats:</strong> Like Dogua™ - add water on-the-go for instant hydration</li></ul><p>🥾 <strong>Hiking/Running Tip:</strong> Bring 2x the water you think you\'ll need. Offer water every 15-20 minutes during activity!</p><p>Want product recommendations? <a href="products.html" style="color: var(--primary); font-weight: 600;">View our recommended products →</a></p>';
    }
    
    // Health routines
    if (lowerInput.includes('routine') || lowerInput.includes('schedule') || lowerInput.includes('healthy') || lowerInput.includes('habit')) {
      return '<p><strong>🐾 Daily Hydration & Health Routine:</strong></p><p><strong>Morning (6-8 AM):</strong></p><ul><li>Fresh filtered water in clean bowl</li><li>Add hydration powder if active day planned</li><li>Monitor overnight water consumption</li></ul><p><strong>Midday (12-2 PM):</strong></p><ul><li>Refresh water bowl (even if not empty)</li><li>Check for dehydration signs after play</li><li>Offer ice cubes as treats in hot weather</li></ul><p><strong>Evening (5-7 PM):</strong></p><ul><li>Clean and refill water bowl</li><li>Add electrolyte supplement if exercised heavily</li><li>Monitor drinking patterns</li></ul><p><strong>Before Bed:</strong></p><ul><li>Final water refresh</li><li>Leave accessible overnight</li></ul><p>📊 <strong>Track Weekly:</strong> Water consumption, energy levels, bathroom habits, and coat condition.</p>';
    }
    
    // Size/age/breed specific hydration
    if (lowerInput.includes('size') || lowerInput.includes('breed') || lowerInput.includes('age') || lowerInput.includes('puppy') || lowerInput.includes('senior') || lowerInput.includes('large') || lowerInput.includes('small')) {
      let response = '<p><strong>💧 Hydration Needs by Dog Type:</strong></p>';
      
      if (lowerInput.includes('puppy') || lowerInput.includes('young')) {
        response += '<p><strong>🐶 Puppies (Under 1 Year):</strong></p><ul><li><strong>Water Needs:</strong> ½ cup every 2 hours while awake</li><li><strong>Special Note:</strong> More frequent, smaller amounts</li><li><strong>Best Product:</strong> Dogua™ - Makes hydration fun and rewarding</li><li><strong>Tip:</strong> Use filtered water as they build immunity</li></ul>';
      }
      
      if (lowerInput.includes('small') || lowerInput.includes('tiny')) {
        response += '<p><strong>🐕 Small Breeds (Under 20 lbs):</strong></p><ul><li><strong>Daily Need:</strong> 10-20 oz (1.5-2.5 cups)</li><li><strong>Risk:</strong> Dehydrate faster due to metabolism</li><li><strong>Best Product:</strong> Dogua™ or HydrADE powder</li><li><strong>Tip:</strong> Multiple small bowls around house</li></ul>';
      }
      
      if (lowerInput.includes('medium')) {
        response += '<p><strong>🐕 Medium Breeds (20-50 lbs):</strong></p><ul><li><strong>Daily Need:</strong> 20-50 oz (2.5-6 cups)</li><li><strong>Active Breeds:</strong> Add Good Trouble electrolytes</li><li><strong>Tip:</strong> Monitor during play sessions</li></ul>';
      }
      
      if (lowerInput.includes('large') || lowerInput.includes('big')) {
        response += '<p><strong>🐕 Large Breeds (50-100+ lbs):</strong></p><ul><li><strong>Daily Need:</strong> 50-100+ oz (6-12+ cups)</li><li><strong>Special Note:</strong> Need larger water sources</li><li><strong>Best Product:</strong> Good Trouble or Thirsty Dog™ tabs</li><li><strong>Tip:</strong> Use fountain or large bowl, refill 2-3x daily</li></ul>';
      }
      
      if (lowerInput.includes('senior') || lowerInput.includes('old') || lowerInput.includes('elderly')) {
        response += '<p><strong>👴 Senior Dogs (7+ Years):</strong></p><ul><li><strong>Water Needs:</strong> Same as adult, but monitor closely</li><li><strong>Special Note:</strong> May drink less despite needing more</li><li><strong>Best Product:</strong> Dog is Human multivitamin + hydration support</li><li><strong>Health Focus:</strong> Kidney function, joint health</li><li><strong>Tip:</strong> Encourage drinking; add low-sodium broth to water</li></ul>';
      }
      
      response += '<p>📱 <strong>Want personalized product recommendations?</strong> Tell me your dog\'s specifics!</p>';
      return response;
    }
    
    // Product recommendations
    if (isProductsPage) {
      let recommendations = [];
      
      if (lowerInput.includes('puppy') || lowerInput.includes('young') || lowerInput.includes('small')) {
        recommendations.push({
          name: 'Dogua™ High-Protein Hydration Mix',
          reason: 'Low-calorie, portable treats perfect for training and encouraging hydration in small or young dogs',
          price: '$4.50',
          link: 'https://doggosessions.com/products/dogua-dog-hydration-mix'
        });
      }
      
      if (lowerInput.includes('active') || lowerInput.includes('hike') || lowerInput.includes('exercise') || lowerInput.includes('sport')) {
        recommendations.push({
          name: 'Good Trouble Hydration Powder',
          reason: 'Packed with electrolytes, vitamin C, and amino acids for active dogs who need extra hydration support',
          price: '$24.79',
          link: 'https://goodtroublepets.com/products/hydration-powder-dog-supplement'
        });
      }
      
      if (lowerInput.includes('senior') || lowerInput.includes('old') || lowerInput.includes('elderly')) {
        recommendations.push({
          name: 'Dog is Human Daily Multivitamin',
          reason: 'Comprehensive health support with joint, immunity, and heart health benefits - perfect for senior dogs',
          price: '$49.30',
          link: 'https://dogishuman.com/products/daily-multivitamin-beef'
        });
      }
      
      if (lowerInput.includes('budget') || lowerInput.includes('cheap') || lowerInput.includes('affordable')) {
        recommendations.push({
          name: 'HydrADE Electrolyte Powder',
          reason: 'Affordable option with great reviews - supports hydration for both dogs and cats',
          price: '$14.99',
          link: 'https://www.amazon.com/HydrADE-Powder-Electrolytes-Dehydration-Hydration/dp/B0C5LDGLN4'
        });
      }
      
      if (recommendations.length > 0) {
        let response = '<p>Based on what you told me, here are my top recommendations:</p><div class="ai-recommendations">';
        
        recommendations.forEach((rec, index) => {
          response += `
            <div class="ai-rec-card">
              <h4>${index + 1}. ${rec.name}</h4>
              <p><strong>Why:</strong> ${rec.reason}</p>
              <p><strong>Price:</strong> ${rec.price}</p>
              <a href="${rec.link}" target="_blank" rel="noopener" class="ai-rec-link">View Product →</a>
            </div>
          `;
        });
        
        response += '</div><p>Need more help? Just ask!</p>';
        return response;
      }
    }
    
    // General hydration advice
    if (lowerInput.includes('how much water') || lowerInput.includes('hydration')) {
      return '<p>Great question! Dogs typically need about <strong>1 ounce of water per pound of body weight</strong> per day. So a 50-lb dog needs about 50 ounces (roughly 6 cups) daily.</p><p>Factors that increase water needs:</p><ul><li>Hot weather or exercise</li><li>Dry food diet</li><li>Illness or medications</li><li>Pregnancy or nursing</li></ul><p>Always keep fresh, clean water available!</p>';
    }
    
    if (lowerInput.includes('contaminant') || lowerInput.includes('safe') || lowerInput.includes('dangerous')) {
      return '<p>I can help you understand water contaminants! The most common ones that affect dogs are:</p><ul><li><strong>Lead:</strong> Can cause neurological damage</li><li><strong>Arsenic:</strong> Linked to cancer and organ damage</li><li><strong>PFAS:</strong> "Forever chemicals" that accumulate in the body</li><li><strong>Chlorine:</strong> Can irritate skin and digestion</li></ul><p>Check your ZIP code on our <a href="index.html#home" style="color: var(--primary); font-weight: 600;">homepage</a> to see what\'s in your water!</p>';
    }
    
    // Default response
    return '<p>I\'m here to help! You can ask me about:</p><ul><li>🚰 Water types (filtered, mineral, tap)</li><li>💧 Hydration by size, age, and breed</li><li>⚠️ Dehydration symptoms to watch for</li><li>🎒 Portable water solutions for walks/hikes</li><li>🐾 Daily hydration routines</li><li>🏥 Product recommendations</li><li>📍 Water quality in your area</li></ul><p>What would you like to know?</p>';
  }

  // Send message
  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(`<p>${message}</p>`, true);
    chatInput.value = '';
    
    // Simulate Fred thinking
    setTimeout(() => {
      const response = analyzeUserInput(message);
      addMessage(response);
    }, 800);
  }

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Global function for Fred Optimizer button (products page)
  window.openFredOptimizer = function() {
    // Open chat window
    chatWindow.classList.add('active');
    chatButton.style.display = 'none';
    
    // Send automated welcome message for optimization
    setTimeout(() => {
      addMessage('<p><strong>Woof! Let\'s optimize your dog\'s hydration routine! 🐕💧</strong></p><p>Tell me about your dog so I can create a personalized plan:</p><ul><li>What\'s their size? (small/medium/large)</li><li>How old are they? (puppy/adult/senior)</li><li>Activity level? (low/moderate/high)</li><li>Any specific needs? (hiking, travel, health issues)</li></ul><p>Or just ask me: "Create a routine for my active medium-sized dog" and I\'ll help!</p>');
    }, 300);
    
    chatInput.focus();
  };
})();
