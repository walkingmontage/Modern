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
HTMLElement.on or NodeList.on or HTMLCollection.off
`
`
M(selector).off(eventName,callback,{context})
or
HTMLElement.off or NodeList.off or HTMLCollection.off
`
#### NodeList & HTMLCollection forEach
`
M(selector).forEach(callback{,context})
or NodeList.forEach
or HTMLCollection.forEach
`
#### append
`
HTMLElement.append(rawHtmlString)
NodeList.append(rawHtmlString)
HTMLCollection.append(rawHtmlString)
`
#### Form
`
form.serialize()  //for x-www-form-urlencoded  and old servers
`