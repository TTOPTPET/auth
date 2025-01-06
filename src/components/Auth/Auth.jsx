import { useState } from "react";
import cl from "../../style/form.module.scss";
import cn from "classnames";
import { useForm } from "react-hook-form";
import UserSVG from "../../assets/user.svg";
import PasswordSVG from "../../assets/password.svg";
import EyeSVG from "../../assets/eye.svg";
import EyeOffSVG from "../../assets/eyeOff.svg";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../API/authAPI";

function Auth() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    loginUser(
      data,
      (response) => {
        localStorage.setItem("token", response.data.token);
        dispatch(setUserInfo(response.data));
        navigate("/");
      },
      () => {},
      true
    );
  };

  return (
    <form action="#" className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(cl.textInput, cl.iconInput)}>
        <img
          src={UserSVG}
          className={cn(cl.inputIcon, cl.inputIcon__left)}
        ></img>
        <input
          type="text"
          className={cn(cl.input, {
            [cl.inputError]: errors?.login,
          })}
          placeholder="Имя пользователя"
          {...register("login", {
            required: "Полe обязательно к заполнению!",
            minLength: {
              value: 5,
              message: "Минимальная длина 5 символов",
            },
          })}
        ></input>
        {errors?.login && (
          <div className={cl.errorMessage}>
            {errors?.login?.message || "Error!"}
          </div>
        )}
      </div>

      <div className={cn(cl.textInput, cl.iconInput)}>
        <img
          src={PasswordSVG}
          className={cn(cl.inputIcon, cl.inputIcon__left)}
        ></img>
        <input
          type={isVisible ? "text" : "password"}
          className={cn(cl.input, {
            [cl.inputError]: errors?.password,
          })}
          placeholder="Пароль"
          {...register("password", {
            required: "Полe обязательно к заполнению!",
            minLength: {
              value: 8,
              message: "Минимальная длина 8 символов",
            },
          })}
        ></input>
        {errors?.password && (
          <div className={cl.errorMessage}>
            {errors?.password?.message || "Error!"}
          </div>
        )}
        <img
          src={isVisible ? EyeOffSVG : EyeSVG}
          className={cn(cl.inputIcon, cl.inputIcon__right)}
          onClick={() => setIsVisible((prev) => !prev)}
        ></img>
      </div>
      <input
        type="submit"
        className={cl.button}
        value="Войти"
        disabled={Object.keys(errors).length > 0}
      />
    </form>
  );
}

export default Auth;
