import { FunctionComponent } from "react";
import Sidebar from "../components/Layout/Sidebar/Sidebar";
import { Layout, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import MainHeader from "../components/Layout/Header/MainHeader";

interface MainLayoutProps {}

const MainLayout: FunctionComponent<MainLayoutProps> = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <MainHeader />
          <Content>
            <Typography.Title>This is the main content</Typography.Title>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
