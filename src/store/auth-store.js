import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { isEmpty } from "ramda";

export const useAuthStore = defineStore("authStore", () => {
  const count = ref(0);
  const userData = ref({}); // state variable
  const isLoggedIn = computed(() => !isEmpty(userData)); // getter
  async function login(username = "user0001") {
    userData.value = {
      username: username,
      nickName: "User 0001",
      profileImg: "https://avatars.githubusercontent.com/u/139426",
    };
  }
  async function logout() {
    userData.value = {};
  }

  return { count, userData, isLoggedIn, login, logout };
});
