# Vue 3 + Vite + JS Admin 起手專案

腳手架為 Vite，使用的語言是 TS 並掛載 Vue
已經搭載好基礎的 admin 框架以及附上基礎的 UI 組件

## 主要運用的套件

- quasar UI 組件
- pinia 狀態儲存
- axios 請求
- vue i18n

## 架構說明

### assets 樣式／媒體檔

存放圖、影、scss 的資料夾

### \_app 自動化等的設定檔存放位置

專案的路由是使用自動化。
若有要新增頁面只需要在 pages 新增 vue 檔案，就會自動新增在 Vue-router 中。
支援多層路由 example:user/phone

### directive

自定義 directive 存放地點，已經搭配自動化載入。
新增檔案後會自動加入 Vue

### layouts layout 存放位置

專案的路由可以設定不同路由搭配指定 layout。
這個資料夾專門儲存 layout 的.vue 檔

### pages 頁面存放位置

放入此資料夾的檔案，會自動設定並加入 Vue-router

### store 狀態儲存的資料夾

儲存 pinia 的資料夾，pinia 會根據功能分成不同的 ts 檔

### utills

儲存小函式所存的資料夾，目前是一個函式一個檔案。
可以依照個人需求更改。

### interceptors

儲存 axios 攔截器的資料夾，依照功能區分檔案

### locales

儲存語系檔的資料夾，依照語系區分檔案

### store

儲存 pinia 的資料夾，pinia 會根據功能分成不同的 ts 檔

### widgets

儲存元件的資料夾

### components

儲存元件資料夾。與 widgets 的區別在此資料夾的元件會自動掛載到 App.vue 元件中

### providers

依賴注入的資料夾，可以在此資料夾中設定全域的 provider

### services

儲存封裝好的功能的資料夾，有些會搭配 providers

### public

存放不會打包的靜態檔

### 其他設定檔

- auto-imports.d.ts 自動引入產生的設定檔 ts 用

- vite-env.d.ts 可以在專案中運用 vite 環境的設定檔

- .eslintrc-auto-import.json 自動引入的設定檔

- tsconfig.node.json tsconfig.json 的額外設定檔

- quasar-variables.scss quasar 的變數檔，可以在此檔案中設定 quasar 的變數

## Version

- **Node.js** v20.9.0
- **yarn** v1.22.18
- **vue** v3.4.27

## Config

- **.env.development** 開發模式
- **.env.production** 生產模式
- **.env.uat** 測試模式

## Setup

```
yarn install
```

### Compiles and minifies for production

```
yarn run dev 開發模式
yarn build 生產模式
yarn build:uat 測試模式
```

### Deploy

執行 compile 之後根目錄下產生 `/docs` 檔案夾
