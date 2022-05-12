import React, { useEffect } from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { ButtonProps } from "react-native-elements";
import Picker from "@core/inputs/Picker";

interface Props extends ButtonProps {
  name: string;
  placeholder: string;
  label: string;
  rules?: RegisterOptions;
  defaultValue?: string;
}

const FormPicker: React.FC<Props> = (props) => {
  const {
    name,
    rules,
    defaultValue = {
      uri: null,
      name: null,
      type: null,
    },
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
    <Picker
      {...ButtonProps}
      title={placeholder}
      value={field.value?.name}
      errorMessage={errors[name]?.message}
      // onChange={field.onChange}
      onBlur={field.onBlur}
      changeData={(
        file_uri: string | null,
        file_name: string | null,
        file_type: string | null
      ) => {
        setValue(name, { uri: file_uri, name: file_name, type: file_type });
        clearErrors(name);
      }}
    />
  );
};

export default FormPicker;
