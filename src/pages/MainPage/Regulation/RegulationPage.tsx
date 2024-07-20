import { App, Flex, Table, TableProps, Tooltip, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import { IRegulation } from "../../../models/IRegulation";
import { REGULATIONS } from "../../../data/regulations";
import { Edit } from "react-feather";
import RegulationModal from "./RegulationModal";

interface RegulationPageProps {}

export interface ModalConfig {
  open: boolean;
  regulation?: IRegulation;
}

const RegulationPage: FunctionComponent<RegulationPageProps> = () => {
  const [regulations, setRegulations] = useState<IRegulation[]>(REGULATIONS);
  const renderContent = (value: number, record: IRegulation) => {
    if (record.code === "QD4") return value;
    else return value + record.value;
  };
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    open: false,
    regulation: undefined,
  });
  const columns: TableProps<IRegulation>["columns"] = [
    {
      title: <span>Mã</span>,
      width: "10%",
      dataIndex: "code",
      key: "code",
      render: (value) => <span>{value}</span>,
    },
    {
      title: <span>Nội dung quy định"</span>,
      dataIndex: "content",
      key: "content",
      width: "50%",
      render: (value, record) => <span>{renderContent(value, record)}</span>,
    },
    {
      title: <span>Tình trạng</span>,
      dataIndex: "status",
      width: "25%",
      key: "status",
      render: (value: boolean) => (
        <span>{value ? "Đang áp dụng" : "Không áp dụng"}</span>
      ),
    },
    {
      title: <span>Thay đổi</span>,
      key: "phoneNumber",
      render: (_, record) => (
        <span>
          <Tooltip title="Thay đổi">
            <Edit
              style={{ cursor: "pointer" }}
              onClick={() => {
                setModalConfig({
                  open: true,
                  regulation: record,
                });
              }}
            />
          </Tooltip>
        </span>
      ),
    },
  ];
  const handleClose = () => {
    setModalConfig((prev) => ({ ...prev, open: false }));
  };
  const { message } = App.useApp();
  const handleSubmit = (
    regulation: IRegulation | undefined,
    newValue: number,
    newStatus: boolean
  ) => {
    if (!regulation) return;
    setRegulations((prev) =>
      prev.map((_regulation) =>
        _regulation.code === regulation.code
          ? { ...regulation, value: newValue, status: newStatus }
          : _regulation
      )
    );
    message.success({ content: "Update successfully" });
    handleClose();
  };
  return (
    <>
      <Flex justify="center">
        <Typography.Title>Thay đổi quy định</Typography.Title>
      </Flex>
      <Table columns={columns} dataSource={regulations} />
      {modalConfig.open && (
        <RegulationModal
          modalConfig={modalConfig}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default RegulationPage;
