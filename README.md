🛒 Elevate Commerce

A modern, fully server-side rendered e-commerce Single Page Application built with Angular v21 SSR, showcasing the latest Angular features in a real-world production setup.

🔗 Live Demo: elevatecommercessr.vercel.app


📸 Screenshots


<img width="1763" height="2063" alt="ElevateCommercePageIn" src="https://github.com/user-attachments/assets/b2f963ef-41aa-4e8c-8dce-0512a26d71eb" />





✨ Features


🛍️ Browse and search products fetched from a RESTful backend API
🔍 Client-side product filtering via a custom Angular search pipe
🔐 Route guards for protected navigation
💰 Currency and date formatting using built-in Angular pipes
⚡ Lazy-loaded dynamic components for optimized performance
📱 Fully responsive UI across all screen sizes
🧪 Unit tested with Vitest



🚀 What Makes This Project Stand Out

This project was built to explore and apply the latest Angular paradigms:

FeatureDetailsAngular SignalsReactive state management without Zone.js overheadZoneless ArchitectureEliminated Zone.js for improved runtime performanceControl Flow SyntaxUsed @if, @for, @switch instead of legacy structural directivesSSR (Server-Side Rendering)Full Angular Universal SSR for better SEO and initial load performanceStandalone ComponentsNo NgModules — fully modular architecturetakeUntilDestroyed()Automatic RxJS subscription cleanup to prevent memory leaks


🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Angular v21 SSR |
| Language | TypeScript |
| Styling | Tailwind CSS, Flowbite |
| HTTP & Async | HttpClient, RxJS |
| Testing | Vitest |
| Deployment | Vercel |


🏗️ Architecture Highlights


Custom Search Pipe — filters products client-side without additional API calls
Lazy Loading — components loaded on demand based on user interaction
Class Binding — dynamic styling applied based on API response data
Event & Data Binding — two-way data flow between components and templates
Route Guards — protect authenticated routes from unauthorized access



📦 Getting Started

Prerequisites


Node.js v18+
Angular CLI v21


Installation

bash# Clone the repository
git clone https://github.com/Beshoy-Edwar-Aziz/ElevateCommerceSSR.git

# Navigate to the project
cd ElevateCommerceSSR

# Install dependencies
npm install

# Run development server
ng serve

# Run SSR dev server
npm run dev:ssr

Running Tests

bashnpm run test


🌐 Deployment

This project is deployed on Vercel with SSR support enabled.
Live at: https://elevatecommercessr.vercel.app


👤 Author

Beshoy Edwar Aziz


Portfolio: beshoy-edwar-aziz.github.io/Portfolio
GitHub: @Beshoy-Edwar-Aziz
LinkedIn: linkedin.com/in/beshoy-salama-ba734427b
