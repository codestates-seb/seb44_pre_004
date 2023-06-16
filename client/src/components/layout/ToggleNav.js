import { Link } from 'react-router-dom';
import { IoEarthSharp } from 'react-icons/io5';
import styled from 'styled-components';

const ToggleNav = ({ setShowNav }) => {
  return (
    <NavContainer>
      <ul>
        <li className="active">
          <Link to="/" onClick={() => setShowNav(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/qna" onClick={() => setShowNav(false)}>
            <IoEarthSharp className="icon" />
            Questions
          </Link>
        </li>
        <li>
          <Link to="/tags" onClick={() => setShowNav(false)}>
            Tags
          </Link>
        </li>
        <li>
          <Link to="/user" onClick={() => setShowNav(false)}>
            Users
          </Link>
        </li>
      </ul>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: absolute;
  left: 0;
  top: 53px;
  width: 240px;
  height: 240px;
  padding-top: 24px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  border-left: 1px solid hsl(210, 8%, 90%);
  border-right: 1px solid hsl(210, 8%, 90%);
  border-bottom: 1px solid hsl(210, 8%, 90%);

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

export default ToggleNav;
