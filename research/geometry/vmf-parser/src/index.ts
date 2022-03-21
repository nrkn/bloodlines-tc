import { promises } from 'fs'
import { parse } from './parse'

const { readFile } = promises

const start = async () => {
  const vmfText = await readFile( 'sm_pawnshop_1_d.vmf', 'utf8' )

  const parsed = parse( vmfText )

  console.log( JSON.stringify( parsed, null, 2 ) )
}

start().catch( console.error )