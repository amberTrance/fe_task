"use client";

import Link from "next/link";

import styles from "./layoutNavbar.module.css";
import { AppDispatch } from "@/app/store/store";
import { resetAttributes } from "@/app/store/features/attributes/attributesSlice";
import { useAppDispatch } from "@/app/store/hooks";

export const LayoutNavar = () => {
  const dispatch = useAppDispatch();

  // --- HELPERS ---

  const handleHomeClick = () => dispatch(resetAttributes());

  // --- RENDER ---

  return (
    <nav className={styles.nav}>
      <Link href="/" onClick={handleHomeClick}>
        Home
      </Link>

      <Link href="/attributes">Attributes</Link>
    </nav>
  );
};
