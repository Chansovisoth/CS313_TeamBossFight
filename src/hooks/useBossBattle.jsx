import { BossBattleContext } from "@/context/BossBattleContext";
import { useContext } from "react";

export const useBossBattleContext = () => {
  const context = useContext(BossBattleContext);
  if (!context) {
    throw new Error('useBossBattleContext must be used within a BossBattleProvider');
  }
  return context;
};