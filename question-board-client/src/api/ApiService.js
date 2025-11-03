import axios from "axios";

const ApiService = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 공통 에러 로깅 추가
ApiService.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[API ERROR]", err?.response || err?.message); // ?. 옵셔널 체이닝
    return Promise.reject(err);
  }
);

export default ApiService;
