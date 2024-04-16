import { getDarkThemeColors, getLightThemeColors } from "@/data";
import { DarkColorType, LightColorType } from "@/types";
import { useTheme } from "next-themes";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";

const useColorTheme = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const previousTheme = theme;

  const setColorTheme = (
    currentTheme: LightColorType | DarkColorType | "system",
  ) => {
    if (currentTheme !== previousTheme) {
      if (["light", "dark", "system"].some((f) => f === currentTheme)) {
        setTheme(currentTheme);
      } else if (
        getLightThemeColors().some((f) => f === currentTheme) ||
        previousTheme === "light" ||
        previousTheme === "system"
      ) {
        setTheme(currentTheme);
      } else if (
        getDarkThemeColors().some((f) => f === currentTheme) ||
        new RegExp(/dark/gm).test(previousTheme ?? "")
      ) {
        setTheme(`${currentTheme}-dark`);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh!",
          description: "Not falling in any case.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "Previous and selected color are same.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    window.dispatchEvent(new Event("storageChange"));
  };

  return { theme, setColorTheme };
};

export default useColorTheme;
