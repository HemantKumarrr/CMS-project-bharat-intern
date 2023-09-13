import styles from "./styles/signup.module.css";
import team from "/images/business-team.gif";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
    useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth){
        navigate("/")
      }
    })

  const collectData = async () => {
    if (name === "" || email === "" || password === "") {
      alert("Please fill the input fiels!");
    } else {
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);

      localStorage.setItem('user', JSON.stringify(result));

      if (result) {
        navigate("/");
      }

      setName("");
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
            Register
          </h1>
          <div className={styles.inputFields}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
          <button className={styles.btn} onClick={collectData}>
            Sign Up
          </button>
          <div className={styles.login_page}>
            <p>Already have a account ? <Link to="/login" className="login_link">LogIn</Link> </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
