var $ = window.$

var consoleEl = document.getElementById('console')
var button = document.getElementById('console-button')
var toolbar = document.getElementById('console-toolbar')
var container = document.getElementById('console-container')
var counter = $('#counter-container > #counter')
var counterContainer = $('#counter-container')

var styles = {
  log: {
    color: 'black'
  },
  error: {
    color: 'red'
  },
  warn: {
    color: 'yellow'
  }
}

module.exports = Console

function Console (element) {
  this.element = element || consoleEl
  gatherConsole.call(this)
  $(counter).data('value', 0)
  $(button).click(function (e) {
    e.stopPropagation()
    e.preventDefault()
    this.clear()
  }.bind(this))

  $(toolbar).click(function (e) {
    e.preventDefault()
    $(container).toggleClass('minimize')
    $(counter).data('value', 0)
  })

  $(counter).bind('setData', function (e, key, value) {
    if (value > 0 && $(container).hasClass('minimize')) {
      $(counterContainer).addClass('show')
      $(this).text(value)
    } else {
      $(counterContainer).removeClass('show')
    }
  })
}

Console.prototype.addMessage = function (msg) {
  this.element.innerHTML += `<div style="${objectToString(styles[msg.data.type])}">${msg.data.data}</div>`
  this.element.scrollTop = this.element.scrollHeight
  $(counter).data('value', $(counter).data().value + 1)
}

Console.prototype.clear = function () {
  this.element.innerHTML = ''
  $(counter).data('value', 0)
}

function objectToString (obj) {
  var str = ''
  for (var key in obj) {
    str += `${key}: ${obj[key]};`
  }
  return str
}

function gatherConsole () {
  var that = this
  window.console = {
    log: function (msg) { that.addMessage({data: {type: 'log', data: maybeStringify(msg)}}) },
    warn: function (msg) { that.addMessage({data: {type: 'warn', data: maybeStringify(msg)}}) },
    error: function (err) {
      if (err) {
        if (typeof err === 'string') err = err.split(' at ')[0]
        that.addMessage({data: {type: 'error', data: maybeStringify(err.message || err)}})
      }
    }
  }

  window.onerror = function (error, url, line, column, errObj) {
    var re = /(\d+(?=:))/gi
    if (re.test(error)) {
      error = error.replace(re, function (match) { return match - 3 })
    }
    console.error(error)
  }

  function maybeStringify (msg) {
    return typeof msg === 'object' ? JSON.stringify(msg) : msg
  }
}
