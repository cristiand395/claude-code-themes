import type { Hook, Register } from 'claude-code'

type Engine = Parameters<Hook<'session.start'>>[0]

import { SCENE } from './scene'
import { DEFAULT_THEME, THEMES } from './themes'

const KEY = 'tema'

function listing(active: string): string {
  const rows = Object.entries(THEMES).map(([name, theme]) => `${name === active ? '●' : '○'} ${name}  (${theme.label})`)

  return ['Temas disponibles:', ...rows, `${active === 'off' ? '●' : '○'} off  (tema normal de la app)`, '', 'Uso: /tema <nombre>'].join('\n')
}

async function apply($: Engine, name: string) {
  if (name === 'off') {
    await $.theme.clear()
    return
  }
  const theme = THEMES[name] ?? THEMES[DEFAULT_THEME]!
  const unpainted = theme.problems.find(line => line.startsWith("Desktop won't paint"))

  if (unpainted !== undefined) {
    $.ui.toast(unpainted)
  }
  const set = await $.theme.set(theme.look)
  $.ui.status(set.isDrawn ? undefined : set.reason)
}

async function current($: Engine): Promise<string> {
  const saved = await $.store.get(KEY)

  return typeof saved === 'string' && (saved === 'off' || saved in THEMES) ? saved : DEFAULT_THEME
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'tema', description: 'Lista los temas o cambia al indicado', argumentHint: '[nombre]', immediate: true })
    // A theme added since the last load becomes the active one, to preview it.
    const seen = await $.store.get('vistos')
    const added = Object.keys(THEMES).filter(name => !(Array.isArray(seen) ? seen : []).includes(name))
    await $.store.set('vistos', Object.keys(THEMES))
    if (added.length > 0) {
      await $.store.set(KEY, added[added.length - 1])
    }
    await apply($, await current($))

    return next(e)
  })

  on('command.run', { command: 'tema' }, async ($, e) => {
    const name = e.args.trim().toLowerCase()

    if (name === '') {
      return { text: listing(await current($)) }
    }
    if (name !== 'off' && !(name in THEMES)) {
      return { text: `No existe el tema "${name}".\n\n${listing(await current($))}` }
    }
    await apply($, name)
    await $.store.set(KEY, name)

    return { text: name === 'off' ? 'Tema normal de la app.' : `Tema: ${THEMES[name]!.label}` }
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="Neon sunset over a scrolling retro grid" />
  })
}
