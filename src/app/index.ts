import { createApp } from "vue";
import App from "./App.vue";
import router from "@/pages";
import "./assets/tailwind.css";

export const app = createApp(App).use(router);
