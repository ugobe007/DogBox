# DogBox Website

Clean water solutions for dogs. A simple, engaging website to build user base before product launch.

## Features

### 1. **Hero Section with Rotating Dog Images**
- Beautiful full-screen hero with 3 rotating images of dogs
- Images change every 5 seconds automatically
- Strong call-to-action message

### 2. **Water Quality Checker**
- Users enter their zip code
- System looks up common water contaminants in their area
- Displays specific contaminants and health impacts for dogs
- Educational and engaging

### 3. **Email Collection**
- After seeing their water quality report
- Users can sign up for updates
- Collects: Email, Name, Dog's Name, Zip Code
- Builds email list for product launch

### 4. **Community Board**
- Users can share photos of their dogs
- Include what type of water they give their dogs
- Share stories and experiences
- Builds community engagement

## Files Included

- `index.html` - Main website structure
- `styles.css` - All styling and responsive design
- `script.js` - Interactive functionality
- `water-data.js` - Water contamination lookup database
- `README.md` - This file

## Setup Instructions

1. **Download all files** to a folder on your computer

2. **Open index.html** in any web browser
   - Double-click the file, or
   - Right-click → Open with → Your browser

3. **No server required** - runs directly in browser

## Customization

### Adding More Zip Codes

Edit `water-data.js` and add entries following this format:

```javascript
"12345": {
    city: "Your City, ST",
    contaminants: [
        { name: "Contaminant Name", level: "High/Moderate/Low", description: "Description here" }
    ],
    healthImpacts: [
        "Impact 1",
        "Impact 2"
    ]
}
```

### Changing Dog Images

In `styles.css`, find the `.slide:nth-child()` sections and replace the Unsplash URLs with your own image URLs.

### Collecting Real Data

Currently, form submissions are saved to browser localStorage (temporary storage).

To collect real data, you'll need to:

1. Set up a backend service (Firebase, Supabase, or custom API)
2. Modify the form submission handlers in `script.js`
3. Send data to your database instead of localStorage

**Recommended Services:**
- **Firebase** (Google) - Free tier, easy to use
- **Supabase** - Open source, PostgreSQL database
- **Airtable** - Spreadsheet-style database with API
- **Google Forms** - Simplest option for just collecting emails

## Data Collection Notes

### What's Being Collected:
- Zip codes entered
- Email addresses
- Names
- Dog names
- Community posts (dog photos and water type)

### Current Storage:
- Browser localStorage (temporary, for demo only)
- Check browser console to see logged data
- Real implementation needs backend database

## Browser Compatibility

Works on all modern browsers:
- Chrome, Firefox, Safari, Edge
- Mobile and desktop
- Responsive design adapts to all screen sizes

## Next Steps for Production

1. **Get Real Water Quality Data**
   - Use EPA database
   - Partner with water testing services
   - Expand zip code coverage

2. **Set Up Email Service**
   - Mailchimp, SendGrid, or ConvertKit
   - Automated welcome emails
   - Newsletter campaigns

3. **Set Up Analytics**
   - Google Analytics
   - Track zip code searches
   - Monitor signup conversion rates

4. **Host the Website**
   - Netlify (free, easy)
   - Vercel (free, easy)
   - GitHub Pages (free)
   - Or any web hosting service

5. **Custom Domain**
   - Register dogboxwater.com
   - Point to your hosting

## Support

For questions or customization help, contact your development team.

## License

© 2025 DogBox by Legup Labs. All rights reserved.
