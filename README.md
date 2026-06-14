# Ecommerce Clothes Frontend

Frontend application for the Ecommerce Clothes project. This project uses React, TypeScript, Vite, Tailwind CSS, JWT authentication, and role-based UI rendering.

## Versions Used

- Node.js: v25.9.0
- npm: v11.12.1
- React: 19.2.6
- Tailwind CSS: 4.3.1
- IDE: Visual Studio Code

## Requirements

Install these before running the project:

- Node.js
- npm
- Visual Studio Code

The backend should also be running because the frontend calls the backend APIs.

## Project Setup

Clone the frontend project into your system and open the frontend folder in VS Code.

```bash
cd ecommerce_clothes_frontend
npm install
```

You can also use:

```bash
npm i
```

This command installs all packages used in the frontend project.

## Environment Setup

Check the `.env` file and make sure the backend API URL is correct.

Example:

```env
VITE_API_URL=http://localhost:5000
```

## Run Frontend

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Folder Structure

- `src/context`: authentication, cart, and theme context providers.
- `src/features`: feature modules such as auth, products, cart, users, roles, and categories.
- `src/hooks`: reusable React hooks.
- `src/lib`: shared utility functions.
- `src/shared/pages`: common layout pages.
- `src/shared/services`: reusable API and helper services.
- `src/shared/ui`: shared UI components such as buttons, inputs, dropdowns, modals, and responsive helpers.
- `public`: static frontend assets.

## Authentication

After login, the JWT token is stored in browser local storage. The frontend uses this token to call protected backend APIs and show UI based on the logged-in user's role and permissions.

## AI Tool Usage

For UI enhancement, layout improvement, and maintenance support, AI tools such as Codex and Antigravity were used.
