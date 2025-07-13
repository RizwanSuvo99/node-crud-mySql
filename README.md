# Vite React Starter - Basic CRUD

A modern, full-stack CRUD (Create, Read, Update, Delete) application starter built with React, Vite, Express, and Material UI. This project demonstrates a simple contact management system with a RESTful API backend and a responsive frontend UI.

## Features

- **Frontend**: React 18, Vite, Material UI, Axios
- **Backend**: Express.js, CORS, Morgan
- **State Management**: React hooks
- **API Communication**: RESTful endpoints
- **Development Tools**: ESLint, Nodemon, Hot Reloading
- **UI Components**: Contact List, Contact Form, Toast Notifications

---

## Project Structure

```
Basic Crud/
├── public/                # Static assets
├── src/
│   ├── api/               # Backend API (Express server & routes)
│   ├── assets/            # Images and static assets
│   ├── components/        # React components (UI)
│   ├── config/            # API config
│   ├── data/              # Dummy data for development
│   └── services/          # API client and hooks
├── App.jsx                # Main React component
├── main.jsx               # React entry point
├── App.css, index.css     # Styles
├── package.json           # Project metadata & scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RizwanSuvo99/node-crud.git
   cd "Basic Crud"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Running the Application

### 1. Start the Backend Server

The backend API is located in `src/api/server.mjs` and uses Express.js.

```bash
npm run dev:server
```

- The server will start (default: [http://localhost:3001](http://localhost:8080)).

### 2. Start the Frontend (React + Vite)

```bash
npm run dev
```

- The frontend will start (default: [http://localhost:5173](http://localhost:5173)).

> **Note:** You can run both servers in separate terminals for full-stack development.

---

## Available Scripts

- `npm run dev` - Start the Vite development server (frontend)
- `npm run dev:server` - Start the Express backend server
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality

---

## API Endpoints

The backend exposes RESTful endpoints for managing contacts. Example endpoints:

- `GET    /api/contacts` - List all contacts
- `POST   /api/contacts` - Add a new contact
- `PUT    /api/contacts/:id` - Update a contact
- `DELETE /api/contacts/:id` - Delete a contact

See `src/api/contactsRouter.mjs` for details.

---

## Project Highlights

- **Material UI** for modern, responsive design
- **React Hot Toast** for notifications
- **Axios** for HTTP requests
- **Nodemon** for backend auto-reload
- **ESLint** for code linting

---

## Customization

- Adjust API base URL in `src/config/api.js` if your backend runs on a different port.
- Add or modify React components in `src/components/`.

---

## Troubleshooting

- Ensure both backend and frontend servers are running.
- If you change backend code, restart the backend server.
- For CORS issues, check the backend CORS configuration in `src/api/server.mjs`.

---

## License

This project is for educational purposes. You may use, modify, and distribute as needed.

---

## Author

- Rizwan Suvo

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Express](https://expressjs.com/)
- [Axios](https://axios-http.com/)
