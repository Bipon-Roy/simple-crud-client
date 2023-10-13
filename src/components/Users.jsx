import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const initialUsers = useLoaderData();
    const [users, setUsers] = useState(initialUsers);

    const handleDelete = (id) => {
        console.log("Delete", id);
        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert("Data Deleted Successfully");
                    const remaining = users.filter((user) => user._id !== id);
                    setUsers(remaining);
                }
            });
    };
    return (
        <div>
            <h1>Users {users.length}</h1>
            <div>
                {users.map((user) => (
                    <p key={user._id}>
                        {user.name}: {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>update</button>
                        </Link>
                        <button onClick={() => handleDelete(user._id)}>X</button>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Users;
