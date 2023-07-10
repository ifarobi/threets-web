import { selectUser } from "@/lib/redux/slices/auth.slices/selectors";
import {
  deleteThreet,
  editThreet,
} from "@/lib/redux/slices/threet.slices/thunks";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Threet } from "@/types/database.aliases";
import dayjs from "dayjs";

type ThreetItemProps = {
  threet: Threet;
};

function ThreetItem({ threet }: ThreetItemProps) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this threet?")) {
      dispatch(deleteThreet(threet.id));
    }
  };

  const handleUpdate = () => {
    const updatedThreet = prompt("Update your threet", threet.content);
    if (updatedThreet) {
      dispatch(editThreet({ id: threet.id, content: updatedThreet }));
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <p className="mb-2">{threet.content}</p>
      <p className="text-gray-500 text-sm">
        {dayjs(threet.created_at).format("h:mm A - MMMM D, YYYY")}
      </p>
      {user && user.id === threet.user && (
        <div className="flex">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              handleUpdate();
            }}
          >
            Update
          </button>
          <button
            className="text-red-500 hover:underline ml-4"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ThreetItem;
