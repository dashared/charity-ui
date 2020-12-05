import { forEach, isArray, isObject, set } from "lodash";
import { parse, stringify } from "query-string";

type Primitive = undefined | null | string | number | boolean;
interface PrimitiveObject {
  [key: string]: Primitive | Array<Primitive>;
}

// only allow objects on first nest level
export interface QueryObject {
  [key: string]: Primitive | Array<Primitive> | PrimitiveObject;
}

export function queryStringify(input: QueryObject, encode = true): string {
  const proccedInput: PrimitiveObject = {};

  forEach(input, (outerValue, outerKey) => {
    if (isObject(outerValue) && !isArray(outerValue)) {
      forEach(outerValue, (value, key) => {
        proccedInput[`${outerKey}.${key}`] = value;
      });
    } else {
      proccedInput[outerKey] = outerValue as Primitive | Array<Primitive>;
    }
  });

  return stringify(proccedInput, { encode });
}

export function queryParse(input: string): QueryObject {
  const result: QueryObject = {};
  const draft = parse(input, {
    parseBooleans: true,
    parseNumbers: true,
  }) as PrimitiveObject;

  forEach(draft, (value, key) => {
    if (key.includes(".")) {
      set(result, key.split("."), value);
    } else {
      result[key] = value;
    }
  });

  return result;
}
