import React, { useEffect } from "react";
import {
  RegisterOptions,
  useController,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { SearchUsers } from "@core/inputs/SearchUsers";
import { SearchUsersProps } from "@core/inputs/SearchUsers/SearchUsers";

interface Props {
  name: string;
  rules?: RegisterOptions;
  defaultValue?: [];
  label: SearchUsersProps["label"];
  internLabel?: SearchUsersProps["internLabel"];
  externLabel?: SearchUsersProps["externLabel"];
  searchRoute: SearchUsersProps["searchRoute"];
  selectType: SearchUsersProps["selectType"];
  selectKeyToShow?: SearchUsersProps["selectKeyToShow"];
  selectPlaceholder?: SearchUsersProps["selectPlaceholder"];
  useToolbar?: boolean;
}

const FormSearchUsers: React.FC<Props> = (props) => {
  const { name, rules, defaultValue = "", ...searchUsersProps } = props;

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
    <SearchUsers
      {...searchUsersProps}
      errorMessage={errors[name]?.message}
      onChange={field.onChange}
      value={field.value}
    />
  );
};

export default FormSearchUsers;
