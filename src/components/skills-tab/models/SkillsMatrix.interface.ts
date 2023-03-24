export default interface SkillsMatrix {
    name: string
    subItems?: subItems
    skillsList?: Array<string>
  }
  
  type subItems = {
    [key: string]: { [key: string]: subItems | string | Array<string> }
  }
  