import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ComponentsDemo from "./features/components-demo";
import Home from "./features/home";
import NotFound from "./features/not-found";
import SideBar from "./features/side-bar";
import { useState } from "react";
import AboutMe from "./features/about-me";

function App() {
  const [transition, setTransition] = useState("");
  const pageList = [
    { path: "/", component: <Home /> },
    { path: "/about-me", component: <AboutMe /> },
    { path: "/components-demo", component: <ComponentsDemo /> },
    { path: "/*", component: <NotFound /> },
  ];

  const handleTransition = () => {
    setTransition("translate-x-full");
    setTimeout(() => {
      setTransition("");
    }, 300);
  };

  const pages = pageList.map((p, i) => {
    return (
      <Route
        key={i}
        path={p.path}
        element={
          <div id={i.toString()} className={"duration-300 " + transition}>
            {p.component}
          </div>
        }
      />
    );
  });

  return (
    <div className="text-neutral-light bg-primary-0">
      <SideBar handleTransition={handleTransition} />
      <Routes>{pages}</Routes>
    </div>
  );
}

export default App;
