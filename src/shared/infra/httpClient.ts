import axios from "axios";
import { appEnv } from "./appEnv";

export const httpClient = axios.create({
  baseURL: appEnv.apiUrl,
});
