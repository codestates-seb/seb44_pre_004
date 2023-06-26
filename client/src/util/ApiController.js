import axios from 'axios';

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
      config.headers['refreshToken'] = refreshToken;
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
  (response) => {
    return response;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response && err.response.status === 401) {
      const refreshToken = originalConfig.headers['refreshToken'];
      try {
        const data = await axios({
          url: `refreshtoken담아 보낼 URL`, ////고민 필요////
          method: 'GET',
          headers: {
            Authorization: refreshToken,
          },
        });
        if (data) {
          localStorage.setItem(
            'token',
            JSON.stringify(data.data, ['accessToken', 'refreshToken'])
          );
          return await instance.request(originalConfig);
        }
      } catch (err) {
        console.log('토큰 갱신 에러');
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);
export default instance;

// const token = JSON.parse(localStorage.getItem('token'));
// let accessToken = token.accessToken;
// let refreshToken = token.refreshToken;

// export const instance = axios.create({
//   baseURL: `${process.env.REACT_APP_API_URL}`,
//   headers: {
//     Authorization: accessToken,
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     config.headers['Content-Type'] = 'application/json';
//     config.headers['Authorization'] = accessToken ? accessToken : '';

//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     if (response.status === 404) {
//       console.log('Error 404!');
//     }

//     return response;
//   },
//   async (error) => {
//     if (error.response?.status === 401) {
//       const { data } = await axios.get(`${children}`, {
//         baseURL: `${process.env.REACT_APP_API_URL}`,
//         params: {
//           refreshToken,
//         },
//       });
//       const { accessToken } = data;
//       const token = { ...token, accessToken };
//       localStorage.setItem(JSON.stringify('token'));

//       error.config.headers['Authorization'] = accessToken;
//       return await axios(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

// export default instance;
