import styles from "./loadingSkelleton.module.css";

type LoadingSkelletonProps = {
  style: "text" | "icon";
};

export const LoadingSkelleton = ({ style }: LoadingSkelletonProps) => {
  const componentStyle = styles[style];

  if (componentStyle) {
    return <div className={styles[style]}></div>;
  }

  return <div className={styles.text}></div>;
};
