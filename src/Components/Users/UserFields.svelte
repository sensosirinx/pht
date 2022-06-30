<script>
  export let key, value, onClick, sorting_by, sorting_asc

  let sorting = ''

  $: if (sorting_by && key && sorting_by === key) {
    sorting = (sorting_asc) ? 'sorting_asc' : 'sorting_desc'
  } else {
    sorting = ''
  }
</script>
<th scope="col" class="sorting {sorting}" on:click={()=>onClick(key)}>{value}</th>