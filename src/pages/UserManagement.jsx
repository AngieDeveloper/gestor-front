import AddUserForm from "../components/AddUserForm";
import UserList from "../components/UserList";

const UserManagement = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Gestión de Usuarios</h1>
            <AddUserForm />
            <UserList />
        </div>
    );
};

export default UserManagement;
