"use strict";

var Event = require('../event')
var prime = require("prime")

var Key = prime({

    inherits: Event,

    constructor: function(event){
        if (!(this instanceof Key)) return new Key(event.event || event)
        Event.call(this, event)
    },

    keyCode: function(){
        return this.event.which || this.event.keyCode
    },

    key: function(){
        var code = this.keyCode()
        var key = keys[code]
        if (key) return key
        var type = this.type()
        if (type == 'keydown' || type == 'keyup'){
            if (code > 111 && code < 124) return 'f' + (code - 111)
            else if (code > 95 && code < 106) return code - 96
        }
        return String.fromCharCode(code).toLowerCase()
    }

})

var keys = {
    38: 'up', 40: 'down', 37: 'left', 39: 'right',
    27: 'esc', 32: 'space', 8: 'backspace', 9: 'tab',
    46: 'delete', 13: 'enter', 33: 'pageup', 34: 'pagedown',
    35: 'end', 36: 'home'
}

Key.defineKeys = function(_keys){
    for (var k in _keys) keys[k] = _keys[k]
    return this
}

module.exports = Key
