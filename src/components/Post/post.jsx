import React from "react";
import "boxicons";

const Post = () => {
  return (
    <>
    <form action="">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-8">
          <div className="form-group">
            <label for="exampleFormControlTextarea1">برجاء كتابة المقالة</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button className="btn btn-primary mt-2 pl-3 pr-3">ارسال</button>
        </div>
      </div>
    </form>
    </>
  );
};

export default Post;
