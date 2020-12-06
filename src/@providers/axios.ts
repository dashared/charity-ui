import { ProjectsApi } from "@generated";
import axios from "axios";

const axiosInstance = axios.create();

// Configuration and base path are not provided
export const cService = new ProjectsApi(undefined, undefined, axiosInstance);
