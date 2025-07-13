# Convalt Frontend

## Project Info

**Maintainer:** mpho thwala

**Frontend GitHub URL:** <https://github.com/MphoBeeThwala/convalt-frontend>

## How to Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/MphoBeeThwala/convalt-frontend
   ```
2. Navigate to the project directory:
   ```sh
   cd convalt-frontend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## 🚀 Deployment to Vercel

This frontend is ready for deployment on [Vercel](https://vercel.com/).

**Steps:**
1. Connect your GitHub repo to Vercel.
2. Vercel will auto-detect the `frontend/vercel.json` file for configuration.
3. Set any required environment variables in the Vercel dashboard (e.g., `NEXT_PUBLIC_API_URL`).
4. Click "Deploy" and Vercel will handle the rest!

See `frontend/vercel.json` for build configuration and environment variables.

---

## 🔒 Authentication & Route Protection

This app uses JWT-based authentication. The following routes are protected and require the user to be logged in:

- `/basket` — Basket match (user only)
- `/results` — Basket match results (user only)
- `/admin` — Admin dashboard (admin only)

**How it works:**
- On login/signup, a JWT is stored in `localStorage` and user info is decoded for role-based UI.
- The `RequireAuth` component wraps protected pages and redirects unauthenticated users to `/login`.
- If the JWT is expired, the user is automatically logged out and redirected to `/login`.
- Admin-only routes require both authentication and `role: 'admin'` in the JWT.

---

## 🧑‍💻 User Flows

### 1. Login & Signup
- Users can register and log in from `/signup` and `/login`.
- On success, they are redirected to the home page and see personalized navigation.

### 2. Product Search & Basket
- Search for products on `/ProductSearch` and add items to your basket.
- Click "Go to Basket" to pre-fill your basket on `/basket`.
- Enter budget and location, then submit to see matched results on `/results`.

### 3. Admin Dashboard
- Only users with the admin role can access `/admin`.
- Admins can manage products (create/delete) via the dashboard UI (API integration required for live data).

### 4. Logout & Session Expiry
- Click the Logout button in the navigation to end your session.
- If your session expires (JWT expiry), you will be automatically logged out and redirected to `/login`.

---

## 🛡️ Security & Best Practices
- All sensitive routes are protected both in the UI and via backend role-based access control.
- JWTs are checked for expiry on every navigation and API call.
- Navigation bar adapts to user state and role (shows admin/user links as appropriate).
- All flows are documented in code comments for maintainability.
