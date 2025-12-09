# Harbor Lines ERP Backend

The backend server for the **Harbor Lines ERP** system, built with Node.js, Express, and MongoDB. This API manages authentication, master data, freight configurations, and logistic job operations.

## 🚀 Technologies Used

*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/))
*   **Authentication**: JSON Web Tokens (JWT) & bcryptjs
*   **Security**: Helmet, CORS
*   **Utils**: Dotenv, Cookie Parser, Morgan

## ✨ Features

### 🔐 Authentication & Security
*   Secure user authentication using JWT.
*   Password hashing with bcryptjs.
*   Cookie-based session management.
*   CORS configuration for frontend integration.

### 📡 API Endpoints

#### User Management
*   `/api/auth`: User registration and login.

#### Master Files (Core Data)
*   `/api/customersuppliers`: Manage customers and suppliers.
*   `/api/currencies`: Manage currency data.
*   `/api/uoms`: Unit of Measurement standards.
*   `/api/banks`: Banking information.
*   `/api/taxes`: Tax configurations.

#### Freight Master
*   `/api/vessels`: Shipping vessel management.
*   `/api/flights`: Flight details management.
*   `/api/sea-destinations`: Sea ports and destinations.
*   `/api/air-destinations`: Airports and destinations.

#### Operational Jobs
*   `/api/jobs/sea-import`: Manage Sea Freight Import jobs.

## 🛠️ Installation & Setup

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd Harbor_lines_backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Run the application**:
    *   **Development** (with hot reload):
        ```bash
        npm run dev
        ```
    *   **Start**:
        ```bash
        node src/server.js
        ```

    The server will start on `http://localhost:5000` (or the PORT defined in your .env).

## 📁 Project Structure

*   `src/models`: Mongoose schemas for MongoDB.
*   `src/controllers`: Request logic and handlers.
*   `src/routes`: API route definitions.
*   `src/middleware`: Custom middleware (auth, etc.).
*   `src/utils`: Helper functions.
*   `src/server.js`: Entry point and app configuration.
