import { Cookies } from 'react-cookie';

const cookies = new Cookies(); // 쿠키객체 생성

export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set('refresh_token', refreshToken, {
    sameSite: 'strict', // 쿠키를 동일 사이트에서만 사용할 수 있도록 제한
    path: '/',
    expires: new Date(expireDate),
  });
};

export const getCookieToken = () => {
  return cookies.get('refresh_token');
};

export const removeCookieToken = () => {
  return cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
};
