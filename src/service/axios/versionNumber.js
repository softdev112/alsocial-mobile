import { apiRequest } from "./api";
import R from "res/R";

export const versionNumberRequest = () => apiRequest("GET", R.endpoints.versionNumber);
