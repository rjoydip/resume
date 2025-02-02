'use client'

import type { AboutType, IconType } from '@/types'
import type { UseSuspenseQueryResult } from '@tanstack/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import * as React from 'react'
import titleize from 'titleize'
import { getIcon } from '../components/_shared/getIcon'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Section } from '../components/ui/section'
import { Skeleton } from '../components/ui/skeleton'

export function About() {
  const { isPending, data }: UseSuspenseQueryResult<AboutType, unknown> = useSuspenseQuery<AboutType, unknown>({
    queryKey: ['about'],
  })

  if (isPending) {
    return <Skeleton data-testid="about_skeleton" />
  }

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
              {data.description}
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
          <div className="show print:hidden">
            {data.contact.email && (
              <Button className="size-8" variant="outline" size="icon" asChild>
                <a
                  data-testid="about_contact_email"
                  href={`mailto:${data.contact.email}`}
                  aria-label="Show Email"
                  rel="noopener noreferrer"
                >
                  {getIcon('mail', {
                    className: 'size-4',
                  })}
                </a>
              </Button>
            )}
            {data.contact.tel && (
              <Button className="size-8" variant="outline" size="icon" asChild>
                <a
                  data-testid="about_contact_tel"
                  href={`tel:${data.contact.tel}`}
                  aria-label="Show Mobile Number"
                  rel="noopener noreferrer"
                >
                  {getIcon('phone', {
                    className: 'size-4',
                  })}
                </a>
              </Button>
            )}
            {data.contact.social && data.contact.social.map(social => (
              <Button
                data-testid={`about_contact_social_${social.name}`}
                key={social.name}
                className="size-8"
                variant="outline"
                size="icon"
                asChild
              >
                <a
                  href={social.url}
                  aria-label="Show Social Media URLs"
                  rel="noopener noreferrer"
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
            {data.contact.email && (
              <div className="flex flex-wrap gap-x-1">
                <div className="text-pretty text-base font-bold">Email:</div>
                <a
                  href={`mailto:${data.contact.email}`}
                  aria-label="Show Email"
                  rel="noopener noreferrer"
                >
                  {data.contact.email}
                </a>
              </div>
            )}
            {data.contact.tel && (
              <div className="flex flex-wrap gap-x-1">
                <div className="text-pretty text-base font-bold">Mobile</div>
                <a
                  data-testid="about_contact_tel_hidden"
                  href={`tel:${data.contact.tel}`}
                  aria-label="Show Mobile Number"
                  rel="noopener noreferrer"
                >
                  {data.contact.tel}
                </a>
              </div>
            )}
            {data.contact.social && data.contact.social.map(social => (
              <div key={social.name} className="flex flex-wrap gap-x-1">
                <div className="text-pretty text-base font-bold">
                  {titleize(social.name)}
                  :
                </div>
                <a
                  href={social.url}
                  target="_blank"
                  aria-label="Show Social Media URLs"
                  rel="noreferrer noopener"
                >
                  {social.url}
                </a>
              </div>
            ))}
          </div>
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
                className: 'h-6 w-6 rounded-full inline-flex hover:underline text-green-500',
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
        data-testid="about_summery_title"
        className="text-xl font-bold"
      >
        Summary
      </Label>
      <Card className="border p-3">
        <CardHeader>
          <CardDescription
            data-testid="about_summery"
            className="text-pretty"
          >
            {data.summary}
          </CardDescription>
        </CardHeader>
      </Card>
    </Section>
  )
}
About.displayName = 'About'
