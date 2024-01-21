import React from "react";

type propsTypes = {
  value?: string | undefined;
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  onChangeInput?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string;
  name?: string;
  minTextField?: boolean;
};

function TextFields(props: propsTypes) {
  return (
    <label htmlFor={props.label}>
      {props.label && props.label}
      <textarea
        placeholder={props.placeholder}
        name={props.name}
        className={`w-full h-[120px] font-[400] outline-0 resize-none  bg-[transparent] placeholder:text-white-100 ${
          props.minTextField
            ? "text-black text-1xl border p-1"
            : "text-white text-2xl border-0"
        }`}
        onChange={props.onChange}
        value={props.value}
      />
    </label>
  );
}

export default TextFields;

export function InputField(props: propsTypes) {
  return (
    <label htmlFor={props.label}>
      {props.label && props.label}
      <input
        type="text"
        name={props.name}
        placeholder={props.placeholder}
        className="h-[40px] w-full  border text-black mt-1 outline-0 p-1"
        required
        value={props.value}
        onChange={props.onChangeInput}
        id={props.label}
      />
    </label>
  );
}
