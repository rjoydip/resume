import { Boxes, Globe, Server, Smartphone } from "lucide-react";
import { Laravel } from "./language";
import defu from "defu";
import clsx from "clsx";

export type IconType =
  | "api"
  | "laravel"
  | "web"
  | "smartphone"
  | "mobile"
  | "phone"
  | "server"
  | "backend"
  | null;

interface IconProps {
  className?: string;
  href?: string;
  color?: string;
  colorwidth?: string;
}

export function getIcon(icon: IconType = null, $props: IconProps = {}) {
  const props = defu(
    {
      className: clsx(
        $props.className,
        `text-${$props.color ?? "black"}-${$props.colorwidth ?? "900"}`,
      ),
    },
    $props,
  );
  switch (icon) {
    case "laravel":
      return <Laravel {...props} />;
    case "web":
      return <Globe {...props} />;
    case "smartphone":
    case "phone":
    case "mobile":
      return <Smartphone {...props} />;
    case "server":
    case "backend":
      return <Server {...props} />;
    case "api":
      return <Boxes {...props} />;
    default:
      return null;
  }
}
