import { ErrorMessage, Field } from "formik";
import React from "react";
const SelectComponent = (props) => {
  const { label, name, options } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name}>
        {options.map((option) => {
          <option key={option.value} value={option.value}>
            {option.key}
          </option>;
        })}
      </Field>
      <ErrorMessage name={name} component={TextError}/>
    </div>
  );
};

export default SelectComponent;
