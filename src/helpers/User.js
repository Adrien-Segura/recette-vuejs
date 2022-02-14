import axios from "axios";
import Api from "@/helpers/Api";
function checkAuth(store, router, route) {
  localStorage.lastUrl = route.path;
  if (!store.user.jwt) router.push({ name: "Login" });
}

async function register(email, password) {
  try {
    return await axios.post(Api.urlApi + "register", {
      email: email,
      password: password
    });
  } catch (e) {
    if (e.response) return e.response;
  }
}

async function login(email, password) {
  try {
    return await axios.post(Api.urlApi + "login", {
      email: email,
      password: password
    });
  } catch (e) {
    if (e.response) return e.response;
  }
}
export { checkAuth, register, login };
