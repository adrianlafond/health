<script lang="ts">
  import type { HealthResponse } from '$lib/types/health.js'
  import HealthXml from '$lib/components/health-xml/health-xml.svelte'

  export let form: HealthResponse
</script>

<h1>/apple</h1>

<HealthXml />

{#if form?.data.error === false}
  <p>{form?.data.date}</p>
  <p>{form.data.user.bloodType}</p>
  <p>{form.data.user.gender}</p>
  <p>
    {form.data.user.dob?.year}-{form.data.user.dob?.month}-{form.data.user.dob
      ?.date}
  </p>
{/if}
