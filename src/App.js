import React, { useEffect } from "react";
import Feed from "./Component/Feed";
import Header from "./Component/Header";
import Model from "./Component/Model";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Component/Login";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { selectName, setLogin, setLogOut } from "./features/User/userSlice";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const name = useSelector(selectName);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setLogin({
            name: user.displayName,
            uid: user.uid,
            img: user.photoURL,
            email: user.email,
          })
        );
      } else {
        dispatch(setLogOut({ name: null, uid: null, img: null, email: null }));
      }
    });
  });
  return (
    <div className="App">
      <Router>
        {!name ? (
          <>
            <Header />
            <Login />
          </>
        ) : (
          <Switch>
            <Route exact path="/">
              <Header />
              <Feed />
              <Model />
            </Route>
            <Route exact path="">
              <Redirect to="/" />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
