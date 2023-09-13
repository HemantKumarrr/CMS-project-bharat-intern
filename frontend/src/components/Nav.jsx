import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/nav.module.css";
import { useState } from "react";

const Nav = () => {
  const [show, setShow] = useState(true);
  const toggleShow = (e) => {
    if (show) {
      e.target.classList = "ri-close-circle-line";
      setShow(!show);
    }
  };
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <>
      <header>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logo}>
            <img
              src="https://cdn.freebiesupply.com/logos/large/2x/cms-logo-png-transparent.png"
              alt="logo"
            />
            </Link>
          </div>
          {auth ? (
          <ul className={styles.nav_items}>
              <>
                <li>
                  <Link to="/" className={styles.links}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className={styles.links}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className={styles.links}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={logout} className={`${styles.links} ${styles.logout_link}`} >
                    Log Out ({JSON.parse(auth).name})
                  </Link>
                </li>
              </>
              </ul>) : (
              <>
                <ul className={`${styles.nav_items} ${styles.navEl_right}`}>
                  <li>
                    <Link to="/" className={styles.links}>
                      Home
                    </Link>
                  </li>
                  <li> 
                    <Link to="/signup" className={styles.links}>
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </>
            )}
          
          <i className="ri-menu-line menu-icon" onClick={toggleShow}></i>
        </div>
      </header>
    </>
  );
};

export default Nav;
