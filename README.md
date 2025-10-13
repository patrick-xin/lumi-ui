# Lumi UI

**Composable React components powered by Base UI and Tailwind CSS — built for clarity, speed, and total code ownership.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)

## ✨ What is Lumi UI?

Lumi UI is a collection of beautifully designed, accessible React components built with Base UI primitives and styled with Tailwind CSS. It's **not a component library** — it's a collection of components that you can copy into your apps and customize to your needs.

### 🎯 Key Features

- **🎨 Copy & Paste**: No npm install required. Copy components directly into your project
- **♿ Accessible by Default**: Built on Base UI's WCAG-compliant primitives
- **🎛️ Fully Customizable**: Own your code. Modify anything without ejecting
- **⚡ Performance First**: Smaller bundle sizes with modern React patterns
- **🔧 TypeScript Native**: Strict types and excellent DX out of the box
- **🎭 shadcn-Compatible**: Familiar API patterns if you've used shadcn/ui

## 🚀 Why Base UI over Radix?

| Feature | Base UI | Radix UI |
|---------|---------|----------|
| Bundle Size | Smaller & more lightweight | Larger footprint |
| React Support | Built for React 18/19 | React 16+ |
| Ecosystem | MUI's proven track record | Independent |
| Tree Shaking | Better optimization | Standard |
| API Pattern | `render` prop | `asChild` |

## 📦 Installation

### Prerequisites

- React 18+
- Next.js 13+ (recommended)
- Tailwind CSS 3+
- TypeScript (recommended)

### Quick Start

1. **Set up Tailwind CSS** in your project
2. **Copy the components** you need from our documentation
3. **Customize** to match your design system

```bash
# Install Base UI (peer dependency)
npm install @base-ui-components/react

# Copy a component (example)
npx lumi-ui add button
```

## 🎨 Example Usage

```tsx
import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <Button variant="primary" size="lg">
      Get Started
    </Button>
  )
}
```

## 🏗️ Project Structure

```
your-project/
├── components/
│   └── ui/           # Lumi UI components go here
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── lib/
│   └── utils.ts      # Utility functions
└── ...
```

## 🎯 Philosophy

### Own Your Code
Every component is yours to modify. No need to fork or eject — just edit the files directly.

### Accessibility First
Built on Base UI's accessible primitives with ARIA attributes, keyboard navigation, and screen reader support included.

### Framework Agnostic Styling
While we use Tailwind CSS, you can use any styling solution:
- CSS Modules
- CSS-in-JS (Emotion, styled-components)
- Vanilla CSS
- Mix and match approaches

## 🔄 Comparison with shadcn/ui

| Feature | Lumi UI | shadcn/ui |
|---------|---------|-----------|
| Primitives | Base UI | Radix UI |
| API Style | shadcn-compatible | shadcn native |
| Installation | Copy & paste | Copy & paste |
| Styling | Tailwind CSS | Tailwind CSS |
| TypeScript | ✅ Full support | ✅ Full support |
| Next.js 15 | ✅ Optimized | ✅ Supported |
| Server Components | ✅ Where possible | ✅ Where possible |

## 🎪 Use Cases

### ✅ Perfect for:
- New Next.js projects seeking Base UI primitives
- Teams wanting full component ownership
- Projects requiring deep customization
- Apps needing smaller bundle sizes
- Developers familiar with shadcn patterns

### ❌ Consider alternatives if:
- You need a plug-and-play component library
- You prefer Radix UI primitives specifically
- You don't want to maintain component code
- You need components that update automatically

## 🛠️ Development

### Prerequisites
- Node.js 18+
- pnpm (recommended)

### Setup
```bash
git clone https://github.com/patrick-xin/lumi-ui
cd lumi-ui
pnpm install
pnpm dev
```

### Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run linting
pnpm format       # Format code
pnpm changeset    # Create a changeset
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Commit Convention
This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new button component
fix: resolve accessibility issue in modal
docs: update installation guide
```

## 📄 License

MIT © [Your Name](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Base UI](https://base-ui.com/) - For the accessible primitives
- [shadcn/ui](https://ui.shadcn.com/) - For the inspiration and patterns
- [Tailwind CSS](https://tailwindcss.com/) - For the styling system
- [MUI](https://mui.com/) - For the ecosystem and maintenance

---

**[Documentation](https://lumi-ui.dev) • [Components](https://lumi-ui.dev/components) • [Examples](https://lumi-ui.dev/examples)**