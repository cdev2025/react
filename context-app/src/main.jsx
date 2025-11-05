// main.jsx
// App 컴포넌트를 CounterProvider로 감싸서 전역 상태를 제공

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CounterProvider } from "./CounterProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* CounterProvider로 감싸면 하위 모든 컴포넌트에서 count 상태 사용 가능 */}
    <CounterProvider>
      <App />
    </CounterProvider>
  </StrictMode>
);
