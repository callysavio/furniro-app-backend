import Joi from "joi";
export const registerSchema = Joi.object({
  name: Joi.string().min(6).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "(?=.*[A-Z])" + // At least one uppercase character
          "(?=.*[a-z])" + // At least one lowercase character
          "(?=.*[0-9])" + // At least one number
          "(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])" + // At least one special character
          "[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]{8,}" // Only allow these characters, min 8 total
      )
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long.",
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    })
    .required(),
  role: Joi.string()
    .valid("admin", "customer")
    .messages({
      "any.only": "Role must be either admin or customer",
      "any.required": "Role is required",
      "string.base": "Role must be a string",
    })
    .required(),
});
