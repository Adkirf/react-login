import React from "react";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



function Home() {
  const singOut = useSignOut();
  const navigate = useNavigate();

  const auth = useAuthUser()

  const logout = () => {
    singOut();
    navigate("/login");
  };

  const setTimer = async () => {
    /* const response = await axios.post("http://localhost:3000/api/posts/challenges", {
      withCredentials: true,
    }); */
  };

  return (
    <div className="w-full h-full flex items-center flex-col">
      {auth() && 
      <div>
        <h1>Welcome back {auth()?.username}</h1>
        <button onClick={logout}>
          Logout
        </button>
        <Link to="/game"> Start </Link>
      </div>
      }

      {!auth() &&
        <div> 
          <h1>You need to login to start</h1>
          <Link to="/login">login</Link>
        </div>
      }
    </div>
  );
}

export default Home
