import humanizeString from "humanize-string";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import data from "@/data";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IconType, getIcon } from "@/components/icons/getIcon";
import { Label } from "@/components/ui/label";
import {
  ContactType,
  EducationType,
  ProjectCardProps,
  ProjectType,
  SkillsType,
  WorkType,
} from "@/types";

export const metadata: Metadata = {
  title: `${data.name}`,
  description: data.summary,
};

const ProjectCard = ({
  title,
  description,
  techStacks,
  links = [],
}: ProjectCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden border p-3">
      <CardHeader>
        <CardTitle className="space-y-1 text-base">
          <div className="flex flex-wrap space-x-0.5">
            <Label className="font-semibold leading-none">{title}</Label>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2 text-sm">{description}</CardContent>
      <CardFooter className="mt-2">
        <div>
          <div className="flex flex-wrap gap-1">
            {links && !!links.length ? (
              <Label className="text-sm font-semibold">Links: </Label>
            ) : null}
            {links && !!links.length
              ? links.sort().map((link, index) =>
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
          <div className="flex flex-wrap gap-1">
            {techStacks && !!techStacks.length ? (
              <Label className="text-sm font-semibold">Technology: </Label>
            ) : null}
            {techStacks.sort().map((techStack, index) => (
              <div key={index} className="flex justify-center items-center ">
                {getIcon(techStack as IconType, {
                  className: "size-4 rounded-full",
                })}
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const Contact = ({ data }: { data: ContactType }) => {
  return (
    <>
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
    </>
  );
};

const Education = ({ data }: { data: EducationType }) => {
  return (
    <Section>
      <h2 className="text-xl font-bold">Education</h2>
      {data.map((education) => {
        return (
          <Card key={education.school}>
            <CardHeader>
              <div className="flex items-center justify-between gap-x-2 text-base">
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
              <Label className="text-base font-semibold text-blue-600">
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
    <Section className="print-force-new-page scroll-mb-16">
      <h2 className="text-xl font-bold">Projects</h2>
      <div className="-mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
        {data.map((project) => {
          return (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              techStacks={project.techStacks}
              links={"links" in project ? project.links : []}
            />
          );
        })}
      </div>
    </Section>
  );
};

const Skills = ({ data }: { data: SkillsType }) => {
  return (
    <Section>
      <h2 className="text-xl font-bold">Skills</h2>
      <div className="flex flex-wrap gap-2">
        <Table>
          <TableBody>
            {Object.entries(data).map(([skillCategory, skills]) => (
              <TableRow key={skillCategory} className="border-none">
                <TableCell className="p-1 font-medium">
                  {humanizeString(skillCategory)}
                </TableCell>
                <TableCell className="flex flex-wrap p-1">
                  {skills.sort().map((skill, index) => {
                    return (
                      <div key={index} className="mx-0.5">
                        {getIcon(skill as IconType, {
                          className: "size-6 rounded-full",
                        })}
                      </div>
                    );
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
};

const Work = ({ data }: { data: WorkType }) => {
  return (
    <Section>
      <h2 className="text-xl font-bold">Work Experience</h2>
      {data.map((work) => {
        return (
          <Card key={work.company}>
            <CardHeader>
              <div className="flex items-center justify-between gap-x-2 text-base">
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
              <h4 className="text-base font-semibold text-blue-600">
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
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="max-w-md text-pretty text-base">{data.about}</p>
            <p className="max-w-md items-center text-pretty text-sm">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={data.locationLink}
                target="_blank"
              >
                <GlobeIcon className="size-3" />
                {data.location}
              </a>
            </p>
            <Contact data={data.contact} />
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
        {/* About */}
        <Section>
          <h2 className="text-xl font-bold">About</h2>
          <p className="text-pretty text-base">{data.summary}</p>
        </Section>
        {/* Work */}
        <Work data={data.work} />
        {/* Education */}
        <Education data={data.education} />
        {/* Skills */}
        <Skills data={data.skills} />
        {/* Project */}
        <Project data={data.projects} />
      </section>

      <CommandMenu
        links={[
          {
            url: data.personalWebsiteUrl,
            title: "Personal Website",
          },
          ...data.contact.social.sort().map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
    </main>
  );
}
