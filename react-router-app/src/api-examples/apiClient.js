import axios from "axios";
/**
 * Axios 인스턴스 - 공통 설정을 미리 정의
 * 실무에서는 API 서버 주소, 인증 토큰 등을 여기서 관리
 */
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000, // 8초 타임아웃
  headers: { "Content-Type": "application/json" },
});

// 응답 에러 공통 처리 (선택)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 오류:", error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
