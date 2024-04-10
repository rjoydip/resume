import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { getIcon } from "./icons";
import { IconType } from "./icons/getIcon";

interface Props {
  title: string;
  description: string;
  techStacks: readonly string[];
  links?: readonly {
    type: "web" | "mobile";
    href: string;
    label: string;
  }[];
}

export function ProjectCard({
  title,
  description,
  techStacks,
  links = [],
}: Props) {
  return (
    <Card className="flex flex-col overflow-hidden border p-3">
      <CardHeader className="">
        <div className="space-y-1">
          <CardTitle className="text-base">
            <div className="flex flex-wrap space-x-0.5">
              <Label className="font-semibold leading-none">{title}</Label>
            </div>
          </CardTitle>
          <CardDescription className="font-mono text-xs">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="mt-1 flex flex-wrap gap-1">
          {links && !!links.length ? (
            <Label className="text-xs font-semibold">Links: </Label>
          ) : null}
          {links && !!links.length
            ? links.map((link, index) =>
                link.type === "web" ? (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getIcon("web", {
                      className: "size-4 rounded-full",
                      color: "green",
                      colorwidth: "600",
                      href: link.href,
                    })}
                  </a>
                ) : link.type === "mobile" ? (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getIcon("smartphone", {
                      className: "size-4 rounded-full",
                      color: "blue",
                      colorwidth: "600",
                      href: link.href,
                    })}
                  </a>
                ) : null,
              )
            : null}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {techStacks && !!techStacks.length ? (
            <Label className="text-xs font-semibold">Technology: </Label>
          ) : null}
          {techStacks.map((techStack, index) => (
            <div key={index}>
              {getIcon(techStack as IconType, {
                className: "size-4 rounded-full",
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
