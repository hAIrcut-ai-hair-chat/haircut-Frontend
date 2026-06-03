import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import FeedView from '../views/FeedView.vue'
import SavedImagesView from '../views/SavedImagesView.vue'
import SettingsView from "../views/SettingsView.vue";
import UsuarioView from "../views/UsuarioView.vue";
import CreateAccount from "../views/CreateAccount.vue";
import ForgetPasswordView from "../views/ForgetPasswordView.vue";
import NewPasswordView from "../views/NewPasswordView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccount,
    },
     {
      path: "/logout",
      name: "logout",
      component: LogoutView,
    },
    {
      path: "/feed",
      name: "feed",
      component: FeedView
    },
    {
      path: "/images",
      name: "images",
      component: SavedImagesView
    },
    {
      "path": "/settings",
      "name": "settings",
      "component": SettingsView
    },
    {
      path: "/usuario",
      name: "usuario",
      component: UsuarioView
    },
    {
      path: "/forget_password",
      name: "forget_password",
      component: ForgetPasswordView
    },
    {
      path: "/new_password",
      name: "new_password",
      component: NewPasswordView,
    }
  ],
});

export default router;
