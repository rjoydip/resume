import humanizeString from "humanize-string";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IconType, getIcon } from "@/components/icons/getIcon";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: `${ResumeData.name}`,
  description: ResumeData.summary,
};

export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16 print:p-12">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold">{ResumeData.name}</h1>
            <p className="max-w-md text-pretty text-sm">
              {ResumeData.about}
            </p>
            <p className="max-w-md items-center text-pretty text-xs">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={ResumeData.locationLink}
                target="_blank"
              >
                <GlobeIcon className="size-3" />
                {ResumeData.location}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 text-sm print:hidden">
              {ResumeData.contact.email ? (
                <Button
                  className="size-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`mailto:${ResumeData.contact.email}`}>
                    <MailIcon className="size-4" />
                  </a>
                </Button>
              ) : null}
              {ResumeData.contact.tel ? (
                <Button
                  className="size-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`tel:${ResumeData.contact.tel}`}>
                    <PhoneIcon className="size-4" />
                  </a>
                </Button>
              ) : null}
              {ResumeData.contact.social.map((social) => (
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
            <div className="hidden flex-col gap-x-1 text-sm print:flex">
              {ResumeData.contact.email ? (
                <a href={`mailto:${ResumeData.contact.email}`}>
                  <span className="underline">{ResumeData.contact.email}</span>
                </a>
              ) : null}
              {ResumeData.contact.tel ? (
                <a href={`tel:${ResumeData.contact.tel}`}>
                  <span className="underline">{ResumeData.contact.tel}</span>
                </a>
              ) : null}
            </div>
          </div>
          <Avatar className="size-28">
            <AvatarImage
              alt={ResumeData.name}
              src={ResumeData.avatarUrl}
              className="rounded-full"
            />
            <AvatarFallback>{ResumeData.initials}</AvatarFallback>
          </Avatar>
        </div>
        {/* About */}
        <Section>
          <h2 className="text-xl font-bold">About</h2>
          <p className="text-pretty text-sm">
            {ResumeData.summary}
          </p>
        </Section>
        {/* Work Experience */}
        <Section>
          <h2 className="text-xl font-bold">Work Experience</h2>
          {ResumeData.work.map((work) => {
            return (
              <Card key={work.company}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a className="hover:underline" href={work.link}>
                        {work.company}
                      </a>
                      <span className="inline-flex gap-x-1">
                        {work.badges.map((badge, index) => (
                          <Badge
                            className="align-middle text-[12px]"
                            key={index}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500">
                      {work.start} - {work.end ?? "Present"}
                    </div>
                  </div>
                  <h4 className="text-sm leading-none">
                    {work.position}
                  </h4>
                </CardHeader>
                <CardContent className="mt-2 text-xs">
                  {work.description}
                </CardContent>
                <CardFooter className="flex-wrap gap-1 mt-2">
                  <Label className="text-xs font-semibold">Skills: </Label>
                  {work.techStacks.map((techStack, index) => (
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
        {/* Education */}
        <Section>
          <h2 className="text-xl font-bold">Education</h2>
          {ResumeData.education.map((education) => {
            return (
              <Card key={education.school}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="font-semibold leading-none">
                      {education.school}
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2">{education.degree}</CardContent>
                <CardFooter className="mt-2">
                  <Label className="text-sm">
                    Aggregate: {education?.aggregate ?? education?.cgpa}
                  </Label>
                </CardFooter>
              </Card>
            );
          })}
        </Section>
        {/* Skills */}
        <Section>
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            <Table>
              <TableBody>
                {Object.entries(ResumeData.skills).map(
                  ([skillCategory, skills]) => (
                    <TableRow key={skillCategory} className="border-none">
                      <TableCell className="p-1 font-medium">
                        {humanizeString(skillCategory)}:
                      </TableCell>
                      <TableCell className="flex flex-wrap p-1">
                        {skills.map((skill, index) => {
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
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        </Section>
        {/* Project */}
        <Section className="print-force-new-page scroll-mb-16">
          <h2 className="text-xl font-bold">Projects</h2>
          <div className="-mx-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
            {ResumeData.projects.map((project) => {
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
      </section>

      <CommandMenu
        links={[
          {
            url: ResumeData.personalWebsiteUrl,
            title: "Personal Website",
          },
          ...ResumeData.contact.social.map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
    </main>
  );
}
