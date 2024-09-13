<script lang="ts">
  import type { HealthResponse } from '$lib/types/health.js'
  import HealthXml from '$lib/components/health-xml/health-xml.svelte'

  export let form: HealthResponse

  console.log('form:', form)
  let loading = false
</script>

<h1>/apple</h1>

<HealthXml on:submit={() => (loading = true)} />

{#if form?.data.error}
  <p>{form.data.message}</p>
{:else if form?.data.error === false}
  <p>{form.data.date}</p>
  <p>{form.data.user.bloodType}</p>
  <p>{form.data.user.gender}</p>
  <p>
    {form.data.user.dob?.year}-{form.data.user.dob?.month}-{form.data.user.dob
      ?.date}
  </p>
  {#each form.data.bloodPressure as bloodPressure}
    <p>
      {bloodPressure.date}: {bloodPressure.systolic} / {bloodPressure.diastolic}
    </p>
  {/each}
{:else if loading}
  <p>Loading...</p>
{/if}
