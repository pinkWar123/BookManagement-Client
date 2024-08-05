import { App, Flex, Table, TableProps, Tooltip, Typography } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { Edit } from "react-feather";
import RegulationModal from "./RegulationModal";
import { RegulationViewDto } from "../../../models/Regulation/RegulationViewDto";
import {
  callGetAllRegulations,
  callUpdateRegulation,
} from "../../../services/regulationService";
import { handleAxiosError } from "../../../helpers/errorHandling";
import { UpdateRegulationDto } from "../../../models/Regulation/UpdateRegulationDto";

interface RegulationPageProps {}

export interface ModalConfig {
  open: boolean;
  regulation?: RegulationViewDto;
}

const RegulationPage: FunctionComponent<RegulationPageProps> = () => {
  const [regulations, setRegulations] = useState<RegulationViewDto[]>();
  const { message } = App.useApp();
  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const res = await callGetAllRegulations();
        setRegulations(res.data);
      } catch (error) {
        message.error({ content: handleAxiosError(error) });
      }
    };

    fetchRegulations();
  }, [message]);

  const renderContent = (value: number, record: RegulationViewDto) => {
    if (record.code === "QD4") return value;
    else return value + " " + record.value;
  };
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    open: false,
    regulation: undefined,
  });
  const columns: TableProps<RegulationViewDto>["columns"] = [
    {
      title: <span>Mã</span>,
      width: "10%",
      dataIndex: "code",
      key: "code",
      render: (value) => <span>{value}</span>,
    },
    {
      title: <span>Nội dung quy định</span>,
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

  const handleSubmit = async (
    regulation: RegulationViewDto | undefined,
    newValue: number,
    newStatus: boolean
  ) => {
    if (!regulation) return;
    try {
      const newRegulation: UpdateRegulationDto = {
        ...regulation,
        value: newValue,
        status: newStatus,
      };
      const res = await callUpdateRegulation(
        regulation.regulationId,
        newRegulation
      );
      setRegulations((prev) => {
        if (!prev) return prev;
        return prev.map((_regulation) =>
          _regulation.regulationId === regulation.regulationId
            ? res.data
            : _regulation
        );
      });
      handleClose();
      message.success({
        content: `Update quy định ${regulation.code} thành công!`,
      });
    } catch (error) {
      message.error({ content: handleAxiosError(error) });
    }
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
