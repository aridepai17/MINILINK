# MINILINK

This is a full-stack URL Shortener built with Next.js, MongoDB, and NextAuth.js. It allows users to create, manage, and delete shortened URLs after signing in securely with their GitHub account.

## Overview

This is a **URL Shortener** app built with **Next.js**, **MongoDB**, and **NextAuth.js**. It allows users to securely create, manage, and delete shortened URLs after signing in with their GitHub account.

## Features

- **GitHub Authentication**: Sign in with GitHub using NextAuth.js.
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
  - **NextAuth.js** (Authentication for secure sign-in with GitHub)
- **Other Tools**: 
  - **Crypto** (For generating unique short URL slugs)
  - **Vercel** (For deployment and hosting)

## How It Works

1. **Authentication**: Users sign in with their GitHub account using NextAuth.js.
2. **Create Short URL**: Users input a URL and title. The app generates a short URL and stores it in MongoDB.
3. **Link Management**: Users can view, delete, and access their stored links.
4. **Redirection**: Clicking on a short URL redirects to the original URL.

## Live Demo

Visit [https://minilink-rho.vercel.app](https://minilink-rho.vercel.app) to see the app in action.

## Installation

### Prerequisites

- **Node.js**: Ensure you have **Node.js** installed. Download it from [here](https://nodejs.org/).
- **MongoDB**: You need a MongoDB instance (cloud-based). You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database.
- **GitHub OAuth App**: Create an OAuth App in your GitHub account settings.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/minilink.git
   ```

2. Navigate to project directory:
   ```bash
   cd minilink
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a **.env.local file** in the root of the project and add the following:
   ```bash
   NEXTAUTH_URL=https://your-vercel-deployment-url.vercel.app
   NEXTAUTH_SECRET=your_nextauth_secret
   MONGODB_URI=mongodb+srv://<your_mongo_connection_string>
   GITHUB_ID=<your_github_client_id>
   GITHUB_SECRET=<your_github_client_secret>
   ```

5. For local development:
   ```bash
   npm run dev
   ```

6. For production build:
   ```bash
   npm run build
   npm start
   ```

## Deployment on Vercel

1. Fork or push your repository to GitHub.

2. Create an account on [Vercel](https://vercel.com/) if you don't have one.

3. Create a new project in Vercel and import your GitHub repository.

4. Configure your environment variables in the Vercel project settings:
   - `NEXTAUTH_URL` (your Vercel deployment URL)
   - `NEXTAUTH_SECRET` (a random string for session encryption)
   - `MONGODB_URI` (your MongoDB connection string)
   - `GITHUB_ID` (your GitHub OAuth App client ID)
   - `GITHUB_SECRET` (your GitHub OAuth App client secret)

5. Deploy the project.

## Usage

- **Sign In**: Use GitHub to sign in.
- **Create Short Links**: Enter any URL to generate a shortened version.
- **Manage links**: View your links, delete them, or click the shortened URL to be redirected to the original page.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](./LICENSE.txt).
