import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
import LandingPage from "./components/LandingPage";
// import SessionInitializer from "./components/SessionInitializer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
        {/* <SessionInitializer/> */}
          <Routes>
            <Route path="/" element={<LandingPage />}>
              <Route path="/feed" element={<PrivateRoute><Feed/></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
              <Route path="/connections" element={<PrivateRoute><Connections/></PrivateRoute>} />
              <Route path="/requests" element={<PrivateRoute><Requests/></PrivateRoute>} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
