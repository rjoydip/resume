'use client'

import type { AboutType, ContactType, IconType } from '@/types'
import * as React from 'react'
import titleize from 'titleize'
import { uid } from 'uid'
import { getIcon } from '../_shared/getIcon'
import MarkdownRender from '../_shared/markdown-render'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../ui/card'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

function Contact({ data }: { data: ContactType }) {
  return (
    <Section>
      <div className="show pt-1 print:hidden">
        {data.email
          ? (
              <Button className="size-8" variant="outline" size="icon" asChild>
                <a
                  data-testid="about_contact_email"
                  href={`mailto:${data.email}`}
                  aria-label="Show Email"
                >
                  {getIcon('mail', {
                    className: 'size-4',
                  })}
                </a>
              </Button>
            )
          : null}
        {data.tel
          ? (
              <Button className="size-8" variant="outline" size="icon" asChild>
                <a
                  data-testid="about_contact_tel"
                  href={`tel:${data.tel}`}
                  aria-label="Show Mobile Number"
                >
                  {getIcon('phone', {
                    className: 'size-4',
                  })}
                </a>
              </Button>
            )
          : null}
        {data.social.map(social => (
          <Button
            data-testid={`about_contact_social_${social.name}`}
            key={uid(32)}
            className="size-8"
            variant="outline"
            size="icon"
            asChild
          >
            <a
              href={social.url}
              aria-label="Show Social Media URLs"
            >
              {getIcon(social.name as IconType, {
                className: 'size-4',
                href: social.url,
              })}
            </a>
          </Button>
        ))}
      </div>
      <div className="hidden print:block">
        {data.email
          ? (
              <div className="flex flex-wrap gap-x-1">
                <div className="text-pretty text-base font-bold">Email:</div>
                <a
                  data-testid="about_contact_email_hidden"
                  href={`mailto:${data.email}`}
                  aria-label="Show Email"
                >
                  {data.email}
                </a>
              </div>
            )
          : null}
        {data.tel
          ? (
              <div className="flex flex-wrap gap-x-1">
                <div className="text-pretty text-base font-bold">Mobile</div>
                <a
                  data-testid="about_contact_tel_hidden"
                  href={`tel:${data.tel}`}
                  aria-label="Show Mobile Number"
                >
                  {data.tel}
                </a>
              </div>
            )
          : null}
        {data.social
          ? data.social.map(social => (
              <div key={uid(32)} className="flex flex-wrap gap-x-1">
                <div className="text-pretty text-base font-bold">
                  {titleize(social.name)}
                  :
                </div>
                <a
                  data-testid={`about_contact_social_${social.name}_hidden`}
                  href={social.url}
                  target="_blank"
                  aria-label="Show Social Media URLs"
                  rel="noreferrer noopener"
                >
                  {social.url}
                </a>
              </div>
            ))
          : null}
      </div>
    </Section>
  )
}

export function About({ data }: { data: AboutType }) {
  if (!data)
    return null
  return (
    <Section>
      <Card className="border p-3">
        <CardHeader>
          <div className="block flex flex-col items-center justify-center sm:hidden print:hidden">
            <Avatar className="size-28 rounded-full">
              <AvatarImage
                data-testid="about_avatar_url"
                alt={data.name}
                src={data.avatar_url}
                rel="noreferrer noopener"
              />
              <AvatarFallback>{data.initials}</AvatarFallback>
            </Avatar>
            <div
              data-testid="about_name_small_screen"
              className="text-2xl font-bold text-primary"
            >
              {data.name}
            </div>
          </div>
          <div
            data-testid="about_name"
            className="hidden text-2xl font-bold text-primary sm:block"
          >
            {data.name}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div
              data-testid="about_description"
              className="max-w-md text-pretty py-2"
            >
              <MarkdownRender content={data.description} />
            </div>
            <Avatar className="hidden size-28 rounded-full sm:block">
              <AvatarImage
                data-testid="about_avatar_url"
                alt={data.name}
                src={data.avatar_url}
              />
              <AvatarFallback>{data.initials}</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between mt-2">
          <Contact data={data.contact} />
          <div className="max-w-md items-center text-pretty text-base">
            <a
              data-testid="about_location_link"
              className="hover:point inline-flex"
              href={data.location.link}
              aria-label="Show Location on Map"
              target="_blank"
              rel="noreferrer noopener"
            >
              {getIcon('map', {
                className:
            'h-6 w-6 rounded-full inline-flex hover:underline text-green-500',
                href: data.location.link,
              })}
              <span data-testid="about_location" className="text-base">
                {data.location.city}
                ,
                {data.location.country}
              </span>
            </a>
          </div>
        </CardFooter>
      </Card>
      <Label
        data-testid="about_prof_summery_title"
        className="text-xl font-bold"
      >
        Professional Summary
      </Label>
      <Card className="border p-3">
        <CardHeader>
          <CardDescription
            data-testid="about_prof_summery"
            className="text-pretty"
          >
            <MarkdownRender content={data.professional_summary} />
          </CardDescription>
        </CardHeader>
      </Card>
    </Section>
  )
}
