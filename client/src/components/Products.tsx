import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
interface IProduct {
  name: string;
  imagePath: string;
  updateItemCount: Function;
}

const Products = ({ name, imagePath, updateItemCount }: IProduct) => {
  const schema = yup.object().shape({
    quantity: yup.number().required(),
  });

  type Formdata = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<Formdata>({
    resolver: yupResolver(schema),
    defaultValues: { quantity: 0 },
  });

  // watch는 처음에는 string으로 넘기기 때문에 + 연산자를 사용해서 숫자로 바꿔줘야 함.
  const quantity: number = +watch("quantity");
  console.log("수량================== ->", typeof quantity);

  useEffect(() => {
    updateItemCount(name, quantity);
  }, [quantity]);

  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:4000/${imagePath}`}
        alt={`${name} product`}
      />

      <form style={{ marginTop: "10px" }}>
        <label style={{ textAlign: "right" }}>{name}</label>
        <input
          style={{ marginLeft: "7px" }}
          type="number"
          id="quantity"
          min={0}
          {...register("quantity")}
        />
      </form>
    </div>
  );
};

export default Products;
