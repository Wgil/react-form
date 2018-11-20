import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";

class Field extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    rules: PropTypes.object,
    onChange: PropTypes.func
  };
  static defaultProps = {
    rules: {},
    initialValue: "",
    onChange: () => {}
  };
  static contextType = FormContext;

  componentDidMount() {
    const { name, initialValue, rules } = this.props;
    this.context.initializeField(name, initialValue, rules);
  }

  render() {
    const {
      name,
      value,
      onChange,
      rules,
      initializeField,
      initialValue,
      ...restProps
    } = this.props;
    return (
      <FormContext.Consumer>
        {({ fields, onChange }) => (
          <input
            {...restProps}
            name={name}
            value={fields[name] !== undefined ? fields[name] : ""}
            onChange={({ target: { value } }) => {
              onChange(name, value);
              this.props.onChange(value);
            }}
          />
        )}
      </FormContext.Consumer>
    );
  }
}

export default Field;
