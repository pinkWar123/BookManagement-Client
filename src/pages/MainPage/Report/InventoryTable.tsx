import { Divider, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Month } from "./ReportPage";
import { InventoryReportDetailDto } from "../../../models/Report/Dto/InventoryReportDto";
import { callGetAllInventoryReportsByMonth } from "../../../services/reportService";
import { TableParams } from "../User/UserPage";

interface InventoryTableProps {
  month: Month;
}

const InventoryTable: FunctionComponent<InventoryTableProps> = ({ month }) => {
  const [details, setDetails] = useState<InventoryReportDetailDto[]>();
  const [pagination, setPagination] = useState<TableParams>({
    pagination: {
      pageSize: 1,
      current: 1,
    },
  });

  const fetchDetails = useCallback(
    async (pagination: TablePaginationConfig, month: Month) => {
      const query = {
        reportMonth: month.month,
        reportYear: month.year,
        pageNumber: pagination.current ?? 1,
        pageSize: pagination.pageSize ?? 5,
      };
      const res = await callGetAllInventoryReportsByMonth(query);
      console.log(res);
      if (res?.data) {
        setDetails(res.data);
        setPagination({
          pagination: {
            pageSize: res.pageSize,
            current: res.pageNumber,
            total: res.totalRecords,
          },
        });
      }
    },
    []
  );

  useEffect(() => {
    const newPagination = {
      current: 1,
      pageSize: 1,
    };
    console.log("Run here");
    console.log(month);
    fetchDetails(newPagination, month);
  }, [month]);

  useEffect(() => {
    if (!pagination.pagination) return;
    fetchDetails(pagination.pagination, month);
  }, [fetchDetails]);

  const columns: TableProps<InventoryReportDetailDto>["columns"] = [
    {
      title: "Tên sách",
      dataIndex: "title",
      key: "title",
      width: "30%",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Tồn đầu",
      dataIndex: "initialStock",
      key: "startInventory",
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: "Tồn cuối",
      dataIndex: "finalStock",
      key: "endInventory",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Phát sinh",
      dataIndex: "additionalStock",
      key: "change",
      render: (value) => <span>{value}</span>,
    },
  ];
  return (
    <>
      <Divider>Tình trạng tồn</Divider>
      <Table
        columns={columns}
        dataSource={details}
        pagination={pagination.pagination}
        onChange={async (pagination: TablePaginationConfig) =>
          fetchDetails(pagination, month)
        }
      ></Table>
    </>
  );
};

export default InventoryTable;
