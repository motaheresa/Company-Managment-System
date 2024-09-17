import { useContext, useEffect } from "react";
import { CreateContext } from "../../Context/Context";
import { IoCloseOutline } from "react-icons/io5";
import "./Snackbar.css";

const Snackbar = ({
  open,
  handleUndoDeleteLeave,
  setUndo,
  setOpenSnackbar,
}) => {
  const usecon = useContext(CreateContext);
  useEffect(() => {
    if (open) {
      const audio = new Audio("/notification.mp3");
      audio.play();
      const timeoutId = setTimeout(() => {
        handleTimeout();
        setUndo(true)
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [open]);
  const handleTimeout = () => {
      setOpenSnackbar(false);
      setUndo(true);
  };
  const handleClose = () => {
    setUndo(true);
    setOpenSnackbar(false);
  };
  return (
    <div
      className={`${usecon.darkMode ? "bg-zinc-600" : "bg-gray-300"} ${
        open && "active"
      } snackbar fixed left-2 z-30 bottom-2 rounded-md w-80 h-14 shadow-3xl`}
    >
      <div className="h-full container flex items-center justify-between">
        <span className={`${usecon.darkMode && "text-white"} text-lg`}>
          Leave Deleted
        </span>
        <div className="flex items-center gap-3">
          <span
            onClick={handleUndoDeleteLeave}
            className=" text-white cursor-pointer borderBackgroundHover px-2 py-1 rounded font-semibold text-sm"
          >
            UNDO
          </span>
          <span
            onClick={handleClose}
            style={{ border: "2px #f22 solid", padding: ".2px .2px" }}
            className={`${
              usecon.darkMode && "text-white"
            } text-lg hover:bg-red-500 hover:text-white  cursor-pointer rounded-full`}
          >
            <IoCloseOutline />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
