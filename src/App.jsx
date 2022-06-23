import React, { useEffect } from "react";
import Nav from "./components/Nav"
import { HashRouter, Switch, Route, Redirect } from "react-router-dom"
import Home from "./pages/Home"
import Detail from "./pages/Detail";
import ThemeOptions from "./components/ThemeOptions";
import Create from "./pages/Create";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { darkTheme } = useTheme()

  useEffect(() => {
    darkTheme 
      ? document.body.classList.add('dark-theme') 
      : document.body.classList.remove('dark-theme')
  }, [darkTheme])

  return (
    <HashRouter>
      <Nav />
      <ThemeOptions />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/recipe/:id">
          <Detail />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
