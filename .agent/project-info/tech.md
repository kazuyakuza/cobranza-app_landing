# Technology Stack: Cobranza App Landing Page

## Core Technologies

### Vue.js 3
- **Version**: Latest stable (Vue 3)
- **API**: Composition API with `<script setup>` syntax
- **Build Tool**: Vite (recommended) or vue-cli
- **Key Features**:
  - Reactive state management with `ref()`, `reactive()`, `computed()`
  - Component lifecycle hooks (`onMounted`, etc.)
  - TypeScript integration for type safety
  - Tree-shaking and code splitting support

**Why Vue.js 3?**
- Component-based architecture aligns with landing page section structure
- Composition API enables clean, maintainable code
- Small bundle size compared to frameworks
- Strong community and ecosystem
- Easy to learn for developers with React/Vue background

### TypeScript
- **Version**: Latest stable
- **Purpose**: Type safety and better developer experience
- **Configuration**: `tsconfig.json` for Vue project

**Type Definitions Needed:**
- Component props interfaces
- Event emitters types
- Reactive data types
- Form data models

### Bootstrap 5
- **Version**: Bootstrap 5.3+
- **Purpose**: Responsive design, grid system, components
- **Usage**: CDN or bundled installation

**Bootstrap Components to Use:**
- Navbar
- Hero/Banner sections
- Cards (for features, use cases, pricing)
- Accordions (for FAQ)
- Buttons and CTA elements
- Forms and inputs (contact form)
- Footer
- Responsive utilities

**Why Bootstrap 5?**
- Mature, stable framework
- Excellent responsive design support
- Pre-built components reduce development time
- Mobile-first approach
- Customizable with CSS variables

## Project Structure

```
cobranza-app-landing/
├── src/
│   ├── components/
│   │   ├── *.vue (10 section components + Navbar + ContactForm)
│   │   └── Footer.vue
│   ├── App.vue (root component)
│   ├── main.ts (entry point)
│   ├── types/ (TypeScript type definitions)
│   ├── styles/
│   │   └── main.css (custom styles)
│   └── assets/ (images, static files)
├── public/ (index.html, favicons)
├── package.json
├── vite.config.ts (if using Vite)
├── tsconfig.json
└── .env (if needed for environment variables)
```

## Development Setup

### Prerequisites
- Node.js 18+ (LTS version)
- npm or yarn package manager
- Git for version control
- Text editor/IDE (VSCode recommended)

### Installation Steps
1. `npm create vue@latest` or copy project structure
2. Install dependencies: `npm install`
3. Install Bootstrap 5: `npm install bootstrap@latest`
4. Configure TypeScript in `tsconfig.json`
5. Set up Vite or vue-cli configuration
6. Copy landing page content to components
7. Create `src/components/` folder structure

## Build & Deployment

### Build Commands
```bash
# Using Vite
npm run build

# Using vue-cli
npm run build
```

### Output
- `dist/` directory with built static files
- Optimized assets (CSS, JS, images)
- Ready for deployment to static hosting

### Deployment Options
- Netlify
- Vercel
- GitHub Pages
- Any static file hosting service

## Environment Variables

### `.env` file (if needed)
```
VITE_APP_TITLE=Cobranza App Landing
```

**Note**: Use `VITE_` prefix for client-side only environment variables.

## Code Style & Best Practices

### Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.vue`)
- **Files**: kebab-case (e.g., `main.css`)
- **Variables/Functions**: camelCase (e.g., `pageTitle`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`)
- **Types/Interfaces**: PascalCase (e.g., `IFeature`)

### Vue Best Practices
- Use `<script setup>` for cleaner component code
- Define props and emits with TypeScript interfaces
- Use `onMounted` for component lifecycle hooks
- Keep components focused and small (< 200 lines)
- Use Composition API for shared logic

### TypeScript Best Practices
- Define types for all props, emits, and reactive data
- Avoid `any` type usage
- Use interfaces for object shapes
- Leverage generic types for reusable components

### Styling Best Practices
- Use Bootstrap classes for layout and common components
- Custom CSS for branding and section-specific styles
- Mobile-first approach
- Responsive breakpoints (sm, md, lg, xl, xxl)

## Dependencies

### Production Dependencies
```json
{
  "vue": "^3.4.0",
  "vue-router": "^4.2.0",
  "typescript": "^5.3.0",
  "bootstrap": "^5.3.0"
}
```

### Development Dependencies
```json
{
  "vite": "^5.0.0",
  "typescript": "^5.3.0",
  "@vitejs/plugin-vue": "^5.0.0",
  "sass": "^1.69.0" (if using SCSS),
  "eslint": "^8.55.0",
  "prettier": "^3.1.0"
}
```

## Browser Support

- **Desktop**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile (latest 2 versions)
- **No**: Internet Explorer (not supported)

## Performance Optimization

- Code splitting by route/component
- Lazy loading of images
- Optimized bundle size
- Minified CSS and JS
- Efficient DOM updates

## Accessibility (a11y)

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation
- Screen reader compatibility
- Sufficient color contrast

## Testing Strategy (Future)

While not required for initial implementation:

- Unit tests for Vue components
- E2E tests for user flows (form submission)
- Visual regression tests for responsive design

## Known Constraints

- **No Backend**: All functionality is client-side
- **No Authentication**: Landing page only
- **No Database**: Form data stored externally (Google Sheets)
- **No Real-time Features**: Static content with minimal interactions
- **Single Page**: No routing between pages
- **No SSR**: Client-side rendering only

## Version Control

- Git for version control
- Branch strategy: `main` (production), `feature/*` (new features)
- Commit messages: Follow conventional commits format

## Documentation

- Comments in code for complex logic
- README.md with setup and deployment instructions
- Component documentation in code (JSDoc or comments)
- AGENTS.md and project-info files for AI agent guidance