import React, { useState, useEffect, useContext } from "react";
import { getAllUsers } from "./services/users.service.ts";
import "./styles/users.style.css";
import AuthContext from "../../context/authContext";

const Users = () => {
  const [users, setUsers] = useState([]);

  const { logout } = useContext(AuthContext);

  const handleGetUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') { 
      logout();
    } else {
      const result = await getAllUsers();
      if (result.data != null) {
        setUsers(result.data);
      }
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <>
      <div class="users page">
        <div class="card">
          <div class="card-header">المستخدمين</div>
          <div class="card-body">
            <table class="table table-striped table-bordered table-hover table-responsive-md  align-middle text-center">
              <thead>
                <tr>
                  <th scope="col">الصورة</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">البريد الالكترونى</th>
                  <th scope="col">عدد مرات اعادة الصياغة</th>
                  <th scope="col">الصلاحيات</th>
                </tr>
              </thead>
              <tbody>
                {users && (
                  <>
                    {users.map((item, index) => (
                      <tr>
                        {item.Picture ? (
                          <td>
                            <img src={item.Picture} alt="" />
                          </td>
                        ) : (
                          <td>
                            <div className="avatar" id="avatar">
                              <img
                                src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                                alt=""
                              />
                            </div>
                          </td>
                        )}
                        <td>{item.Name}</td>
                        <td>{item.email}</td>
                        <td>{item.PostNumbers}</td>
                        <td>{item.RoleName}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
