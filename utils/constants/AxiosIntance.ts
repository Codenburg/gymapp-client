import axios from "axios";
import { baseURL } from "./Keys";

export const instance = axios.create({
    baseURL,
  });
  