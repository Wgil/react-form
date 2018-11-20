import React from "react";
import { storiesOf, module } from "@storybook/react";
import Basic from "./Basic";
import Validations from "./Validations";

storiesOf("Example", module)
  .add("Basic", () => <Basic />)
  .add("Validations", () => <Validations />);
