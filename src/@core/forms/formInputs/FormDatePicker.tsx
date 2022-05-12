import React, { useEffect } from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { ButtonProps } from "react-native-elements";
import DatePicker from "@core/inputs/DatePicker";

interface Props extends ButtonProps {
  name: string;
  placeholder: string;
  label: string;
  rules?: RegisterOptions;
  mode?: "date" | "time";
  defaultValue?: string;
}

const FormDatePicker: React.FC<Props> = (props) => {
  const {
    name,
    rules,
    mode = "date",
    defaultValue = null,
    placeholder,
    ...ButtonProps
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
    <DatePicker
      {...ButtonProps}
      title={placeholder}
      errorMessage={errors[name]?.message}
      // onChange={field.onChange}
      onBlur={field.onBlur}
      date={field.value}
      mode={mode}
      changeDate={(value: Date) => {
        setValue(name, value);
        clearErrors(name);
      }}
    />
  );
};

export default FormDatePicker;
