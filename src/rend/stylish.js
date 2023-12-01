const renderStylish = (ast, detph = 0) => {

    const indentSize = 2;
    const indent = ' '.repeat(indentSize * depth)

    const stylishRender = (node) => {
        const {type, key, value, newValue, children} = node

        switch(type) {
            case 'added':
                return  `${indent}+ ${key}: ${stringify(newValue, depth + 1)}`
            case 'deleted':
                return `${indent}- ${key}: ${stringify(value, depth + 1)}`
            case 'unchanged':
                return `${indent} ${key}: ${stringify(value, depth + 1)}`
            case 'updated':
                return [
                    `{indent}- ${key}: ${stringify(value, depth + 1)}`,
                    `${indent}+ ${key}: ${stringify(newValue, depth + 1)}`
                ]
            case 'nested':
                return `${indent} ${key}: ${renderStylish(children, depth + 1)}`

            default:
                throw new error ('unknow node type: ${type}')
        }
    }
    const stringifyValue = (value, currentDepth) => {
        if(!(value instanceof Object)) {
            return value
        }
    
    const lines = Object.entries(value)
    .map(([k, v]) => `${' '.repeat((currentDepth + 1) * indentSize)}${k}: ${v}`)

    return `\n${lines.join('\n')}\n${' '.repeat(currentDepth * indentSize)}`
}

    const lines = ast.map(stylishRender)
    return `\n${lines.join('\n')}\n`
    }
export default renderStylish