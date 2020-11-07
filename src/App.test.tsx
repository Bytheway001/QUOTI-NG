import React from "react";
import ReactDOM from "react-dom";

const Div= (props:any) =>(<div></div>)
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Div/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
