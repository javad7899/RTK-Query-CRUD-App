import "./AddEdit.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAddContactMutation,
  useContactQuery,
  useUpdateContactMutation,
} from "../services/contactApi";
import { toast } from "react-toastify";
const initialsState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [editMoode, setEditMode] = useState(false);
  const { id } = useParams();
  const { data, error } = useContactQuery(id!);
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation(id!);
  const [values, setValues] = useState(initialsState);
  const { name, email, contact } = values;
  const navigate = useNavigate();
  const handleChnage = (e: any) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please Provide Value Into Each Inpnut Feild");
    } else {
      if (!editMoode) {
        await addContact(values);
        navigate("/");
        toast.success("New Contact Added Successfully...");
      } else {
        await updateContact(values);
        navigate("/");
        toast.success("New Contact Updated Successfully...");
        setEditMode(false);
      }
    }
  };
  useEffect(() => {
    if (id && error) {
      toast.error("Somegthing Went Wrong!");
    }
  }, [error]);
  useEffect(() => {
    if (id) {
      setEditMode(true);
      if (data) {
        setValues({ ...data });
      }
    } else {
      setEditMode(false);
      setValues({ ...initialsState });
    }
  }, [id, data]);
  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span> Name</span>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name ..."
            value={name}
            onChange={handleChnage}
          />
        </label>
        <label htmlFor="email">
          <span>Email</span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email ..."
            value={email}
            onChange={handleChnage}
          />
        </label>
        <label htmlFor="contact">
          <span>Contact</span>
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="Enter Contact ..."
            value={contact}
            onChange={handleChnage}
          />
        </label>

        <button type="submit">
          {editMoode ? "Update" : "Add New"} Contact
        </button>
      </form>
    </div>
  );
};

export default AddEdit;
