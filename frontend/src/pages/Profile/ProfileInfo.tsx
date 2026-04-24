import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Button from "../../Component/BaseComponent/Button/Button";
import AddressInfo from "./Component/AddressInfo";
import OrderInfo from "./Component/OdderInfo";
import AccountInfo from "./Component/AccountInfo";
import { ProfileMenu, ProfileTab } from "./config";
import { countryList } from "../../Component/CountryList";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuOptionUser } from "../../layouts/components/Header/HeaderBottom";
import { logout, User } from "../../service/authService";
import config from "../../config";
import Icons from "../../Component/BaseComponent/Icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { clearUser } from "../../features/user/userSlice";

interface ProfileInfoProps {
  user?: User | null;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(ProfileTab.Order);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const action = searchParams.get("action");
  const navigate = useNavigate();

  const displayName = useMemo(() => {
    const firstName = user?.firstName?.trim() ?? "";
    const lastName = user?.lastName?.trim() ?? "";
    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || "bạn";
  }, [user?.firstName, user?.lastName]);

  const tabTitle = useMemo(() => {
    if (activeTab === ProfileTab.Order) return "Lịch sử đặt tour";
    if (activeTab === ProfileTab.Account) return "Thông tin cá nhân";
    return "Thông tin địa chỉ";
  }, [activeTab]);

  useEffect(() => {
    if (action === MenuOptionUser.Information.toString()) {
      setActiveTab(ProfileTab.Account);
    }

    if (action === MenuOptionUser.History.toString()) {
      setActiveTab(ProfileTab.Order);
    }
  }, [action]);

  const handleLogout = () => {
    logout();
    dispatch(clearUser());
    navigate(config.routes.login);
  };

  const renderMainProfile = (profileDetailInfo: ProfileTab) => {
    if (profileDetailInfo === ProfileTab.Account) {
      return <AccountInfo user={user || null} />;
    }

    if (profileDetailInfo === ProfileTab.Address) {
      return <AddressInfo countryList={countryList} />;
    }

    return <OrderInfo />;
  };

  return (
    <Contain>
      <HeaderCard>
        <HeaderTop>
          <Left>
            <Avatar>
              {user?.avatar ? (
                <img 
                  src={user.avatar.startsWith('http') || user.avatar.startsWith('data:') 
                    ? user.avatar 
                    : `http://localhost:5000/uploads/profile/${user.avatar}`} 
                  alt="avatar" 
                />
              ) : (
                <Icons.UserIcon />
              )}
            </Avatar>
            <div>
              <Welcome>Xin chào, {displayName}</Welcome>
              <MetaText>{user?.email || "Chưa có email"}</MetaText>
            </div>
          </Left>
          <Button orange onClick={handleLogout}>
            <Icons.ArrowRightFromBracket white />
            &nbsp; Đăng xuất
          </Button>
        </HeaderTop>
        <HeaderBottom>
          <Badge>{tabTitle}</Badge>
          <Hint>Quản lý tài khoản và theo dõi booking của bạn tại đây.</Hint>
        </HeaderBottom>
      </HeaderCard>

      <Content>
        <SideBar>
          {ProfileMenu.map((item) => (
            <SidebarItem key={item.name} active={activeTab === item.code} onClick={() => setActiveTab(item.code)}>
              <ItemIcon>{item.icon}</ItemIcon>
              {item.name}
            </SidebarItem>
          ))}
        </SideBar>
        <MainContent>{renderMainProfile(activeTab)}</MainContent>
      </Content>
    </Contain>
  );
};

const Contain = styled.div`
  padding: 100px 0;
  max-width: 1220px;
  width: 100%;
  margin: 0 auto;
  color: #0f172a;
`;

const HeaderCard = styled.div`
  padding: 30px;
  width: 100%;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
`;

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const HeaderBottom = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(55, 212, 217, 0.14);
  color: #0284c7;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Welcome = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`;

const MetaText = styled.p`
  margin: 4px 0 0;
  color: #64748b;
  font-size: 14px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 104, 26, 0.12);
  color: #ea580c;
  font-size: 13px;
  font-weight: 700;
`;

const Hint = styled.span`
  color: #475569;
  font-size: 14px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  padding: 28px 0;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SideBar = styled.div`
  padding: 16px;
  background: #f8fbff;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  max-height: fit-content;
`;

const SidebarItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  margin: 6px 0;
  padding: 12px 14px;
  border-radius: 10px;
  color: ${(props) => (props.active ? "#ea580c" : "#475569")};
  font-size: 16px;
  font-weight: ${(props) => (props.active ? "700" : "500")};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) => (props.active ? "rgba(255, 104, 26, 0.12)" : "transparent")};

  &:hover {
    color: #ea580c;
    background: rgba(255, 104, 26, 0.08);
  }
`;

const ItemIcon = styled.span`
  margin-right: 10px;
  display: inline-flex;
`;

const MainContent = styled.div`
  padding: 24px;
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 14px;
  min-height: 100%;
  box-shadow: 0 12px 26px rgba(15, 23, 42, 0.05);
`;

export default ProfileInfo;
