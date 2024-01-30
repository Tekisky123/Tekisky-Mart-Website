import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button,  FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AllUserAPI, Base_Url, deleteUserAPI, updateUserAPI } from '../common/Apis';

const Users = () => {

    const [editIndex, setEditIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState([]);

      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        role: "", 
        shopCategory: "", 
      });

      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get(`${Base_Url}${AllUserAPI}`);
            console.log("response",response)
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
    

      const handleSaveEdit = async (id) => {
        try {
          const updatedData = [...userData];
          const updatedUser = updatedData[editIndex];

          const payload={
            firstName: formData.firstName,
            lastName: formData.lastName,
            mobileNumber: formData.mobileNumber,
            email: formData.email,
            role: formData.role, 
            shopCategory: formData.shopCategory, 
          }
    
          // Make API call to update user
          await axios.put(`${Base_Url}${updateUserAPI}${id}`, payload);
    
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

    const handleDelete = (index) => {
        setShowDeleteModal(true);
        setDeleteIndex(index);
      };
      const confirmDelete = async (id) => {
        try {
          const updatedData = [...userData];
          const deletedUser = updatedData[deleteIndex];
    
          // Make API call to delete user
          await axios.delete(`${Base_Url}${deleteUserAPI}${deletedUser.id}`);
    
          updatedData.splice(deleteIndex, 1);
          setUserData(updatedData);
          setShowDeleteModal(false);
          setDeleteIndex(null);
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
    <div style={{width:"90%",margin:"auto"}}>
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
                  value={formData.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              ) : (
                row.firstName
              )}
            </td>
            <td>
              {editIndex === index ? (
                <FormControl
                  type="text"
                  value={formData.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                />
              ) : (
                row.lastName
              )}
            </td>
            <td>
              {editIndex === index ? (
                <FormControl
                  type="text"
                  value={formData.mobileNumber || ''}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                />
              ) : (
                row.mobileNumber
              )}
            </td>
            <td>
              {editIndex === index ? (
                <FormControl
                  type="text"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                row.email
              )}
            </td>
            <td>
              {editIndex === index ? (
                <FormControl
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                />
              ) : (
                row.role
              )}
            </td>
            <td>
              {editIndex === index ? (
                <FormControl
                  type="text"
                  value={formData.shopCategory || ''}
                  onChange={(e) => handleInputChange('shopCategory', e.target.value)}
                />
              ) : (
                row.shopCategory
              )}
            </td>
            <td>
              {editIndex === index ? (
                <>
                  <Button variant="success" onClick={()=>handleSaveEdit(userData._id)}>
                    Save
                  </Button>
                  <Button variant="danger" onClick={()=>handleCancelEdit(userData._id)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <div style={{display:"flex",justifyContent:"space-evenly"}}>
                    <Button variant="primary" onClick={() => handleEdit(index)}>
                    <FaUserEdit />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(index)}>
                    <MdDeleteForever />
                    </Button>

                  </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>

    <Modal className='deleteModal' show={showDeleteModal} onHide={cancelDelete} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this row?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={cancelDelete}>
          Cancel
        </Button>
        <Button variant="danger" onClick={confirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  )
}

export default Users;