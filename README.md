# Recipe-directory

這是來自 [Build Web Apps with React & Firebase](https://www.udemy.com/course/build-web-apps-with-react-firebase/) 課程的其中一項專案，主要是拿來練習 React 而做的簡單食譜網站

這份專案有兩個分支，分別為：

- master（自己想的版本）
- review（課程解答的版本）

網站連結：[https://jubeatt.github.io/recipe-directory](https://jubeatt.github.io/recipe-directory/)

## 網站介紹

這個網站所包含的功能如下：

- 檢視食譜列表
- 食譜的詳細頁面
- 關鍵字搜尋
- 新增食譜
- 編輯食譜
- 刪除食譜
- 切換背景主題（主題色 / 夜間模式）

![demo](demo.gif)

## 使用的技術

- React
- Tailwind
- RWD
- react-router-dom
- Firebase
- useContext / useReducer
- Custom hook

## 運行方式

此專案使用 Firebase 作為資料庫，所以請先自行跑完相關申請流程。

1\. 安裝專案的 dependencies

```bash
npm install
```

2\. 建立 `./src/firebase/config.js` 檔案，並填入你的 Firebase 資訊：

```js
import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}

// init firebase
firebase.initializeApp(firebaseConfig)
// init firestore
const db = firebase.firestore()

export { db }
```

3\. 啟動開發環境

```bash
npm run start
```

## 打包

```bash
npm run build
```

之後再透過 live-sever 的方式打開 `/build/index.html` 即可



