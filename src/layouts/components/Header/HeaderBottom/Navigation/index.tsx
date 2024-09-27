import styled from 'styled-components';
import { FlexBox, Title } from '../../../../../styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';



const Navigation: React.FC = () => {
  return (
    <NavList>
      <FlexBoxPadding>
        <NavItem>
          <NavItemName small>Trang chủ</NavItemName>
        </NavItem>
        <NavItem>
          <NavItemName small>
            Tours
            <DropDownIcon icon={faChevronDown} />
          </NavItemName>
          <SubNavBox>
            <SubNavItemName small>Các điểm đến</SubNavItemName>
            <SubNavItemName small>Các hoạt động</SubNavItemName>
            <SubNavItemName small>Các loại tour</SubNavItemName>
          </SubNavBox>
        </NavItem>
        <NavItem>
          <NavItemName small>Về chúng tôi</NavItemName>
        </NavItem>
        <NavItem>
          <NavItemName small>Blog</NavItemName>
        </NavItem>
        <NavItem>
          <NavItemName small>Liên hệ</NavItemName>
        </NavItem>
      </FlexBoxPadding>
    </NavList>
  );
};

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
