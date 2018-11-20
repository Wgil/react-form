import React from "react";
import { action } from "@storybook/addon-actions";
import Form, { Field } from "../index.js";
import "./styles.css";

export const formActions = {
  onSubmit: action("onSubmit")
};

export const fieldActions = {
  onChange: action("onChange")
};

const Basic = props => (
  <Form {...formActions}>
    {() => (
      <React.Fragment>
        <label htmlFor="email">Email:</label>
        <Field id="email" name="email" {...fieldActions} />
        <label htmlFor="password">Password:</label>
        <Field
          id="password"
          name="password"
          type="password"
          {...fieldActions}
        />
        <button type="submit">Sign in</button>
      </React.Fragment>
    )}
  </Form>
);

export default Basic;
