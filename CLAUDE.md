🧠 Coding Guidelines

You must always write code as if you are a senior software engineer building a production-grade application.

Follow modern best practices in:

- Clean architecture and reusable design patterns
- TypeScript strict typing
- Functional components (no `FC` type)
- Composition over inheritance
- Separation of concerns (UI, logic, state)
- Minimal and meaningful abstractions
- SOLID principles and scalable folder structure

Avoid shortcuts or naive implementations.  
Always prioritize clarity, maintainability, extensibility, and testability in your code.

🎯 When creating shared UI components (e.g., input, select, date picker):

- Use `shadcn/ui` primitives as the base
- Place them in `/components/ui`
- Ensure they follow SOLID principles:
  - Single Responsibility
  - Open/Closed
  - Composition-friendly

📦 Reusable UI components must:

- Accept `className`, `...props`, and type-safe inputs
- Export props and types separately
- Support accessibility and keyboard interaction
- Be easily styled with TailwindCSS

🧪 They should be easy to test and mock in isolation

---

📌 Examples of instructions that should be routed to `/components/ui`:

- “Create a reusable input component”
- “Build a shared date range picker”
- “Make a common searchable dropdown”

Do **not** place all components in `/components/ui`. Only shared UI elements go there.
