const inProduction = process.env.NODE_ENV === "production";
const developmentURL = "http://localhost:3000/api";
const productionURL = "https://nextjs-bugtracker.vercel.app/api";

module.exports = {
  env: {
    BACKEND_URL: inProduction ? productionURL : developmentURL,
    NEXT_PUBLIC_BACKEND_URL: inProduction ? productionURL : developmentURL,
  },
};
