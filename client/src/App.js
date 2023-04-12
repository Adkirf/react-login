
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import  Login  from "./components/Login";
import  Home  from "./components/Home";
import  Main  from "./components/Main"

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <Main />
            </RequireAuth>
          }
        ></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
