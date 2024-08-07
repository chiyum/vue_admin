import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import userMock from "./mock/table"; // 導入你的 mock 文件

export function setupProdMockServer() {
  createProdMockServer([...userMock]);
}

/** 用於build生產環境 */
