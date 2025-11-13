# 🛡️ Secure Auth Portal

A modern, responsive, and professional authentication portal built as part of the **Software Engineer Technical Assessment**.  
This project implements complete authentication flows with clean UI/UX, modular React components, and Tailwind CSS styling.

---

## 🚀 **Project Overview**

This web application demonstrates essential authentication flows:

- **Login**
- **Sign-Up / Registration**
- **Forgot Password**
- **Verification Code**
- **Set New Password**

The project prioritizes responsiveness, component reusability, clean code structure, and UI consistency inspired by the Figma reference provided during the assessment.

---

## ✨ **Key Features & Assessment Deliverables**

| Evaluation Criteria                       | Implementation                | Technical Detail                                                                                                                 |
| ----------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **UI/UX Design Quality & Responsiveness** | Modern Adaptive Layout        | Tailwind responsive utilities (`sm:`, `md:`, `lg:`). Fully responsive two-column layout on desktop and stacked layout on mobile. |
| **Code Quality & Structure**              | Component-Based Architecture  | Reusable components: `TextInput`, `PasswordInput`, `PrimaryButton`, `OAuthButton`, etc. Clean separation of concerns.            |
| **Validation & Functionality**            | Robust Client-Side Validation | - Email Regex Validation<br>- Strong Password Rules (min 8 chars, uppercase, number)<br>- Confirm Password Match                 |
| **Creativity & Attention to Detail**      | Custom Toast Modal System     | Replaces all native alerts with beautiful, theme‑consistent toast notifications.                                                 |
| **Complete Flow Coverage**                | Simulated Backend             | Uses `localStorage` to simulate auth state, verification codes, and password reset flow.                                         |

---

## 🛠️ **Tech Stack**

- **React** (Functional Components, Hooks)
- **Tailwind CSS** (Utility-first responsive design)
- **React Router**
- **Lucide Icons** (Clean, scalable icons)
- **LocalStorage** (Simulated backend behavior)

---

## 📂 **Code Structure & Major Components**

| Component                        | Description                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------- |
| **App.jsx**                      | Main entry point managing routing, UI layout, state, and right-side image panel. |
| **useInternalRouter**            | Custom hook simulating navigation logic similar to React Router.                 |
| **MessageModal / ToastProvider** | Custom modal/notification system for cleaner UX.                                 |
| **LoginPage.jsx**                | Handles email/password login with validation.                                    |
| **SignupPage.jsx**               | Multi-field registration with strong password policy.                            |
| **ForgotPasswordPage.jsx**       | Captures email to initiate password reset.                                       |
| **VerifyCodePage.jsx**           | 6‑digit code input & validation.                                                 |
| **SetNewPasswordPage.jsx**       | User sets new password after successful verification.                            |

---

## ⚙️ **Installation & Local Setup**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/AbhinavRai24/login-and-signup-webapp
cd login-and-signup-webapp
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Run Application (Development Mode)**

```bash
npm run dev
```

Access it at the URL Vite provides (usually):

```
http://localhost:5173/
```

### **4️⃣ Build for Production**

```bash
npm run build
```

---

## 🧠 **What This Project Demonstrates**

- Strong UI/UX implementation skills
- Clean code and reusable component architecture
- Ability to convert Figma/UI references into responsive React layouts
- Understanding of authentication flow logic
- Attention to detail and polished user experience