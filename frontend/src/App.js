import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Pagination from './components/Pagination';
import UsersInfiniteScroll from './components/UsersInfiniteScroll';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <button type="button" className="btn btn-danger">
            <Link className="nav-link h3 text-light " to="/pagination">Numbered Pagination</Link>
          </button>
          <button type="button" className="btn btn-primary">
            <Link className="nav-link h3 text-light" to="/infinite">Infinite Scrolling</Link>
          </button>
          <h3 className="p-3"> Click on one of the buttons to view its functionality!</h3>
          <Switch>
            <Route exact path="/pagination">
              <Pagination />
            </Route>
            <Route exact path="/infinite">
              <UsersInfiniteScroll />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
