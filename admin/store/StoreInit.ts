"use client";

import { useRef } from "react";
import { useStore } from "../store/store";

type Props = {
  user?: User | {}
};
const StoreInit = ({  user }: Props) => {
  const init = useRef(false);
  if (!init.current) {
    if (user) useStore.setState({  user });
    init.current = true;
  }
  return null;
};

export default StoreInit;
