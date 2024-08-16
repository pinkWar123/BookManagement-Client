import { FunctionComponent, useState } from "react";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import MainHeader from "../components/Layout/Header/MainHeader";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout
          style={{
            marginLeft: collapsed ? "80px" : "200px",
            transition: "margin-left 0.2s ease",
          }}
        >
          <MainHeader
            style={{
              position: "fixed", // Fix the header at the top
              width: `calc(100% - ${collapsed ? "80px" : "200px"})`, // Adjust header width based on sidebar
              // marginLeft: collapsed ? "80px" : "200px", // Sync header margin with layout
              transition: "margin-left 0.2s ease, width 0.2s ease", // Smooth transition for margin and width
              zIndex: 1000, // Ensure the header stays on top of other content
            }}
          />
          <Content
            style={{
              padding: "40px",
              marginTop: "100px",
              // marginLeft: "7%",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
