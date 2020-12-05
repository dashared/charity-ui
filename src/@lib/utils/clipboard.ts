function fallbackCopyTextToClipboard(text: string): void {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    // Do nothing
  }

  document.body.removeChild(textArea);
}

export function copyTextToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return Promise.resolve();
  }
  return navigator.clipboard.writeText(text);
}
