function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const validateUpdate = (username, email, password, confirmPassword) => {
  if (username.length === 0 || email.length === 0) {
    return 'Username and email cannot be empty';
  } else if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  } else if (password.length !== 0 && password.length < 8) {
    return 'Password must be at least 8 digits long';
  } else if (password.length !== 0 && password !== confirmPassword) {
    return 'Passwords do not match';
  } else {
    return 'Valid';
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
  validateUpdate,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
};
