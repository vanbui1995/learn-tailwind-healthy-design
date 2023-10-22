import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "./firebase";

export const AuthGuard = (props: { fallback: ReactNode; children: ReactNode }) => {
  const [persisted, setPersisted] = useState<boolean>(false);
  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        setPersisted(true);
      })
      .catch((error) => {
        setPersisted(true);
        console.error('setPersisted not ok');
      });
  }, []);
  const fallback = props.fallback || null;
  return <>{persisted ? props.children : fallback}</>;
};
