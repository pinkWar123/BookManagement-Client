import { Button } from "antd";
import { FunctionComponent } from "react";

interface ConfirmButtonProps {
  loading?: boolean;
  confirmText?: string;
  onClick: () => void;
}

const ConfirmButton: FunctionComponent<ConfirmButtonProps> = ({
  loading,
  confirmText,
  onClick,
}) => {
  return (
    <Button
      htmlType="submit"
      loading={loading === undefined ? false : loading}
      type="primary"
      onClick={onClick}
    >
      {confirmText ?? "Submit"}
    </Button>
  );
};

export default ConfirmButton;
