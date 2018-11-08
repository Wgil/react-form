import React from "react";
import PropTypes from "prop-types";
import approve from "approvejs";
import FormContext from "./FormContext";
import Field from "./Field";

class Form extends React.Component {
  onChange = (field, value) => {
    this.setState(
      currentState => ({
        fields: { ...currentState.fields, [field]: value }
      }),
      () => this.validate(field, value)
    );
  };

  initializeField = (name, value = "", rules) => {
    this.setState(currentState => ({
      fields: { ...currentState.fields, ...{ [name]: value } },
      rules: { ...currentState.rules, ...{ [name]: rules } },
      pristine: { ...currentState.pristine, ...{ [name]: true } }
    }));
  };

  state = {
    fields: {},
    errors: {},
    rules: {},
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

  validate = (name, value, callback = () => {}) => {
    const rules = this.state.rules[name];

    // In order to make the approvejs equal rule works, we need to do this.
    if (rules.equal && rules.equal.value) {
      rules.equal.value = this.state.fields[rules.equal.value];
    }

    this.setState(currentState => {
      const { errors } = approve.value(value, { ...rules, stop: true });
      const errorsState = { ...currentState.errors };

      if (errors.length) {
        errorsState[name] = errors[0];
      } else {
        delete errorsState[name];
      }

      return {
        errors: errorsState,
        pristine: { ...currentState.pristine, [name]: false }
      };
    }, callback);
  };

  submit = () => {
    if (Object.keys(this.state.errors).length) return;

    this.props.onSubmit(this.state.fields);

    this.props.clearOnSubmit && this.clear();
  };

  handleSubmit = e => {
    e.preventDefault();

    const isPristine = Object.values(this.state.pristine).some(field => field);

    if (!isPristine) return this.submit();

    Object.entries(this.state.fields).forEach(([field, value]) => {
      this.validate(field, value, this.submit);
    });
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
          {typeof children === "function"
            ? children({ errors: state.errors })
            : children}
        </FormContext.Provider>
      </form>
    );
  }
}

Form.defaultProps = {
  clearOnSubmit: false
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  clearOnSubmit: PropTypes.bool
};

export { Form as default, Field };
