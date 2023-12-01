import ini from 'ini'
import  yaml from 'js-yaml'

const parseIni = (data) => ini.parse(data)
const  parseYaml = (data) => yaml.load(data)
const parseJSON = (data) => JSON.parse(data)

export default{parseIni,parseYaml,parseJSON}