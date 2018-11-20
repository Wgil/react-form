import React from "react";
import PropTypes from "prop-types";
import FormContext from "./FormContext";

class Field extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
  };
  static defaultProps = {
    initialValue: "",
    onChange: () => {}
  };
  static contextType = FormContext;

  componentDidMount() {
    const { name, initialValue } = this.props;
    this.context.initializeField(name, initialValue);
  }

  render() {
    const {
      name,
      value,
      onChange,
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
