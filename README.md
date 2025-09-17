

```markdown
# Quiet Hours Scheduler

A web application that allows users to schedule quiet-study sessions, sends email reminders before the session starts, and provides an easy-to-use dashboard.

## Features

- User Authentication via Supabase
- Schedule quiet hours
- CRON job to send email reminders
- Resend integration for sending emails
- MongoDB for data storage

## Tech Stack

- Next.js
- Supabase Auth
- MongoDB Atlas
- Resend Email API
- TypeScript
- Node.js

## Environment Variables

Create a `.env.local` file in the root directory with the following:

```

NEXT\_PUBLIC\_SUPABASE\_URL=[https://your-supabase-url.supabase.co](https://your-supabase-url.supabase.co)
NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY=your-supabase-anon-key
SUPABASE\_SERVICE\_ROLE\_KEY=your-service-role-key
MONGODB\_URI=mongodb+srv://your-mongodb-uri
SUPABASE\_ACCESS\_TOKEN=your-supabase-access-token
RESEND\_API\_KEY=your-resend-api-key
FROM\_EMAIL=[onboarding@resend.dev](mailto:onboarding@resend.dev)
NEXTAUTH\_URL=[http://localhost:3000](http://localhost:3000)
NEXTAUTH\_SECRET=your-nextauth-secret
CRON\_SECRET=your-cron-secret

````

## Setup

1. Clone the repository

    ```
    git clone https://github.com/your-username/quiet-hours-scheduler.git
    cd quiet-hours-scheduler
    ```

2. Install dependencies

    ```
    npm install
    ```

3. Start development server

    ```
    npm run dev
    ```

4. Open in browser

    ```
    http://localhost:3000
    ```

## Testing Email & CRON

### Test Email Sending

Visit in browser:

````

[http://localhost:3000/api/test-email-simple](http://localhost:3000/api/test-email-simple)

```

### Test Actual CRON Job

Visit in browser:

```

[http://localhost:3000/api/test-real-cron](http://localhost:3000/api/test-real-cron)

````

## Data Model

MongoDB Collection: `quietHours`

Example document:

```json
{
  "_id": { "$oid": "..." },
  "userId": "user-uuid",
  "title": "Morning Study Session",
  "startTime": { "$date": "..." },
  "endTime": { "$date": "..." },
  "emailSent": true,
  "createdAt": { "$date": "..." }
}
````

## Deployment to Render

1. Go to [https://render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set Environment:

   * Build Command: `npm install && npm run build`
   * Start Command: `npm start`
5. Add environment variables in the Render dashboard matching your `.env.local`.
6. Deploy

## Final Test Sequence

1. Create a quiet hour scheduled a few minutes in the future from the dashboard

2. Visit the endpoint:

   ```
   http://your-deployed-app-url/api/test-real-cron
   ```

3. Monitor your email inbox for the reminder

4. Verify that the document field `emailSent` is now `true` in MongoDB Atlas

## Notes

* Ensure all environment variables are correctly set
* Avoid hardcoded secrets in production

