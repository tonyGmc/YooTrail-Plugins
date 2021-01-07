// 把常量数组转换成{name:value}
export function APPFN_SET_NAME_VALUE(arr) {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    obj[item.name] = item.value
  }
  return obj
}
// 把常量数组转换成{value:label}
export function APPFN_SET_VALUE_LABEL(arr) {
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    obj[item.value] = item.label
  }
  return obj
}
/**
 * 菜单级别
 */
export const MENU_LEVEL_ARR = [
  {
    value: '1',
    label: '菜单',
    name: 'MENU'
  },
  {
    value: '2',
    label: '功能',
    name: 'FUN'
  },
  {
    value: '3',
    label: '操作',
    name: 'OPR'
  }
]
export const MENU_LEVEL_ARR_VL = APPFN_SET_VALUE_LABEL(MENU_LEVEL_ARR)

export const FUCE_BELONG_TYPE = [
  {
    value: 1,
    label: '平台',
    name: 'platform'
  },
  {
    value: 2,
    label: '应用',
    name: 'app'
  }
]

// 性别
export const SEX = [
  {
    value: 1,
    label: '男',
    name: 'man'
  },
  {
    value: 2,
    label: '女',
    name: 'woman'
  },
  {
    value: 9,
    label: '未知',
    name: 'unknown'
  }
]
export const SEX_VL = APPFN_SET_VALUE_LABEL(SEX)
export const SEX_NV = APPFN_SET_NAME_VALUE(SEX)

// 数据来源
export const ROLE_DATA_SCOPE = [
  {
    value: 'none',
    label: '无',
    name: 'none'
  },
  {
    value: 'all',
    label: '所有',
    name: 'all'
  },
  {
    value: 'project',
    label: '项目',
    name: 'project'
  },
  {
    value: 'application',
    label: '应用',
    name: 'application'
  },
  {
    value: 'site',
    label: '中心',
    name: 'site'
  }
]
export const ROLE_DATA_SCOPE_VL = APPFN_SET_VALUE_LABEL(ROLE_DATA_SCOPE)
export const ROLE_DATA_SCOPE_NV = APPFN_SET_NAME_VALUE(ROLE_DATA_SCOPE)

// appId
export const APP_ID = {
  CONFIG: '2597020376823234568', // 配置中心
  PLATFORM: '2597019974069387266' // 平台
}

export const ORG_TYPE = [
  {
    value: '0',
    label: '系统运维组织',
    name: 'ADMIN'
  },
  {
    value: '1',
    label: '研究机构',
    name: 'RESEARCH_INSTITUTIONS'
  },
  {
    value: '2',
    label: '伦理委员会',
    name: 'EHTIC'
  },
  {
    value: '3',
    label: '申办方',
    name: 'SPONSOR'
  },
  {
    value: '4',
    label: 'CRO',
    name: 'CRO'
  },
  {
    value: '5',
    label: 'SMO',
    name: 'SMO'
  },
  {
    value: '99',
    label: '研究机构科室',
    name: 'RESEARCH_INSTITUTIONS_DEPARTMENT'
  }
]
// 临床机构单独提出来了，因为用的地方太多了
export const ORG_RESEARCH_INSTITUTIONS = '1'
export const ORG_TYPE_VL = APPFN_SET_VALUE_LABEL(ORG_TYPE)
export const ORG_TYPE_NV = APPFN_SET_NAME_VALUE(ORG_TYPE)

// 中心类型
export const ROLE_TTRIAL_CENTER_TYPEYPE = [
  { value: 0, label: '组织管理员', name: 'orgAdmin' },
  { value: 1, label: '应用管理员', name: 'appAdmin' },
  { value: 2, label: '业务角色', name: 'business' }
]
export const ROLE_TTRIAL_CENTER_TYPEYPE_VL = APPFN_SET_VALUE_LABEL(ROLE_TTRIAL_CENTER_TYPEYPE)
export const ROLE_TTRIAL_CENTER_TYPEYPE_NV = APPFN_SET_NAME_VALUE(ROLE_TTRIAL_CENTER_TYPEYPE)

// 角色类型
export const ROLE_TYPE = [
  { value: 0, label: '组织管理员', name: 'orgAdmin' },
  { value: 1, label: '应用管理员', name: 'appAdmin' },
  { value: 2, label: '业务角色', name: 'business' }
]
export const ROLE_TYPE_VL = APPFN_SET_VALUE_LABEL(ROLE_TYPE)
export const ROLE_TYPE_NV = APPFN_SET_NAME_VALUE(ROLE_TYPE)

// 角色标识
export const ROLE_MARK = [
  { value: 1, label: '机构角色', name: 'orgRole' },
  { value: 2, label: '专业角色', name: 'majorRole' },
  { value: 3, label: '伦理委员会', name: 'ethic' },
  { value: 4, label: 'CRO', name: 'CRO' },
  { value: 5, label: 'SMO', name: 'SMO' },
  { value: 6, label: '申办方', name: 'sponsor' },
  { value: 7, label: '其他', name: 'other' }
]
export const ROLE_MARK_VL = APPFN_SET_VALUE_LABEL(ROLE_MARK)
export const ROLE_MARK_NV = APPFN_SET_NAME_VALUE(ROLE_MARK)
