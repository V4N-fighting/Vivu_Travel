import styled from 'styled-components';
import { FlexBox, SubTitle, Title } from '../../../../../styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const handleScroll = () => {
  window.scrollTo({ top: 200, behavior: 'smooth' });
}

const Navigation: React.FC = () => {
  return (
    <NavList>
      <FlexBoxPadding>
        <NavItem>
          <NavItemName small><LinkElement to="/">Trang chủ</LinkElement></NavItemName>
        </NavItem>
        <NavItem>
          <NavItemName small>
            Tours
            <DropDownIcon icon={faChevronDown} />
          </NavItemName>
          <SubNavBox>
            <SubNavItemName small><LinkElement to="/destinations" onClick={handleScroll}>Các điểm đến</LinkElement></SubNavItemName>
            <SubNavItemName small><LinkElement to="/activities" onClick={handleScroll}>Các hoạt động</LinkElement></SubNavItemName>
            <SubNavItemName small><LinkElement to="/tours" onClick={handleScroll}>Các loại tour</LinkElement></SubNavItemName>
          </SubNavBox>
        </NavItem>
        <NavItem>
          <NavItemName small><LinkElement to="/about" onClick={handleScroll}>Về chúng tôi</LinkElement></NavItemName>
        </NavItem>
        <NavItem>
          <NavItemName small><LinkElement to="/blog" onClick={handleScroll}>Blog</LinkElement></NavItemName>
        </NavItem>
        <NavItem>
          <NavItemName small><LinkElement to="/contact" onClick={handleScroll}>Liên hệ</LinkElement></NavItemName>
        </NavItem>
      </FlexBoxPadding>
    </NavList>
  );
};

const LinkElement = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const NavList = styled.ul`
  width: 100%;
`;

const NavItemName = styled(Title).attrs({ as: 'a' })`
  margin: 0;
  transition: all ease 0.5s;
`;

const FlexBoxPadding = styled(FlexBox)`
  padding: 0 15px;
  justify-content: center;
`;

const DropDownIcon = styled(FontAwesomeIcon)`
  margin-left: 5px;
  font-size: 0.5rem;
  padding-bottom: 2px;
  transition: all ease 0.5s;
  color: #1c1c1c;
`;

const SubNavBox = styled.div`
  position: absolute;
  text-align: left;
  top: 100%;
  background-color: #ffffff;
  visibility: hidden;
  min-width: 190px;
  width: max-content;
  margin-top: 50px;
  opacity: 0;
  z-index: -1;
  border-bottom: 3px solid #ff681a;
  box-shadow: 0px 10px 60px 0px rgba(0, 0, 0, 0.09),
    0px 3px 0px 0px rgba(231, 13, 60, 0.004);
  transform-origin: top center;
  transition: margin-top 0.4s ease-in-out, visibility 0.4s ease-in-out,
    opacity 0.4s ease-in-out, z-index 0s;
  padding: 18px 20px;
  left: -27px;

  &::before {
    content: '';
    position: absolute;
    left: 24.5px;
    top: 30px;
    width: 1px;
    background-color: #ededed;
    height: calc(100% - 60px);
  }
`;

const SubNavItemName = styled(NavItemName)`
  display: block;
  margin: 0 0;
  padding: 3px 9px;
  padding-left: 21px;
  position: relative;

  &::before {
    content: '.';
    position: absolute;
    top: 10px;
    left: 0;
    width: 11px;
    height: 11px;
    text-align: center;
    border-radius: 50%;
    display: inline-block;
    font-size: 0.7em;
    line-height: 5.5px;
    color: #ff681a;
    font-weight: 700;
    box-shadow: inset 0px 3px 4px 0px rgba(255, 104, 26, 0.4);
  }
`;

const NavItem = styled.li`
  padding: 47px 0;
  list-style-type: none;
  display: inline-block;
  position: relative;
  margin: 0 13px;
  cursor: pointer;

  &:hover {
    ${NavItemName} {
      color: #37d4d9;
    }

    ${LinkElement} {
      color: #37d4d9;
    }

    ${DropDownIcon} {
      color: #37d4d9;
    }

    ${SubNavBox} {
      visibility: visible;
      opacity: 1;
      margin-top: 0;
      z-index: 9;

      ${SubNavItemName} {
        color: #1c1c1c;

        &:hover {
          color: #37d4d9;
        }
      }
    }
  }
`;

export default Navigation;
