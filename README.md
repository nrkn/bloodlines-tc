# Bloodlines TC

VtM Bloodlines in Doom

## Proof of concept

(todo: screenshot here)

https://github.com/nrkn/sm-vtmb-wad

## Goal

At it's most basic:

1. **Very Short Term Plan** - you can run around outside Santa Monica hub
2. **Short Term Plan** - you can run around outside all the hubs
3. **Mid Term Plan** - you can go inside selected places
4. **Long Term Plan** - there are things to do (via scripting) - or alternately, just keycard/switch/monster puzzles like Doom?

### Music

A placeholder at least - even if just something that fits aesthetically (todo find and add link to reddit comment with youtube links)

Not really my wheelhouse - but we need the music as midi files 

### Monster Sprites

Ideally several different NPCs

At least a generic NPC and/or a cop (todo cop mockup image here) as decoration while you run around

What other sprites are needed depends on what happens with the **Long Term Plan**

### Sound

Not my wheelhouse but sure it can be sorted out

I would like deb of night when you interact with a radio tho

### TC boilerplate

Replacing eg font, title screen, endoom etc 

## Level Building Plan

1. Research - what needs to be figured out
2. Surveying - comprehensive screen shots from Bloodlines for comparison while building
3. Export - from Bloodlines, export and convert geometry, find and extract used textures either via bill of materials from bloodlines map or manually via the survey
4. Building - turning converted geometry blueprint into actual doom level, test and find right scale, fixing, tweaking etc
5. Create Textures - using scale, create various patches, textures etc from exported materials, tweak for doom palette
5. Decorating - texture level, lighting, objects (mix of sprites and doom "geometry" eg raised floor for table) etc
6. NPCs - can we script them to roam and be non hostile unless player fires a weapon?

## Tools

### Bloodlines

- Bloodlines SDK - comes with the Plus Patch
  - Hammer Map Editor
  - Texture Utils

Hammer can export to DXF, an Autocad format - it's pretty crude, just exports a raw list of polyfaces, no info about textures

*Research*: is there a way to get a bill of materials for a level out of Hammer? 

*Research*: can any newer versions of Hammer still open Bloodlines maps? If so might be able to export something better

### Doom

- Ultimate Doom Builder 3.0.0.3925 (2dfe043)
- Slade 3.1.13

Doom Builder supports UDMF, a text format - it's easy to work with if you want to eg generate/import geometry from code

Slade is a lump editor, so we can merge together UDMF text maps, custom graphics etc

## Level geometry

Doom requirements are that any sectors have to have a single floor and ceiling, eg no level over level

Based on some prior work I've done and a bit of research, I think the basic process to convert DXF is that you map the 3D 
polyfaces to 2 sets of 2d polygons - looking from top down, the ceiling, looking from bottom up, the floor

Then take the 2d polygon sets, and create vertices, linedefs, sidedefs and sectors for doom and save to UDMF

We have no texture information - so each wall should have a generated custom texture with it's polyface ID on it:

```
+------+
|      |
| 3102 |
|      |
+------+
```

Then we can use the survey data to figure out the texture for each numbered polyface - bit manual but easiest option if 
we can't get any more useful info out of Hammer.

## Level texturing

All the required textures are included with VtMB and the tools to convert them to eg PNG are included with the SDK

### Palette

The Doom palette doesn't do a terrible job - noticably absent though are the neon blues that are really prevalent in Bloodlines

There is an alternate Doom palette which is a drop in replacement that has improved blues (todo: find and post link)

Another option is to use a custom palette. I had a quick play with sampling a palette from some Bloodlines screenshots (todo: insert image). It had a **lot** of yellow and blue. You can then build a new palette based on the sample - this is a bit of work because unless you organise the custom palette into roughly the same ramps as are used in the Doom palette, you also have to create a custom COLORMAP lump (a lookup table that Doom uses for lighting, it has indices into the palette).

I'm leaning heavily towards just using the improved blue palette, saves work, though a custom palette would be fun to make

However you manage the palette, all textures, sprites etc have to be converted to this palette 

If you do it automatically, some will look great but most will come out entirely/mostly grayscale - the absolute best way is to convert them one at a time manually, but it's time consuming

I have some ideas for tools to help speed this up

## Level decoration

todo

## Hub traversal

todo

## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>
