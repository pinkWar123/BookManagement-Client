import { FunctionComponent, useState } from "react";
import DebounceSelect from "./DebounceSelect";
import { CUSTOMERS } from "../../data/customers";
import { ICustomer } from "../../models/Customer";

interface CustomerDebounceSelectProps {
  onChange: (value: CustomerValue) => void;
}

export interface CustomerValue extends ICustomer {
  value: string;
  label: string;
}

const findCustomerByName = (name: string) => {
  const regex = new RegExp(name, "i"); // 'i' for case-insensitive search
  return CUSTOMERS.filter((customer) => regex.test(customer.customerName));
};

const CustomerDebounceSelect: FunctionComponent<
  CustomerDebounceSelectProps
> = ({ onChange }) => {
  const [customers, setCustomers] = useState<CustomerValue[] | undefined>();
  const fetchCustomerList = async (value: string): Promise<CustomerValue[]> => {
    if (value === "") {
      setCustomers([]);
      return [];
    }
    const res = await findCustomerByName(value);
    const returnObj = res.map((item) => ({
      label: item.customerName,
      value: item.customerName,
      ...item,
    }));
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
          if (!_value || _value.length === 0) return;
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
