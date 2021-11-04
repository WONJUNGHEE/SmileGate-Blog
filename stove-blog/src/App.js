import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import PostDetail from "./components/PostDetail";
import PostList from "./components/PostList";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path={"/"} component={PostList} />
          <Route exact path="/post/:no" component={PostDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
