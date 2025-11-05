// main.jsx
// Redux Provider로 앱 전체에 store 연결

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provider 컴포넌트로 App을 감싸서 Redux store 연결 */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
