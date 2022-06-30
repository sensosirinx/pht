<script>
  import { usersListStore, storeSorting } from "../../Store"
  import { onMount } from "svelte"
  import { fetchUsers } from "../../Actions/users"
  import SearchForm from "../SearchForm"
  import UserList from "./UserList"
  import UserFields from "./UserFields"

  let userList = []
  let sorting_asc, sorting_by

  onMount(async () => {
    await fetchUsers()
  })

  const sortBy = async (key) => {
    const sorting = {
      sortBy: key,
      asc: key ? !sorting_asc : false
    }
    storeSorting.update(() => sorting)
    if (sorting_by) {
      const direct = (sorting_asc) ? 'asc' : 'desc'
      const query = '?_sort='+sorting_by+'&_order=' + direct
      await fetchUsers(query)
    }
  }

  usersListStore.subscribe(value => {
    userList = value
  })

  storeSorting.subscribe((value) => {
    sorting_asc = value.asc
    sorting_by = value.sortBy
  })

  const userFields = {
    id: '#',
    first_name: 'Имя',
    username: 'Никнейм',
    email: 'E-mail',
    profile_link: 'Профиль',
    pay_status: 'Статус'
  }

</script>


<SearchForm></SearchForm>
<div class="row">
  <div class="col-sm-12">
    <div class="table-responsive">
    <table class="table table-striped table-hover table-bordered dataTable">
      <thead>
      <tr>
        {#each Object.entries(userFields) as [key, value]}
          <UserFields key={key} value={value} onClick={sortBy} sorting_by={sorting_by} sorting_asc={sorting_asc} />
        {/each}
        <th scope="col">Действие</th>
      </tr>
      </thead>
      <tbody>
      <UserList userList="{userList}"></UserList>
      </tbody>
    </table>
    </div>
  </div>
</div>
