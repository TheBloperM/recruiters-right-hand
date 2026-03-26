import type { HTMLInputTypeAttribute } from "react";

interface GenericInputProps {
  label: string;
  onChange: (value: string) => void;
  value: string | number;
  type?: HTMLInputTypeAttribute;
  isValid?: (value: string) => boolean;
}

export default function GenericInput({
  type = "text",
  ...props
}: GenericInputProps) {
  return (
    <label>
      <span>{props.label}</span>
      <input
        placeholder={props.label}
        type={type}
        value={props.value}
        onChange={({ target: { value } }) => {
          const isValid = props.isValid?.(value) ?? true;
          if (isValid) props.onChange(value);
        }}
      />
    </label>
  );
}
