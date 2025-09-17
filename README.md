Here is a complete `README.md` file you can use for your project, structured clearly and concisely:

---

````md
# Quiet Hours Scheduler

A web application that allows users to schedule silent-study time blocks. Users receive email notifications before their block starts.

---

## 🚀 Features

- Authenticated user sessions (Supabase)
- Silent study block creation
- Email notifications using Resend API
- Data storage in Supabase & MongoDB

---

## ✅ Prerequisites

- Node.js (v16+)
- NPM
- Supabase account
- Resend account
- MongoDB (MongoDB Atlas is recommended)
- Render account (for deployment)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/quiet-hours-scheduler.git
cd quiet-hours-scheduler
````

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Email Service (Resend)
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@yourdomain.com

# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

#### Where to get the keys:

* **Supabase Project URL & Anon Key**:
  Login to [https://app.supabase.com](https://app.supabase.com) → Select your project → Settings → API → Copy `Project URL` and `anon public key`

* **Supabase Service Role Key**:
  Login to [https://app.supabase.com](https://app.supabase.com) → Select your project → Settings → API → Copy `Service Role Key`

* **MongoDB URI**:
  Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → Create a Cluster → Create a Database User → Copy the connection string

* **Resend API Key**:
  Login to [https://resend.com](https://resend.com) → Go to API Keys section → Create a key → Copy token

* **FROM\_EMAIL**:
  Add and verify your domain in Resend → Use a verified domain as your `FROM_EMAIL`, e.g., `noreply@yourdomain.com`

---

### 4. Development

Start the development server:

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)
```
