import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdFileDownloadDone } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  AllUserAPI,
  Base_Url,
  deleteUserAPI,
  updateUserAPI,
} from "../common/Apis";


const Users = () => {

  const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState([]);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    role: "",
    shopCategory: "",
  });

  console.log("formdata",formData)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${Base_Url}${AllUserAPI}`);
        console.log("response", response);
        setUserData(response?.data?.users?.users);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(userData[index]);
  };

  const openChangePasswordModal = (userId) => {
    setSelectedUserId(userId);
    setShowChangePasswordModal(true);
  };

  const closeChangePasswordModal = () => {
    setSelectedUserId(null);
    setShowChangePasswordModal(false);
    setPassword(""); // Reset password state
  };

  const handleChangePassword = async () => {
    try {
      // Make API call to update password
      await axios.post(`${Base_Url}${updateUserAPI}${selectedUserId}`, {
        password,
      });

      closeChangePasswordModal();
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      const updatedData = [...userData];
      const updatedUser = updatedData[editIndex];

      const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobileNumber: formData.mobileNumber,
      email: formData.email,
      role: formData.role,
      shopCategory: formData.shopCategory,
    };
      console.log("payload",payload)
      // Make API call to update user
      await axios.post(`${Base_Url}${updateUserAPI}${id}`, payload);

      setUserData(updatedData);
      setEditIndex(null);
      setFormData({});
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setFormData({});
  };

  //   const handleDelete = (index) => {
  //     const confirmDelete = window.confirm('Are you sure you want to delete this row?');

  //     if (confirmDelete) {
  //       const updatedData = [...userData];
  //       updatedData.splice(index, 1);
  //       setUserData(updatedData);

  //       console.log(`Delete row at index ${index}`);
  //     }
  //   };

  const handleDelete = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this User?"
    );
    if (userConfirmed) {
      confirmDelete(id);
      // setDeleteIndex(index);
    }
  };
  const confirmDelete = async (id) => {
    console.log("id", id);
    try {
      const updatedData = [...userData];
      const deletedUser = updatedData[deleteIndex];

      // Make API call to delete user
      await axios.get(`${Base_Url}${deleteUserAPI}${id}`);

      updatedData.splice(deleteIndex, 1);
      setUserData(updatedData);
      setShowDeleteModal(false);
      setDeleteIndex(null);

      // Fetch data again after successful deletion
      const response = await axios.get(`${Base_Url}${AllUserAPI}`);
      setUserData(response?.data?.users?.users);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  return (
    <div style={{ width: "90%", margin: "auto",overflowX:"auto" }}>
    <div style={{marginBottom:"40px"}}>
      <button className="formButton" onClick={()=>navigate('/create-user')}>
       Create user
      </button>
    </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Shop Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((row, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <FormControl
                    type="text"
                    value={formData.firstName || ""}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                  />
                ) : (
                  row.firstName
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <FormControl
                    type="text"
                    value={formData.lastName || ""}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                  />
                ) : (
                  row.lastName
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <FormControl
                    type="text"
                    value={formData.mobileNumber || ""}
                    onChange={(e) =>
                      handleInputChange("mobileNumber", e.target.value)
                    }
                  />
                ) : (
                  row.mobileNumber
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <FormControl
                    type="text"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  row.email
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <FormControl
                    type="text"
                    value={formData.role || ""}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                  />
                ) : (
                  row.role
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <FormControl
                    type="text"
                    value={formData.shopCategory || ""}
                    onChange={(e) =>
                      handleInputChange("shopCategory", e.target.value)
                    }
                  />
                ) : (
                  row.shopCategory
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleSaveEdit(row?._id)}
                    >
                      <MdFileDownloadDone />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleCancelEdit(row?._id)}
                    >
                      <MdCancel />
                    </Button>
                    
                  </>
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Button variant="primary" onClick={() => handleEdit(index)}>
                      <FaUserEdit />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(row._id)}
                    >
                      <MdDeleteForever />
                    </Button>
                    <Button
                    style={{color:"#fff"}}
                      variant="info"
                      onClick={() => openChangePasswordModal(row._id)}
                    >
                      Change Password
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        className="changePasswordModal"
        show={showChangePasswordModal}
        onHide={closeChangePasswordModal}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>New Password:</label>
          <FormControl
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeChangePasswordModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleChangePassword}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
