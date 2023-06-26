import axios from 'axios';

export const getApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

//요청시 AccessToken 계속 보내주기
instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token) {
      config.headers['accessToken'] = null;
      config.headers['refreshToken'] = null;
      return config;
    }
    if (config.headers && token) {
      const { accessToken, refreshToken } = token;
      config.headers['Authorization'] = accessToken;
      config.headers['Refresh'] = refreshToken;
      return config;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

//AccessToken이 만료됐을때 처리
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('get response', response);
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      const originalRequest = config;
      const token = JSON.parse(localStorage.getItem('token'));
      const { refreshToken } = token;
      // token refresh 요청
      const { data } = await axios.post(
        `/token`, // token refresh api
        {},
        { headers: { authorization: refreshToken } }
      );
      // 새로운 토큰 저장
      // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        data;
      localStorage.setItem('token', {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
      originalRequest.headers.authorization = newAccessToken;
      // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
      return axios(originalRequest);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('response error', error);
    return Promise.reject(error);
  }
);

export default instance;
