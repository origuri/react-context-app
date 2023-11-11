import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Products from "./Products";
import Options from "./Options";
import ErrorBanner from "./ErrorBanner";
import { OrderContext } from "../context/OrderContext";

interface TypeProps {
  orderType: string;
}

interface IItems {
  name: string;
  imagePath: string;
  description: string;
}

const Type = ({ orderType }: TypeProps) => {
  const [items, setItems] = useState<IItems[]>([]);
  // fetch할 때 에러를 발견하면 배너를 띄위기 위함.
  const [errors, setErrors] = useState(false);

  const [orderData, updateItemCount] = useContext(OrderContext);
  console.log("타입 orderData-> ", orderData);
  console.log("타입 updateItemCount-> ", updateItemCount);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  // 여기서 사용하는 파라미터는 위에랑 다른 것.
  const loadItems = async (orderType: string) => {
    try {
      // fetch였으면 await로 두 번 감싸줘야 되는데 axios는 한번만 하면 됨.
      // 자동으로 json으로 파싱해 줌.
      const res = await axios.get(`http://localhost:4000/${orderType}`);

      // 단 .data를 붙여야 함.
      setItems(res.data);
      console.log("axios 페치 -> ", res.data);
    } catch (error) {
      console.error("axios 에러 -> ", error);
      setErrors(true);
    }
  };
  console.log(errors);

  if (errors) {
    return <ErrorBanner message={"에러가 발생했습니다."} />;
  }

  // 컴포넌트를 동적으로 사용하기 위함.
  const ItemComponent = orderType === "products" ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName: string, newItemCount: number) =>
        updateItemCount(itemName, newItemCount, orderType)
      }
    />
  ));

  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격 : </p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" ? "column" : "row",
        }}
      >
        {optionItems}
      </div>
    </div>
  );
};

export default Type;
