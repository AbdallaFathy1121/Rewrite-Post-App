import React, { useState, useEffect, useCallback, useContext } from "react";
import { getAllUserSubscriptions, updateUserSubscriptionById } from "./services/userSubscriptions.service.ts";
import "./styles/userSubscriptions.style.css";
import toast from 'react-hot-toast';
import UserStatus from "../../Shared/status.js";
import {updateUserSubscriptionIdById, getUserByEmail} from "../Login/services/login.service.ts"
import AuthContext from "../../context/authContext";
import { getUserSubscriptionById } from "../Post/services/post.service.ts"


const UserSubscriptions = () => {
  const [userSubscriptions, setUserSubscriptions] = useState(null);
  const { logout } = useContext(AuthContext);
  const allStatus = [UserStatus.Pendding, UserStatus.Accepted, UserStatus.Rejected, UserStatus.Expired];
  const changeStatusSuccssNotify = () => toast.success("تم تغيير حالة الاشتراك بنجاح");

  const handleGetUserSubscriptions = async () => {
    const result = await getAllUserSubscriptions();
    setUserSubscriptions(result.data);
  };

  const handleSelectChange = async (event) => {
    const value = event.target.value;
    const selectedIndex = event.target.selectedIndex;
    const itemId = event.target.options[selectedIndex].getAttribute('data-item-id');
    const days = event.target.options[selectedIndex].getAttribute('data-item-days');
    const userId = event.target.options[selectedIndex].getAttribute('data-user-id');
    const email = event.target.options[selectedIndex].getAttribute('data-email');

    handleExpiredOlUserSubscription(email, itemId, value);

    await updateUserSubscription(itemId, value, days);
    if (value == UserStatus.Accepted) {
      await updateUserSubscriptionIdById(userId, itemId);
    }
    changeStatusSuccssNotify();
  };


  const handleExpiredOlUserSubscription = async (email, userSubscriptionId, status) => {
    const result = await getUserByEmail(email);
    const userSubId = result.userSubscriptionId;
    if (userSubId != userSubscriptionId && status == UserStatus.Accepted) {
      const expired = UserStatus.Expired;
      const userSubscription = await getUserSubscriptionById(userSubId);
      await updateUserSubscription(userSubId, expired, userSubscription.data.days);
    }
  }


  // Update Status of UserSubscription
  const updateUserSubscription = useCallback(async(id, status, days) => {
    const result = await updateUserSubscriptionById(id, status, days);
    await handleGetUserSubscriptions();
  })

  // Format Price
  const formatToDollar = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') { 
      logout();
    }
    handleGetUserSubscriptions();
  }, []);

  return (
    <>
      <div class="users page">
        <div class="card">
          <div class="card-header">المشتركين</div>
          <div class="card-body">
            <table class="table table-striped table-bordered table-hover table-responsive-md  align-middle text-center">
              <thead>
                <tr>
                  <th scope="col">الصورة</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">الاشتراك</th>
                  <th scope="col">رقم الهاتف</th>
                  <th scope="col">سعر الاشتراك</th>
                  <th scope="col">عدد مرات الخدمة</th>
                  <th scope="col">عدد استهلاك الخدمة</th>
                  <th scope="col">حالة الاشتراك</th>
                  <th scope="col">تغيير حالة الاشتراك</th>
                </tr>
              </thead>
              <tbody>
                {userSubscriptions && (
                  <>
                    {userSubscriptions.map((item, index) => (
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
                        <td>{item.UserName}</td>
                        <td>{item.SubscriptionName}</td>
                        <td>{item.PhoneNumber}</td>
                        <td>{formatToDollar(item.Price)}</td>
                        <td>{item.PostCredits}</td>
                        <td>{item.PostCreditsRemaining}</td>
                        <td className="active_status">{item.Status}</td>
                        <td>
                        <select class="form-select" onChange={handleSelectChange}>
                          <option selected data-email={item.Email} data-user-id={item.UserId} data-item-id={item.Id} data-item-days={item.Days} value={item.Status}>{item.Status}</option>
                          {allStatus.map(status => (
                            status != item.Status && <option data-email={item.Email} data-user-id={item.UserId} data-item-id={item.Id} data-item-days={item.Days} value={status}>{status}</option>
                          ))}
                        </select>
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
    </>
  );
};

export default UserSubscriptions;
