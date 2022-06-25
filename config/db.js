import path from 'path'
import { LowSync, JSONFileSync } from 'lowdb'

import { fighters } from './fighters.js'

const dbPath = `${path.resolve()}/database.json`

const adapter = new JSONFileSync(dbPath)

let dbAdapter = new LowSync(adapter)

dbAdapter.read()

dbAdapter.data ||= {
  users: [],
  fighters: [],
  fights: [],
}

if (!dbAdapter.data.fighters.length) {
  dbAdapter.data.fighters.push(...fighters)
}

dbAdapter.write()

export default dbAdapter
