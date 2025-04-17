# MINILINK
This is a full-stack URL Shortener built with Next.js, MongoDB, and NextAuth.js. It allows users to create, manage, and delete shortened URLs after signing in securely with their Google account.

## Overview

This is a **URL Shortener** app built with **Next.js**, **MongoDB**, and **NextAuth.js**. It allows users to securely create, manage, and delete shortened URLs after signing in with their Google account.

## Features

- **Google Authentication**: Sign in with Google using NextAuth.js.
- **Smart Short URL Generator**: Generates unique short URLs using the `crypto` module.
- **Link Management**: View all your shortened links, delete them, and access the original URLs.
- **Custom Redirection**: Short links redirect users to their original URLs.
- **Clean UI**: A responsive and modern design powered by Tailwind CSS.

## Tech Stack

- **Frontend**: 
  - **Next.js** (React framework for server-side rendering and API routes)
  - **Tailwind CSS** (Utility-first CSS framework for styling)
- **Backend**: 
  - **MongoDB** (NoSQL database for storing user links)
  - **NextAuth.js** (Authentication for secure sign-in with Google)
- **Other Tools**: 
  - **Crypto** (For generating unique short URL slugs)

## How It Works

1. **Authentication**: Users sign in with their Google account using NextAuth.js.
2. **Create Short URL**: Users input a URL and title. The app generates a short URL and stores it in MongoDB.
3. **Link Management**: Users can view, delete, and access their stored links.
4. **Redirection**: Clicking on a short URL redirects to the original URL.

## Installation

### Prerequisites

- **Node.js**: Ensure you have **Node.js** installed. Download it from [here](https://nodejs.org/).
- **MongoDB**: You need a MongoDB instance (either local or cloud). You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/url-shortener-app.git
   ```
2. Navigate to project directory:
   ```bash
   cd url-shortener-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a **.env.local file** in the root of the project and add the following:
   ```bash
   NEXTAUTH_URL=http://localhost:3000
   MONGODB_URI=mongodb://<your_mongo_connection_string>
   NEXTAUTH_GOOGLE_CLIENT_ID=<your_google_client_id>
   NEXTAUTH_GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Visit **http://localhost:3000** to start using the app!

## Usage
- **Sign In**: Use Google to sign in.
- **Create Short Links**: Enter any URL to generate a shortened version.
- **Manage links**: View your links, delete them, or click the shortened URL to be redirected to the original page.

## Contributing
1. Fork the repository
2. Create your feature branch ( ``` bash git checkout -b feature-branch ``` )
3. Commit your changes ( ``` bash git commit -m 'Add new feature' ``` )
4. Push to the branch ( ``` bash git push origin feature-branch ``` )
5. Open a Pull Request.

## License
This project is licensed under the [MIT License](./LICENSE.txt).



