import { routing } from './routing'

const loaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  de: () => import('../../messages/de/index'),
  en: () => import('../../messages/en/index'),
}

export async function loadMessages(locale: string) {
  const load = loaders[locale] ?? loaders[routing.defaultLocale]
  const mod = await load()
  return mod.default
}
