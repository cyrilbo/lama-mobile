import { TEST_DEFAULT_TZ } from "./constants";

const globalSetup = () => {
  process.env.TZ = TEST_DEFAULT_TZ;
  process.env.EXPO_PUBLIC_API_URL =
    "https://lama-mobile-production.up.railway.app";
};

export default globalSetup;
