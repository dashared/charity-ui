export function cred(
  firstName?: string,
  middleName?: string,
  lastName?: string,
): string {
  const fst = firstName?.charAt(0) ?? "";
  const middle = middleName?.charAt(0) ?? "";
  const last = lastName ?? "";
  return `${last} ${fst.length === 0 ? fst : `${fst}. `}${
    middle.length === 0 ? middle : `${middle}.`
  }`;
}

/** Surname FirstName MiddleName*/
export function fullName(
  firstName?: string,
  middleName?: string,
  lastName?: string,
): string {
  return `${`${lastName} ` ?? ""}${` ${firstName}` ?? ""}${
    ` ${middleName}` ?? ""
  }`;
}
