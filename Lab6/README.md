# Lab 6 - Orchids management (axios + mockapi.io)

React + Vite, Bootstrap, React Router, Formik + Yup, data from mockapi.io via `axios`.

## Run
```
pnpm install
pnpm dev
```

## mockapi.io setup (required before the app shows data)
Create these resources in the mockapi project (see `src/api/config.js` for the base URL):
- `orchids`: name (String), rating (Number), isSpecial (Boolean), isNatural (Boolean), image (String), color (String), origin (String), category (String)
- `accounts`: username (String), password (String), role (String) - add one record with role `admin`

## Requirements checklist
- [x] GET orchids from mockapi (no hardcoded data)
- [x] Browse + search (Home), Detail
- [x] Admin login (`/login`) + protected `/admin`
- [x] POST / PUT / DELETE with axios
- [x] Formik (Add/Edit form) + Yup validation
- [x] Loading state, error handling, user feedback
- [x] UI refreshed after every CRUD action
- [x] Attractive UI

## Structure
```
src/
  api/        config.js, orchidApi.js, authApi.js
  context/    AuthContext.js, AuthProvider.jsx
  hooks/      useAuth.js
  components/ Navbar, ProtectedRoute, StatusMessage, OrchidCard, OrchidForm
  pages/      Home, Detail, Login, AdminDashboard, NotFound
```
