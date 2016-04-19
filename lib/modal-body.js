var $ = window.$

module.exports = ModalBody

function ModalBody (target, parent) {
  if (!(this instanceof ModalBody)) {
    return new ModalBody(target, parent)
  }
  this.target = target
  this.parent = parent
}

ModalBody.prototype.fillModal = function (msg, id, gistID, onclick) {
  this.target.innerHTML += `<button id="button-${id}" type="button" class="list-group-item">${msg}</button>`
  setTimeout(function () {
    $(`#button-${id}`).click(function () {
      return onclick(gistID, function () {
        window.location.href = '/?gist=' + gistID
      })
    })
  })
}

ModalBody.prototype.createForm = function (name) {
  name = name || ''
  this.target.innerHTML = `<div class="form-container"><div>Name: </div><input id="name" type="text" placeholder="" value="${name}" class="form-control" /><div>`
  $(this.parent).on('shown.bs.modal', function () {
    $('#name').focus()
  })
}

ModalBody.prototype.clear = function () {
  this.target.innerHTML = ''
}
