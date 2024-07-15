import { IoMdTrash } from "react-icons/io";

type DeleteButtonProps = {
  handleDelete: () => void;
};

export const DeleteButton = ({ handleDelete }: DeleteButtonProps) => {
  return (
    <button>
      <IoMdTrash size="24" onClick={handleDelete} />
    </button>
  );
};
