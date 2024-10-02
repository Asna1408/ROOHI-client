
// Regular Expressions
export const REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, // Minimum 8 characters, at least one letter and one number
    NAME: /^[a-zA-Z\s]{2,}$/,
    MOBILE:/^\d{10}$/,// Only allows alphabets and space, minimum 2 characters

  };
  
  // Validation Messages
  export const VALIDATION_MESSAGES = {
    EMAIL: {
      REQUIRED: "Email is required",
      INVALID: "Please enter a valid email address",
    },
    PASSWORD: {
      REQUIRED: "Password is required",
      INVALID: "Password must be at least 6 characters long and contain at least one letter and one number",
    },
    NAME: {
      REQUIRED: "Name is required",
      INVALID: "Name should be at least 2 characters long and contain only alphabets",
    },
    CONFIRM_PASSWORD: {
      REQUIRED: "Confirm password is required",
      MISMATCH: "Passwords do not match",
    },
    MOBILE:{
      REQUIRED: "Mobile number is required",
      INVALID:"Mobile Number should be only numbers and at least 10 character long"
    }
  };
  
  // Minimum and Maximum Lengths for Inputs
  export const LENGTH = {
    PASSWORD: {
      MIN: 6,
    },
    NAME: {
      MIN: 2,
    },
  };
  