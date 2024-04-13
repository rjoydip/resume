import { ColorType } from "@/types";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import clsx from "clsx";
import { useTheme } from "next-themes";

export function ColorPalette() {
  const { setTheme } = useTheme();

  const onToggle = ($theme: ColorType) => {
    setTheme($theme);
  };

  return (
    <div className="flex flex-wrap gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-rose-600",
              "hover:bg-rose-600",
            )}
            onClick={(() => onToggle('rose'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Rose</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-orange-600",
              "hover:bg-orange-600",
            )}
            onClick={(() => onToggle('orange'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Orange</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-zinc-600",
              "hover:bg-zinc-600",
            )}
            onClick={(() => onToggle('zinc'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Zinc</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-yellow-600",
              "hover:bg-yellow-600",
            )}
            onClick={(() => onToggle('yellow'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Yellow</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-violet-600",
              "hover:bg-violet-600",
            )}
            onClick={(() => onToggle('violet'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Violet</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-green-600",
              "hover:bg-green-600",
            )}
            onClick={(() => onToggle('green'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Green</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-gray-600",
              "hover:bg-gray-600",
            )}
            onClick={(() => onToggle('gray'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Gray</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-red-600",
              "hover:bg-red-600",
            )}
            onClick={(() => onToggle('red'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Red</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-blue-600",
              "hover:bg-blue-600",
            )}
            onClick={(() => onToggle('blue'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Blue</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={clsx(
              "flex h-8 w-8 rounded-full shadow-2xl print:hidden",
              "bg-slate-600",
              "hover:bg-slate-600",
            )}
            onClick={(() => onToggle('slate'))}
          ></TooltipTrigger>
          <TooltipContent>
            <p>Slate</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
