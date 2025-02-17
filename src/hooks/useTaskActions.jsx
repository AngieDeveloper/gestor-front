import { useDispatch } from "react-redux";
import { createTask } from "../redux/taskSlice";

export const useTaskActions = () => {
    const dispatch = useDispatch();

    const addTask = (title) => {
        if (title.trim().length < 3) {
            alert("El título debe tener al menos 3 caracteres");
            return;
        }

        dispatch(createTask({ title, description: "Sin descripción" }));
    };

    return { addTask };
};
