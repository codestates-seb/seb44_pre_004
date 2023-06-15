import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setFooter(false));
  }, []);

  return <div>SignIn</div>;
};

export default SignIn;
