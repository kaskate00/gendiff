import fp, { keys } from 'lodash/fp'

const ADDED = 'added'
const DELETED = 'deleted'
const UNCHANGED = 'unchanged'
const UPDATED = 'updated'
const NESTED = 'nested'

const getNodeType = (value,newValue) => {
    if (value instanceof Object && newValue instanceof Object) return NESTED;
    if (value === newValue) return UNCHANGED;
    if (!!value === !newValue) return DELETED;
    if (!value === !!newValue) return ADDED;
return UPDATED
}

const  buildNode = (key,type,value,newValue) => {
    key,
    type,
    value,
    newValue
}

const buildAST = (object, newObject) => {
const buildNodeType = {
    [NESTED]: (key,value,newValue) => buildNode(key,NESTED, buildAST(value, newValue)),
    [UNCHANGED]: (key,value) => buildNode(key,UNCHANGED,value),
    [DELETED]: (key,value) => buildNode(key,DELETED,value),
    [ADDED]: (key,value,newValue) => buildNode(key,ADDED,value,newValue),
    [UPDATED]: (key,value,newValue) => buildNode(key,UPDATED,value,newValue),
} 
const keys = fp.keys(...object,...newObject)

return fp.reduce((arr, key) => {
const value = object[key]
const newValue = newObject[key]
const nodeType = getNodeType(value,newValue)
const node = buildNodeType[nodeType](key,value,newValue)
return [...arr,node]
},[])(keys)
}
export default buildAST