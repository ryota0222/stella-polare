export const firebaseConfig = {
  type: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TYPE,
  project_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_PROVIDER_URL,
  client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_CERT_URL,
  universe_domain: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UNIVERSE_DOMAIN,
};
