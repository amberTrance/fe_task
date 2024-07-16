import Modal from "../modal/modal";
import { StyledButton } from "../styledButton/styledButton";

import styles from "./confirmationModal.module.css";

type ConfirmationModalProps = {
  label: string;
  handleClose: () => void;
  handleConfirm: () => void;
  isShown: boolean;
};

export const ConfirmationModal = ({
  label,
  handleClose,
  handleConfirm,
  isShown,
}: ConfirmationModalProps) => (
  <Modal handleClose={handleClose} show={isShown}>
    <p className={styles.paragraph}>{label}</p>

    <div className={styles.buttonsContainer}>
      <StyledButton style="confirm" label="yes" handleClick={handleConfirm} />
      <StyledButton style="reject" label="no" handleClick={handleClose} />
    </div>
  </Modal>
);
