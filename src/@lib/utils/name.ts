export function cred(firstName?: string, middleName?: string, lastName?: string): string {
  let fst = firstName?.charAt(0) ?? ""
  let middle = middleName?.charAt(0) ?? ""
  let last = lastName ?? ""
  return `${last} ${fst.length === 0 ? fst : fst + '. '}${middle.length === 0 ? middle : middle + '.'}`
}

export function fullName(firstName?: string, middleName?: string, lastName?: string): string {
  return `${firstName ?? "-"} ${middleName ?? "-"} ${lastName ?? "-"}`
}