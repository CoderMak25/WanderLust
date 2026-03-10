<h1 align="center">WanderLust</h1>

<p align="center">
  A full-stack web application for discovering, booking, and managing travel accommodations.<br />
  <strong>Interactive Maps</strong> · User Authentication · Property Reviews
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-lightgrey?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb" />
  <img src="https://img.shields.io/badge/EJS-Templating-yellow" />
  <img src="https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap" />
  <img src="https://img.shields.io/badge/Mapbox-GL_JS-blue?logo=mapbox" />
</p>

---

## 📌 Overview

**WanderLust** is a comprehensive full-stack hotel and accommodation booking platform inspired by Airbnb. It allows users to browse unique places to stay, create their own property listings, and interact with the community through a robust rating and review system.

The application integrates advanced features like **interactive maps** to pinpoint property locations precisely, **secure user authentication**, and **cloud-based image storage**, ensuring a seamless and responsive user experience.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Property CRUD Operations** | Seamlessly create, read, update, and delete property listings with detailed information. |
| **Interactive Geolocation Maps** | Built-in Mapbox integration transforms string-based locations into interactive map pins for visual discovery. |
| **User Authentication & Security** | Secure signup, login, and session management powered by Passport.js, protecting specific routes and actions. |
| **Dynamic Review System** | Logged-in users can leave text reviews and 1-5 star ratings for any property listing. |
| **Cloud Image Uploads** | Direct integration with Cloudinary for fast, reliable, and optimized property image uploads and storage. |
| **Flash Notifications** | Contextual, color-coded alert messages summarizing the success or failure of user actions in real-time. |

---

## 🏗️ Architecture

The system utilizes an **MVC (Model-View-Controller)** architectural pattern. It uses an **Express.js** backend to handle API routing, data validation, and controller logic, interacting with a **MongoDB** database via **Mongoose**. The frontend views are rendered server-side using **EJS**.

```
┌──────────────────────────────────────────────────────────┐
│                      Frontend (EJS Views)                │
│       Listings Display · Map Component · User Forms      │
│                  Bootstrap 5 · Custom CSS                │
└────────────────────────┬─────────────────────────────────┘
                         │  HTTP Requests / Responses
┌────────────────────────▼─────────────────────────────────┐
│                   Backend (Express.js)                   │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Routes   │  │ Controllers  │  │   Middleware     │  │
│  │ /listings  │  │ Listing Logic│  │ Authentication   │  │
│  │ /reviews   │  │ Review Logic │  │ Data Validation  │  │
│  │ /users     │  │ User Logic   │  │ Error Handling   │  │
│  └────────────┘  └──────┬───────┘  └──────────────────┘  │
└─────────────────────────┬────────────────────────────────┘
                          │  Mongoose ORM
┌─────────────────────────▼────────────────────────────────┐
│                   Database (MongoDB)                     │
│              Users · Listings · Reviews                  │
└──────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **EJS (Embedded JavaScript)** | Server-side HTML templating engine |
| **Bootstrap 5** | Responsive layout and UI component styling |
| **Mapbox GL JS** | Interactive and customizable mapping library |

### Backend & Database
| Technology | Purpose |
|---|---|
| **Node.js & Express.js** | Server environment & Routing framework |
| **MongoDB & Mongoose** | NoSQL Database & Object Data Modeling (ODM) |
| **Passport.js** | User authentication (Local Strategy) |
| **Cloudinary & Multer** | Cloud image storage and multipart form data parsing |
| **Joi** | Request payload and schema validation |

---

## 📂 Project Structure

```
WanderLust/
├── app.js                  # Main Express server entry point
├── cloudConfig.js          # Cloudinary connection and storage configuration
├── middleware.js           # Custom middleware (auth checks, permissions, validation)
├── package.json            # Project dependencies and details
├── schema.js               # Joi validation schemas for incoming requests
├── controllers/            # Route handler functions
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── models/                 # Mongoose Database Schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/                 # Static assets
│   ├── css/                # Custom stylesheets (style.css, rating.css)
│   └── js/                 # Client-side JavaScript (e.g., map initialization)
├── routes/                 # Express route definitions
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/                  # Utility classes (ExpressError wrapper, async catchers)
└── views/                  # EJS Template files
    ├── error.ejs
    ├── includes/           # Partials: navbar, footer, flash messages
    ├── layouts/            # EJS-mate boilerplate wrappers
    ├── listings/           # Page views for listings (index, show, new, edit)
    └── users/              # Page views for authentication (login, signup)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **MongoDB** (Local instance or MongoDB Atlas)
- **Cloudinary** Account (for image uploads)
- **Mapbox** Account (for location maps)

### 1. Clone & Install

```bash
git clone https://github.com/CoderMak25/WanderLust.git
cd WanderLust

# Install project dependencies
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory and add the following required environment variables:

```bash
# Application Port (Optional, defaults to 8080)
PORT=8080

# Cloudinary Credentials
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox Token
MAP_TOKEN=your_mapbox_public_token

# MongoDB Atlas or Local Connection String
ATLASDB_URL=mongodb://127.0.0.1:27017/wanderlust

# Session Secret Key
SECRET=your_super_secret_session_key
```

### 3. Run the Application

Start the server in development mode:

```bash
node app.js
```

Access the application in your browser at:
`http://localhost:8080/listings`

---

## ⚙️ Core Modules Breakdown

1. **Authentication Flow:** Powered by `passport-local-mongoose`. Sessions are securely stored in MongoDB using `connect-mongo`. Unauthenticated users attempting to access protected routes (like creating a listing or leaving a review) are automatically redirected to the login page.
2. **Geocoding & Maps:** The Mapbox SDK (`@mapbox/mapbox-sdk`) converts user-provided string locations (e.g., "Paris, France") into precise GeoJSON points (latitude, longitude) upon listing creation. The frontend uses `Mapbox GL JS` to plot these coordinates dynamically on individual listing pages.
3. **Image Management:** `multer` intercepts incoming form data containing files. `multer-storage-cloudinary` directly streams these buffers into your configured Cloudinary account, returning a structured object containing the public URL and filename to be saved in the MongoDB document.
4. **Data Cascading:** The `Listing` Mongoose schema utilizes a built-in `findOneAndDelete` post-hook middleware. If a property listing is destroyed, all associated `Review` records are automatically cascade-deleted as well to prevent orphaned database documents.

---

<p align="center">
  Built with ❤️ for Travel Enthusiasts
</p>
