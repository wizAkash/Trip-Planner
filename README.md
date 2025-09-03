🧳 Trip Planner (Full-Stack Assignment)
A mini full-stack application built with Next.js (App Router, TypeScript), Fastify (TypeScript), and MongoDB.
The app allows users to:

Add a new trip plan
View all trips in a dashboard
Edit an existing trip
Filter trips by destination and budget
(Optional) Extend with search, pagination, and authentication
🚀 Tech Stack
Frontend:

Next.js 13+ (App Router, TypeScript)
React Hook Form + Yup (form handling + validation)
Material UI (UI components)
React Toastify (notifications)
Backend:

Fastify (TypeScript)
MongoDB + Mongoose (ODM)
Zod / Fastify schema for validation
@fastify/cors (CORS handling)
📂 Project Structure
/frontend → Next.js (TypeScript) frontend /backend → Fastify (TypeScript) backend

Backend Setup (Fastify + MongoDB)

```
cd backend
npm install
```

Run Backend

npm run dev
Frontend Setup (Next.js)

```
cd ../frontend
npm install
```

Run Frontend

npm run dev
Features
Submit a new trip plan Edit an existing trip Dashboard with responsive grid layout Reusable TripForm and TripCard components Filters: search by destination & filter by budget Validation on both frontend (Yup) & backend (Fastify schema) Nice UI with Material UI + Toast notifications
