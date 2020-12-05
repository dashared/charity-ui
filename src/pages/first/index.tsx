import React, { FC, useEffect, useState } from "react";
import { Pet } from "@generated";
import { petService } from "@providers/axios";

const FirstPage: FC = () => {
  const petId = 1;

  const [pet, setPet] = useState<Pet | undefined>(undefined);

  useEffect(() => {
    petService.getPetById(petId).then((value) => {
      setPet(value.data);
    });
  });

  return <>Hello, {pet?.name ?? "Not found :("}</>;
};

export default FirstPage;
