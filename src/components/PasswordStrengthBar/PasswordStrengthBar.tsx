import { FunctionComponent } from "react";
import styles from "./PasswordStrengthBar.module.scss";
interface PasswordStrengthbarProps {
  password: string;
}

const PasswordStrengthbar: FunctionComponent<PasswordStrengthbarProps> = ({
  password,
}) => {
  const calculateStrength = () => {
    let strength = 0;
    if (password.length > 11) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };
  const getColor = () => {
    switch (calculateStrength()) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
      case 5:
        return "green";
      default:
        return "gray";
    }
  };

  const getWidth = () => {
    switch (calculateStrength()) {
      case 1:
        return "25%";
      case 2:
        return "50%";
      case 3:
        return "75%";
      case 4:
      case 5:
        return "100%";
    }
  };
  const getDescription = () => {
    switch (calculateStrength()) {
      case 1:
        return <span style={{ color: "red" }}>Yếu</span>;
      case 2:
        return <span style={{ color: "orange" }}>Trung bình</span>;
      case 3:
        return <span style={{ color: "yellow" }}>Mạnh</span>;
      case 4:
      case 5:
        return <span style={{ color: "green" }}>Rất mạnh</span>;
      default:
        return <span style={{ color: "grey" }}>Rất yếu</span>;
    }
  };
  return (
    <div className={styles["password-strength-bar"]}>
      <div
        className={styles["password-strength-bar-inner"]}
        style={{
          width: getWidth(),
          backgroundColor: getColor(),
        }}
      ></div>
      <div style={{ color: "black", float: "left", marginTop: "10px" }}>
        Độ mạnh: {getDescription()}
      </div>
    </div>
  );
};

export default PasswordStrengthbar;
