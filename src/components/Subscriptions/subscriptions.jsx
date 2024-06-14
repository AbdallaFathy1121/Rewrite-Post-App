import React, { useEffect, useState, useContext } from "react";
import "boxicons";
import "./styles/subscriptions.style.css";
import { getAllSubscriptions } from "./services/subscription.service.ts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { assignUserIntoSubscription, updateUserSubscriptionIdById } from "../../components/Login/services/login.service.ts";
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import AuthContext from "../../context/authContext";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(Number);
  const [phoneNumber, setPhoneNumber] = useState(String);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext)

  // Handle Model Popup
  const handleClose = () => setShow(false);
  const handleShow = (subscriptionId) => {
    setShow(true);
    setSubscriptionId(subscriptionId);
  };

  const addSubscriptionSuccssNotify = () => toast.success('تم الاشتراك فى الباقة برجاء الانتظار حتى يتم تفعيل الباقة من خلال الوتس اب',  {
    duration: 6000,
  });


  // Add New Subscription
  const handleAddSubscription = async () => {
    const userId = userData.id;
    const phone = phoneNumber;
    const subId = subscriptionId;
    const result = await assignUserIntoSubscription(userId, subId, phone);
    updateUserSubscriptionIdById(userId, result.Id);
    addSubscriptionSuccssNotify();
    if (result) {
      console.log("Done: ", result);
      handleClose();
    } else {
      console.log(result);
    }
  };

  const handlePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber.toString());
  }

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
    } else {
      // Get User Data By Email
      const fetchUser = async () => {
        try {
          const userData = jwtDecode(localStorage.getItem('token'));
          if (userData.email == null) {
            logout();
          } else {
            setUserData(userData);
          }
        } catch (error) {}
      };
      fetchUser();
  
      // Get All Subscriptions
      const setAllSubscriptions = async () => {
        const result = await getAllSubscriptions();
        setSubscriptions(result.data);
      };
      setAllSubscriptions();
    }
  }, []);

  return (
    <>
      <div className="pricing">
        <div className="row">
          {subscriptions ? (
            <>
              {subscriptions.map((item, index) => (
                <>
                  {item.Id != 1 && (
                    <div className="col-10 col-sm-10 col-md-6 col-lg-4 mx-auto">
                      <div className="table bg-light text-center">
                        <div className="wave"></div>
                        <h3>الاشتراك {item.Name}</h3>
                        <p className="mb-4">
                          <br />
                          {item.Days} يوم
                          <br />
                          عدد مرات تنفيذ الخدمة {item.PostCredits}
                          <br />
                          سعر الاشتراك {formatToDollar(item.Price)}
                        </p>
                        <button
                          className="button text-uppercase mt-2"
                          type="button"
                          onClick={() => handleShow(item.Id)}
                        >
                          أشترك الان
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>تأكيد الاشتراك</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input
              className="form-control"
              id="phone"
              type="number"
              placeholder="ادخل رقم الهاتف"
              onKeyUp={handlePhoneNumber} 
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            الغاء
          </Button>
          <Button variant="primary" onClick={() => handleAddSubscription()}>
            تأكيد
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Subscriptions;
