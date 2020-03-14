import React from "react"
import ReactDOM from "react-dom"

function renderApp() {
    const Application = require("./js/Applications").default
    ReactDOM.render(<Application />, document.getElementById("app"))
}

renderApp()

if(module.hot){
    module.hot.accept(renderApp)
}