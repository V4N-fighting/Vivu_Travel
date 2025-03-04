import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../Component/BaseComponent/Button/Button";
import AddressInfo from "./Component/AddressInfo";
import OrderInfo from "./Component/OdderInfo";
import AccountInfo from "./Component/AccountInfo";
import { ProfileMenu, ProfileTab } from "./config";
import { countryList } from "../../Component/CountryList";

interface ProfileInfoProps {
  user?: string;
}

const MainProfile = ({
  profileDetailInfo,
}: {
  profileDetailInfo: ProfileTab;
}) => {
  if (profileDetailInfo === ProfileTab.Account) return <AccountInfo />;
  if (profileDetailInfo === ProfileTab.Address)
    return <AddressInfo countryList={countryList} />;
  if (profileDetailInfo === ProfileTab.Order) return <OrderInfo />;
  return <></>;
};

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.Order);


  return (
    <Contain>
      <Header>
        <Left>
          <Icon icon={faUser} />
          <span>Xin chào {user}!</span>
        </Left>
        <Button orange>
          <Icon icon={faArrowRightFromBracket} />
          &nbsp; Đăng xuất
        </Button>
      </Header>
      <Content>
        <SideBar>
          {ProfileMenu.map((item) => (
            <SidebarItem
              active={activeTab === item.code}
              onClick={() => setActiveTab(item.code)}
            >
              <Icon icon={faTicket} />
              {item.name}
            </SidebarItem>
          ))}
        </SideBar>
        <MainContent>
          <MainProfile profileDetailInfo={activeTab} />
        </MainContent>
      </Content>
    </Contain>
  );
};

// Styled Components
const Contain = styled.div`
  padding: 100px 0;
  max-width: 1220px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  padding: 50px 20px;
  width: 100%;
  border-bottom: 1px solid #888888;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  font-size: 30px;
  color: #333333;
  font-weight: 500;

  span {
    margin-left: 30px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  padding: 50px 0;
  width: calc(100% + 50px);
  margin: 0 -25px;
`;

const SideBar = styled.div`
  padding: 0 25px;
  background-color: aliceblue;
  border-radius: 10px;
  margin: 0 25px;
  max-height: fit-content;
`;

const SidebarItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px 0;
  color: ${(props) => (props.active ? "#ff6a00" : "#5f6368")};
  font-size: 18px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    color: #ff6a00;
  }
`;

const MainContent = styled.div`
  padding: 25px;
  margin: 0 25px;
  background-color: aliceblue;
  border-radius: 10px;
  min-height: 100%;
`;



const Icon = styled(FontAwesomeIcon)`
  font-size: inherit;
  color: inherit;
  margin: 0 10px 0 10px;
`;


export default ProfileInfo;
