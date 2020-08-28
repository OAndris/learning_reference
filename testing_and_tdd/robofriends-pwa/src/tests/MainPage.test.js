import { shallow, mount, render } from "enzyme";
import React from "react";
import MainPage from "../components/MainPage";

let wrapper;

beforeEach(() => {
  const mockProps = {
    onRequestRobots: jest.fn(),
    robots: [],
    searchField: "",
    isPending: false,
  };
  wrapper = shallow(<MainPage {...mockProps} />);
});

it("renders MainPage without crashing", () => {
  expect(wrapper).toMatchSnapshot();
});

it("filters robots correctly", () => {
  const john = {
    id: 3,
    name: "John",
    email: "john@gmail.com",
  };

  const mockProps2 = {
    onRequestRobots: jest.fn(),
    robots: [john],
    searchField: "john",
    isPending: false,
  };
  const wrapper2 = shallow(<MainPage {...mockProps2} />);

  expect(wrapper.instance().filterRobots()).toEqual([]);
  expect(wrapper2.instance().filterRobots()).toEqual([john]);
});
