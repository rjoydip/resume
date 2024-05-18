import axios from 'axios'
import { apiURL } from 'test/constant'
import { describe, expect, it } from 'vitest'

describe('should validate health routes', () => {
  it('should validate invalid routes', async () => {
    await expect(async () => await axios.get(`${apiURL}/invalid-route`)).rejects.toThrowError()
  })
  it('should validate invalid health routes', async () => {
    const { status, data } = await axios.get(`${apiURL}/health`)
    expect(status).toBe(200)
    expect(data).toBeDefined()
    expect(data).toStrictEqual({
      status: 'up',
    })
  })
})
