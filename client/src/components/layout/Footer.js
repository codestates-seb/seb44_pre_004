import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../asset/logo_small.png';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrapper>
        <li className="flexRow">
          <img src={logo} alt="stackoverflow logo" />
          <LinkLists>
            <li className="mb12 ml74">STACK OVERFLOW</li>
            <li className="ml74">
              <Link to="/qna">Questions</Link>
            </li>
            <li className="ml74">Help</li>
          </LinkLists>
        </li>
        <li>
          <LinkLists>
            <li className="mb12">PRODUCTS</li>
            <li>Teams</li>
            <li>Advertising</li>
            <li>Collectives</li>
            <li>Talent</li>
          </LinkLists>
        </li>
        <li>
          <LinkLists>
            <li className="mb12">COMPANY</li>
            <li>About</li>
            <li>Press</li>
            <li>Work Here</li>
            <li>Legal</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
            <li>Cookie Settings</li>
            <li>Cookie Policy</li>
          </LinkLists>
        </li>
        <li>
          <LinkLists>
            <li className="mb12">STACK EXCHANGE NETWORK</li>
            <li>Technology</li>
            <li>Culture & recreation</li>
            <li>Life & arts</li>
            <li>Science</li>
            <li>Professional</li>
            <li className="mb12">Business</li>
            <li>API</li>
            <li>Data</li>
          </LinkLists>
        </li>
        <li className="flexColumn">
          <LinkRow>
            <li>Blog</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
          </LinkRow>
          <div>
            Site design / logo © 2023 Stack Exchange Inc; user
            <br /> contributions licensed under CC BY-SA.
            <br />
            rev 2023.6.15.43499
          </div>
        </li>
      </FooterWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 32px 0;
  background-color: hsl(210, 8%, 15%);
  color: #babfc4;
  .flexRow {
    display: flex;
    img {
      position: absolute;
      top: -15px;
      width: 50px;
      height: 50px;
      margin-right: 24px;
    }
  }
  .flexColumn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 13px;
  }
  .mb12 {
    margin-bottom: 12px;
  }
  .ml74 {
    margin-left: 74px;
  }
`;

const FooterWrapper = styled.ul`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

const LinkLists = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    font-size: 13px;
    line-height: 1.3;
    &:first-of-type {
      font-weight: 700;
    }
    &:not(:first-of-type) {
      padding: 4px 0;
    }
  }
`;

const LinkRow = styled.ul`
  display: flex;
  li {
    margin-right: 12px;
  }
`;

export default Footer;
