import { defineStore } from "pinia";
import axios from "@/services/http-service.js";
// import stroageProvider from "@/services/storage-service";

export const useApiStore = defineStore("apiStore", () => {
  // const { provider: storage } = stroageProvider; // 使用 localStorage的方法 可以根據需求引用
  // 完全依靠params來帶入參數，不管是API需要的還是特殊設定的參數 example:rejectEmpty

  /*
   * get
   */

  // 取得使用者列表
  const getUserList = async (params) => {
    return await axios.get("/admin/searchUsers", params);
  };

  const getUserInfo = async (params) => {
    return await axios.get("/admin/getUserInfo", params);
  };

  /*
   * post
   */

  // 代理上分
  const forceTransfer = async (params) => {
    return await axios.post("/admin/forceTransfer", params);
  };

  // 禁言與否
  const muteUser = async (params) => {
    return await axios.post("/admin/muteUser", params);
  };

  // 禁止進入房間
  const banUser = async (params) => {
    return await axios.post("/admin/disableRoomEntryForUser", params);
  };

  // 設置代理
  const setAgent = async (params) => {
    return await axios.post("/admin/setAgent", params);
  };

  const deleteUser = async (params) => {
    return await axios.post("/admin/deleteUser", params);
  };

  return {
    getUserList,
    forceTransfer,
    muteUser,
    banUser,
    getUserInfo,
    setAgent,
    deleteUser,
  };
});
