import styled from 'styled-components';
import { FlexBox, Title } from '../../../../../styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '../../../../../config';

const handleScroll = () => {
  window.scrollTo({ top: 200, behavior: 'smooth' });
}
interface NavigationArrayProps {
  id: number;
  value: string;
  to: string;
  children?: NavigationArrayProps[]; 
}

const navigation: NavigationArrayProps[] = [
  {
    id: 1,
    value: 'Trang chủ',
    to: config.routes.home
  },
  {
    id: 2,
    value: 'Tours',
    to: '',
    children: [
      {
        id: 1,
        value: 'Các điểm đến',
        to: config.routes.destination
      },
      {
        id: 2,
        value: 'Các hoạt động',
        to: config.routes.activity
      },
      {
        id: 3,
        value: 'Các loại tour',
        to: config.routes.tour
      },
    ],
  },
  {
    id: 3,
    value: 'Về chúng tôi',
    to: config.routes.about
  },
  {
    id: 4,
    value: 'Blog',
    to: config.routes.blog
  },
  {
    id: 5,
    value: 'Liên hệ',
    to: config.routes.contact
  },
];


const Navigation: React.FC = () => {
  return (
    <NavList>
      <FlexBoxPadding>
        {navigation.map((item, _index) => {
          return !item.children 
          ? 
          <NavItem key={item.id}>
            <NavItemName small><LinkElement to={item.to}>{item.value}</LinkElement></NavItemName>
          </NavItem>
          : 
          <NavItem>
            <NavItemName small>
              <span>{item.value}</span>
              <DropDownIcon icon={faChevronDown} />
            </NavItemName>
            <SubNavBox>
              {item.children.map((child, _index)=>{
                  return <SubNavItemName small key={child.id}>
                            <LinkElement to={child.to} onClick={handleScroll}>{child.value}</LinkElement>
                        </SubNavItemName>
              })}
            </SubNavBox>
        </NavItem>
        })}
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
  color: var(--primary-text-color);
`;

const SubNavBox = styled.div`
  position: absolute;
  text-align: left;
  top: 100%;
  background-color: var(--white-color);;
  visibility: hidden;
  min-width: 190px;
  width: max-content;
  margin-top: 50px;
  opacity: 0;
  z-index: -1;
  border-bottom: 3px solid var(--primary-color);
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
    color: var(--primary-color);
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
      color: var(--secondary-color);
    }

    ${LinkElement} {
      color: var(--secondary-color);
    }

    ${DropDownIcon} {
      color: var(--secondary-color);
    }

    ${SubNavBox} {
      visibility: visible;
      opacity: 1;
      margin-top: 0;
      z-index: 9;

      ${SubNavItemName} {
        color: var(--primary-text-color);

        &:hover {
          color: var(--secondary-color);
        }
      }
    }
  }
`;

export default Navigation;
