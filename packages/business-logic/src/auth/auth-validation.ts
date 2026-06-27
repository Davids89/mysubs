const MIN_PASSWORD_LENGTH = 8;

type PasswordConfirmation = {
  confirmPassword: string;
  password: string;
};

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPasswordLongEnough = (password: string): boolean =>
  password.length >= MIN_PASSWORD_LENGTH;

export const validatePasswordConfirmation = ({
  confirmPassword,
  password,
}: PasswordConfirmation): boolean => password === confirmPassword;
