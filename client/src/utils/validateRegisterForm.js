function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const validate = (username, email, password, confirmPassword) => {
  if (
    username.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    confirmPassword.length === 0
  ) {
    return 'All fields are required';
  } else if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  } else if (password.length < 8) {
    return 'Password must be at least 8 digits long';
  } else if (password !== confirmPassword) {
    return 'Passwords do not match';
  } else {
    return 'Valid';
  }
};

export default validate;
