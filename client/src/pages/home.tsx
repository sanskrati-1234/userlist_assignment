import { Link } from "react-router-dom";
import UserForm from "../components/UserForm/userForm";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <UserForm />
      <Link to="/dashboard" className={styles.dashboardLink}>
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;
