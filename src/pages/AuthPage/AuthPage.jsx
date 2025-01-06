import { useState } from "react";
import Auth from "../../components/Auth/Auth";
import Reg from "../../components/Reg/Reg";
import cl from "./AuthPage.module.scss";
import cn from "classnames";

function AuthPage() {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <div className={cl.tabs}>
          <div
            className={cn(cl.tab, { [cl.tab__active]: isAuth })}
            onClick={() => setIsAuth(true)}
          >
            Авторизация
          </div>
          <div
            className={cn(cl.tab, { [cl.tab__active]: !isAuth })}
            onClick={() => setIsAuth(false)}
          >
            Регистрация
          </div>
        </div>
        <div className={cl.form}>{isAuth ? <Auth /> : <Reg />}</div>
      </div>
    </div>
  );
}

export default AuthPage;
