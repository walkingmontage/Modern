## EYES FRONT : Modern JS

***

### Using Modern:

#### Extend
`M.extend({source},{}) //source:default(M)`

#### Document ready:
`document.ready(callback{,flag('start'||'end')})`

#### Selector
`M(selector)  //return NodeList or HTMLElement`

#### Event Listener
`
M(selector).on(eventName,callback,{context})
or
HTMLElement.on or NodeList.on
`
`
M(selector).off(eventName,callback,{context})
or
HTMLElement.off or NodeList.off
`
#### NodeList forEach
`
M(selector).forEach(callback)
or NodeList.forEach
`
#### Form
`
form.serialize()  //for x-www-form-urlencoded  and old servers
`
