# AI Rules for Samyun Wan Armenia Application

This document outlines the core technologies and library usage guidelines for developing the Samyun Wan Armenia web application. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Description

*   **React**: The application is built using React for a component-based UI architecture.
*   **TypeScript**: All new components and logic should be written in TypeScript for better type safety and developer experience.
*   **Tailwind CSS**: Styling is handled exclusively with Tailwind CSS, utilizing its utility-first classes for responsive and consistent design.
*   **Next.js**: The project uses Next.js as its framework and build tool for a fast development experience and optimized production builds.
*   **Next.js Router**: For client-side navigation and routing between different views of the application.
*   **Lucide React**: Used for incorporating a wide range of vector icons into the application.
*   **Framer Motion**: Available for implementing declarative and performant animations.
*   **React Intersection Observer**: Utilized for detecting when elements enter or exit the viewport, enabling scroll-based animations and lazy loading.
*   **Next.js Metadata API**: Manages document head tags for SEO and dynamic metadata updates.

## Library Usage Rules

To maintain consistency and leverage the strengths of our chosen libraries, please follow these guidelines:

*   **Styling**:
    *   **ALWAYS** use Tailwind CSS for all styling. Avoid inline styles or custom CSS files unless absolutely necessary for very specific, non-Tailwindable properties.
    *   Utilize Tailwind's responsive utilities (`sm:`, `md:`, `lg:`, etc.) for all responsive designs.
*   **UI Components**:
    *   If a common UI element is needed, create a new, custom component in `src/components/` that uses Tailwind CSS.
*   **Icons**:
    *   **ALWAYS** use icons from the `lucide-react` library.
*   **Routing**:
    *   Implement client-side routing using **Next.js Router** (`next/navigation`).
    *   All primary application routes should be defined and managed within `src/app/`.
*   **Animations**:
    *   For complex, interactive, or gesture-driven animations, use **Framer Motion**.
    *   For simpler animations (e.g., hover effects, basic transitions, fade-ins), leverage Tailwind CSS utility classes or custom CSS keyframes defined in `src/app/globals.css`.
*   **Scroll Effects**:
    *   For detecting element visibility or triggering animations based on scroll position, use `react-intersection-observer`.
*   **SEO & Head Management**:
    *   For dynamically updating `<head>` elements (like `title`, `meta` tags), use **Next.js Metadata API**.
*   **File Structure**:
    *   New components should be created in `src/components/`.
    *   New pages should be created in `src/app/` (using Next.js App Router conventions).
    *   All directory names must be lowercase (e.g., `src/app`, `src/components`).
*   **Serverless Functions**:
    *   For server-side logic, use **Next.js API Routes** (located in `src/app/api/`). These will be automatically deployed as Netlify Functions by the `@netlify/plugin-nextjs`.
    *   Avoid creating separate functions in `netlify/functions/` if the functionality can be handled by Next.js API Routes.
*   **Code Quality**:
    *   Write clean, readable, and well-commented TypeScript code.
    *   Ensure all new features are fully functional and do not contain placeholders or `TODO` comments.
    *   Prioritize creating small, focused components and files (ideally under 100 lines of code per component).