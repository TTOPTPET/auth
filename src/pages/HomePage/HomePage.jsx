import cl from "./HomePage.module.scss";
import LogoutSVG from "../../assets/logout.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/userSlice";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <div className={cl.container}>
      <div className={cl.title}>Главная страница</div>
      <img
        src={LogoutSVG}
        alt="logout"
        className={cl.button}
        onClick={handleLogout}
      />
    </div>
  );
}

export default HomePage;
