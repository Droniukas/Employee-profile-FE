export const validationRules = () => {
const emailValidationRules = {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  };
  
  
  const passwordValidationRules = {
    required: true,
    pattern: /^\S+$/
  };

  return {
  passwordValidationRules,
  emailValidationRules
};
}
