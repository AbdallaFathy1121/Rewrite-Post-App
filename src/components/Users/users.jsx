import React, { useState, useEffect } from "react";
import { getAllUsers } from "./services/users.service.ts";
import "./styles/users.style.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  const handleGetUsers = async () => {
    const result = await getAllUsers();
    if (result.data != null) {
      setUsers(result.data);
    }
    console.log(result);
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
                  <th scope="col">عدد الاشتراكات</th>
                  <th scope="col">الصلاحيات</th>
                </tr>
              </thead>
              <tbody>
                {users && (
                  <>
                    {users.map((item, index) => (
                      <tr>
                        {item.picture ? (
                          <td>
                            <img src={item.picture} alt="" />
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
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>0</td>
                        <td>{item.roleName}</td>
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
