import type { ReactNode } from "react";

interface GenericArrayInputProps<T> {
  label: string;
  value: T[];
  getItemComponent: (item?: T) => ReactNode;
}

export default function GenericArrayInput<T>(props: GenericArrayInputProps<T>) {
  return (
    <label>
      <span>{props.label}</span>
      {props.value.map((item) => {
        return props.getItemComponent(item);
      })}

      {props.getItemComponent()}
    </label>
  );
}
