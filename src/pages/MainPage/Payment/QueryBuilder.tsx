import { Button, Checkbox, Flex, Form, Input, Select } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { Search } from "react-feather";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../../hooks/useQueryParams";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../../../constants/pagination";

interface QueryBuilderProps {}

const QueryBuilder: FunctionComponent<QueryBuilderProps> = () => {
  const [customerName, setCustomerName] = useState<string>("");
  const navigate = useNavigate();
  const { params } = useQueryParams();
  console.log(params && params["SortBy"]);
  const [sortBy, setSortBy] = useState<Record<string, boolean>>({
    customerName: false,
    totalDebt: false,
  });
  const [isDescending, setIsDescending] = useState<boolean>(false);
  const handleSearch = () => {
    let queryString = `pageNumber=${DEFAULT_PAGE_NUMBER}&pageSize=${DEFAULT_PAGE_SIZE}`;
    queryString += `&IsDescending=${isDescending}`;
    if (customerName !== "") queryString += `&customerName=${customerName}`;
    if (sortBy.customerName) {
      queryString += `&SortBy=CustomerName`;
    }
    if (sortBy.totalDebt) {
      if (queryString.includes("SortBy")) queryString += `,TotalDebt`;
      else queryString += `&SortBy=TotalDebt`;
    }

    navigate(`/payment?${queryString}`);
  };

  useEffect(() => {
    setSortBy({
      customerName:
        params && params["SortBy"]?.includes("CustomerName") ? true : false,
      totalDebt:
        params && params["SortBy"]?.includes("TotalDebt") ? true : false,
    });
  }, [params]);

  return (
    <Flex gap="large">
      <Form.Item>
        <Input
          defaultValue={params && params["customerName"]}
          placeholder="Nhập tên khách hàng"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>Bộ lọc:</Form.Item>
      <Form.Item>
        <Checkbox
          checked={sortBy["customerName"]}
          key={"name"}
          onChange={(e) =>
            setSortBy((prev) => ({ ...prev, customerName: e.target.checked }))
          }
        >
          Họ tên
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={sortBy["totalDebt"]}
          key={"totalDebt"}
          onChange={(e) =>
            setSortBy((prev) => ({ ...prev, totalDebt: e.target.checked }))
          }
        >
          Nợ
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Select
          onChange={(value) => setIsDescending(value)}
          value={isDescending}
          options={[
            {
              label: "Giảm dần",
              value: true,
            },
            {
              label: "Tăng dần",
              value: false,
            },
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          icon={<Search style={{ width: "12px" }} />}
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </Form.Item>
    </Flex>
  );
};

export default QueryBuilder;
