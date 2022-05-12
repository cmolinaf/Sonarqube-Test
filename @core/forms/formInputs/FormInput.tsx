import React, { useEffect } from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { InputProps } from "react-native-elements";
import Input from "@core/inputs/Input";

interface Props extends InputProps {
  name: string;
  rules?: RegisterOptions;
  defaultValue?: string;
}

const FormInput: React.FC<Props> = (props) => {
  const { name, rules, defaultValue = "", ...inputProps } = props;

  const formState = useFormState();
  const { errors } = formState;

  const formContext = useFormContext();
  const { control, setValue } = formContext;

  const { field } = useController({ name, control, rules, defaultValue });

  useEffect(() => {
    return () => {
      setValue(name, defaultValue);
    };
  }, []);

  return (
    <Input
      {...inputProps}
      errorMessage={errors[name]?.message}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
    />
  );
};

export default FormInput;
