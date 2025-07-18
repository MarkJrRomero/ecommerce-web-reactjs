export const getEnv = () => {
  return {
    API_URL: import.meta.env.VITE_API_BASE_URL,
  };
};