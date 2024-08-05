import { Button, Checkbox, Flex, Form, Input, Select } from "antd";
import { FunctionComponent, useState } from "react";
import { Search } from "react-feather";
import { useNavigate } from "react-router-dom";

interface QueryBuilderProps {}

const QueryBuilder: FunctionComponent<QueryBuilderProps> = () => {
  const [customerName, setCustomerName] = useState<string>("");
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<Record<string, boolean>>({
    customerName: false,
    totalDebt: false,
  });
  const [isDescending, setIsDescending] = useState<boolean>(false);

  const handleSearch = () => {
    let queryString = `pageNumber=1&pageSize=10`;
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

  return (
    <Flex gap="large">
      <Form.Item>
        <Input
          placeholder="Nhập tên khách hàng"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>Bộ lọc:</Form.Item>
      <Form.Item>
        <Checkbox
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
