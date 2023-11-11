import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

interface OrderContextProviderProps {
  children: ReactNode;
}

interface orderCountsProps {
  products: Map<string, number>;
  options: Map<string, number>;
  // 인덱스 시그니처
  // 37번 라인에 orderType이 string 타입으로 온다는 의미
  // option이라는 키로 가져오는 게  Map<string, string> 타입이라는 의미
  // orderCount에는 products와 options가 있고 각각 키로 가져올 수 있는 map의 타입과 일치해야 함.
  [key: string]: Map<string, number>;
}

interface TotalProps {
  products: number;
  options: number;
  total: number;
}

interface pricePerItemProps {
  products: number;
  options: number;
  [key: string]: number;
}
// context가 되는 부분에서는 null을 넣어줌.
export const OrderContext = createContext<any>(null);

// 여기서 props는 App 컴포넌트와 App의 자식 컴포넌트들
export function OrderContextProvider(props: OrderContextProviderProps) {
  // orderCounts.products 이런 식으로 접근 가능해짐.
  const [orderCounts, setOrdercounts] = useState<orderCountsProps>({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState<TotalProps>({
    products: 0,
    options: 0,
    total: 0,
  });

  // 아이템 가격 명시
  const pricePerItem: pricePerItemProps = {
    products: 1000,
    options: 500,
  };

  // 계산해주는 함수
  const calculateSubTotal = (
    orderType: string,
    orderCounts: orderCountsProps
  ) => {
    let optionCount = 0;
    for (const count of orderCounts[orderType].values()) {
      optionCount += count;
    }
    if (orderType === "products") {
      // 이거하면 1 0 0 0 이런식으로 나옴
      console.log("이거 옵션 카운트=> ", orderCounts[orderType].values());
    }

    return optionCount * pricePerItem[orderType];
  };

  // 최초 렌더시 실행하고 그 후 주문 변경할 때마다 렌더링
  useEffect(() => {
    const productsTotal = calculateSubTotal("products", orderCounts);
    const optionsTotal = calculateSubTotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    console.log("product count -> ", orderCounts);

    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total: total,
    });
  }, [orderCounts]);

  // orderCounts가 변화 했을 때만 실행 되도록 배열에 orderCounts 선언
  // 리턴 값을 배열로 받는다.
  const value = useMemo(() => {
    const updateItemCount = (
      itemName: string,
      newItemCount: number,
      orderType: string
    ) => {
      // 불변성을 지키기 위함
      const newOrderCounts = { ...orderCounts };
      console.log("newOrderCounts before => ", newOrderCounts);

      // orderCount.options === orderCount[options]
      // 이렇게 하는 이유는 동적으로 가져오기 위함. orderCount.orderType은 초기값에 orderType이 있어야만 가져올 수 있음.
      const orderCountsMap = newOrderCounts[orderType];
      orderCountsMap.set(itemName, newItemCount);
      console.log("orderCountsMap => ", orderCountsMap);

      console.log("newOrderCounts after => ", newOrderCounts);

      setOrdercounts(newOrderCounts);
    };
    // 현재 오더 카운트, 가격 그걸 업데이트해 줄 함수를 리턴함.
    // const [orderData, updateItemCount] = useContext(OrderContext); 이렇게 쓰기 위함.
    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);

  console.log("이거 벨류 => ", value);

  // orderCounts의 복사본을 props로 보냄. {...props}는 App 컴포넌트를 의미함.
  // App 컴포넌트와 App의 자식 컴포넌트에게 value 함수를 계속 보내는 것.
  return <OrderContext.Provider value={value} {...props} />;
}
