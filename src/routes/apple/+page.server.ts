import { type RequestEvent, fail } from '@sveltejs/kit'
import { appleToHealth } from './apple-to-health.js'
import type { HealthFail, HealthResponse, HealthSuccess } from '$lib/types/health.js'

export const actions = {
  upload: async ({ request }: RequestEvent): Promise<HealthResponse> => {
    const formData = Object.fromEntries(await request.formData())
    const file = formData.file as File
    if (!file.name || file.name === 'undefined') {
      const error: HealthFail = fail(400, {
        error: true,
        message: 'You need to upload a file, dumbass'
      })
      return error
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const xml = buffer.toString('utf8')
    const data = await appleToHealth(xml)
    if (data.error) {
      const error: HealthFail = fail(400, data)
      return error
    }
    const response: HealthSuccess = { data }
    return response
  },
}
