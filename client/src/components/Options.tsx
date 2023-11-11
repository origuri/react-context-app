import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
interface IOptions {
  name: string;
  updateItemCount: Function;
}

const Options = ({ name, updateItemCount }: IOptions) => {
  const schema = yup.object().shape({
    optionCheckBox: yup.boolean(),
  });

  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { optionCheckBox: false },
  });

  const optionCheckBox = watch("optionCheckBox");
  useEffect(() => {
    updateItemCount(name, optionCheckBox ? 1 : 0);
  }, [optionCheckBox]);
  return (
    <form>
      <input
        type="checkbox"
        id={`${name} option`}
        {...register("optionCheckBox")}
      />{" "}
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
};

export default Options;
