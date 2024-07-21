# SDGP-CS14-Back-end

# NutriMate Blog Backend

This repository contains the backend implementation of the blog functionality for the NutriMate web application. The blog allows users to create, read, update, and delete blog posts related to healthy eating and nutrition.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Overview
NutriMate is a comprehensive solution designed to help users make informed dietary choices. This backend service handles CRUD operations for managing blog posts within the application, providing a robust API for seamless integration with the frontend.

## Features
- Create, read, update, and delete blog posts
- Manage user authentication and authorization
- Handle database interactions with MongoDB
- Validate and sanitize user input
- Secure API endpoints with JWT authentication

## Tech Stack
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication

## Installation
1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/nutrimate-blog-backend.git
    cd nutrimate-blog-backend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the server:**
    ```sh
    npm start
    ```

## Usage
Once the server is running, you can interact with the API using tools like Postman or through the frontend application. Ensure that the server is running on the specified port (default is `5000`).

## API Endpoints
- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in a user

- **Blog Posts**
  - `POST /api/posts` - Create a new blog post
  - `GET /api/posts` - Get all blog posts
  - `GET /api/posts/:id` - Get a single blog post by ID
  - `PUT /api/posts/:id` - Update a blog post by ID
  - `DELETE /api/posts/:id` - Delete a blog post by ID



