// /plugins/logger.ts

function getUniqueStr() {
  let strong: number = 1000
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  )
}

export class Utils {
  splitKeyword(keyword: string): string[] {
    // 全角を半角に変換
    // 空の配列を削除
    // eslint-disable-next-line
    const keywords: string[] = keyword
      .replace(/　/g, ' ')
      .split(' ')
      .filter((item) => item !== '')

    const keywords2: any[] = []
    for (let i = 0; i < keywords.length; i++) {
      const keyword: string = keywords[i]
      const splitTmp = keyword.split(':')
      if (splitTmp.length === 2) {
        keywords2.push({
          label: 'q-' + splitTmp[0].trim(),
          value: splitTmp[1].trim(),
        })
      } else {
        keywords2.push({
          label: 'keyword',
          value: keyword,
        })
      }
    }

    return keywords2
  }

  highlightRelation(xml: string, other: string) {
    const others: string[] = []

    if (!other) {
      return xml
    }

    const terms = other.split('　').join(' ').split(' ')
    for (const term of terms) {
      if (term && !others.includes(term)) {
        others.push(term)
      }
    }

    /*
    const filters = this.filters
    for (const filter of filters) {
      const label = filter.value
      if (!others.includes(label)) {
        others.push(label)
      }
    }
    */

    xml = String(xml).replace(/<[^>]*>?/gm, '')

    const map: any = {}

    for (const other2 of others.sort(function (a, b) {
      return b.length - a.length
    })) {
      const uuid = getUniqueStr()
      map[uuid] =
        '<span style="font-weight: bold; background-color: #FFF59D;">' +
        other2 +
        '</span>'

      xml = xml.split(other2).join(uuid)
    }

    for (const uuid in map) {
      xml = xml.split(uuid).join(map[uuid])
    }

    return xml
  }

  formatArrayValue(arr: string[], delimiter: string = ', '): any {
    if (typeof arr !== 'object') {
      arr = [arr]
    }
    if (arr == null) {
      return ''
    }
    if (arr.length === 1) {
      return arr[0]
    } else {
      const value: string = arr.join(delimiter)
      return value
    }
  }

  getProjectFooter(lang: string) {
    const value =
      lang === 'ja' ? process.env.projectFooterJa : process.env.projectFooterEn
    return value
  }

  getProjectName(lang: string) {
    const value =
      lang === 'ja' ? process.env.projectNameJa : process.env.projectNameEn
    return value
  }

  getProjectDescription(lang: string) {
    const value =
      lang === 'ja'
        ? process.env.projectDescriptionJa
        : process.env.projectDescriptionEn
    return value
  }

  truncate(str: any, length: number): string {
    if (str && str['@id']) {
      return ''
    }
    str = String(str)
    return str.length <= length ? str : str.substring(0, length) + '...'
  }
}

export default (_: any, inject: any) => {
  inject('utils', new Utils())
}
