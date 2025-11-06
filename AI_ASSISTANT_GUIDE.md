# AI Chat Assistant - Quick Reference

## How to Test the AI Assistant

### Open the Chat
1. Go to http://localhost:3000/products.html
2. Look for the floating blue "AI Assistant" button in the bottom-right corner
3. Click it to open the chat window

### Sample Prompts to Try

#### For Puppies:
```
"I have a 6-month-old puppy that needs help staying hydrated"
"My small dog doesn't drink enough water"
```
**Expected**: Recommends Dogua (low-calorie, training treats)

#### For Active Dogs:
```
"I have a border collie that runs and hikes with me daily"
"My dog is very active and exercises a lot"
"Looking for something for my hunting dog"
```
**Expected**: Recommends Good Trouble Hydration Powder + Thirsty Dog Tabs

#### For Senior Dogs:
```
"My 10-year-old dog has joint problems"
"Senior dog needs better hydration and health support"
```
**Expected**: Recommends Dog is Human Multivitamin

#### For Budget-Conscious:
```
"Looking for an affordable hydration supplement"
"What's the cheapest option that still works?"
"I'm on a tight budget"
```
**Expected**: Recommends HydrADE ($14.99)

#### For Sick/Dehydrated Dogs:
```
"My dog is recovering from illness and won't drink"
"Dog is dehydrated after vomiting"
"Sick dog needs electrolytes"
```
**Expected**: Recommends HydrADE + Thirsty Dog (medical support)

## AI Response Format

Each recommendation includes:
1. **Product Name** (in heading)
2. **Why**: Specific reason it's good for that dog
3. **Price**: Current pricing with any discounts
4. **Link**: "View Product →" button to vendor site

## Keywords the AI Recognizes

### Age-Related:
- puppy, young, small → Dogua
- senior, old, elderly → Dog is Human Multivitamin

### Activity Level:
- active, hike, exercise, sport, athletic, hunting → Good Trouble + Thirsty Dog

### Health Issues:
- dehydrat, not drinking, sick → HydrADE + Thirsty Dog
- health, joint → Dog is Human Multivitamin

### Budget:
- budget, cheap, affordable, inexpensive → HydrADE

## Customization Notes

To add more products or modify recommendations, edit `/Users/leguplabs/DogBox/products.html`:

### Add New Keyword:
```javascript
if (lowerInput.includes('keyword')) {
  recommendations.push({
    name: 'Product Name',
    reason: 'Why it's good for this situation',
    price: '$XX.XX',
    link: 'https://product-url.com'
  });
}
```

### Modify Welcome Message:
Find `<div class="ai-message">` in products.html and edit the initial AI message content.

### Change AI Avatar:
Modify `<div class="ai-avatar">🤖</div>` to use a different emoji (🐕, 🐾, 💧, etc.)

## Future Integration with Real AI

To connect to OpenAI or Claude API:

1. Add API key configuration
2. Replace `analyzeUserInput()` function with API call
3. Send user message to AI model
4. Parse AI response for product recommendations
5. Format and display results

Example structure:
```javascript
async function getAIRecommendation(userMessage) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a pet hydration expert...' },
        { role: 'user', content: userMessage }
      ]
    })
  });
  // Parse and return recommendations
}
```

## Styling Customization

All AI chat styles are in `styles.css` under `/* AI Chat Widget Styles */`:

- **Colors**: Change gradient colors in `.ai-chat-button`, `.ai-chat-header`, `.ai-chat-send`
- **Size**: Modify `width: 400px; height: 600px;` in `.ai-chat-window`
- **Position**: Adjust `bottom` and `right` values in `.ai-chat-widget`
- **Animations**: Edit `@keyframes messageSlide` for different effects

## Mobile Behavior

On mobile devices:
- Chat window expands to full screen (minus padding)
- "AI Assistant" text hides on very small screens
- Button becomes circular icon-only
- Messages stack vertically with smaller font

---

**Note**: This is a client-side simulation. For production, integrate with a real AI API for more sophisticated conversations and recommendations.
