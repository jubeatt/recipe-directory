import React, { useEffect, useState } from "react";
import Nav from "./components/Nav"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { SearchContext } from "./store/SearchContext"
import { ThemeContext } from "./store/ThemeContext"
import Home from "./pages/Home"
import Detail from "./pages/Detail";
import ThemeOptions from "./components/ThemeOptions";
import Create from "./pages/Create";

function App() {
  const [searchText, setSearchText] = useState("")
  const [darkTheme, setDarkTheme] = useState(false)
  const [colorTheme, setColorTheme] = useState('purple')

  useEffect(() => {
    darkTheme 
      ? document.body.classList.add('dark-theme') 
      : document.body.classList.remove('dark-theme')
  }, [darkTheme])

  return (
    <ThemeContext.Provider value={{darkTheme, setDarkTheme, colorTheme, setColorTheme}}>
      <SearchContext.Provider value={{searchText, setSearchText}}>
        <BrowserRouter>
          <React.StrictMode>
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
          </React.StrictMode>
        </BrowserRouter>
      </SearchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
