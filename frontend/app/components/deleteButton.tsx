import { IoMdTrash } from "react-icons/io";

type DeleteButtonProps = {
  handleDelete: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

export const DeleteButton = ({ handleDelete }: DeleteButtonProps) => {
  return (
    <button onClick={handleDelete}>
      <IoMdTrash size="24" />
    </button>
  );
};
