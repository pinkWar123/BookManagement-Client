import { FunctionComponent } from "react";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import MainHeader from "../components/Layout/Header/MainHeader";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <MainHeader />
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
