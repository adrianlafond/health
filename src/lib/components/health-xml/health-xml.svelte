<script lang="ts">
  import { EMPTY_PATH, INVALID_FILENAME } from './errors'

  export let path = ''

  let invalid = ''
  let disabled = !path

  type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement }
  function handleInput(event: InputEvent) {
    path = event.currentTarget.value
    disabled = !path
  }

  function handleSubmit(event: SubmitEvent) {
    const data = new FormData(event.target as HTMLFormElement)
    const formPath = data.get('path')?.toString().trim() || ''
    if (!formPath) {
      invalid = EMPTY_PATH
      event.preventDefault()
    } else if (!formPath.endsWith('export.xml')) {
      invalid = INVALID_FILENAME
      event.preventDefault()
    } else {
      invalid = ''
    }
  }
</script>

<form
  method="POST"
  action="/import-apple-health-export"
  on:submit={handleSubmit}
>
  <label>
    Path to Apple Health export.xml
    <input name="path" on:input={handleInput} value={path} />
  </label>
  <button {disabled} type="submit">Load data</button>
  {#if invalid}
    <p>{invalid}</p>
  {/if}
</form>
