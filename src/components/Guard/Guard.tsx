import { FunctionComponent } from "react";
import { useUser } from "../../hooks/useUser";
import { Button, Result } from "antd";

export interface PageGuardProps {
  children: React.ReactElement;
}

interface GuardProps extends PageGuardProps {
  roles: string[];
}

const Guard: FunctionComponent<GuardProps> = ({ children, roles }) => {
  const { user } = useUser();
  console.log(user);
  if (user && user.roles.length > 0 && roles.includes(user.roles[0]))
    return <>{children}</>;
  return (
    <>
      <Result
        status={403}
        title="Unauthorized"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Back Home</Button>}
      />
    </>
  );
};

export default Guard;
