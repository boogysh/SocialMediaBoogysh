import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./scenes/homePage/HomePage";
import LoginPage from "./scenes/loginPage/LoginPage";
import SignInPage from "./scenes/signInPage/SignInPage";
import ProfilePage from "./scenes/profilePage/ProfilePage";

import { useSelector } from "react-redux";
// import NavBar from "./scenes/navbar/NavBar";

function App() {
  const isAuth = Boolean(useSelector((state) => state.userReducer.token));

  // const home = window.location.href.includes("/home");
  // const profile = window.location.href.includes("/profile");

  return (
    <div className="app">
      <Router>
        {/* {(home || profile) && <NavBar />} */}
       
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
