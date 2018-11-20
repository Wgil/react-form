import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";
import Field from "./Field";

class Form extends React.Component {
  static defaultProps = {
    clearOnSubmit: false,
    validate: (fields, helpers) => {}
  };

  static propTypes = {
    validate: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    clearOnSubmit: PropTypes.bool
  };

  onChange = (field, value) => {
    this.setState(
      currentState => ({
        fields: { ...currentState.fields, [field]: value },
        pristine: { ...currentState.pristine, [field]: false }
      }),
      () => this.validate()
    );
  };

  initializeField = (name, value = "") => {
    this.setState(currentState => ({
      fields: { ...currentState.fields, ...{ [name]: value } },
      pristine: { ...currentState.pristine, ...{ [name]: true } }
    }));
  };

  state = {
    fields: {},
    errors: {},
    pristine: {},
    onChange: this.onChange,
    initializeField: this.initializeField
  };

  clear = () => {
    this.setState(currentState => {
      const fields = Object.keys(currentState.fields).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {});

      const pristine = Object.keys(currentState.pristine).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});

      return { fields, pristine, errors: {} };
    });
  };

  validate = (callback = () => {}) => {
    const errors = this.props.validate(this.state.fields, this.state) || {};
    this.setState({ errors }, callback);
  };

  submit = () => {
    if (Object.keys(this.state.errors).length) return;

    this.props.onSubmit(this.state.fields);

    this.props.clearOnSubmit && this.clear();
  };

  handleSubmit = e => {
    e.preventDefault();

    const isPristine = Object.values(this.state.pristine).some(field => field);

    if (isPristine) {
      const pristine = Object.keys(this.state.pristine).reduce(
        (fields, field) => {
          fields[field] = false;
          return fields;
        },
        {}
      );
      this.setState({ pristine }, () => this.validate(this.submit));
      return;
    }

    this.submit();
  };

  render() {
    const {
      handleSubmit,
      props: { children, onSubmit, clearOnSubmit, ...restProps },
      state
    } = this;

    return (
      <form onSubmit={handleSubmit} {...restProps}>
        <FormContext.Provider value={state}>
          {typeof children === "function" ? children(state) : children}
        </FormContext.Provider>
      </form>
    );
  }
}

export { Form as default, Field };
