import { useState } from "react";
import cl from "../../style/form.module.scss";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import UserSVG from "../../assets/user.svg";
import PasswordSVG from "../../assets/password.svg";
import EyeSVG from "../../assets/eye.svg";
import EyeOffSVG from "../../assets/eyeOff.svg";
import { registerUser } from "../../API/authAPI";

function Reg() {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    registerUser(
      data,
      () => {
        toast.success(
          "Вы успешно зарегистрировались. Пожалуйста, авторизуйтесь"
        );
      },
      () => {},
      true
    );
  };

  const passwordValue = watch("password");
  const passwordSecondValue = watch("passwordSecond");

  return (
    <>
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
            src={UserSVG}
            className={cn(cl.inputIcon, cl.inputIcon__left)}
          ></img>
          <input
            type="text"
            className={cn(cl.input, {
              [cl.inputError]: errors?.FIO,
            })}
            placeholder="Фамилия Имя Отчество"
            {...register("FIO", {
              required: "Полe обязательно к заполнению!",
              minLength: {
                value: 10,
                message: "Минимальная длина 10 символов",
              },
            })}
          ></input>
          {errors?.FIO && (
            <div className={cl.errorMessage}>
              {errors?.FIO?.message || "Error!"}
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
              [cl.inputError]:
                errors?.password ||
                (passwordSecondValue &&
                  passwordValue &&
                  passwordSecondValue !== passwordValue),
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

        <div className={cn(cl.textInput, cl.iconInput)}>
          <img
            src={PasswordSVG}
            className={cn(cl.inputIcon, cl.inputIcon__left)}
          ></img>
          <input
            type={isVisible ? "text" : "password"}
            className={cn(cl.input, {
              [cl.inputError]:
                errors?.passwordSecond ||
                (passwordSecondValue &&
                  passwordValue &&
                  passwordSecondValue !== passwordValue),
            })}
            placeholder="Повторите пароль"
            {...register("passwordSecond", {
              required: "Полe обязательно к заполнению!",
              minLength: {
                value: 8,
                message: "Минимальная длина 8 символов",
              },
            })}
          ></input>
          {errors?.passwordSecond ||
          (passwordSecondValue &&
            passwordValue &&
            passwordSecondValue !== passwordValue) ? (
            <div className={cl.errorMessage}>
              {errors?.passwordSecond?.message || "Пароли не совпадают!"}
            </div>
          ) : null}
          <img
            src={isVisible ? EyeOffSVG : EyeSVG}
            className={cn(cl.inputIcon, cl.inputIcon__right)}
            onClick={() => setIsVisible((prev) => !prev)}
          ></img>
        </div>
        <input
          type="submit"
          className={cl.button}
          value="Зарегистрироваться"
          disabled={
            Object.keys(errors).length > 0 ||
            (passwordSecondValue &&
              passwordValue &&
              passwordSecondValue !== passwordValue)
          }
        />
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Reg;
