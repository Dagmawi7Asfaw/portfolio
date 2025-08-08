# Dagmawi Asfaw — Portfolio

A modern, responsive portfolio website showcasing software development projects and skills. Built with semantic HTML5, modern CSS3, and vanilla JavaScript—no frameworks required.

## ✨ Features

- **Responsive Design**: Mobile-first approach with fluid typography and flexible grids
- **Dark/Light Theme**: Toggle with localStorage persistence and system preference detection
- **Accessibility**: WCAG compliant with skip links, semantic landmarks, and proper contrast ratios
- **Performance**: Optimized with SVG assets, lazy animations, and minimal JavaScript
- **Interactive Elements**: Animated counters, scroll-triggered reveals, project filtering
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Custom Properties, Grid, Flexbox), Vanilla JavaScript
- **Assets**: SVG icons and placeholder images
- **Deployment**: Static site ready for any hosting platform
- **No Build Process**: Zero dependencies, instant deployment

## 📁 Project Structure

```md
portfolio/
├── index.html          # Main HTML document
├── styles.css          # CSS with custom properties and responsive design
├── script.js           # Vanilla JavaScript for interactivity
├── README.md           # This file
└── assets/
    ├── icons/          # SVG icons (GitHub, LinkedIn, mail, etc.)
    └── images/         # SVG placeholder images
```

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/Dagmawi7Asfaw/portfolio.git
   cd portfolio
   ```

2. **Serve locally** (choose one):

   ```bash
   # Python 3
   python3 -m http.server 5500
   
   # Node.js
   npx http-server . -p 5500
   
   # PHP
   php -S localhost:5500
   ```

3. **Open in browser**: `http://localhost:5500`

## 🎨 Customization

### Personal Information

Update `index.html`:

- `<title>` and meta description
- Header brand name and logo alt text
- Profile image alt text
- Contact information and location

### Social Links

Edit the social links section:

```html
<ul class="socials">
  <li><a href="https://github.com/yourusername">GitHub</a></li>
  <li><a href="https://linkedin.com/in/yourprofile">LinkedIn</a></li>
  <li><a href="mailto:your@email.com">Email</a></li>
</ul>
```

### Skills & Experience

- **Skills**: Update the `ul.tags` in the About section
- **Experience**: Modify the timeline in the Experience section
- **Stats**: Change `data-count` values in the stats section

### Projects

Each project card uses `data-cat` for filtering:

```html
<article class="card" data-cat="rust">
  <img src="./assets/images/p4.svg" alt="Project Name" />
  <div class="card-body">
    <h3>Project Name</h3>
    <p>Project description</p>
    <div class="card-actions">
      <a class="btn btn-ghost" href="https://github.com/username/repo">Code</a>
    </div>
  </div>
</article>
```

Add new categories by:

1. Adding a filter button with `data-filter="category"`
2. Setting `data-cat="category"` on relevant project cards

## 🌐 Deployment

This static site is deployed on Vercel for optimal performance and automatic deployments.

### Vercel (Recommended)

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Deploy**:

   ```bash
   vercel --prod
   ```

3. **Your site will be live** at `https://your-project-name.vercel.app`

### Alternative Platforms

#### GitHub Pages

1. Push to your repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → `main` → `/ (root)`
4. Your site will be available at `https://username.github.io/repository-name`

#### Netlify

1. Drag and drop the folder to [Netlify](https://netlify.com)
2. Or use CLI: `netlify deploy --prod`

#### Other Platforms

- **Firebase Hosting**: `firebase deploy`
- **AWS S3**: Upload files to S3 bucket with static website hosting
- **Cloudflare Pages**: Connect your GitHub repository

## ♿ Accessibility Features

- **Semantic HTML**: Proper use of landmarks (`header`, `main`, `footer`, `nav`)
- **Skip Links**: Keyboard navigation support
- **Focus Management**: Visible focus states and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects user's motion preferences
- **Screen Reader Support**: Meaningful alt text and ARIA labels

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This is a personal portfolio template. Feel free to:

- Fork and adapt for your own use
- Report bugs or suggest improvements
- Share your customized version

## 📄 License

This project is provided for personal use. For open-source distribution, consider adding an MIT or similar license.

## 🙏 Acknowledgments

- [Inter font](https://rsms.me/inter/) by Rasmus Andersson
- [Feather Icons](https://feathericons.com/) for icon inspiration
- Modern CSS techniques and best practices

---

### Built with ❤️ by Dagmawi Asfaw

### Last updated: August 2025*
