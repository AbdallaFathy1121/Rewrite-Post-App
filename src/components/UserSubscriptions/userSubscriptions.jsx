import React, { useState, useEffect, useCallback } from "react";
import { getAllUserSubscriptions, updateUserSubscriptionById } from "./services/userSubscriptions.service.ts";
import "./styles/userSubscriptions.style.css";
import toast from 'react-hot-toast';
import UserStatus from "../../Shared/status.js";
import { jwtDecode } from 'jwt-decode';
import {updateUserSubscriptionIdById} from "../Login/services/login.service.ts"

const UserSubscriptions = () => {
  const [userSubscriptions, setUserSubscriptions] = useState(null);
  const [userId, setUserId] = useState(null);
  const allStatus = [UserStatus.Pendding, UserStatus.Accepted, UserStatus.Rejected, UserStatus.Expired];

  const handleGetUserSubscriptions = async () => {
    const result = await getAllUserSubscriptions();
    setUserSubscriptions(result.data);
  };

  const handleSelectChange = async (event) => {
    const value = event.target.value;
    const selectedIndex = event.target.selectedIndex;
    const itemId = event.target.options[selectedIndex].getAttribute('data-item-id');
    const days = event.target.options[selectedIndex].getAttribute('data-item-days');
    await updateUserSubscription(itemId, value, days);
    if (value == UserStatus.Accepted) {
      await updateUserSubscriptionIdById(userId, itemId);
    }
  };

  const changeStatusSuccssNotify = () => toast.success("تم تغيير حالة الاشتراك بنجاح");

  // Update Status of UserSubscription
  const updateUserSubscription = useCallback(async(id, status, days) => {
    const result = await updateUserSubscriptionById(id, status, days);
    changeStatusSuccssNotify();
  })

  // Format Price
  const formatToDollar = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  useEffect(() => {
    const userData = jwtDecode(localStorage.getItem('token'));
    setUserId(userData.id);
  }, []);

  useEffect(() => {
    handleGetUserSubscriptions();
  }, [updateUserSubscription]);

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
                          <option selected data-item-id={item.Id} data-item-days={item.Days} value={item.Status}>{item.Status}</option>
                          {allStatus.map(status => (
                            status != item.Status && <option data-item-id={item.Id} data-item-days={item.Days} value={status}>{status}</option>
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
