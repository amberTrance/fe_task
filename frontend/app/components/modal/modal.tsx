import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

import styles from "./modal.module.css";

type ModalProps = {
  children: ReactNode;
  handleClose: () => void;
  show: boolean;
};

const Modal = ({ show, handleClose, children }: ModalProps) => {
  return (
    <div className={`${styles.modal} ${!show && styles.displayNone}`}>
      <section className={styles.modalMain}>
        <button onClick={handleClose} className={styles.button}>
          <IoMdClose />
        </button>

        {children}
      </section>
    </div>
  );
};

export default Modal;
