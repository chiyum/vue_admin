import { defineStore } from "pinia";
import axios from "@/services/http-service.js";
// import stroageProvider from "@/services/storage-service";

export const useApiStore = defineStore("apiStore", () => {
  // const { provider: storage } = stroageProvider; // 使用 localStorage的方法 可以根據需求引用

  /* get **/
  const getUserList = async (params) => {
    return axios.get("/admin/searchUsers", { params, rejectEmpty: true });
  };

  /* post **/

  return { getUserList };
});
