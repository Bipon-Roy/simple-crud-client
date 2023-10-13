import { useLoaderData } from "react-router-dom";

const Update = () => {
    const initialUser = useLoaderData();
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = { name, email };
        console.log(name, email);

        fetch(`http://localhost:5000/users/${initialUser._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert("Updated Successfully");
                }
            });
    };
    return (
        <div>
            <h2>Update information {initialUser.name}</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={initialUser.name} />
                <br />
                <input type="email" name="email" defaultValue={initialUser.email} />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;
