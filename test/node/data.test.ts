import { companies, getDarkThemeColors, getLightThemeColors, metadata, projectLinkTypes, socialMedia, techStacks, workMode } from '@/data'
import { keySkills } from 'test/mocks/fixtures'
import { describe, expect, it } from 'vitest'

describe('data', () => {
  it('should validate metadata', () => {
    expect(typeof metadata).toBe('object')
    expect(Object.keys(metadata)).toStrictEqual(['name', 'description', 'generator'])
  })
  it('should validate getLightThemeColors', () => {
    const lightThemeColors = getLightThemeColors()
    expect(typeof lightThemeColors).toBe('object')
    expect(lightThemeColors.length).toBe(11)
  })
  it('should validate getDarkThemeColors', () => {
    const darkThemeColors = getDarkThemeColors()
    expect(typeof darkThemeColors).toBe('object')
    expect(darkThemeColors.length).toBe(10)
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
  it('should validate keySkills', () => {
    expect(keySkills.length).toBe(3)
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
