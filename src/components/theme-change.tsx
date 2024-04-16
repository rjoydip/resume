"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import useHasMounted from "@/hooks/hasMounted";
import useColorTheme from "@/hooks/useColorTheme";
import { useEffect, useState } from "react";

export default function ThemeChange({}) {
  const hasMounter = useHasMounted();
  const { theme, setColorTheme } = useColorTheme();

  const onToggle = () => {
    setColorTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Button
        onClick={onToggle}
        variant="outline"
        size="icon"
        className="fixed bottom-16 right-4 flex rounded-full shadow-2xl print:hidden"
      >
        {hasMounter && theme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </>
  );
}
