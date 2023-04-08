import {
  PasswordStrength,
  PasswordStrengthMeter,
} from "./PasswordStrenthMeter";

test("모든 조건을 충족하면 암호 강도는 강함이어야 함", () => {
  const passwordStrengthMeter = new PasswordStrengthMeter();
  expect(passwordStrengthMeter.meter("ab12!@AB")).toBe(PasswordStrength.STRONG);
});
