import React from "react";
import "./Details.css";

const productData = [
  {
    name: "Brand",
    Description: "Other",
  },
  {
    name: "Condition",
    Description: "New",
  },
  {
    name: "Color",
    Description: "White",
  },
  {
    name: "Size",
    Description: "M",
  },
  {
    name: "Description",
    Description: "Stylish and durable leather bag for laptops.",
  },
];

export default function Details() {
  return (
    <div className="product-specs">
      {productData.map((data) => (
        <React.Fragment key={data.name}>
          <span className="spec-head">{data.name}</span>
          <span className="spec-value">{data.Description}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
