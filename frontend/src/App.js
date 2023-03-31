import logo from './logo.svg';
import './App.scss';
import Registration from './containers/Registration';
import Login from './containers/Login';
import Home from './containers/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {/* <Route exact path='/'>
          </Route> */}
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Registration />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>



      </div>
    </Router>
  );
}

export default App;
