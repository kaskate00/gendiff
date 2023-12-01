import renderJSON from 'JSON'
import renderPlain from 'plain'
import renderStylish from 'stylish'

const renders = {
    JSON: renderJSON,
    plain: renderPlain,
    stylish: renderStylish
}

const getRender = (format) => {
    const renderer = renders[format]

    if(!renderer) {
        throw new error ('unknow format: ${format}')
    }
    return renderer
}

export default (format) => getRender(format)