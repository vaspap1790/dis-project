function validateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email);
}

const validateUsername = (username) => {
  if ((username.length !== 0 && username.length < 5) || username.length > 15) {
    return false;
  } else {
    return true;
  }
};

const validatePassword = (password) => {
  if ((password.length !== 0 && password.length < 8) || password.length > 15) {
    return false;
  } else {
    return true;
  }
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (
    (confirmPassword.length !== 0 && confirmPassword.length < 8) ||
    confirmPassword.length > 15 ||
    confirmPassword !== password
  ) {
    return false;
  } else {
    return true;
  }
};

export {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
};
