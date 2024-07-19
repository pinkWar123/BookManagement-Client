import { Button } from "antd";
import { FunctionComponent } from "react";

interface CancelButtonProps {
  cancelText?: string;
  onClick: () => void;
  loading?: boolean;
}

const CancelButton: FunctionComponent<CancelButtonProps> = ({
  cancelText,
  loading,
  onClick,
}) => {
  return (
    <Button loading={loading === undefined ? false : loading} onClick={onClick}>
      {cancelText ?? "Cancel"}
    </Button>
  );
};

export default CancelButton;
