import {parseIni,parseYaml,parseJSON} from 'parsers.js'
import readFileSync  from 'fs'
import {extname} from 'path'
import  buildAST from 'ast'
import render from 'rend'
const parse = (data, format) => {
    switch (format) {
        case 'JSON':
          return parseJSON(data);
        case 'yaml':
          return parseYaml(data);
        case 'ini':
          return parseIni(data);
        default:
          throw new Error(`Unknown format: ${format}`);
      }
}

const genDiff = (path1,path2, format = 'stylish') => {
    const data1 = readFileSync(path1, 'utf-8')
    const data2 = readFileSync(path2, 'utf-8')
    const ext1 = extname(path1).slice(1)
    const ext2 = extname(path2).slice(1)

    const obj1 = parse(data1,ext1)
    const obj2 = parse(data2,ext2)

    const ast = buildAST(obj1,obj2)
    return render(format)(ast)
}

export default genDiff()