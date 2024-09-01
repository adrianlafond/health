import { type RequestEvent, fail } from '@sveltejs/kit'
import { appleToHealth } from './apple-to-health.js'
import type { HealthResponse } from '$lib/types/health.js'

export const actions = {
  upload: async ({ request }: RequestEvent): Promise<HealthResponse> => {
    const formData = Object.fromEntries(await request.formData())
    const file = formData.file as File
    if (!file.name || file.name === 'undefined') {
      return fail(400,  {
        error: true,
        message: 'You need to upload a file, dumbass'
      })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const xml = buffer.toString('utf8')
    const data = await appleToHealth(xml)
    return { data }
  },
}
