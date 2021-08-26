import './App.css';
import Home from './components/Home';
import ProgressReport from './components/ProgressReport';
import Logic from './components/Logic';
import Profile from './components/ProfileList'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from '@material-ui/core';


function App() {
  return (
    <div>
     
      <Router>
      <div>
      <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/logic">logic</Link>
          </li>
          <li>
            <Link to="/progress">progress</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
        </ul>      
        </div>
        <switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/progress">
            <ProgressReport />
          </Route>
          <Route exact path="/logic">
            <Logic />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route> 
        </switch> 
      </Router>
    </div>
 
  );
}

export default App;
