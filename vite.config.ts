import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
<<<<<<< HEAD
  base: "/ps-sba10-recipe-app/", // 👈 repo name goes here
=======
  base: "https://github.com/dezrose63/ps-sba10-recipe-app", // 👈 repo name goes here
>>>>>>> 3dfb317d2949e21322a6520841d29aee300f38bd
});
