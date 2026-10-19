import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";

type StoreProviderProps = {
  children: ReactNode;
};

/**
 * Provides the Redux store only on pages that talk to the API, so all other pages ship
 * without Redux and RTK Query.
 */
export function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState(makeStore);
  return <Provider store={store}>{children}</Provider>;
}
