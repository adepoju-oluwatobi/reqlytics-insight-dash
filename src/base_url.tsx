export const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEVELOPMENT_ENDPOINT
    : import.meta.env.VITE_PRODUCTION_ENDPOINT;
