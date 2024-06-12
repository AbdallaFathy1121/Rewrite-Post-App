import React, { useState } from "react";
import { createPost } from "./services/post.services.ts";
import "boxicons";

const Post = () => {

  const [textAreaValue, setTextAreaValue] = useState("");

  const getTextAreaValue = (e) => {
    setTextAreaValue(e.target.value);
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    var currentdate = new Date();
    const model = {
      article: textAreaValue,
      userId: "106273994746321215219",
      createdAt: currentdate.toISOString(),
    }
    const respone = await createPost(model);
    console.log("respone", respone);
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
                rows="3"
                onChange={getTextAreaValue}
              ></textarea>
            </div>
            <button className="btn btn-primary mt-2 pl-3 pr-3">إعادة صياغة المقال</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Post;
