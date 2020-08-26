import { shallow, mount, render } from "enzyme";
import React from "react";
import SearchBox from "../components/SearchBox";

it("expect to render SearchBox component", () => {
  expect(shallow(<SearchBox />)).toMatchSnapshot();
});
