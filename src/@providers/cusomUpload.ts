import { RcCustomRequestOptions } from "antd/lib/upload/interface";
import { FileInfo } from "@generated";

export const customRequest = (
  options: RcCustomRequestOptions,
  setId: (id: string) => void,
): void => {
  const { file, onError, onSuccess } = options;

  const url = `/api/file/upload`;

  const formData = new FormData();
  formData.append("file", file as Blob);
  const request = new XMLHttpRequest();

  request.open("POST", url);
  request.send(formData);

  request.onload = function () {
    if (request.status === 200) {
      const parsed: FileInfo[] = JSON.parse(request.responseText);
      console.log(parsed.map((value) => value.id ?? "")[0]);
      setId(parsed.map((value) => value.id ?? "")[0]);

      return onSuccess(parsed, file);
    } else {
      return onError(Error(request.statusText));
    }
  };
};
