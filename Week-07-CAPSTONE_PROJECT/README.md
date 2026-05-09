# Blog App (MERN Stack)

A full-stack blogging platform built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It supports role-based access (User, Author, Admin), authentication, article management, comments, and admin controls.

---

##  Features

###  Authentication & Authorization
- JWT-based login system (stored in HTTP-only cookies)
- Role-based access:
  - USER → read articles, comment
  - AUTHOR → create & manage articles
  - ADMIN → manage users & content
- Block/activate user accounts

###  Articles
- Create, edit, delete articles (Author)
- View all published articles (User/Admin)
- Article detail page

###  Comments
- Users can comment on articles

###  Admin Panel
- View all users and authors
- Block/unblock accounts
- View all articles

###  Media Uploads
- Profile image upload using Multer + Cloudinary

---

##  Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- Zustand (state management)
- React Hook Form
- React Hot Toast
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- Multer (file uploads)
- Cloudinary (image storage)
- dotenv

---

##  Project Structure
BLOG-APP/
│
├── backend/
│ ├── APIs/
│ ├── models/
│ ├── middlewares/
│ ├── config/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── store/
│ │ ├── components/
│ │ └── styles/
│ └── vite.config.js
