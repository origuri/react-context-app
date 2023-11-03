import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";

const SummaryPage = () => {
  const schema = yup.object().shape({
    confirmCheckbox: yup
      .boolean()
      .required()
      .oneOf([true], "체크 하셔야 합니다."),
  });

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { confirmCheckbox: false },
  });

  // checkbox의 상태를 알 수 있음.
  const isVaild = watch("confirmCheckbox");

  const onSubmit = () => {
    console.log("작동!");
    console.log("checkbox 상태 => ", isVaild);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="checkbox"
          id="confirmCheckbox"
          {...register("confirmCheckbox")}
        />{" "}
        <label htmlFor="confirmCheckbox">주문확인을 하셨나요?</label>
        <p />
        <span>{errors.confirmCheckbox?.message}</span>
        <p />
        <button type="submit" disabled={isSubmitting || !isVaild}>
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
