export const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY!.replace(
    /\\n/g,
    "\n"
  ),
};
