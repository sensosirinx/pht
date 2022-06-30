import { writable } from 'svelte/store'

export const usersListStore = writable([])

export const storeSorting = writable({
  sortBy: null,
  asc: true
})

export const storeModal = writable({
  isOpen: false,
  editable: false
})