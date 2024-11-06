import userServices from "../services/userServices.js";
export default class Utils {
    // set local storage
    static setStore = (name, content) => {
      if (!name) return;
      if (typeof content !== "string") {
        content = JSON.stringify(content);
      }
      return window.localStorage.setItem(name, content);
    };
    // get local storage
    static getStore = (name) => {
      if (!name) return;
      return JSON.parse(window.localStorage.getItem(name));
    };
    // remove item
    static removeItem = (name) => {
      if (!name) return;
      return window.localStorage.removeItem(name);
    };
    // validate email
    static isValidEmail = (value) => {
      return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value)
        ? false
        : true;
    };
    // get user
    static getUser = (user) => {
      return userServices.getUser(user.userId)
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          throw error;  // Ensures the onMounted .catch() handles the error
        });
    };
  }