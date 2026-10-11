# Organik Case UI

Frontend for the Organik Case project: a React single-page app covering
registration, login, two-factor code verification and a basic profile screen.

## Tech stack

- **React 19** + **Vite 8**
- **React Router 7** for routing
- **TanStack Query 5** for data fetching/mutations
- **React Hook Form 7** + **Zod 4** for form state and validation
- **Tailwind CSS 4** (via the `@tailwindcss/vite` plugin)
- **ESLint 10** flat config, with `@eslint-react` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`

> `@eslint-react` requires `typescript` at runtime, so it is installed as a
> lint-only dev dependency on the 6.x line (the `ts-api-utils` used by
> `@eslint-react` is not yet compatible with TypeScript 7).

## Getting started

```bash
npm install
npm run dev
```

The app expects the backend API to be reachable at the URL defined in `.env`:

```env
VITE_API_URL=https://localhost:7037
```

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR       |
| `npm run build`   | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Lint the project with ESLint             |

## Project structure

```
src/
  api/
    client.js      # fetch wrapper + ApiError
    auth.js        # login / register / send-code / check-code calls
  lib/
    session.js     # token & user id persistence
  Login.jsx        # login screen
  Register.jsx     # registration screen
  CheckCode.jsx    # code delivery + verification screen
  App.jsx          # authenticated profile screen
  main.jsx         # router + providers bootstrap
```

## Routes

| Path          | Screen              |
| ------------- | ------------------- |
| `/`           | Login               |
| `/register`   | Register            |
| `/check-code` | Code verification   |
| `/profile`    | Profile (logged in) |
