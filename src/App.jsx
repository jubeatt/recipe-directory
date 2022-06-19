import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Home from "./pages/home";
import Recipe from "./pages/recipe";
import Create from "./pages/create";
import Search from "./pages/search";
import Navbar from "./components/Navbar";
import ThemeSelector from "components/ThemeSelector";
import { useTheme } from "hooks/useTheme";
import { useEffect } from "react";

function App() {
  const { mode } = useTheme()
  useEffect(() => {
    mode === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [mode])

  return (
    <BrowserRouter>
      <Navbar />
      <ThemeSelector />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/recipe/:id">
          <Recipe />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
