<script>
  import { fetchUsers } from "../../Actions/users"
  import { storeModal } from "../../Store"

  let query = ''

  const searchUsers = async (phrase = '') => {
    const query = phrase ? '?q=' + phrase : ''
    await fetchUsers(query)
  }

  $: if (query.length > 3) {
    searchUsers(query)
  } else {
    searchUsers()
  }

  const openModal = () => {
    const isOpen = {
      isOpen: true,
      editable: false
    }
    storeModal.update(() => isOpen)
  }

</script>

<div class="row align-items-end">
  <div class="col-sm-10">
    <div id="filter" class="dataTables_filter">
      <label>Поиск:
        <input bind:value={query} type="search" class="form-control form-control-sm" placeholder="" />
      </label>
    </div>
  </div>
  <div class="col-sm-2 d-flex justify-content-end">
    <button type="button" class="btn btn-outline-secondary btn-sm" on:click={openModal}>Добавить Пользователя</button>
  </div>
</div>