# Tuntuni Feed Backend Documentation

Welcome to the Tuntuni Feed backend documentation. This section provides details on the backend architecture, technologies used, and available API endpoints.

## Technologies Used

- **Express:** A fast, unopinionated, minimalist web framework for Node.js.
- **Node.js:** A JavaScript runtime for server-side development.
- **Prisma:** A modern database toolkit for TypeScript and Node.js.
- **PostgreSQL:** A powerful, open-source relational database system.
- **Nodemailer:** A module for Node.js applications to send emails.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Jsonwebtoken:** A library to generate and verify JSON Web Tokens (JWT).
- **Zod:** A TypeScript-first schema declaration and validation library.

## Routes Overview

The backend is organized into routes to handle different aspects of the application. Here are the available routes:

- **Auth Route (`https://opti-feed-backend.vercel.app/api/v1/auth`):** Handles authentication-related functionality.
- **Post Route (`https://opti-feed-backend.vercel.app/api/v1/post`):** Manages operations related to posts.
- **Comment Route (`https://opti-feed-backend.vercel.app/api/v1/comment`):** Handles comments on posts.
- **Notification Route (`https://opti-feed-backend.vercel.app/api/v1/notification`):** Manages user notifications.

### Auth Router

| Method | Endpoint                                                                  | Description                           |
| ------ | ------------------------------------------------------------------------- | ------------------------------------- |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/auth/profile/:id`            | Retrieve user profile by ID.          |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/auth/:username`              | Retrieve user by username.            |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/auth/follow-count/:username` | Get followers count for a user.       |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/auth/sign-up`                | Register a new user.                  |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/auth/sign-in`                | Log in an existing user.              |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/auth/follow/:id`             | Follow/unfollow a user.               |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/auth/change-password`        | Change user password.                 |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/auth/forgot-password`        | Initiate the forgot password process. |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/auth/reset-password`         | Reset user password.                  |
| PATCH  | `https://opti-feed-backend.vercel.app/api/v1/auth/:id`                    | Update user profile.                  |

### Post Router

| Method | Endpoint                                                       | Description                   |
| ------ | -------------------------------------------------------------- | ----------------------------- |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/post/`            | Get all posts.                |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/post/:id`         | Get a post by ID.             |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/post/my-post/:id` | Get posts by a specific user. |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/post/`            | Create a new post.            |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/post/like/:id`    | Like/unlike a post.           |
| PATCH  | `https://opti-feed-backend.vercel.app/api/v1/post/:id`         | Update a post.                |
| DELETE | `https://opti-feed-backend.vercel.app/api/v1/post/:id`         | Delete a post.                |

### Notification Router

| Method | Endpoint                                                       | Description                |
| ------ | -------------------------------------------------------------- | -------------------------- |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/notification/`    | Get all notifications.     |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/notification/:id` | Get a notification by ID.  |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/notification/`    | Create a new notification. |
| PATCH  | `https://opti-feed-backend.vercel.app/api/v1/notification/`    | Update a notification.     |
| DELETE | `https://opti-feed-backend.vercel.app/api/v1/notification/`    | Delete a notification.     |

### Comment Router

| Method | Endpoint                                                  | Description           |
| ------ | --------------------------------------------------------- | --------------------- |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/comment/`    | Get all comments.     |
| GET    | `https://opti-feed-backend.vercel.app/api/v1/comment/:id` | Get a comment by ID.  |
| POST   | `https://opti-feed-backend.vercel.app/api/v1/comment/`    | Create a new comment. |
| PATCH  | `https://opti-feed-backend.vercel.app/api/v1/comment/`    | Update a comment.     |
| DELETE | `https://opti-feed-backend.vercel.app/api/v1/comment/`    | Delete a comment.     |

These routes cover the major functionalities of the Tuntuni Feed backend. Feel free to refer to the source code for detailed implementations of each endpoint.

Best regards,

Faysa Hossain
