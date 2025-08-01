# Hotel Reservation System API 🏨

A comprehensive and secure RESTful API for a modern hotel reservation system. This backend service is built with Node.js, Express, and MongoDB and provides a full suite of features for managing users, hotels, rooms, bookings, and reviews.

***

## ✨ Features

* **Authentication:** Secure user authentication using JSON Web Tokens (JWT).
* **Password Management:** Full password lifecycle support, including forgot password and reset password functionality via email.
* **Role-Based Access Control (RBAC):** Three distinct user roles with different permissions:
    * **Customer:** Can browse hotels, make and view their own bookings, and write reviews.
    * **Manager:** Can manage all aspects of the hotel they are assigned to, including rooms and bookings.
    * **Super Admin:** Has complete control over the system, including managing users, hotels, and assigning managers.
* **Hotel & Room Management:** Full CRUD operations for hotels and rooms.
* **Booking System:** Robust booking functionality for customers.
* **Review System:** Allows customers to rate and review hotels they've stayed at.
* **Security:** Implemented with best practices, including data sanitization, rate limiting, and protection against common vulnerabilities like XSS and parameter pollution.

***

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JSON Web Token (`jsonwebtoken`), `bcryptjs`
* **Email:** `Nodemailer`
* **Security:** `cors`, `helmet`, `express-mongo-sanitize`, `xss-clean`, `hpp`
* **Environment Variables:** `dotenv`

***

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v14 or higher)
* npm
* MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Ahmed-Naeim/hotel-reservation-system-api.git](https://github.com/Ahmed-Naeim/hotel-reservation-system-api.git)
    cd hotel-reservation-system-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `config.env` file in the root of the project and add the following configuration. Replace the placeholder values with your actual credentials.

    ```env
    # Application environment and port
    NODE_ENV=development
    PORT=3000

    # MongoDB connection string
    DATABASE=your_mongodb_connection_string

    # JWT configuration
    JWT_SECRET=your-super-secret-and-long-jwt-key
    JWT_EXPIRES_IN=90d
    JWT_COOKIE_EXPIRES_IN=90

    # Email configuration (for password reset)
    EMAIL_HOST=your_email_provider_host
    EMAIL_PORT=your_email_provider_port
    EMAIL_USERNAME=your_email_username
    EMAIL_PASSWORD=your_email_password
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The API will be available at `http://localhost:3000/api/v1`.

***

## 🔐 User Roles

The API defines three user roles to manage permissions effectively:

* **Customer:** The default role for any new user. They can manage their profile, book rooms, and leave reviews.
* **Manager:** Appointed by a Super Admin. They have control over a specific hotel assigned to them, including managing its rooms and bookings.
* **Super Admin:** Has unrestricted access to all API resources. They can manage hotels, users, and assign roles.

***

## 📚 API Endpoints

All endpoints are prefixed with `/api/v1`. Authentication is required for protected routes via a Bearer Token in the `Authorization` header.

### Authentication

| Method | Endpoint | Description | Access |
|:--- |:--- |:--- |:--- |
| `POST` | `/auth/signup` | Registers a new user (defaults to 'customer' role). | Public |
| `POST` | `/auth/login` | Logs in a user and returns a JWT token. | Public |
| `POST` | `/auth/forgotPassword` | Sends a password reset token to the user's email. | Public |
| `PATCH`| `/auth/resetPassword/:token`| Resets the user's password using the token. | Public |

### Users

| Method | Endpoint | Description | Access |
|:--- |:--- |:--- |:--- |
| `GET` | `/users/me` | Gets the profile of the currently logged-in user. | Authenticated |
| `GET` | `/users` | Retrieves a list of all users. | Super Admin |
| `PATCH`| `/users/:id` | Updates a user's details (e.g., assign 'manager' role). | Super Admin |

### Hotels

| Method | Endpoint | Description | Access |
|:--- |:--- |:--- |:--- |
| `GET` | `/hotels` | Retrieves a list of all hotels. | Public |
| `GET` | `/hotels/:id` | Retrieves a single hotel by its ID. | Public |
| `POST` | `/hotels` | Creates a new hotel. | Super Admin |
| `PATCH`| `/hotels/:id` | Updates an existing hotel's details. | Super Admin, Manager |

### Rooms

| Method | Endpoint | Description | Access |
|:--- |:--- |:--- |:--- |
| `GET` | `/hotels/:hotelId/rooms` | Retrieves all rooms for a specific hotel. | Authenticated |
| `POST` | `/hotels/:hotelId/rooms` | Creates a new room for a specific hotel. | Super Admin, Manager |

### Bookings

| Method | Endpoint | Description | Access |
|:--- |:--- |:--- |:--- |
| `POST` | `/bookings` | Creates a new booking for a room. | Customer |
| `GET` | `/bookings/my-bookings` | Retrieves all bookings for the logged-in user. | Customer |
| `GET` | `/bookings` | Retrieves all bookings in the system. | Super Admin, Manager |

### Reviews

| Method | Endpoint | Description | Access |
|:--- |:--- |:--- |:--- |
| `GET` | `/hotels/:hotelId/reviews` | Retrieves all reviews for a specific hotel. | Public |
| `POST` | `/hotels/:hotelId/reviews` | Creates a new review for a hotel. | Customer |

***

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

***
