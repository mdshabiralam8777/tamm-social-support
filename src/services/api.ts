import axios from "axios";
import type { ApplicationData } from "../types";

export async function submitApplication(data: ApplicationData) {
  await new Promise((res) => setTimeout(res, 900));
  // Mock return
  return { status: 200, data: { ok: true } };

  // Uncomment below when real API is ready:
  // return axios.post("/api/submit", data, { timeout: 15000 })
}
