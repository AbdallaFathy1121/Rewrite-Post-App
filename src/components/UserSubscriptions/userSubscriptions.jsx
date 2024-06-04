import React, { useState, useEffect, useCallback } from "react";
import { getAllUserSubscriptions, updateUserSubscriptionById } from "./services/userSubscriptions.service.ts";
import "./styles/userSubscriptions.style.css";
import toast from 'react-hot-toast';


const UserSubscriptions = () => {
  const [userSubscriptions, setUserSubscriptions] = useState(null);

  const handleGetUserSubscriptions = async () => {
    const result = await getAllUserSubscriptions();
    setUserSubscriptions(result.data);
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
                  <th scope="col">سعر الاشتراك</th>
                  <th scope="col">عدد مرات الخدمة</th>
                  <th scope="col">عدد استهلاك الخدمة</th>
                  <th scope="col">حالة الاشتراك</th>
                  <th scope="col">التفاعل</th>
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
                        <td>{formatToDollar(item.Price)}</td>
                        <td>{item.PostCredits}</td>
                        <td>{item.PostCreditsRemaining}</td>
                        {item.Status == true ? (
                          <>
                            <td className="active_status">مفعل</td>
                            <td>
                              <button className="btn btn-danger" onClick={() => updateUserSubscription(item.Id, 0, item.Days)}>الغاء التفعيل</button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="de_active_status">غير مفعل</td>
                            <td>
                              <button className="btn btn-success" onClick={() => updateUserSubscription(item.Id, 1, item.Days)}>تفعيل</button>
                            </td>
                          </>
                        )}
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
