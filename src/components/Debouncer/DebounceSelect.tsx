import React, { useMemo, useRef, useState } from "react";
import { Empty, Select, Spin } from "antd";
import type { SelectProps } from "antd";
import debounce from "lodash/debounce";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode | JSX.Element;
    value: string | number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  const handleInputChange = (value: string) => {
    debounceFetcher(value); // Call debounceFetcher with the current input value
  };
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={handleInputChange}
      notFoundContent={fetching ? <Spin size="small" /> : <Empty />}
      {...props}
      options={options}
    />
  );
}

export default DebounceSelect;

// Usage of DebounceSelect
export interface UserValue {
  label: string;
  value: string;
}

// async function fetchUserList(username: string): Promise<UserValue[]> {
//   console.log("fetching user", username);

//   return fetch("https://randomuser.me/api/?results=5")
//     .then((response) => response.json())
//     .then((body) =>
//       body.results.map(
//         (user: {
//           name: { first: string; last: string };
//           login: { username: string };
//         }) => ({
//           label: `${user.name.first} ${user.name.last}`,
//           value: user.login.username,
//         })
//       )
//     );
// }

// const DebounceSelector: React.FC = () => {
//   const [value, setValue] = useState<UserValue[]>([]);

//   return (
//     <DebounceSelect
//       mode="multiple"
//       value={value}
//       placeholder="Select users"
//       fetchOptions={fetchUserList}
//       onChange={(newValue) => {
//         setValue(newValue as UserValue[]);
//       }}
//       style={{ width: "100%" }}
//     />
//   );
// };

// export default DebounceSelector;
