import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeService from '../service/EmployeeService';

const UpdateEmployee = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    id: id,
    name: "",
    phone: "",
    email: ""
  });

  // ✅ Fix here: use e.target.name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(employee, id)
      .then((response) => {
        console.log("Updated", response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className='text-center'>Update Employee</h1>
      <div className='container'>
        <div className='m-5'>
          <input
            className='form-control mb-3'
            type='text'
            name='name'
            value={employee.name}
            onChange={handleChange}
            placeholder='Name'
          />
          <input
            className='form-control mb-3'
            type='number'
            name='phone'
            value={employee.phone}
            onChange={handleChange}
            placeholder='Phone'
          />
          <input
            className='form-control mb-3'
            type='email'
            name='email'
            value={employee.email}
            onChange={handleChange}
            placeholder='Email'
          />
        </div>
        <div className='mx-5'>
          <button className='btn btn-secondary mx-2' onClick={updateEmployee}>Update Employee</button>
          <button className='btn btn-danger' onClick={() => navigate("/")}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
