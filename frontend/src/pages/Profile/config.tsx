import Icons from './../../Component/BaseComponent/Icons/index';

export enum ProfileTab {
  Account,
  Address,
  Order,
}
export const ProfileMenu = [
  {
    name: "Đặt tour",
    icon: <Icons.MenuIcon/>,
    code: ProfileTab.Order,
  },
  {
    name: "Địa chỉ",
    icon: <Icons.MenuIcon />,
    code: ProfileTab.Address,
  },
  {
    name: "Tài khoản",
    icon: <Icons.MenuIcon />,
    code: ProfileTab.Account,
  },
];


