// Validation utilities for authentication forms

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * Requirements: min 8 chars, at least 1 uppercase, 1 lowercase, 1 number
 */
export const validatePassword = (password) => {
  if (password.length < 8) {
    return {
      valid: false,
      message: "Le mot de passe doit contenir au moins 8 caractères",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: "Le mot de passe doit contenir au moins une lettre majuscule",
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: "Le mot de passe doit contenir au moins une lettre minuscule",
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Le mot de passe doit contenir au moins un chiffre",
    };
  }
  return { valid: true, message: "" };
};

/**
 * Validate name (at least 3 characters, no numbers)
 */
export const validateName = (name) => {
  if (name.trim().length < 3) {
    return {
      valid: false,
      message: "Le nom doit contenir au moins 3 caractères",
    };
  }
  if (/[0-9]/.test(name)) {
    return { valid: false, message: "Le nom ne doit pas contenir de chiffres" };
  }
  return { valid: true, message: "" };
};

/**
 * Validate password confirmation match
 */
export const validatePasswordMatch = (password, passwordConfirmation) => {
  if (password !== passwordConfirmation) {
    return { valid: false, message: "Les mots de passe ne correspondent pas" };
  }
  return { valid: true, message: "" };
};

/**
 * Validate login form
 */
export const validateLoginForm = (email, password) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "L'email est requis";
  } else if (!validateEmail(email)) {
    errors.email = "Veuillez entrer une adresse email valide";
  }

  if (!password.trim()) {
    errors.password = "Le mot de passe est requis";
  }

  return errors;
};

/**
 * Validate register form
 */
export const validateRegisterForm = (
  name,
  email,
  password,
  passwordConfirmation,
) => {
  const errors = {};

  // Validate name
  if (!name.trim()) {
    errors.name = "Le nom est requis";
  } else {
    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      errors.name = nameValidation.message;
    }
  }

  // Validate email
  if (!email.trim()) {
    errors.email = "L'email est requis";
  } else if (!validateEmail(email)) {
    errors.email = "Veuillez entrer une adresse email valide";
  }

  // Validate password
  if (!password.trim()) {
    errors.password = "Le mot de passe est requis";
  } else {
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.message;
    }
  }

  // Validate password confirmation
  if (!passwordConfirmation.trim()) {
    errors.password_confirmation = "Veuillez confirmer le mot de passe";
  } else {
    const matchValidation = validatePasswordMatch(
      password,
      passwordConfirmation,
    );
    if (!matchValidation.valid) {
      errors.password_confirmation = matchValidation.message;
    }
  }

  return errors;
};
