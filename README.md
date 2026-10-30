# QuickFix

A responsive home service booking demo built with React, Vite, Bootstrap 5, React Icons, and React Router. All application data is stored locally in the browser; there is no backend.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Customer | `user@quickfix.com` | `User123` |
| Admin | `admin@quickfix.com` | `Admin123` |

Use the demo account buttons on the sign-in page to fill in the credentials.

## Included flows

- Browse, search, filter, sort, and view details for home services.
- Register, sign in, update a customer profile, and change a demo password.
- Create bookings, view their status and details, and cancel eligible requests.
- Use the admin dashboard to manage services (including service image URLs or local image uploads), booking statuses, provider assignment, and customer records.
- Submit contact messages; review them in browser LocalStorage under `quickfix_messages`.

Bookings can move through **Pending → Confirmed → Provider Assigned → On The Way → In Progress → Completed**. Admins can also cancel a request.

## Demo security note

Authentication and authorization here are frontend demonstrations only. Passwords and account data are stored in browser LocalStorage and are not secure for production use. A real service needs a backend, secure password handling, and server-side authorization.
