import React, { useEffect, useState, useContext } from "react";
import { createPost, getUserSubscriptionById, changePostCreditsUserSubscriptionById } from "./services/post.service.ts";
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import "./styles/post.style.css"
import "boxicons";
import UserStatus from "../../Shared/status.js";
import { getUserByEmail } from "../Login/services/login.service.ts"
import AuthContext from "../../context/authContext";
import {updateUserSubscriptionById} from "../UserSubscriptions/services/userSubscriptions.service.ts"


const Post = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [user, setUser] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [rewrittenContent, setRewrittenContent] = useState('');

  const { logout } = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') {
      logout();
    } else {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      if (decodedToken.email != null) {
        const fetchData = async () => {
          // Get User By Email
          const userData = await getUserByEmail(decodedToken.email);
          setUser(userData);
          // Get User Subscription By Id
          const response = await getUserSubscriptionById(userData.userSubscriptionId);
          setUserSubscription(response.data);
          console.log(response.data);
        }
        fetchData();
      }
    }
  }, []);

  const fetchUserSubscription = async () => {
    const response = await getUserSubscriptionById(user.userSubscriptionId);
    setUserSubscription(response.data);
  }

  const getTextAreaValue = (e) => {
    const value = e.target.value;
    setTextAreaValue(value);
    setIsDisabled(value === '');
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rewrittenContent).then(() => {
      toast.success('تم نسخ النص بنجاح');
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (textAreaValue == "") {
      toast.error("برجاء كتابة المقالة");
    } else if (userSubscription.postCredits == 0) {
      toast.error("لقد أنتهت عدد مرات استخدام الخدمة برجاء الاشتراك مرة اخري");

    } else if (userSubscription.status == UserStatus.Expired || userSubscription.status == UserStatus.Pendding || userSubscription.status == UserStatus.Rejected) {
      toast.error("لقد تم الانتهاء من هذا الاشتراك برجاء التجديد");
    } else {
      const model = {
        article: textAreaValue,
        userId: user.id,
      }
      const respone = await createPost(model);
      if (respone.isSuccess) {
        if (userSubscription.postCredits <= 1) {
          await updateUserSubscriptionById(userSubscription.id, UserStatus.Expired, userSubscription.days)
        }
        const newPostCredits = userSubscription.postCredits - 1;
        const result = await changePostCreditsUserSubscriptionById(userSubscription.id, newPostCredits);
        if (result == true) {
          await fetchUserSubscription();
          setRewrittenContent(textAreaValue);
          setTextAreaValue('');
          toast.success("تم إعادة صياغة المقال بنجاح");
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <div className="form-group">
              <label className="mb-2" htmlFor="exampleFormControlTextarea1">برجاء كتابة المقالة</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                onChange={getTextAreaValue}
                value={textAreaValue}
              ></textarea>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button disabled={isDisabled} className="btn btn-primary mt-2 pl-3 pr-3">إعادة صياغة المقال</button>
              </div>
              <div>
                {userSubscription && (
                  <>
                    {userSubscription.postCredits > 0 ? (
                      <div className="credits">
                        لديك عدد 
                        <span> {userSubscription.postCredits} </span> 
                        مرات لاستخدام الخدمة  
                      </div>
                    ): (
                      <div className="credits">
                        <span className="text-danger">لقد تم انتهاء الخدمة برجاء الاشتراك مرة اخري</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      {rewrittenContent != '' && (
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-8">
            <div className="copyarea mt-5">
              <div className="copy" onClick={copyToClipboard}>
                <box-icon name='copy-alt' className="icon"></box-icon>
              </div>
              {rewrittenContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Post;
