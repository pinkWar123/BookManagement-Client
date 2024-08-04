import { FunctionComponent, useState } from "react";
import DebounceSelect from "./DebounceSelect";
import { ICustomer } from "../../models/Customer/Customer";
import { callGetCustomersByName } from "../../services/customerService";

interface CustomerDebounceSelectProps {
  onChange: (value: ICustomer) => void;
}

export interface CustomerValue extends ICustomer {
  value: string;
  label: string;
}

const CustomerDebounceSelect: FunctionComponent<
  CustomerDebounceSelectProps
> = ({ onChange }) => {
  const [customers, setCustomers] = useState<CustomerValue[] | undefined>();
  const fetchCustomerList = async (value: string): Promise<CustomerValue[]> => {
    if (value === "") {
      setCustomers([]);
      return [];
    }
    const res = await callGetCustomersByName(value);
    console.log(res.data);
    const returnObj = res.data.map(
      (item) =>
        ({
          label: item.customerName,
          value: item.customerName,
          ...item,
        } as CustomerValue)
    );

    setCustomers(returnObj);
    return returnObj;
  };
  return (
    <>
      <DebounceSelect
        maxCount={1}
        mode="multiple"
        fetchOptions={fetchCustomerList}
        onChange={(value) => {
          const _value = value as unknown as CustomerValue[];
          console.log(customers);
          console.log(value);
          if (!_value || _value.length === 0) {
            const customerValue: ICustomer = {
              customerName: "",
              address: "",
              email: "",
              phoneNumber: "",
              totalDebt: 0,
            };
            onChange(customerValue);
            return;
          }
          const item: CustomerValue | undefined = customers?.find(
            (_item) => _item.customerName === _value[0].label
          );
          if (!item) return;
          onChange(item);
        }}
      />
    </>
  );
};

export default CustomerDebounceSelect;
