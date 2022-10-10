interface Object {
  /**
   * 将对象转为`JSON格式`
   * @returns
   */
  toJson(): string
}
interface Function {
  /**
   * 获取函数`参数`列表
   * @returns 数组
   */
  getArguments(): Array<string>
}
interface String {
  /**
   * 获取字符串`字节长度`
   * @param charest 字符编码格式(默认:`utf8`, 支持:`utf16`)
   * @returns 字节长度
   */
  byteLength(this: string, charest?: string): number
  /**
   * 重复n次字符串, 并返回一个新的字符串
   * @param n 重复次数
   * @returns 新字符串
   */
  repeat(n: number): string
  /**
   * 截取字符串，并在末尾添加...
   * @param length 截取长度
   * @param truncation 显示结尾
   */
  truncate(length: number, truncation?: string): string
  /**
   * 将字符串首字母大写
   */
  capitalize(): string
  /**
   * 移除字符串中的标签
   * @returns 返回去除标签的字符串
   */
  stripTags(): string
  /**
   * 移除字符串中的脚本内容
   * @returns 返回去除脚本内容的字符串
   */
  stripScript(): string
}
interface Array<T> {
  /**
   * 删除数组中指定位置的元素
   * @param index 删除元素的索引
   * @returns boolean
   */
  removeAt(index: number): boolean
  /**
   * 删除数组中指定元素
   * @param item 指定删除的元素
   * @param key 指定删除的元素的属性
   * @returns boolean
   */
  remove(item: any, key?: string): boolean
  /**
   * 查找数组中`任意对象`的第一个索引
   * @param item 进行索引的对象,包括: `基本类型`, `对象`, `数组`
   * @returns 匹配到第一个位置
   */
  inArray(item: any): number
  /**
   * 对象、数组深度拷贝
   *
   * 适用：基本类型、object、array
   * @returns 新对象
   */
  deepClone(): T[]
  /**
   * 数组去`空`(`null`, `undefined`)
   * @returns 去空后的`新数组`
   */
  compact(): Array<any>
  /**
   * 数组去重
   * @returns 去重后的`新数组`
   */
  unique(): any[]
  /**
   * 获取`对象数组`中指定`key`的`value`并返回一个新数组
   * @param key 获取对象的属性
   * @returns 新的数组
   */
  pluck(key: string): any[]
  /**
   * `排除`数据组中指定的元素
   * @param other 需要`排除`的元素
   * @returns 排除后的`新数组`
   */
  without(other: Array<any>): Array<any>
  /**
   * 将数组中的`对象`进行`分组`
   *
   * @param value 分组条件
   * @returns 分组后的`新对象`
   */
  groupBy(value: any): Object
  /**
   * 对数组进行`排序`
   * @param scope 排序`字段名`
   * @param desc 排序类型, 默认是`升序`
   * @returns 排序后的`新数组`
   */
  sortBy(scope?: string, desc?: boolean): Array<any>
  /**
   * 与另一个数组做`并运算`
   * @param other 做`并运算`的数组
   * @returns 取`并集`后的`新数组`
   */
  union(other: Array<any>): Array<any>
  /**
   * 与另一个数组做`交运算`
   * @param other 做`交运算`的数组
   * @returns 取`交集`后的`新数组`
   */
  intersect(other: Array<any>): Array<any>
  /**
   * 与另一个数组做`差运算`
   * @param other 做`差运算`的数组
   * @returns 取`差集`后的`新数组`
   */
  diff(other: Array<any>): Array<any>
}
interface DateConstructor{
  /**
   * 全局本地语言
   */
  locale: string
}
interface Date {
  /**
   * 本地语言
   */
  locale: string
  /**
  * 设置本地语言
  * @param locale 本地语言
  */
  setLocale(locale: string): Date
  /**
   * 是否为`闰年`
   */
  isLeapYear(): boolean
  /**
   * 当前日期所在`月`的`第一天`
   */
  getFirstDateInMonth(): Date
  /**
   * 当前日期所在`月`的`最后一天`
   */
  getLastDateInMonth(): Date
  /**
   * 当前日期所在`季`的`第一天`
   */
  getFirstDateInQuarter(): Date
  /**
   * 当前日期所在`季`的`最后一天`
   */
  getLastDateInQuarter(): Date
  /**
   * 当前月份的`天数`
   */
  getDaysInMonth(): number
  format(fmt?: string): string
  add(offset: number, unit: unitOfTime.All): Date
  sub(offset: number, unit: unitOfTime.All): Date
}

declare namespace unitOfTime{
  type _base = (
    'year' | 'years' | 'y' |
    'month' | 'months' | 'M' |
    'week' | 'weeks' | 'w' |
    'day' | 'days' | 'd' |
    'hour' | 'hours' | 'h' |
    'minute' | 'minutes' | 'm' |
    'second' | 'seconds' | 's' |
    'millisecond' | 'milliseconds' | 'ms'
  )
  export type All = _base
}
