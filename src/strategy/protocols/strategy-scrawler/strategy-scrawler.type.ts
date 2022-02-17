export interface ScrawlerData {
  pool: string
  apy: number
  tvl: number | string
}

interface PreAction {
  type: 'click'
  element: string
  description?: string
}

interface Apy {
  type: string
  element: string
}

interface Action {
  root: string
  filter?: string
  container?: string
  pool: string
  apy: string | Apy[]
  tvl: string
}

export interface ScralerConfig {
  url: string
  preActions?: PreAction[]
  action: Action
}

export interface StrategyScrawlerConfig {
  [protocol: string]: ScralerConfig
}
