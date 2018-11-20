import React from "react";
import Form, { Field } from "../index.js";
import { formActions, fieldActions } from "./Basic";
import "./styles.css";

const validate = fields => {
  const errors = {};
  if (!fields.email) {
    errors.email = "Email address is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fields.email)) {
    errors.email = "Email address should be valid.";
  }

  if (!fields.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const Validations = props => (
  <Form {...formActions} validate={validate}>
    {({ errors, pristine }) => (
      <React.Fragment>
        <label htmlFor="email">Email:</label>
        <Field id="email" name="email" {...fieldActions} />
        {errors.email && !pristine.email && (
          <span class="error">{errors.email}</span>
        )}
        <label htmlFor="password">Password:</label>
        <Field
          id="password"
          name="password"
          type="password"
          {...fieldActions}
        />
        {errors.password && !pristine.password && (
          <span class="error">{errors.password}</span>
        )}
        <button type="submit" disabled={Object.keys(errors).length}>
          Sign in
        </button>
      </React.Fragment>
    )}
  </Form>
);

export default Validations;
