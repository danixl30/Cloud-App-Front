import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import './App.css';
import { ToastContainer } from 'react-toastify';
import Explorer from "./Components/explorer.component";
import FileState from "./context/File/FileState";

function App() {
  return (
    <FileState>
      <ToastContainer/>
      <Router>
        <Switch>
          <Route path = "/" exact>
            <Redirect to = "/explorer/root"/>
          </Route>
          <Route path = "/explorer/:path" component = {Explorer}/>
        </Switch>
      </Router>
    </FileState>
  );
}

export default App;
