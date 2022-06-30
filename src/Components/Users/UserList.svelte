<script>
  import {storeModal} from "../../Store";

  export let userList

  const openModal = (user) => {
    const isOpen = {
      isOpen: true,
      editable: true,
      user: user
    }
    storeModal.update(() => isOpen)
  }

</script>

{#if userList['error']}
  <tr>
    <th scope="row" colspan="6">{userList['error']}</th>
  </tr>
{:else}
  {#each userList as user}
    <tr id="{user.id}">
      <th scope="row">{user.id}</th>
      <td>{user.first_name} {user.last_name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        {#if user.profile_link}
          <a href="{user.profile_link}" target="_blank">{user.profile_link}</a>
        {/if}
      </td>
      <td>
        {#if user.pay_status}
          <span>&check;</span>
        {:else}
          <span>&cross;</span>
        {/if}
      </td>
      <td>
        <button type="button" class="btn btn-secondary btn-sm" on:click={()=>openModal(user)}>Редактировать</button>
      </td>
    </tr>
  {:else}
    <tr>
      <th scope="row" colspan="6" class="text-center">Нет данных</th>
    </tr>
  {/each}
{/if}