# Unique Enterprises - Air Cooler Manufacturing Website

## Concept & Vision

A rugged, industrial-grade website that embodies the strength and reliability of heavy-duty manufacturing. The design channels the aesthetic of precision engineering—think exposed steel, hydraulic precision, and factory floor efficiency. This is not a generic corporate template; it's a digital showroom that feels like walking through a premium industrial facility.

## Design Language

### Aesthetic Direction
Industrial minimalism meets premium engineering. Inspired by machinery interfaces, blueprint precision, and the raw beauty of industrial equipment. Sharp edges, structural grids, and purposeful negative space.

### Color Palette
- **Primary Dark**: `#0D0D0D` (near-black for depth)
- **Secondary Dark**: `#1A1A1A` (card backgrounds)
- **Tertiary Dark**: `#262626` (elevated surfaces)
- **Steel Accent**: `#5B8A9A` (muted steel-blue, not typical corporate blue)
- **Copper Highlight**: `#C17F59` (warm industrial accent)
- **Off-White**: `#F5F3F0` (warm white, not sterile)
- **Text Primary**: `#E8E6E3` (slightly warm gray)
- **Text Secondary**: `#8A8A8A` (muted gray)
- **Success**: `#5A9A6B` (available status)
- **Danger**: `#9A5B5B` (out of stock)

### Typography
- **Headings**: "Bebas Neue" (condensed, industrial) - Google Fonts
- **Body**: "Inter" (clean, readable) - Google Fonts
- **Accent/Labels**: "JetBrains Mono" (technical specs) - Google Fonts

### Spatial System
- Base unit: 8px
- Section padding: 120px vertical on desktop, 60px on mobile
- Card padding: 32px
- Grid gap: 24px
- Border radius: 4px (sharp, industrial)

### Motion Philosophy
- GSAP-powered animations with purpose
- Elements slide in from below with stagger (transform: translateY(60px) → 0)
- Opacity fade: 0 → 1 over 0.6s
- Stagger: 0.1s between elements
- ScrollTrigger for section reveals
- Hover states: subtle scale (1.02) with box-shadow lift
- No bouncy or playful animations—everything is precise and controlled

### Visual Assets
- Icons: Lucide icons (line style, 1.5px stroke)
- Product images: Placeholder industrial photography style
- Decorative: Subtle grid patterns, diagonal lines, technical markings

## Layout & Structure

### Page Flow
1. **Navigation** - Fixed top, transparent → solid on scroll
2. **Hero** - Full viewport, split layout (text left, product visual right)
3. **About** - Two-column with large typography and stats
4. **Products** - Grid section with filter capability
5. **Strength/Quality** - Icon grid showcasing USPs
6. **Contact** - Split with form and info
7. **Footer** - Minimal with essential links
8. **WhatsApp FAB** - Fixed bottom-right
9. **Product Modal** - Full-screen overlay for details
10. **Admin Panel** - Hidden overlay (triggered by Ctrl+Alt+O)

### Responsive Strategy
- Desktop: 1200px+ (full experience)
- Tablet: 768px-1199px (adapted grid, smaller hero)
- Mobile: <768px (single column, hamburger menu)

## Features & Interactions

### Navigation
- Smooth scroll to sections
- Active section highlighting
- Mobile: slide-in menu from right

### Hero Section
- Large heading with character animation (letter-by-letter reveal)
- Subtitle fade-in
- CTA buttons with hover state (background fill animation)
- Background: subtle animated grid pattern

### Product Cards
- Image with overlay gradient on hover
- Status badge (Available/Out of Stock)
- Quick specs display
- "Contact for Price" button → opens WhatsApp
- Click anywhere → opens detail modal

### Product Detail Modal
- Full-screen overlay with backdrop blur
- Large image gallery (if multiple images)
- Complete specifications table
- Video embed section (if link provided)
- WhatsApp contact button
- Close on backdrop click or ESC

### WhatsApp Integration
- Floating button (bottom-right, 60px from edge)
- Pulse animation on idle
- On click: window.open(whatsappUrl, '_blank')
- Product "Contact for Price" generates pre-filled message

### Admin Mode
- Multiple access methods:
  - Keyboard: Ctrl+Alt+O
  - Floating button: subtle button at bottom-right corner (15% opacity)
  - URL: add `?admin` to URL (e.g., `yoursite.com/?admin`)
  - Secret: Click the logo 5 times quickly
- Shows login modal (password: "unique2024")
- After login: admin panel slides in from right
- Logout button in admin panel
- Session stored in sessionStorage (clears on tab close)

### Visual Editor
- Click "Enter Edit Mode" to start editing
- All editable text is highlighted with dashed borders
- Click "Toggle Highlight" to show/hide editable areas
- Click any text to edit it inline
- Click "Save Changes" to persist to localStorage
- Click "Exit Edit Mode" to stop editing
- All text content is editable, including "24/7" badge separately

### Contact Form
- Name, email, phone, message fields
- Validation on submit
- Success/error feedback
- (For demo: shows alert with submitted data)

## Component Inventory

### Navigation Bar
- States: transparent (top), solid (scrolled), mobile (collapsed/expanded)
- Logo: text-based "POLARCOOL" in Bebas Neue
- Links: hover underline animation (left to right)

### Hero Section
- Animated heading with letter stagger
- Animated subtitle
- Two CTA buttons: primary (filled), secondary (outlined)

### Product Card
- States: default, hover (lift + shadow), disabled (out of stock overlay)
- Image container with aspect ratio 4:3
- Badge: positioned top-right
- Content: name, description (2 lines max), specs row, CTA button

### Product Modal
- States: closed, opening (fade + scale), open, closing
- Image section (left/top on mobile)
- Details section (right/bottom on mobile)
- Specs table with alternating row colors
- Video embed container (16:9, responsive)

### Stats Card (About section)
- Large number with counting animation
- Label below
- Subtle border accent

### USP Card (Strength section)
- Icon in accent color
- Heading
- Description (2-3 lines)
- Hover: slight lift and border color change

### Contact Form
- Input fields: bottom-border style, label floats up on focus
- Textarea for message
- Submit button: full width, filled style
- Validation states: error (red border + message), success (green border)

### WhatsApp FAB
- Circular button, 56px diameter
- WhatsApp icon (SVG)
- Idle: subtle pulse animation
- Hover: scale 1.1

### Admin Panel
- Slide-in drawer from right (400px wide on desktop, full width on mobile)
- Header with title and close button
- Tabs: "Add Product", "Manage Products"
- Form inputs: consistent with contact form style
- Product list: cards with delete button and toggle

### Login Modal
- Centered modal with backdrop
- Password input
- Submit button
- Error state for wrong password

## Technical Approach

### Architecture
- Single HTML file with linked CSS and JS
- Modular JavaScript (ES6 modules pattern within single file)
- CSS custom properties for theming
- localStorage for data persistence
- sessionStorage for admin session

### Data Model
```javascript
Product {
  id: string (uuid),
  name: string,
  description: string,
  image: string (base64 or URL),
  videoLink: string | null,
  specs: {
    capacity: string,
    size: string,
    usage: string
  },
  available: boolean,
  createdAt: timestamp
}
```

### Storage Keys
- `polarcool_products`: Array of Product objects
- `polarcool_admin_session`: boolean (sessionStorage)

### Key Libraries (CDN)
- GSAP 3.x + ScrollTrigger for animations
- Google Fonts for typography

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- No IE11 support needed
