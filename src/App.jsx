import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            {/* Landing page layout wraps everything */}
            <Route path="/" element={<LandingPage />}>
              {/* Home route - shows HeroSection when logged out */}
              <Route index element={<div></div>} />
              
              {/* Public routes */}
              <Route path="login" element={<Login />} />
              
              {/* Protected routes */}
              <Route path="feed" element={<PrivateRoute><Feed/></PrivateRoute>} />
              <Route path="profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
              <Route path="connections" element={<PrivateRoute><Connections/></PrivateRoute>} />
              <Route path="requests" element={<PrivateRoute><Requests/></PrivateRoute>} />
              <Route path="chat/:targetUserId" element={<PrivateRoute><Chat /></PrivateRoute>} />
              <Route path="premium" element={<Premium />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
// hiii
export default App;