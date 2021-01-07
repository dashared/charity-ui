import { FC } from "react";

type DataComponent<T> = FC<{ data: T }>;

type IdComponent = FC<{ id: number }>;
