import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UsersInfiniteScroll from "./InfiniteScroll/UsersInfiniteScroll"

function App() {
  return (
    <Router>
          <Switch>
          <Route exact path="/">
              <div>HELOOOOOOO</div>
            </Route>
            <Route exact path="/users">
              <UsersInfiniteScroll />
            </Route>
          </Switch>
      </Router>

  );
}

export default App;
