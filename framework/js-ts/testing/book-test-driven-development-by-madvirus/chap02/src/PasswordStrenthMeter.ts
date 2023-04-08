class PasswordStrengthMeter {
  meter(): PasswordStrength {
    return PasswordStrength.STRONG;
  }
}

export enum PasswordStrength {
  WEAK = "WEAK",
  MEDIUM = "MEDIUM",
  STRONG = "STRONG",
}

export { PasswordStrengthMeter };
