# vmf-flattener

1. read the vmf json
2. for each plane:
     convert points v3 to v2 and add to set, extrapolate other corner
     classify:
      orientation (up = floor, down = ceil, horizontal = wall, else = slope)
     add data about planes etc to a record of key v2 to value data
3. generate 2d polygons, graph
4. doom vertices from 2d set
5. use polygon graph to generate edges eg linedefs and sidedefs
6. use min/max z to determine sectors
