# 📚 Study Buddy

**Study Buddy** is an intelligent study companion web application that empowers students to generate **notes, flashcards, and quizzes** with the help of **Google Gemini**.  
It combines AI-powered content generation with an intuitive user interface, making studying smarter and more efficient.

---

## 🌐 Live Demo

-   **Frontend:** [https://study-buddy-ph0.web.app/](https://study-buddy-ph0.web.app/)
-   **Backend:** [https://study-buddy-8i9o.onrender.com/](https://study-buddy-8i9o.onrender.com/)

---

## 🔑 Demo Credentials

Use the following credentials to explore the app:

```
User: admin@demo.com
Pass: Admin123
```

---

## ✨ Key Features

-   🤖 **AI-Powered Learning** – Generate notes, flashcards, and quizzes with **Google Gemini**.
-   🔐 **Secure Authentication** – Implemented with **JWT** for user authentication & authorization.
-   📧 **Password Recovery** – Forgot password functionality powered by **Gmail SMTP**.
-   📂 **Organized Study Material** – Save, manage, and revisit notes, flashcards, and quizzes.

---

## ⚙️ Tech Stack

**Frontend**

-   React
-   React Router
-   Shadcn UI
-   Tailwind CSS
-   Axios

**Backend**

-   Node.js, Express.js
-   Google Gemini API (Google AI Studio, GCP)
-   MongoDB, Mongoose
-   JWT Authentication
-   Gmail SMTP

---

## 📂 Project Structure

```bash
StudyBuddy
├── .git
├── .github
│   └── workflows
│       └── firebase-hosting-pull-request.yml
├── .gitignore
├── .prettierrc
├── backend
│   ├── .env
│   ├── app.js
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── controllers
│       │   ├── ai.controller.js
│       │   ├── auth.controller.js
│       │   └── saved.controller.js
│       ├── middlewares
│       │   └── auth.middleware.js
│       ├── models
│       │   ├── flashcard.model.js
│       │   ├── note.model.js
│       │   ├── quiz.model.js
│       │   └── user.model.js
│       ├── routes
│       │   ├── ai.route.js
│       │   ├── auth.route.js
│       │   └── saved.route.js
│       ├── services
│       │   ├── ai.service.js
│       │   └── db.service.js
│       └── utils
│           ├── ApiResponse.util.js
│           ├── generate.util.js
│           └── sendMail.util.js
└── frontend
    ├── .env
    ├── .firebase
    │   ├── hosting.ZGlzdA.cache
    │   └── hosting.cHVibGlj.cache
    ├── .firebaserc
    ├── .gitignore
    ├── components.json
    ├── dist
    ├── eslint.config.js
    ├── firebase.json
    ├── index.html
    ├── jsconfig.app.json
    ├── jsconfig.json
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── index.html
    │   ├── page-not-found.svg
    │   └── vite.svg
    ├── src
    │   ├── Router.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   ├── PrivateRoute.jsx
    │   │   ├── app-sidebar.jsx
    │   │   ├── auth
    │   │   │   ├── LoginForm.auth.jsx
    │   │   │   └── RegisterForm.auth.jsx
    │   │   ├── dashboard
    │   │   │   └── DashboardLayout.jsx
    │   │   ├── flashcard.jsx
    │   │   └── ui
    │   │       ├── button.jsx
    │   │       ├── card.jsx
    │   │       ├── input.jsx
    │   │       ├── label.jsx
    │   │       ├── separator.jsx
    │   │       ├── sheet.jsx
    │   │       ├── sidebar.jsx
    │   │       ├── skeleton.jsx
    │   │       ├── textarea.jsx
    │   │       └── tooltip.jsx
    │   ├── context
    │   │   └── Auth.context.jsx
    │   ├── hooks
    │   │   └── use-mobile.js
    │   ├── index.css
    │   ├── lib
    │   │   └── utils.js
    │   ├── main.jsx
    │   └── pages
    │       ├── Dashboard.jsx
    │       ├── Home.page.jsx
    │       ├── NotFound.page.jsx
    │       ├── auth
    │       │   ├── ForgetPassword.auth.jsx
    │       │   ├── Login.auth.jsx
    │       │   └── Register.auth.jsx
    │       ├── flashcards
    │       │   ├── CreateFlashcard.jsx
    │       │   ├── ViewFlashcards.jsx
    │       │   └── ViewSingleFlashcard.jsx
    │       ├── notes
    │       │   ├── CreateNote.jsx
    │       │   ├── ViewNotes.jsx
    │       │   └── ViewSingleNote.jsx
    │       └── quizzes
    │           ├── CreateQuiz.jsx
    │           ├── ViewQuizzes.jsx
    │           └── ViewSingleQuiz.jsx
    └── vite.config.js
```

---

## 👨‍💻 Credits

-   **Developer:** Muhammad Habibul Hasan
-   **Email:** programmerhasan0@gmail.com

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and contribute! 🚀
