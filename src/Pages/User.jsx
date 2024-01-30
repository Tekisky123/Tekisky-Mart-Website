import React, { useState } from 'react'
import { Table, Button,  FormControl } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const Users = () => {

    const [editIndex, setEditIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const [data, setData] = useState([
        { lastName: 'Rose', firstName: 'Alfred', dob: '01/09/1978', omId: 'super user' },
        // Add more data as needed
      ]);
    
      const handleEdit = (index) => {
        setEditIndex(index);
        setEditedData(data[index]);
      };
    
      const handleSaveEdit = () => {
        const updatedData = [...data];
        updatedData[editIndex] = editedData;
        setData(updatedData);
        setEditIndex(null);
        setEditedData({});
      };
    
      const handleCancelEdit = () => {
        setEditIndex(null);
        setEditedData({});
      };

    //   const handleDelete = (index) => {
    //     const confirmDelete = window.confirm('Are you sure you want to delete this row?');
      
    //     if (confirmDelete) {
    //       const updatedData = [...data];
    //       updatedData.splice(index, 1);
    //       setData(updatedData);
      
    //       console.log(`Delete row at index ${index}`);
    //     }
    //   };

    const handleDelete = (index) => {
        setShowDeleteModal(true);
        setDeleteIndex(index);
      };
    
      const confirmDelete = () => {
        const updatedData = [...data];
        updatedData.splice(deleteIndex, 1);
        setData(updatedData);
        setShowDeleteModal(false);
        setDeleteIndex(null);
      };
    
      const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteIndex(null);
      };


      const handleInputChange = (fieldName, value) => {
        setEditedData((prevData) => ({ ...prevData, [fieldName]: value }));
      };


  return (
    <div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Last Name</th>
          <th>First Name</th>
          <th>DOB</th>
          <th>OM ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              {editIndex === index ? (
                <FormControl
                  type="text"
                  value={editedData.lastName || ''}
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
                  value={editedData.firstName || ''}
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
                  value={editedData.dob || ''}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                />
              ) : (
                row.dob
              )}
            </td>
            <td>
              {editIndex === index ? (
                <FormControl
                  type="text"
                  value={editedData.omId || ''}
                  onChange={(e) => handleInputChange('omId', e.target.value)}
                />
              ) : (
                row.omId
              )}
            </td>
            <td>
              {editIndex === index ? (
                <>
                  <Button variant="success" onClick={handleSaveEdit}>
                    Save
                  </Button>
                  <Button variant="danger" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                    <Button variant="primary" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>

                  </>
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