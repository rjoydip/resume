"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import useHasMounted from "@/hooks/hasMounted";

export default function ThemeChange({}) {
  const { theme, setTheme } = useTheme();
  const hasMounter = useHasMounted()

  const onToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Button
        onClick={onToggle}
        variant="outline"
        size="icon"
        className="fixed bottom-16 right-4 flex rounded-full shadow-2xl print:hidden"
      >
        {hasMounter && theme === "light" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </>
  );
};
