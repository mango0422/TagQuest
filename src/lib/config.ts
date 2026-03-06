export const config = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'development',
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? 'TagQuest',
  isDev: process.env.NEXT_PUBLIC_APP_ENV === 'development',
  isProd: process.env.NEXT_PUBLIC_APP_ENV === 'production',
} as const;
