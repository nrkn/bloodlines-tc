import { promises } from 'fs'
import { parse } from './parse'
import { Vmf } from './vmf-schema'

const { readFile } = promises

const start = async () => {
  const vmfText = await readFile( 'sm_pawnshop_1_d.vmf', 'utf8' )

  const parsed: Vmf = parse( vmfText )

  type Tuple3<T = number> = [ T, T, T ]
  type Triangle = Tuple3<Tuple3>

  type OutSide = {
    id: number
    triangle: Triangle
    material: string
    rotation: number
    lightmapscale: number
  }

  type OutSolid = {
    id: number
    side: OutSide[]
    color: Tuple3
  }

  const solids: OutSolid[] = []

  const parseTriangle = ( t: string ) => {
    let [ a, b, c ] = t.split( ') (')

    a = a.replace( '(', '' )
    c = c.replace( ')', '' )

    const A = a.split( ' ' ).map( s => Number( s ) ) as Tuple3
    const B = a.split( ' ' ).map( s => Number( s ) ) as Tuple3
    const C = a.split( ' ' ).map( s => Number( s ) ) as Tuple3

    const tri: Triangle = [ A, B, C ]

    return tri
  }

  for( const s of parsed.world.solid ){
    const outSolid: OutSolid = {
      id: s.id,
      side: [],
      color: s.editor.color.split( ' ' ).map( s => Number( s ) ) as Tuple3
    }

    for( const ss of s.side ){
      if( ss.material.startsWith('TOOLS')) continue

      const outSide: OutSide = {
        id: ss.id,
        triangle: parseTriangle( ss.plane ),
        material: ss.material,
        rotation: ss.rotation,
        lightmapscale: ss.lightmapscale
      }

      outSolid.side.push( outSide )
    }

    solids.push( outSolid )
  }
  
  console.log( JSON.stringify( solids, null, 2 ) )

  //console.log( JSON.stringify( parsed, null, 2 ) )
}

start().catch( console.error )