# EmailJS Setup Guide

This project uses [EmailJS](https://www.emailjs.com/) to handle contact form submissions directly from the browser without a dedicated backend.

## Prerequisites

- An EmailJS account. You can sign up for free at [emailjs.com](https://dashboard.emailjs.com/sign-up).

## Setup Instructions

### 1. Create an Email Service

1. Log in to your EmailJS dashboard.
2. Go to **Email Services** in the sidebar.
3. Click **Add New Service**.
4. Select your email provider (e.g., Gmail, Outlook, etc.).
5. Connect your account and click **Create Service**.
6. Note down the **Service ID** (e.g., `service_xxxxxxx`).

### 2. Create an Email Template

1. Go to **Email Templates** in the sidebar.
2. Click **Create New Template**.
3. In the template editor, you can customize the email content. Use the following dynamic variables to match the form fields in this project:
    - `{{user_name}}`: The name of the person sending the message.
    - `{{user_email}}`: The email address of the sender.
    - `{{message}}`: The content of the message.
4. (Optional) Set the **To Email** address to where you want to receive these messages.
5. Click **Save**.
6. Note down the **Template ID** (e.g., `template_xxxxxxx`).

### 3. Get Your Public Key

1. Go to **Account** (or **Integration** in some versions) in the sidebar.
2. Under the **API Keys** tab, find your **Public Key**.
3. Note down the **Public Key**.

### 4. Configure Environment Variables

1. In the root of your project, create a `.env.local` file (if it doesn't exist).
2. Add the following variables using the IDs you collected:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Replace `your_service_id`, `your_template_id`, and `your_public_key` with your actual EmailJS credentials.

## Form Implementation Details

The contact form is located in `src/components/Contact.tsx`. It uses the `@emailjs/browser` SDK.

The input fields are named as follows:
- Name input: `name="user_name"`
- Email input: `name="user_email"`
- Message textarea: `name="message"`

If you change these names in the code, ensure you also update the corresponding placeholders in your EmailJS template.

## Testing

Once the environment variables are set, restart your development server:

```bash
pnpm dev
```

Fill out the contact form on the website and click **SEND MESSAGE**. You should receive a success message on the screen and an email in your inbox.
