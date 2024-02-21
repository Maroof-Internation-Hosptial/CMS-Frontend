import { ACCEPTED_ATTACHMENT_TYPES, MAX_FILE_SIZE } from "../constants";
import { z } from "zod";

export function validateRegistrationForm(formValue) {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeCheck: "",
  };

  if (!formValue.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(formValue.name)) {
    errors.name = "Name must not contain numbers or special characters";
  }

  if (!formValue.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formValue.email)) {
    errors.email = "Invalid email format";
  }

  if (!formValue.password) {
    errors.password = "Password is required";
  } else if (formValue.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(formValue.password)) {
    errors.password = "Password must be alphanumeric (letters and numbers)";
  }

  if (!formValue.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (formValue.confirmPassword !== formValue.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!formValue.agreeCheck) {
    errors.agreeCheck = "You must agree to the Terms and Conditions";
  }

  return errors;
}

export function validateLoginForm(formValue) {
  const errors = {
    email: "",
    password: "",
  };

  if (!formValue.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(formValue.email)) {
    errors.email = "Invalid email format";
  }

  if (!formValue.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function validateResetPassword(password) {
  const errors = {
    password: "",
  };

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(password)) {
    errors.password = "Password must be alphanumeric (letters and numbers)";
  }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

export const eventValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  priority: z.string(),
  department: z.string().min(1, { message: "Department is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export async function validateFiles(files, setError) {
  for (const file of files) {
    if (!ACCEPTED_ATTACHMENT_TYPES.includes(file.type)) {
      setError("attachment", {
        key: "attachment",
        message: `File ${file.name} has an invalid file type.`,
      });
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("attachment", {
        key: "attachment",
        message: `File ${file.name} exceeds the maximum file size of 5MB.`,
      });
      return false;
    }
  }

  return true;
}

const isNumericString = (str) => /^[0-9]+$/.test(str);
const isAlphabeticString = (str) => /^[A-Za-z]+$/.test(str);
const containsNoNumbers = (str) => !/\d/.test(str);
const isAlphabeticStringOptional = (str) => {
  return str === "" || /^[A-Za-z]+$/.test(str);
};

export const personalInfoValidation = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .refine((value) => containsNoNumbers(value), {
      message: "Invalid Father Name",
    }),
  gender: z.string().min(1, { message: "Gender is required" }),
  userdepartment: z.string(),


  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .refine((value) => containsNoNumbers(value), {
      message: "Invalid Father Name",
    }),

  phone: z.string(),
    

  role: z.string().min(1, { message: "Role is required" }),
});

export const donationValidationSchema = z.object({
  projectName: z.string().min(1, { message: "Project Name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  requiredCost: z
    .number({
      required_error: "Required Cost is required",
      invalid_type_error: "Invalid Input",
    })
    .int()
    .positive(),
  city: z.string(),
});
