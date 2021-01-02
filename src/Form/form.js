import React, { useState, memo } from "react";
import API from "../API/axios";
import "../App.css";
const Form = ({handleClosePopup}) => {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
  });
  const [loader,setLoader] = useState(false)
  const handleChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.fname, formData.email);
    if (formData.fname === "" || formData.email === "") {
      alert("All field must be required");
    }
    setLoader(true)
    try {
      const regiter = await API.post("/user", {
        name: formData.fname,
        email: formData.email,
      });
      if (regiter.status) {
        alert("Register successfully");
        handleClosePopup()
    }

    } catch (e) {
      console.log(e);
      alert(e.message);
    }
    setLoader(false)
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fname">First Name : </label>
      <input
        type="text"
        id="fname"
        name="fname"
        placeholder="Your name.."
        onChange={handleChange}
        value={formData.fname}
      />

      <label htmlFor="email">Email : </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Your email.."
        onChange={handleChange}
        value={formData.email}
      />
      <input disabled={loader} type="submit" value="Submit" />
    </form>
  );
};

export default memo(Form);
