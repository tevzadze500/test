# TestHub - Professional Testing Platform

A modern, premium testing platform dashboard built with React, Vite, and Tailwind CSS. Inspired by Korpi AI's visual quality, designed specifically for online cognitive, vision, hearing, and performance tests.

## 🎯 Features

### Core Features
- **No Authentication Required** - Instant access to all tests
- **Modern Dashboard UI** - Premium dark-themed SaaS-style interface
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Test Categories** - Organized by Performance, Cognitive, Focus, Vision, and Hearing
- **Featured Tests** - Highlighted popular and trending tests
- **Clean Architecture** - Modular, scalable component structure

### Design Highlights
- Dark mode first (inspired by Korpi AI)
- Smooth hover states and transitions
- Gradient accents and glowing effects
- Modern typography with Inter font
- Premium card designs with depth
- Strategic use of color for emphasis
- Clean information hierarchy

### Available Tests
1. **Reaction Time Test** ⚡ - Featured
2. **ADHD Screening Test** 🎯
3. **Visual Acuity Test** 👁️
4. **Hearing Frequency Test** 🔊
5. **Color Blindness Test** 🌈
6. **Working Memory Test** 🧠
7. **Anticipation Test** 🎯
8. **Auditory Reaction Test** 🔔

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd C:\Users\ADMIN\Desktop\testing-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
testing-platform/
├── src/
│   ├── components/          # React components
│   │   ├── Sidebar.jsx      # Dashboard navigation sidebar
│   │   ├── Hero.jsx         # Hero section with features
│   │   ├── TestCard.jsx     # Reusable test card component
│   │   └── FeaturedTest.jsx # Featured test highlight
│   ├── data/
│   │   └── tests.js         # Test data and utilities
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Tailwind CSS and global styles
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── postcss.config.js        # PostCSS configuration
```

## 🎨 Component Architecture

### Reusable Components

**Sidebar Component**
- Responsive navigation with mobile menu
- Category-based test filtering
- User stats display (placeholder)
- Collapsible on mobile

**TestCard Component**
- Displays test information
- Shows duration, participants, difficulty
- Badges for special attributes
- Hover effects and animations
- Click-to-start functionality

**FeaturedTest Component**
- Large highlighted card
- Stats grid display
- Trending badges
- Call-to-action button

**Hero Component**
- Platform introduction
- Feature highlights
- Quick stats display

## 📊 Test Data Structure

Tests are defined in `src/data/tests.js` with the following structure:

```javascript
{
  id: 'unique-id',
  name: 'Test Name',
  description: 'Test description',
  category: 'Performance', // Cognitive, Focus, Vision, Hearing, Performance
  duration: '2 min',
  difficulty: 'Easy', // Easy, Medium, Hard
  icon: '⚡',
  color: 'green', // green, blue, purple
  popular: true,
  featured: false,
  stats: {
    avgScore: '245 ms',
    participants: '150K+'
  },
  badges: ['Popular', 'Fast']
}
```

### Adding New Tests

1. Add test object to `src/data/tests.js`
2. Test cards will automatically appear in the dashboard
3. Categorization is automatic based on the `category` field

## 🎨 Styling

### Tailwind CSS Configuration

Custom color palette defined in `tailwind.config.js`:
- `dark-*` - Custom dark theme colors (50-950)
- Built-in gradients for green, blue, purple

### Custom Utilities

```css
.glow-green  - Green glow effect
.glow-blue   - Blue glow effect
.glow-purple - Purple glow effect
```

## 🔧 Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🎯 Design Principles

1. **Speed First** - Fast loading, instant interactions
2. **No Friction** - No login, immediate access
3. **Premium Feel** - High-quality visual design
4. **Clean & Minimal** - Focused, uncluttered interface
5. **Scalable** - Easy to add new tests and features
6. **Mobile-First** - Responsive across all devices

## 🚀 Next Steps

### Future Enhancements

1. **Test Implementation**
   - Integrate actual test logic from reaction-time-test
   - Build test pages for each category
   - Add routing with React Router

2. **Results & History**
   - LocalStorage for test results
   - Results history page
   - Performance tracking charts

3. **Personalization**
   - Save favorite tests
   - Recommended tests based on history
   - Custom test playlists

4. **Social Features**
   - Share results
   - Compare with friends
   - Global leaderboards

5. **Additional Tests**
   - Typing speed test
   - Peripheral vision test
   - Focus endurance test
   - Multi-tasking assessment

## 📝 Notes

- No backend required - runs entirely in the browser
- Test data is currently mock data
- Click handlers show alerts - replace with actual test navigation
- All components are production-ready and scalable
- Design inspired by Korpi AI's premium dashboard aesthetic

## 🤝 Contributing

This is a professional testing platform template. To extend:

1. Add new test definitions to `src/data/tests.js`
2. Create test-specific pages in a new `pages/` directory
3. Implement routing for test navigation
4. Add actual test logic from existing implementations

## 📄 License

Private project - All rights reserved

---

**Built with attention to detail, performance, and user experience.**
