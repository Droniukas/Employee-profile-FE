export const emailValidationRules = {
  required: true,
  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
};

export const passwordValidationRules = {
  required: true,
  pattern: /^\S+$/,
};