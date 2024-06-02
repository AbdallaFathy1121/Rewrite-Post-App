import React from "react";
import "boxicons";
import "./styles/subscriptions.style.css"

const Subscriptions = () => {
  return (
    <>
    <div className="pricing">
      <div class="row">
        <div class="col-10 col-sm-10 col-md-6 col-lg-4 mx-auto">
          <div class="table bg-light text-center">
            <div class="wave"></div>
            <h3>
              Standard
              <br />
              $25 / Month
            </h3>
            <p class="mb-4">
              1000GB Monthly Bandwidth
              <br />
              100 Google Adwords
              <br />
              SSL Shopping Cart
              <br />
              24/7 Live Support
            </p>
            <button
              class="button text-uppercase mt-2"
              type="button"
            >
              Purchase Now
            </button>
          </div>
        </div>

        <div class="col-10 col-sm-10 col-md-6 col-lg-4 mx-auto">
          <div class="table bg-light text-center">
            <div class="wave"></div>
            <h3>
              Professional
              <br />
              $125 / Month
            </h3>
            <p class="mb-4">
              1000GB Monthly Bandwidth
              <br />
              100 Google Adwords
              <br />
              SSL Shopping Cart
              <br />
              24/7 Live Support
            </p>
            <button
              class="button text-uppercase mt-2"
              type="button"
            >
              Purchase Now
            </button>
          </div>
        </div>

        <div class="col-10 col-sm-10 col-md-6 col-lg-4 mx-auto">
          <div class="table bg-light text-center">
            <div class="wave"></div>
            <h3>
              Business
              <br />
              $255 / Month
            </h3>
            <p class="mb-4">
              1000GB Monthly Bandwidth
              <br />
              100 Google Adwords
              <br />
              SSL Shopping Cart
              <br />
              24/7 Live Support
            </p>
            <button
              class="button text-uppercase mt-2"
              type="button"
            >
              Purchase Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Subscriptions;
