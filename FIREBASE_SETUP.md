# Firebase Setup Guide for Interactions Feature

This guide will help you set up Firebase for the Interactions component, which enables likes, dislikes, and comments on case studies and articles.

## Prerequisites

- A Google account
- Firebase CLI (optional, for deploying security rules)

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "portfolio-interactions")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click on the web icon (`</>`) to add a web app
2. Give your app a nickname (e.g., "Portfolio Website")
3. You don't need to set up Firebase Hosting
4. Click "Register app"
5. Copy the Firebase configuration object - you'll need these values

## Step 3: Enable Firestore Database

1. In the Firebase Console, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode" (we'll add custom rules)
4. Select a Cloud Firestore location (choose one close to your users)
5. Click "Enable"

## Step 4: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

## Step 5: Deploy Firestore Security Rules

### Option A: Using Firebase Console (Recommended for beginners)

1. Go to "Build" > "Firestore Database" > "Rules"
2. Copy the contents of `firestore.rules` from this project
3. Paste it into the rules editor
4. Click "Publish"

### Option B: Using Firebase CLI

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init firestore
   ```
   - Select your Firebase project
   - Accept the default `firestore.rules` file location
   - Skip the indexes file for now

4. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to a case study or article page
3. Try liking/disliking and adding a comment
4. Check your Firebase Console > Firestore Database to see the data

## Firestore Data Structure

The interactions are stored in the following structure:

```
interactions (collection)
  └── {contentId} (document)
      ├── likes: number
      ├── dislikes: number
      ├── userReactions: { [userId]: 'like' | 'dislike' }
      └── comments (subcollection)
          └── {commentId} (document)
              ├── userId: string
              ├── text: string
              ├── author: string
              └── createdAt: timestamp
```

## Security Notes

- The current setup does NOT require user authentication
- Users are identified by a unique ID stored in localStorage
- Firestore rules validate:
  - Comment text length (1-1000 characters)
  - Required fields
  - Data types
- Comments are immutable (cannot be edited or deleted once created)

## Optional: Set Up Firebase Analytics

If you enabled Analytics during setup:

1. Go to "Analytics" in the Firebase Console
2. View real-time user interactions
3. Track engagement metrics

## Troubleshooting

### "Missing or insufficient permissions" error

- Check that you've deployed the Firestore security rules
- Verify the rules are published in the Firebase Console

### Environment variables not loading

- Ensure `.env.local` exists and has the correct values
- Restart your development server after adding environment variables
- Make sure all variables start with `NEXT_PUBLIC_`

### Comments not showing up

- Check the browser console for errors
- Verify your Firestore database is in the correct region
- Check that the `contentId` prop is being passed correctly

## Support

For issues with Firebase setup:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

For issues with the Interactions component:
- Check the browser console for error messages
- Ensure Firebase is properly initialized
- Verify environment variables are set correctly
