"use client";

import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

import styles from "./backButton.module.css";

type BackButtonProps = {
  label?: string;
};

export const BackButton = ({ label }: BackButtonProps) => {
  const router = useRouter();

  // --- CALLBACKS ---

  const handleClick = () => router.back();

  // --- RENDER ---

  return (
    <button className={styles.backButton} onClick={handleClick}>
      <MdArrowBack size="24" />

      {label}
    </button>
  );
};
