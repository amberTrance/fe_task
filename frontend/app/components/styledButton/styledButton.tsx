type StyledButtonProps = {
  handleClick: () => void;
  label: string;
  style: "confirm" | "reject";
};

import styles from "./styledButton.module.css";

export const StyledButton = ({
  handleClick,
  label,
  style,
}: StyledButtonProps) => (
  <button className={`${styles[style]} ${styles.button}`} onClick={handleClick}>
    {label}
  </button>
);
