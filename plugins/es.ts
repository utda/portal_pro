// /plugins/logger.ts

function getUniqueStr() {
  let strong: number = 1000
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  )
}

export class es {
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

  getAggs(facetMap: any) {
    const aggs: any = {}
    for (let key in facetMap) {
      aggs[key] = {
        terms: {
          field: `${key}.keyword`,
        },
      }
    }
    return aggs
  }

  createQuery(routeQuery: any, confOfFulltext: any) {
    let q: any = {}

    if (routeQuery.sort) {
      const spl = routeQuery.sort.split(':')
      const sort: any = {}
      let sortKey = spl[0]
      if (sortKey !== '_score') {
        sortKey += '.keyword'
      }
      sort[sortKey] = { order: spl[1] }
      q.sort = [sort]
    }

    const page = Number(routeQuery.page /*['main[page]']*/) || 1
    const size = Number(routeQuery['size']) || 24 //要検討

    q.size = size

    q.from = size * (page - 1)

    // キーワード

    let keyword = routeQuery.keyword /*['main[query]']*/ || ''
    if (keyword) {
      q.keyword = keyword
    }

    // fc
    for (let key in routeQuery) {
      if (key.includes('fc-')) {
        q[key] = routeQuery[key]
      }
    }

    q = routeQuery

    return this.createQueryString(q)
  }

  createQueryString(query: any) {
    let us = []
    for (let key in query) {
      let values = query[key]
      if (typeof values !== 'object') {
        values = [values]
      }

      for (let value of values) {
        us.push(key + '=' + value)
      }
    }

    return us.join('&')
  }

  //削除予定
  getQuery(param: any, confOfFulltext: any) {
    const query: any = {}

    // 全文
    const must: any[] = []

    let q = param['main[query]'] || ''
    if (q) {
      const terms = q.split('　').join(' ').split(' ')

      const qShould: any[] = []
      for (const term of terms) {
        for (const field of confOfFulltext) {
          const match: any = {}
          match[field] = {
            query: term,
          }
          qShould.push({ match_phrase: match })
        }
      }
      must.push({
        bool: {
          should: qShould,
        },
      })
    }

    const filter: any[] = []

    for (const queryField in param) {
      if (queryField.includes('[refinementList]')) {
        const facetField = queryField.split('[')[2].split(']')[0]
        let values = param[queryField]
        if (typeof values === 'string') {
          values = [values]
        }

        const should: any[] = []
        for (const v of values) {
          //console.log({ facetField, v })

          const term: any = {}
          should.push({ term })
          term[`${facetField}.keyword`] = v
        }

        filter.push({
          bool: { should },
        })
      }
    }

    /*
    query.bool = {
      filter: [
        {
          bool: {
            should: [
              {
                term: {
                  '市町村コード.keyword': '24204',
                },
              },
            ],
          },
        },
      ],
    }
    */

    query.bool = {
      filter,
      must,
    }

    return query
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
}

export default (_: any, inject: any) => {
  inject('es', new es())
}
