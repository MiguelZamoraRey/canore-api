const validateAndNormalizeEmail = (email: string): string | null => {
  let emailToValidate = email.toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(emailToValidate);
  if (isValidEmail) {
    return emailToValidate;
  } else {
    return null;
  }
};
