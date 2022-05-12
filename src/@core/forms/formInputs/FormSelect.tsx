import React, { useEffect } from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { ButtonProps } from "react-native-elements";
import Select from "@core/inputs/Select";

interface Props extends ButtonProps {
  name: string;
  placeholder: string;
  label: string;
  rules?: RegisterOptions;
  defaultValue?: string;
  options: unknown[];
  keyValue?: string;
  keyText?: string;
  notCancel?: boolean;
}

const FormSelect: React.FC<Props> = (props) => {
  const {
    name,
    rules,
    defaultValue = null,
    placeholder,
    options,
    ...SelectProps
  } = props;

  const formState = useFormState();
  const { errors } = formState;

  const formContext = useFormContext();
  const { control, setValue, clearErrors } = formContext;

  const { field } = useController({ name, control, rules, defaultValue });

  useEffect(() => {
    return () => {
      setValue(name, defaultValue);
    };
  }, []);

  return (
    <Select
      {...SelectProps}
      title={placeholder}
      errorMessage={errors[name]?.message}
      onChange={(value: unknown) => {
        setValue(name, value);
        clearErrors(name);
      }}
      onBlur={field.onBlur}
      value={field.value}
      options={options}
    />
  );
};

export default FormSelect;
