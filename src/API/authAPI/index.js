import axios from "axios";

const userLoginDefault = {
  data: {
    id: 2,
    username: "test@test.ru",
    full_name: "Арстамян Эрик Рубенович",
    token: "eTestToken",
  },
  status: 200,
};

const userRegisterDefault = {
  status: 200,
};

export const loginUser = async (
  data,
  successCallback,
  errorCallback,
  useDefault
) => {
  if (useDefault) {
    successCallback(userLoginDefault);
    return;
  }
  try {
    let response = await axios.post("api/login", data);
    successCallback && successCallback(response.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};

export const registerUser = async (
  data,
  successCallback,
  errorCallback,
  useDefault
) => {
  if (useDefault) {
    successCallback(userRegisterDefault);
    return;
  }
  try {
    let response = await axios.post("api/register", data);
    successCallback && successCallback(response.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback(e);
  }
};
