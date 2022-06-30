export const getFormData = (form) => {
  const fields = form.getElementsByClassName('form-field')
  const data = {}
  for (let field of fields) {
    const id = field.id
    if (field.type === 'checkbox') {
      data[id] = field.checked
    } else {
      data[id] = field.value
    }
  }
  return data
}

export const isValidUrl = (urlString) => {
  let urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString)
}