import { defineConfig, loadEnv } from "vite"; //loadEnv為取得env資訊
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import html from "vite-plugin-html";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { viteMockServe } from "vite-plugin-mock";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd()); // 取得依照build的環境，取得env資料
  const port = 8080;
  // const prodMock = process.env.VITE_PROD_MOCK === "true"; // 當設定檔為true時，build的專案也啟用mockserver
  return {
    base: "./",
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      /** 自動導入 */
      AutoImport({
        imports: ["vue", "vue-router", "pinia"], // 自動導入的模塊
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: "src/auto-imports.d.ts",
        // eslint报错解决
        eslintrc: {
          enabled: true, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      quasar({
        sassVariables: "src/quasar-variables.sass",
      }),
      eslintPlugin({
        cache: false,
      }),
      /* 這邊使用 vite-plugin-html在build時可讓index.html抓取環境變數 */
      html({
        inject: {
          data: {
            title: env.VITE_LOGO_NAME, // 標題
            keyword: env.VITE_KEYWORD, // keyword
            subject: env.VITE_SUBJECT, // subject
            logo: env.VITE_ENV_LOGO, // logo
          },
        },
      }),
      /** mockserver */
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
        prodEnabled: false,
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
      extensions: [".vue", ".js"],
    },
    server: {
      port: port,
      proxy: {
        "/mock-api": {
          target: `http://localhost:${port}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mock-api/, ""),
        },
        "/api": {
          target: "http://exmaple.com/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      minify: "terser",
      rollupOptions: {
        output: {
          // 定義資源文件的輸出路徑和命名規則
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split(".").at(1); // 獲取文件的擴展名
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img"; // 如果是圖片文件，將擴展名設置為 "img"
            }
            return `assets/${extType}/[name]-[hash][extname]`; // 將資源文件輸出到對應的文件夾
          },
          // 定義代碼塊的輸出路徑和命名規則
          chunkFileNames: "admin_assets/js/[name]-[hash].js",
          entryFileNames: "admin_assets/js/[name]-[hash].js",
          // 手動定義代碼分塊策略
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // 如果模塊來自 node_modules，將其單獨打包，並以其第一級目錄命名
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
            if (id.includes("pages")) {
              // 如果模塊來自 views 目錄，將其單獨打包為 "views"
              return "pages";
            }
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      outDir: "./docs", // 您想要的输出目录
      chunkSizeWarningLimit: 10000,
    },
  };
});
