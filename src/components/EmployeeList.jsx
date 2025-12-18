import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);   // ✅ fix
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees(); // ✅ plural
        setEmployees(response.data);
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployeeById(id)
      .then(() => {
        setEmployees((prev) =>
          prev.filter((employee) => employee.id !== id)
        );
      })
      .catch((error) => console.log("Error deleting employee:", error));
  };

  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  return (
    <div className="container">
      <div className="m-5">
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/addEmployee")}
        >
          Add Employee
        </button>
        <div className="table-responsive">
          <table className="table table-bordered table-striped"> {/* ✅ fix */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            {!loading && (
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.email}</td>
                    <td>
                      <button
                        className="btn btn-success m-1"
                        onClick={(e) => editEmployee(e, employee.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger m-1"
                        onClick={(e) => deleteEmployee(e, employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
