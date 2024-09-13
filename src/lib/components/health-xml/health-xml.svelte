<script>
  import { enhance } from '$app/forms'

  let processing = false
</script>

<form
  method="POST"
  action="/apple?/upload"
  use:enhance={() => {
    processing = true
    return async ({ update }) => {
      await update()
      processing = false
    }
  }}
  enctype="multipart/form-data"
>
  <label>
    {processing ? 'Processing' : 'Apple Health "export.xml"'}
    <input name="file" type="file" accept="xml" />
  </label>
  <button disabled={processing} type="submit">Load data</button>
</form>
