import type { AboutType } from '@/types'
import { About } from '@/components/pages/about'
import { render, screen } from '@testing-library/react'
import * as React from 'react'
import { beforeAll, describe, expect, it } from 'vitest'
import { about as aboutFixture } from '../../../fixtures/data'

describe('<About />', () => {
  const about: AboutType = aboutFixture

  beforeAll(async () => {
    await render(<About data={about} />)
  })

  it('should validate name', async () => {
    const aboutNameEle = screen.getByTestId('about_name')
    expect(aboutNameEle.textContent).toBeDefined()
    expect(aboutNameEle.textContent).toBe(about.name)
  })

  it('should validate description', async () => {
    const aboutDescEle = screen.getByTestId('about_description')
    expect(aboutDescEle.textContent).toBeDefined()
    expect(aboutDescEle.textContent).toBe(about.description)
  })

  it('should validate location', async () => {
    const aboutLocEle = screen.getByTestId('about_location')
    expect(aboutLocEle.textContent).toBeDefined()
    expect(aboutLocEle.textContent).toBe(`${about.location.city},${about.location.country}`)
  })

  it('should validate professional summery', async () => {
    const aboutProfSummeryEle = screen.getByTestId('about_summery')
    expect(aboutProfSummeryEle.textContent).toBeDefined()
    expect(aboutProfSummeryEle.textContent).toBe(about.summary)
  })

  it('should validate professional summery title', async () => {
    const aboutProfSummeryTitleEle = screen.getByTestId(
      'about_summery_title',
    )
    expect(aboutProfSummeryTitleEle.textContent).toBeDefined()
  })

  // TODO: Need to check why isn't working
  /* it("should validate avatar URL", async () => {
    const aboutAvatarURLEle = screen.getByTestId("about_avatar_url");
    expect(aboutAvatarURLEle.textContent).toBeDefined();
  }); */

  it('should validate location link', async () => {
    const aboutLocationLinkEle = screen.getByTestId('about_location_link')
    expect(aboutLocationLinkEle.textContent).toBeDefined()
    expect(aboutLocationLinkEle.getAttribute('href')).toBe(about.location.link)
  })

  it('should validate contact email', async () => {
    const aboutLocationLinkEle = screen.getByTestId('about_contact_email')
    expect(aboutLocationLinkEle.textContent).toBeDefined()
    expect(aboutLocationLinkEle.getAttribute('href')).toBe(`mailto:${about.contact.email}`)
  })

  it('should validate contact tel', async () => {
    const aboutLocationLinkEle = screen.getByTestId('about_contact_tel')
    expect(aboutLocationLinkEle.textContent).toBeDefined()
    expect(aboutLocationLinkEle.getAttribute('href')).toBe(`tel:${about.contact.tel}`)
  })

  it('should validate contact social', async () => {
    about.contact.social.forEach((s) => {
      const aboutLocationLinkEle = screen.getByTestId(`about_contact_social_${s.name}`)
      expect(aboutLocationLinkEle.textContent).toBeDefined()
      expect(aboutLocationLinkEle.getAttribute('href')).toBe(s.url)
    })
  })
})
