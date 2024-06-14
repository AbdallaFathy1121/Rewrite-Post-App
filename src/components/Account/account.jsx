import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import {getUserSubscriptionsByUserId} from "./services/account.service.ts"
import { jwtDecode } from 'jwt-decode';
import './styles/account.style.css'
import {getUserByEmail} from "../Login/services/login.service.ts"

const Account = () => {
    const [userSubscriptions, setUserSubscriptions] = useState(null);
    const [user, setUser] = useState(null);
    const { logout } = useContext(AuthContext);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || typeof token !== 'string') {
            logout();
        } else {
            const decodedToken = jwtDecode(localStorage.getItem('token'));
            const fetchData = async () => {
                const userData = await getUserByEmail(decodedToken.email);
                setUser(userData);
                const data = await getUserSubscriptionsByUserId(userData.id);
                setUserSubscriptions(data);
            }
            fetchData();
        }
    }, []);



    return (
        <div class="users page">
        <div class="card">
          <div class="card-header">المستخدمين</div>
          <div class="card-body">
            <table class="table table-striped table-bordered table-hover table-responsive-md  align-middle text-center">
              <thead>
                <tr>
                  <th scope="col">الاشتراك</th>
                  <th scope="col">عدد مرات استخدام الخدمة</th>
                  <th scope="col">العدد المتبقى من الاشتراك</th>
                  <th scope="col">حالة الاشتراك</th>
                  <th scope="col">الاشتراك الحالى</th>
                </tr>
              </thead>
              <tbody>
                {userSubscriptions && (
                  <>
                    {userSubscriptions.map((item, index) => (
                      <tr>
                        <td>{item.Name}</td>
                        <td>{item.PostCredits}</td>
                        <td>{item.PostCreditsRemaining}</td>
                        <td className="status">{item.Status}</td>
                        <td>
                            {item.Id == user.userSubscriptionId && (
                                <span>
                                    مفعل
                                </span>
                            )}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}


export default Account;