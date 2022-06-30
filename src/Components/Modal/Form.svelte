<script>
  export let user = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    profile_link: '',
    pay_status: false
  }
</script>

<form id="modal_form" class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="first_name" class="form-label">Имя</label>
    <input type="text" class="form-control form-field" id="first_name" value="{user.first_name}" required>
  </div>
  <div class="mb-3">
    <label for="last_name" class="form-label">Фамилия</label>
    <input type="text" class="form-control form-field" id="last_name" value="{user.last_name}" required>
  </div>
  <div class="mb-3">
    <label for="username" class="form-label">Никнейм</label>
    <input type="text" class="form-control form-field" id="username" value="{user.username}" required>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control form-field" id="email" value="{user.email}" required>
  </div>
  <div class="mb-3">
    <label for="profile_link" class="form-label">Ссылка на профиль</label>
    <input type="text" class="form-control form-field" id="profile_link" value="{user.profile_link}">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input form-field" id="pay_status" value="1" checked={(user.pay_status) ? 'checked' : ''}>
    <label class="form-check-label" for="pay_status">Оплата выполнена</label>
  </div>
</form>