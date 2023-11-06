import React from "react";

interface IOptions {
  name: string;
}

const Options = ({ name }: IOptions) => {
  return (
    <form>
      <input type="checkbox" id={`${name} option`} />{" "}
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
};

export default Options;
