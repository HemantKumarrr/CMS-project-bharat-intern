import styles from "./styles/signup.module.css";
import team from "/images/business-team.gif";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    if (email === "" || password === "") {
      alert("Please fill the input fiels!");
    } else {
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);

      localStorage.setItem("user", JSON.stringify(result));

      if (result.name) {
        navigate("/");
      }

      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <h1>
            <img src={team} alt="team-image" />
            Log In
          </h1>
          <div className={`${styles.inputFields} ${styles.inputFieldsLogin}`}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Passwords"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button className={styles.btn} onClick={handleLogin}>
            Log In
          </button>
          <div className={styles.login_page}>
            <p>
              Don't have a account ?{" "}
              <Link to="/signup" className="login_link">
                SignUp
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
