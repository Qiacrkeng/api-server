import {
  Avatar,
  Dropdown,
  Image,
  Layout,
  Menu,
  message,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import cssStyles from "./index.module.css";
import {
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  DownOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { clearToken } from "@/utils/token.js";
import http from "@/utils/http.js";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const LayoutApp = () => {
  const navigate = useNavigate();
  /**
   * @type {import("antd").MenuProps["items"]}
   */
  const menu = [
    {
      key: "/",
      label: <Link to="/">首頁</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "/article",
      label: "文章管理",
      icon: <FileTextOutlined />,
      children: [
        {
          icon: <AppstoreAddOutlined />,
          key: "/article/cats",
          label: <Link to="/article/cates">文章類別</Link>,
        },
        {
          icon: <AppstoreAddOutlined />,
          key: "/article/lists",
          label: <Link to="/article/lists">文章列表</Link>,
        },
        {
          icon: <AppstoreAddOutlined />,
          key: "/article/addcates",
          label: <Link to="/article/addcates">發佈文章</Link>,
        },
      ],
    },
    {
      key: "/my",
      label: "個人中心",
      children: [
        {
          key: "/my/userinfo",
          icon: <AppstoreAddOutlined />,
          label: <Link to="/my/userinfo">基本資料</Link>,
        },
        {
          key: "/my/update/avatar",
          icon: <AppstoreAddOutlined />,
          label: <Link to="/my/update/avatar">更換頭像</Link>,
        },
        {
          key: "/my/updatepwd",
          icon: <AppstoreAddOutlined />,
          label: <Link to="/my/updatepwd">重置密碼</Link>,
        },
      ],
      icon: <UserOutlined />,
    },
  ];
  // 退出登錄
  const onLoginOut = () => {
    clearToken();
    navigate("/login");
  };
  // 更新用戶的信息
  useEffect(() => {
    (async () => {
      const response = await http.get("/my/userinfo");
      if (response.data.status === 1) {
        return message.error(response.data.message);
      }
      setMyInfo(response.data.data);
      // setUsername(response.data.data.username);
      // setAvatar(response.data.data.user_pic);
      // console.log(response, avatar, response.data.data.user_pic);
    })();
  }, []);

  const [myInfo, setMyInfo] = useState({});

  const location = useLocation();
  // console.log(location);
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const onSelect = ({ key }) => {
    // console.log(key);
    setSelectedKey(key);
  };
  // const [username, setUsername] = useState("");
  // const [avatar, setAvatar] = useState("");
  return (
    // <div>
    <Layout style={{ minHeight: "100vh" }}>
      <Header className={cssStyles["header"]}>
        <div className={cssStyles["logo"]} />
        <Space className={cssStyles["info"]}>
          <Text type="success">{myInfo.username}</Text>
          <Avatar src={<Image src={myInfo.user_pic} />} />
          <Dropdown menu={{ items: menu[2].children }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                個人中心
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <a>
            <Popconfirm
              title="確認是否退出"
              okText="確認"
              cancelText="取消"
              onConfirm={onLoginOut}
            >
              <LogoutOutlined />
              退出
            </Popconfirm>
          </a>
        </Space>
      </Header>
      <Layout>
        <Sider>
          <Menu
            selectedKeys={[selectedKey]}
            onSelect={onSelect}
            theme="dark"
            mode="inline"
            items={menu}
          />
        </Sider>
        <Content>
          <Outlet context={[myInfo, setMyInfo]} />
        </Content>
      </Layout>
    </Layout>
    // </div>
  );
};

export default LayoutApp;
