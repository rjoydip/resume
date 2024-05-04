import axios from 'axios'
import { describe, it, expect } from 'vitest'

describe('should validate health routes', () => {
  it('should validate invalid routes', async () => {
    await expect(async () => await axios.get('/api/invalid-route')).rejects.toThrowError('Network Error')
  })
  it('should validate invalid health routes', async () => {
    const { status, data } = await axios.get('/api/health')
    expect(status).toBe(200)
    expect(data).toBeDefined()
    expect(data).toStrictEqual({
      status: 'up'
    })
  })
})
