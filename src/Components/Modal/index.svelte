<script>
  import { fade, fly } from "svelte/transition"
  import { quintOut } from "svelte/easing"
  import { storeModal, storeSorting } from "../../Store"
  import Form from "./Form"
  import { addUser, fetchUsers, editUser } from "../../Actions/users"
  import { getFormData } from "../../helpers/forms"

  let open = false
  let editable = false
  let user = null
  let error = false
  export let showBackdrop = true
  export let title = 'Modal title'

  $: onShow = open
  $: if (onShow) {
    error = false
  }

  const modalClose = () => {
    const isOpen = {
      open: false,
      editable: false
    }
    storeModal.update(() => isOpen)
  }

  const modalSave = async (userId=null) => {
    const form = document.getElementById('modal_form')
    const isValidForm = form.checkValidity()
    form.classList.add('was-validated')
    if (isValidForm) {
      const data = getFormData(form)
      let result
      if (userId) {
        result = await editUser(userId, data)
      } else {
        result = await addUser(data)
      }
      if (result['error']) {
        error = result['error']
      } else {
        error = false
        await fetchUsers()
        const sorting = {
          sortBy: null,
          asc:  true
        }
        storeSorting.update(() => sorting)
        modalClose()
      }
    }
  }

  storeModal.subscribe(value => {
    open = value.isOpen
    editable = value.editable
    if (value.user) {
      user = value.user
    } else {
      user = null
    }
  })

</script>

{#if open}
  <div class="modal fade show" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog" in:fly={{ y: -50, duration: 300 }} out:fly={{ y: -50, duration: 300, easing: quintOut }}>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{title}</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" on:click={modalClose}></button>
        </div>
        <div class="modal-body">
          {#if editable}
            <Form user="{user}"></Form>
          {:else}
            <Form></Form>
          {/if}
          {#if error}
            <div class="p-3 mb-2 bg-danger text-white">
              {error}
            </div>
          {/if}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={modalClose}>Отмена</button>
          <button type="button" class="btn btn-primary" on:click={user ? () => modalSave(user.id) : () => modalSave()}>Сохранить</button>
        </div>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" transition:fade={{ duration: 150 }}></div>
  {/if}
{/if}
