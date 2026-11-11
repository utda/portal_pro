/**
 * `npm audit` の結果を判定する。high 以上があれば失敗する。
 *
 * `npm audit --audit-level=high` をそのまま使わないのは、直せない既知の件で
 * CI が止まり続け、そのうち誰も見なくなるため。除外する場合は下の ALLOW に
 * 理由と期限を書いて残す。期限を過ぎたら、除外していても失敗させる。
 * 「なぜ放置しているのか」と「いつ見直すのか」が、常にこのファイルに残る。
 *
 * このリポジトリは Nuxt 2 のままで、Nuxt 2 自身が固定する古いビルドチェーン由来の
 * 報告が残る。下の BASELINE に「今この時点で出ているもの」を記録し、
 * **それ以外が新しく出たときだけ落とす**形にした。
 * 「気づかないまま新しい脆弱性が増える」ことは防げる。
 *
 * 使い方: node scripts/audit.mjs
 */
import { execFileSync } from 'node:child_process'

/**
 * 個別の除外。BASELINE より優先度が高い扱いではなく、単に「後から個別の判断で
 * 外したもの」を置く場所。
 * @type {{ id: string, package: string, until: string, reason: string }[]}
 */
const ALLOW = []

/**
 * Nuxt 2 本体が固定する依存に由来する high 以上の advisory を記録したもの。
 *
 * なぜまとめて外すのか:
 *
 * - このサイトは Nuxt 2 (2.18.x) で、Nuxt 2 は 2023-12-31 に EOL になっている。
 *   webpack 4 / postcss 7 / vuetify 2 という古いビルドチェーンを Nuxt 2 やそのモジュールが
 *   固定しているため、overrides で引き上げられるもの (tar, axios, follow-redirects,
 *   js-yaml, moment, semver, serialize-javascript, tmp, http-proxy-middleware など) を
 *   すべて引き上げた後も、以下は残る。
 * - 公開しているのは `npm run generate` が出す静的 HTML を GitHub Pages に
 *   置いたものだけで、サーバは動いていない。webpack-dev-middleware・postcss・braces・
 *   micromatch・ip・parse-git-config などのビルド時 / 開発サーバ専用のものは、
 *   公開物には含まれない。
 * - vuetify 2 などはブラウザ側に載るが、解消するには Nuxt 3 以降への移行が要る。
 *
 * したがって until はこの baseline 全体の見直し期限であり、
 * **2026-12-08 までに Nuxt 3 以降へ移行するかどうかを決める**、という意味になる。
 * 決めないまま日付を越えると、この CI は落ちる。
 */
const BASELINE = {
  until: '2026-12-08',
  ids: [
    'GHSA-2p57-rm9w-gvfp', // ip (high)
    'GHSA-33hq-fvwr-56pm', // devalue (low)
    'GHSA-3jp5-5f8r-q2wg', // vuetify (high)
    'GHSA-4q55-j62x-fr9h', // devalue (moderate)
    'GHSA-6g55-p6wh-862q', // postcss (high)
    'GHSA-737v-mqg7-c878', // defu (high)
    'GHSA-7fh5-64p2-3v2j', // postcss (moderate)
    'GHSA-8g77-54rh-46hx', // parse-git-config (high)
    'GHSA-8qm3-746x-r74r', // devalue (low)
    'GHSA-952p-6rrq-rcjv', // micromatch (moderate)
    'GHSA-9rgm-9g3h-6x36', // devalue (moderate)
    'GHSA-9w3x-85mw-4fwm', // vuetify (moderate)
    'GHSA-cfw5-2vxh-hr84', // devalue (moderate)
    'GHSA-fxqj-rqcc-2cmp', // postcss (moderate)
    'GHSA-g84c-rxfj-3j2c', // webpack-dev-middleware (high)
    'GHSA-grv7-fg5c-xmjg', // braces (high)
    'GHSA-hx4r-w6wj-j8fg', // devalue (moderate)
    'GHSA-jjm6-p2m9-9w4x', // nuxt (low)
    'GHSA-m3q2-p4fw-w38m', // nuxt (low)
    'GHSA-mcm9-63f2-9j32', // devalue (high)
    'GHSA-qx2v-qp2m-jg93', // postcss (moderate)
    'GHSA-r28c-9q8g-f849', // postcss (high)
    'GHSA-r9w8-h9r3-54w4', // devalue (high)
    'GHSA-vf6r-87q4-2vjf', // nuxt (moderate)
    'GHSA-vj54-72f3-p5jv', // devalue (high)
    'GHSA-wf3x-273g-mvxv', // devalue (low)
  ],
}

function audit() {
  try {
    return JSON.parse(
      execFileSync('npm', ['audit', '--json'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    )
  } catch (error) {
    // 脆弱性があると npm audit は終了コード 1 を返す。出力は標準出力に出ている。
    if (error.stdout) return JSON.parse(error.stdout)
    throw error
  }
}

const today = new Date().toISOString().slice(0, 10)
const report = audit()
const baselineActive = BASELINE.until >= today
const serious = []
const seenInBaseline = new Set()

for (const [name, entry] of Object.entries(report.vulnerabilities ?? {})) {
  if (entry.severity !== 'high' && entry.severity !== 'critical') continue
  for (const via of entry.via) {
    if (typeof via !== 'object') continue
    const id = via.url?.split('/').pop() ?? via.source
    const allowed = ALLOW.find((a) => a.id === id)
    if (allowed && allowed.until >= today) continue
    if (BASELINE.ids.includes(id)) {
      seenInBaseline.add(id)
      if (baselineActive) continue
    }
    serious.push({
      name,
      severity: entry.severity,
      title: via.title,
      url: via.url,
      expired: allowed ? allowed.until : BASELINE.ids.includes(id) ? BASELINE.until : null,
    })
  }
}

for (const a of ALLOW) {
  if (a.until < today) {
    console.error(`除外の期限切れ: ${a.package} (${a.id}) の期限 ${a.until} を過ぎています。見直してください。`)
  }
}
if (!baselineActive) {
  console.error(`BASELINE の期限 ${BASELINE.until} を過ぎています。Nuxt 3 への移行の可否を決めてください。`)
}

if (serious.length === 0) {
  console.log(
    `high 以上の新規の脆弱性なし (BASELINE ${seenInBaseline.size}/${BASELINE.ids.length} 件が該当、期限 ${BASELINE.until})`
  )
  // baseline に載っているのに、もう出てこなくなったものは掃除してよい。
  const gone = BASELINE.ids.filter((id) => !seenInBaseline.has(id))
  if (gone.length > 0) {
    console.log(`  もう出なくなった BASELINE の項目が ${gone.length} 件あります。削って構いません:`)
    for (const id of gone) console.log(`    ${id}`)
  }
  process.exit(0)
}

console.error(`BASELINE に無い high 以上の脆弱性が ${serious.length} 件あります:`)
for (const s of serious) {
  const note = s.expired ? ` [除外の期限 ${s.expired} 切れ]` : ''
  console.error(`  ${s.severity.padEnd(8)} ${s.name}: ${s.title}${note}`)
  console.error(`           ${s.url}`)
}
process.exit(1)
