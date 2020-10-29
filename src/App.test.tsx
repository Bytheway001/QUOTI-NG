import React from "react";
import ReactDOM from "react-dom";

import { Container } from "react-bootstrap";
import App from "./App";
const Div= (props:any) =>(<div></div>)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Div/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
