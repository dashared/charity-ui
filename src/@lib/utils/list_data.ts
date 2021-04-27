export function format(data: string | undefined | null): string {
  if (data?.length === 0) {
    return "-";
  }

  return data ?? "-";
}
