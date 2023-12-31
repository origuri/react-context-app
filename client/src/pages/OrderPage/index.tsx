import React from "react";
import Type from "../../components/Type";

const OrderPage = () => {
  return (
    <div>
      <h1>여행 상품</h1>
      <div>
        <Type orderType={"products"} />
      </div>
      <div style={{ display: "flex", marginTop: 20 }}>
        <div style={{ width: "50%" }}>
          <Type orderType={"options"} />
        </div>
        <div style={{ width: "50%" }}>
          <h2>총 가격</h2>
          <button>주문</button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
