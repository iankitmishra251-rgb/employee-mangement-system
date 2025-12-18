import React, { useState } from 'react'
import EmployeeService from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    phone: "",
    email: ""
  });

  // ✅ Corrected handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    EmployeeService.saveEmployee(employee)
      .then((response) => {
        console.log("Saved ", response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setEmployee({
      id: "",
      name: "",
      phone: "",
      email: ""
    });
  };

  const navigate = useNavigate();

  return (
    <>
      <h1 className='text-center'>Add New Employee</h1>
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
      <div className='m-5'>
        <button onClick={saveEmployee} className='btn btn-success'>Save</button>
        <button onClick={reset} className='btn btn-warning mx-2'>Clear</button>
        <button onClick={() => navigate("/")} className='btn btn-danger'>Cancel</button>
      </div>
      </div>
    </>
  );
};

export default AddEmployee;
