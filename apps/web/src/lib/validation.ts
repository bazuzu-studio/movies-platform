/** Единые правила пароля для регистрации, сброса и редактирования профиля. */
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const PASSWORD_HINT = `Минимум ${PASSWORD_MIN_LENGTH} символов, буквы и цифры`;

/** Возвращает текст ошибки или null, если пароль подходит. */
export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Пароль должен содержать минимум ${PASSWORD_MIN_LENGTH} символов`;
  }
  if (password.length > PASSWORD_MAX_LENGTH) {
    return `Пароль не должен быть длиннее ${PASSWORD_MAX_LENGTH} символов`;
  }
  if (!/\p{L}/u.test(password) || !/\d/.test(password)) {
    return "Пароль должен содержать буквы и цифры";
  }
  return null;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
