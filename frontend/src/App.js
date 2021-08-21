// Layout
import Navbarpage from "./navComponent/layout/Navbarpage";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Auth
import LoginForm from "./navComponent/auth/Login";
import Register from "./navComponent/auth/Register";
import Logout from "./navComponent/auth/Logout";
import Login from "./navComponent/auth/Login";

import authServices from "./store/services/authServices";

import "bootstrap/dist/css/bootstrap.min.css";
import Confirm from "./components/dashboard/Confirm";
import Death from "./components/dashboard/Death";
import Recovery from "./components/dashboard/Recovery";

import TestGragh from './components/graphs/TestGraph';
import Home from "./components/dashboard/Home";
import VacinationGraph from "./components/vacination/VacinationGraph";
import LoadingPage from "./components/dashboard/LoadingPage";
import VacinationMap from "./components/vacination/VacinationMap";

import CreatePost from './posts/CreatePost';
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetail";



import {
  ConfirmMapData,
  DeathMapData,
  RecoveryMapData,
  VacinationMapData,
  Stats
} from "./data/DataSources";
import DeletePost from "./posts/DeletePost";
import UpdatePost from "./posts/UpdatePost";
import MyPosts from "./posts/MyPosts";



function App() {
  console.log(authServices());
  const confirm = ConfirmMapData();
  const death = DeathMapData();
  const recovery = RecoveryMapData();
  const vacination = VacinationMapData()
  const statistics = Stats()
  console.log(statistics, confirm, death, recovery, vacination)


  return (
    <BrowserRouter>
      <div className="App">
        <Navbarpage authServices={authServices} />   
        {(Object.keys(confirm).length===0 || Object.keys(death).length===0 || Object.keys(recovery).length===0 || Object.keys(vacination).length===0)?(<LoadingPage />):(
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/test" component={TestGragh} />
            <Route exact path="/" render={(props) => <Home {...props} stats = {statistics} />} />
            <Route exact path="/confirm" render={(props) => <Confirm {...props} confirm={confirm} />} />
            <Route exact path="/death" render={(props) => <Death {...props} death={death} />} />
            <Route exact path="/recovery" render={(props) => <Recovery {...props} recovery={recovery} />} />
            <Route exact path="/vacination" component={VacinationGraph} />
            <Route exact path="/vacinationMap" render={(props) => <VacinationMap {...props} vacination={vacination} />} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />

            <Route exact path="/posts/:username/newPost" component={CreatePost} />
            <Route exact path="/posts" component={PostList} />
            <Route exact path="/posts/:id/" component={PostDetail} />
            <Route exact path="/posts/:id/delete" component={DeletePost} />
            <Route exact path="/posts/:id/update" component={UpdatePost} />
            <Route exact path="/myPosts" component={MyPosts} />

          </Switch>        
        )}     
      </div>
    </BrowserRouter>
  );
}

export default App;
