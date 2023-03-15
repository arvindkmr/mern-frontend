import React, { Fragment } from "react";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <p>Shipping Details</p>,
      // icon: <LocalShippingIcon />,
    },
    {
      label: <p>Confirm Order</p>,
      // icon: <LibraryAddCheckIcon />,
    },
    {
      label: <p>Payment</p>,
      // icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <div style={stepStyles}>
        {steps.map((item, index) => (
          <div
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <div
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default CheckoutSteps;
