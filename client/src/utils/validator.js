function validateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email);
}

const validateName = (name) => {
  if ((name.length !== 0 && name.length < 5) || name.length > 30) {
    return false;
  } else {
    return true;
  }
};

const validateDescription = (description) => {
  if (
    (description.length !== 0 && description.length < 5) ||
    description.length > 100
  ) {
    return false;
  } else {
    return true;
  }
};

const validateCategory = (category) => {
  if ((category.length !== 0 && category.length < 5) || category.length > 30) {
    return false;
  } else {
    return true;
  }
};

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
  validateName,
  validateDescription,
  validateCategory,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
};
