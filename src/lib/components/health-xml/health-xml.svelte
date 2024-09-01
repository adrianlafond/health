<script>
  import { enhance } from '$app/forms'
</script>

<form
  method="POST"
  action="/apple?/upload"
  use:enhance
  enctype="multipart/form-data"
>
  <label>
    Apple Health "export.xml"
    <input name="file" type="file" accept="xml" />
  </label>
  <button type="submit">Load data</button>
</form>
