import axios from "axios";
import { PetApi } from "@generated";


const axiosInstance = axios.create();

// Configuration and base path are not provided
export const petService = new PetApi(undefined, undefined, axiosInstance);