import { Divider, Table, TablePaginationConfig, TableProps, Tag } from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { DebtReportDto } from "../../../models/Report/Dto/DebtReportDto";
import { Month } from "./ReportPage";
import { callGetDebtReportsByMonth } from "../../../services/reportService";
import { TableParams } from "../User/UserPage";

interface DeptTableProps {
  month: Month;
}

const DeptTable: FunctionComponent<DeptTableProps> = ({ month }) => {
  const [details, setDetails] = useState<DebtReportDto[]>();
  const [pagination, setPagination] = useState<TableParams>({
    pagination: {
      pageSize: 5,
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
        sortBy: "FinalDebt",
        isDescending: "true",
      };
      const res = await callGetDebtReportsByMonth(query);
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
      pageSize: 5,
    };
    console.log("Run here");
    console.log(month);
    fetchDetails(newPagination, month);
  }, [month]);

  useEffect(() => {
    if (!pagination.pagination) return;
    fetchDetails(pagination.pagination, month);
  }, [fetchDetails]);
  const columns: TableProps<DebtReportDto>["columns"] = [
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "title",
      width: "30%",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Nợ đầu",
      dataIndex: "initialDebt",
      key: "startDebt",
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: "Nợ cuối",
      dataIndex: "finalDebt",
      key: "endDebt",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Phát sinh",
      dataIndex: "additionalDebt",
      key: "change",
      render: (value) => <span>{value}</span>,
    },
  ];
  return (
    <>
      <Divider>Tình trạng nợ</Divider>
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

export default DeptTable;
