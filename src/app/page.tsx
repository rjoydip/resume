import humanizeString from "humanize-string";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@/data";
import { IconType, getIcon } from "@/components/icons/getIcon";
import { Label } from "@/components/ui/label";
import {
  AboutType,
  ContactType,
  EducationType,
  ProjectType,
  SkillsType,
  WorkType,
} from "@/types";
import ThemeChange from "@/components/theme-change";

export const metadata: Metadata = {
  title: `${data.about?.name}`,
  description: data.about?.summary,
};

const About = ({
  data,
  contact,
}: {
  data: AboutType;
  contact: ContactType;
}) => {
  return (
    <Section>
      <Card className="border p-3 print:border-none">
        <CardHeader>
          <h1 className="text-primary text-2xl font-bold">
            {data.name}
          </h1>
        </CardHeader>
        <CardContent className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="max-w-md text-pretty text-base text-sm">
              {data.about}
            </div>
            <Avatar className="size-28">
              <AvatarImage
                alt={data.name}
                src={data.avatarUrl}
                className="rounded-full"
              />
              <AvatarFallback>{data.initials}</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-x-2">
          <Contact data={contact} />
          <div className="max-w-md items-center text-pretty text-base">
            {getIcon("map", {
              className:
                "size-4 rounded-full inline-flex hover:underline text-green-600",
              href: data.locationLink,
            })}
            <a
              className="hover:point inline-flex"
              href={data.locationLink}
              target="_blank"
            >
              {data.location}
            </a>
          </div>
        </CardFooter>
      </Card>
      <Label className="text-xl font-bold">About</Label>
      <Card className="border p-3 print:border-none">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription className="text-pretty text-sm">
            {data.summary}
          </CardDescription>
        </CardHeader>
      </Card>
    </Section>
  );
};

const Contact = ({ data }: { data: ContactType }) => {
  return (
    <Section>
      <div className="flex gap-x-1 pt-1 text-base print:hidden">
        {data.email ? (
          <Button className="size-8" variant="outline" size="icon" asChild>
            <a href={`mailto:${data.email}`}>
              <MailIcon className="size-4" />
            </a>
          </Button>
        ) : null}
        {data.tel ? (
          <Button className="size-8" variant="outline" size="icon" asChild>
            <a href={`tel:${data.tel}`}>
              <PhoneIcon className="size-4" />
            </a>
          </Button>
        ) : null}
        {data.social.sort().map((social) => (
          <Button
            key={social.name}
            className="size-8"
            variant="outline"
            size="icon"
            asChild
          >
            <a href={social.url}>
              <social.icon className="size-4" />
            </a>
          </Button>
        ))}
      </div>
      <div className="hidden flex-col gap-x-1 text-base print:flex">
        {data.email ? (
          <a href={`mailto:${data.email}`}>
            <span className="underline">{data.email}</span>
          </a>
        ) : null}
        {data.tel ? (
          <a href={`tel:${data.tel}`}>
            <span className="underline">{data.tel}</span>
          </a>
        ) : null}
      </div>
    </Section>
  );
};

const Education = ({ data }: { data: EducationType }) => {
  return (
    <Section>
      <Label className="text-xl font-bold">Education</Label>
      {data.map((education) => {
        return (
          <Card key={education.school} className="border p-3 print:border-none">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between text-base">
                <h3 className="font-semibold leading-none">
                  {education.school}
                </h3>
                <div className="text-base tabular-nums text-gray-500">
                  {education.start} - {education.end}
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-2">{education.degree}</CardContent>
            <CardFooter className="mt-2">
              <Label className="text-base font-semibold text-primary dark:text-primary">
                Aggregate: {education?.aggregate ?? education?.cgpa}
              </Label>
            </CardFooter>
          </Card>
        );
      })}
    </Section>
  );
};

const Project = ({ data }: { data: ProjectType }) => {
  return (
    <Section>
      <Label className="text-xl font-bold">Projects</Label>
      <div className="print-force-new-page scroll-mb-16">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
          {data.map((project, index) => {
            return (
              <Card
                className="flex flex-col overflow-hidden border p-3 print:border-none"
                key={index}
              >
                <CardHeader>
                  <CardTitle className="space-y-1">
                    <div className="flex flex-wrap space-x-0.5">
                      <Label className="font-semibold text-primary dark:text-primary">
                        {project.title}
                      </Label>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-pretty text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex">
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {project.links && !!project.links.length ? (
                        <Label className="text-sm font-semibold">Links: </Label>
                      ) : null}
                      {project.links && !!project.links.length
                        ? project.links.sort().map((link, index) =>
                            link.type === "web" ? (
                              <a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {getIcon("web", {
                                  className:
                                    "size-4 rounded-full text-green-600",
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
                                  className: "size-4 rounded-full text-red-600",
                                  href: link.href,
                                })}
                              </a>
                            ) : null,
                          )
                        : null}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.techStacks && !!project.techStacks.length ? (
                        <Label className="text-sm font-semibold">
                          Technology:{" "}
                        </Label>
                      ) : null}
                      {project.techStacks.sort().map((techStack, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center "
                        >
                          {getIcon(techStack as IconType, {
                            className: "size-4 rounded-full",
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

const Skills = ({ data }: { data: SkillsType }) => {
  return (
    <Section>
      <Label className="text-xl font-bold">Skills</Label>
      <Card className="border p-3 print:border-none">
        {Object.entries(data).map(([skillCategory, skills]) => (
          <div
            key={skillCategory}
            className="flex flex-wrap items-center justify-between"
          >
            <div className="p-1 font-medium">
              {humanizeString(skillCategory)}
            </div>
            <div className="flex flex-wrap p-1">
              {skills.sort().map((skill, index) => {
                return (
                  <div key={index} className="mx-0.5">
                    {getIcon(skill as IconType, {
                      className: "size-6 rounded-full",
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </Card>
    </Section>
  );
};

const Work = ({ data }: { data: WorkType }) => {
  return (
    <Section>
      <Label className="text-xl font-bold">Work Experience</Label>
      {data.map((work) => {
        return (
          <Card key={work.company} className="border p-3 print:border-none">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-x-2 text-base">
                <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                  <a className="hover:underline" href={work.link}>
                    {work.company}
                  </a>
                  <span className="inline-flex gap-x-1">
                    {work.mode.sort().map((badge, index) => (
                      <Badge className="align-middle text-[12px]" key={index}>
                        {badge}
                      </Badge>
                    ))}
                  </span>
                </h3>
                <div className="text-base tabular-nums text-gray-500">
                  {work.start} - {work.end ?? "Present"}
                </div>
              </div>
              <h4 className="text-base text-sm font-semibold text-primary dark:text-primary">
                {work.position}
              </h4>
            </CardHeader>
            <CardContent className="mt-2 text-sm">
              {work.description}
            </CardContent>
            <CardFooter className="mt-2 flex-wrap gap-1">
              <Label className="text-sm font-semibold">Skills: </Label>
              {work.techStacks.sort().map((techStack, index) => (
                <div key={index} className="mx-0.5">
                  {getIcon(techStack as IconType, {
                    className: "size-5 rounded-full",
                  })}
                </div>
              ))}
            </CardFooter>
          </Card>
        );
      })}
    </Section>
  );
};

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <section className="mx-auto w-full max-w-2xl space-y-4 print:space-y-6">
        <About data={data.about} contact={data.contact} />
        <Work data={data.work} />
        <Education data={data.education} />
        <Skills data={data.skills} />
        <Project data={data.projects} />
      </section>

      <section>
        <ThemeChange />
        <CommandMenu
          links={[
            {
              url: data.about.website,
              title: "Website",
            },
            ...data.contact.social.sort().map((socialMediaLink) => ({
              url: socialMediaLink.url,
              title: socialMediaLink.name,
            })),
          ]}
        />
      </section>
    </main>
  );
}
