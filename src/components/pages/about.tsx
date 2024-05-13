'use client'

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Label } from '@radix-ui/react-label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../ui/card'
import { Section } from '../ui/section'
import { getIcon } from '../../icons/getIcon'
import { Button } from '../ui/button'
import type { AboutType, ContactType, IconType } from '@/types'

export function Contact({ data }: { data: ContactType }) {
  return (
    <Section>
      <div
        data-testid="about_contact_visible"
        className="flex gap-x-1 pt-1 print:hidden"
      >
        {data.email
          ? (
            <Button className="size-8" variant="outline" size="icon" asChild>
              <a data-testid="about_contact_email" href={`mailto:${data.email}`}>
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
              <a data-testid="about_contact_tel" href={`tel:${data.tel}`}>
                {getIcon('phone', {
                  className: 'size-4',
                })}
              </a>
            </Button>
            )
          : null}
        {data.social.map((social, index) => (
          <Button
            data-testid={`about_contact_social_${social.name}`}
            key={index}
            className="size-8"
            variant="outline"
            size="icon"
            asChild
          >
            <a href={social.url}>
              {getIcon(social.name as IconType, {
                className: 'size-4',
              })}
            </a>
          </Button>
        ))}
      </div>
      <div
        data-testid="about_contact_hidden"
        className="hidden flex-col gap-x-1 print:flex"
      >
        {data.email
          ? (
            <a data-testid="about_contact_email_hidden" href={`mailto:${data.email}`}>
              <span>{data.email}</span>
            </a>
            )
          : null}
        {data.tel
          ? (
            <a data-testid="about_contact_tel_hidden" href={`tel:${data.tel}`}>
              <span>{data.tel}</span>
            </a>
            )
          : null}
        {data.social
          ? data.social.map((social, index) => (
            <a
              key={index}
              data-testid={`about_contact_social_${social.name}_hidden`}
              href={social.url}
            >
              <span>{social.url}</span>
            </a>
          ))
          : null}
      </div>
    </Section>
  )
}

export function About({ data }: { data: AboutType }) {
  return (
    <Section>
      <Card className="border p-3">
        <CardHeader>
          <div data-testid="about_name" className="text-2xl font-bold text-primary">
            {data.name}
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <div data-testid="about_description" className="max-w-md text-pretty">
              {data.description}
            </div>
            <Avatar className="size-28">
              <AvatarImage
                data-testid="about_avatar_url"
                alt={data.name}
                src={data.avatar_url}
                className="rounded-full"
              />
              <AvatarFallback>{data.initials}</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-x-2">
          <Contact data={data.contact} />
          <div className="max-w-md items-center text-pretty text-base">
            <a
              data-testid="about_location_link"
              className="hover:point inline-flex"
              href={data.location_link}
              target="_blank"
            >
              {getIcon('map', {
                className:
                  'h-6 w-6 rounded-full inline-flex hover:underline text-green-500',
                href: data.location_link,
              })}
              <span data-testid="about_location" className="text-base">
                {data.location}
              </span>
            </a>
          </div>
        </CardFooter>
      </Card>
      <Label data-testid="about_prof_summery_title" className="text-xl font-bold">
        Professional Summary
      </Label>
      <Card className="border p-3">
        <CardHeader>
          <CardDescription data-testid="about_prof_summery" className="text-pretty">
            {data.professional_summary}
          </CardDescription>
        </CardHeader>
      </Card>
    </Section>
  )
}
