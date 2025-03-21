import { companies, getDarkThemeColors, getLightThemeColors, meta, projectLinkTypes, socialMedia, techStacks, workMode } from '@/data/index'
import { describe, expect, it } from 'vitest'
import { strengths } from '../fixtures/data.fixture'

describe('data', () => {
  it('should validate meta', () => {
    expect(typeof meta).toBe('object')
    expect(Object.keys(meta)).toStrictEqual(['name', 'description', 'generator'])
  })
  it('should validate getLightThemeColors', () => {
    const lightThemeColors = getLightThemeColors()
    expect(typeof lightThemeColors).toBe('object')
    expect(lightThemeColors.length).toBe(2)
  })
  it('should validate getDarkThemeColors', () => {
    const darkThemeColors = getDarkThemeColors()
    expect(typeof darkThemeColors).toBe('object')
    expect(darkThemeColors.length).toBe(1)
  })
  it('should validate companies', () => {
    expect(typeof companies).toBe('object')
    expect(companies.length).toBe(4)
  })
  it('should validate projectLinkTypes', () => {
    expect(typeof projectLinkTypes).toBe('object')
    expect(projectLinkTypes.length).toBe(2)
    expect(projectLinkTypes).toStrictEqual(['web', 'mobile'])
  })
  it('should validate socialMedia', () => {
    expect(typeof socialMedia).toBe('object')
    expect(socialMedia.length).toBe(3)
    expect(socialMedia).toStrictEqual(['gitHub', 'linkedIn', 'x'])
  })
  it('should validate strengths', () => {
    expect(strengths.length).toBe(5)
  })
  it('should validate workMode', () => {
    expect(typeof workMode).toBe('object')
    expect(workMode.length).toBe(3)
    expect(workMode).toStrictEqual(['Work from Home', 'Hybrid', 'Office'])
  })
  it('should validate techStacks', () => {
    expect(typeof techStacks).toBe('object')
    expect(techStacks.length).toBe(40)
  })
})
