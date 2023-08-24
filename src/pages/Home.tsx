import "./Home.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useContactsQuery,
  useDeleteContactMutation,
} from "../services/contactApi";
import { toast } from "react-toastify";

const Home = () => {
  const { data, isLoading, isError } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  useEffect(() => {
    if (isError) {
      toast.error("Something went Wrong!");
    }
  }, [isError]);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  const handleDelete = async (id: any) => {
    if (
      window.confirm("Are you sure that you wanted to delete thata contact?")
    ) {
      await deleteContact(id);
      toast.success("Contact Deleted Successfully...");
    }
  };
  return (
    <div className="home">
      <Link to="/addEditContact">
        <button className="btn btn-add">Add New Contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th>No. </th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: number) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/addEditContact/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/info/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
