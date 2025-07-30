# User Modal Project

A full-stack application for managing users with a modern React frontend and a Node.js/Express backend.

## Features

- Add users with name, email, and role (user/admin)
- Form validation with Zod and react-hook-form
- Toast notifications for feedback
- Clean, modern UI with CSS modules
- REST API for user management

## Project Structure

```
userModal/
  client/    # React frontend
  Server/    # Node.js/Express backend
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Setup

#### 1. Clone the repository

```bash
git clone <repo-url>
cd userModal
```

#### 2. Install dependencies for both client and server

```bash
cd client
npm install
cd ../Server
npm install
```

#### 3. Start the backend server

```bash
cd Server
npm start
# The server runs on http://localhost:3000
```

#### 4. Start the frontend

```bash
cd ../client
npm run dev
# The app runs on http://localhost:5173
```

## Usage

- Open the frontend in your browser.
- Use the form to add users.
- Navigate to the dashboard for more features (if implemented).

## Tech Stack

- **Frontend:** React, TypeScript, react-hook-form, Zod, react-toastify, CSS Modules, Vite
- **Backend:** Node.js, Express
- **Real Time Connection:** Socket.io
  

## Folder Details

- `client/` - React app source code
- `Server/` - Express API for user management

## License

MIT
