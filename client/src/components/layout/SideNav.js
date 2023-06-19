import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { menuIdxSlice } from '../../store/menuIdxSlice';
import { IoEarthSharp } from 'react-icons/io5';
import styled from 'styled-components';

const SideNav = () => {
  const dispatch = useDispatch();
  const menuIdx = useSelector((state) => {
    console.log(state.idx.value);
    return state.idx.value;
  });

  return (
    <SideNavContainer>
      <NavContainer>
        <ul>
          <li className={menuIdx === 0 ? 'active' : ''}>
            <Link
              to="/"
              onClick={() => {
                dispatch(menuIdxSlice.actions.idx(0));
              }}
            >
              Home
            </Link>
          </li>
          <li className={menuIdx === 1 ? 'active' : ''}>
            <Link
              to="/qna"
              onClick={() => {
                dispatch(menuIdxSlice.actions.idx(1));
              }}
            >
              <IoEarthSharp className="icon" />
              Questions
            </Link>
          </li>
          <li className={menuIdx === 2 ? 'active' : ''}>
            <Link
              to="/tags"
              onClick={() => {
                dispatch(menuIdxSlice.actions.idx(2));
              }}
            >
              Tags
            </Link>
          </li>
          <li className={menuIdx === 3 ? 'active' : ''}>
            <Link
              to="/user"
              onClick={() => {
                dispatch(menuIdxSlice.actions.idx(3));
              }}
            >
              Users
            </Link>
          </li>
        </ul>
      </NavContainer>
    </SideNavContainer>
  );
};

const SideNavContainer = styled.div`
  width: 164px;
  height: auto;
  background-color: #ffffff;
  border-right: 1px solid hsl(210, 8%, 90%);
`;

const NavContainer = styled.nav`
  position: fixed;
  left: calc((100vw - 1280) / 2);
  width: 164px;
  padding-top: 24px;
  li {
    display: flex;
    align-items: center;
    height: 34px;
    padding-left: 8px;
    font-size: 13px;
    color: var(--grey);
    &:hover {
      color: var(--black);
    }
    &.active {
      color: var(--black);
      font-weight: 700;
      background-color: var(--menu-hover-background);
      border-right: 3px solid var(--orange);
      a {
        color: inherit;
        font-weight: inherit;
      }
    }
    .icon {
      width: 16px;
      height: 16px;
      margin-right: 5px;
      vertical-align: middle;
    }
  }
`;

export default SideNav;
