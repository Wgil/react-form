import React from "react";
import Form, { Field } from "../index.js";
import { formActions, fieldActions } from "./Basic";
import "./styles.css";

const Validations = props => (
  <Form {...formActions}>
    {({ errors }) => (
      <React.Fragment>
        <label htmlFor="email">Email:</label>
        <Field
          id="email"
          name="email"
          rules={{ required: true, title: "Email" }}
          {...fieldActions}
        />
        {errors.email && <span class="error">{errors.email}</span>}
        <label htmlFor="password">Password:</label>
        <Field
          id="password"
          name="password"
          type="password"
          rules={{ required: true, title: "Password" }}
          {...fieldActions}
        />
        {errors.password && <span class="error">{errors.password}</span>}
        <button type="submit" disabled={Object.keys(errors).length}>
          Sign in
        </button>
      </React.Fragment>
    )}
  </Form>
);

export default Validations;
