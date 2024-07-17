"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/app/store/store";
import { resetAttributes } from "@/app/store/features/attributesSlice";
import styles from "./layoutNavbar.module.css";

export const LayoutNavar = () => {
  const dispatch = useDispatch<AppDispatch>();

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
