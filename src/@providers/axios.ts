import { PetApi } from "@generated";
import axios from "axios";

const axiosInstance = axios.create();

// Configuration and base path are not provided
export const petService = new PetApi(undefined, undefined, axiosInstance);
