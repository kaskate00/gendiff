const renderPlain = (ast, parentKey = '') => {

    const stringifyValue = (value) =>  {
    if (value instanceof Object) {
        return '[complex value]'
    }
    }

    const plainRender = (node, path) => {
    const {type, key, value, newValue, children} = node

    const currentPath = parentKey ? `${parentKey}`: key
    const propertyPath =  path ? `${path}`: key

        switch(type) {

            case 'added':
                return `Property ${currentPath} was  added with value: ${stringifyValue(newValue)}`

            case 'deleted':
                return `Property ${currentPath} was deleted `

            case 'updated':
                return `Property ${currentPath} was updated from ${stringifyValue(value)} to ${stringifyValue(newValue)}`

            case  'nested':
                return renderPlain(children, propertyPath)

            default:
                return null
        }
}
return ast.map((node) => plainRender(node)).filter((line) => line !== null).join('\n')
}
export default renderPlain