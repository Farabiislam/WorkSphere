# 🚀 WorkSphere – Employee Management Platform


**Live Link:** [https://worksphere-a80ec.web.app/](https://worksphere-a80ec.web.app/)  

WorkSphere is a full-featured Employee Management platform where Admins, HRs, and Employees collaborate to track work progress, manage payroll, verify employment, and analyze performance visually. The app is built with role-based access control and real-time feedback using modern web technologies like React, Express, Firebase, and MongoDB.

---

## 🔑 Key Features

- 🔐 **Role-Based Authentication**: Users can register as `Employee` or `HR`. Only Admins are created manually via backend.
- 📋 **Employee WorkSheet**: Employees can submit, edit, or delete daily work logs (tasks, hours, date).
- 💸 **HR Payroll Management**: HRs can verify employees, view their details, and issue payment requests for verified employees.
- 📊 **Admin Dashboard**: Admins can approve payrolls, promote employees to HR, fire users, and adjust salaries (only increase allowed).
- 📈 **Bar Chart Visualization**: HRs can view individual employee salary records over time using dynamic bar charts.
- ✅ **Verified Toggle**: HRs can toggle employee verification status directly in the table UI.
- 🔄 **Persistent Sessions**: After reload or refresh, private routes persist login using Firebase token.
- 🌐 **Responsive Design**: Fully optimized for desktop, tablet, and mobile views.
- 📦 **Environment Variables**: Firebase config and MongoDB credentials are securely hidden using `.env`.
- 🧠 **Secure API Routes**: JWT/Firebase token middleware is used for role-based API protection.
- 📬 **Contact Form**: Public users can contact the company. Admins can view all messages received.
- 📅 **Payment History**: Employees can view their payment history in a paginated table.

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js + Vite  
- Tailwind CSS + ShadCN UI  
- React Router  
- Firebase Auth (Email/Password + Google login)  
- TanStack Query & Table  
- SweetAlert2 for notifications

**Backend:**  
- Express.js  
- MongoDB (No Mongoose)  
- Firebase Admin SDK (for verifying tokens)  
- JWT / Firebase token-based role validation




