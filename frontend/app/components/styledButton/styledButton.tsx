import styles from "./styledButton.module.css";

type StyledButtonProps = {
  handleClick: () => void;
  label: string;
  style: "confirm" | "reject";
};

export const StyledButton = ({
  handleClick,
  label,
  style,
}: StyledButtonProps) => (
  <button className={`${styles[style]} ${styles.button}`} onClick={handleClick}>
    {label}
  </button>
);
