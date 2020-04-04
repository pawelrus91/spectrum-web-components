# To-do:

1 examples/api toggle
3 nice responsive tables
3 "routing" in SW
1 make rel=stylesheet processing nicer
2 meta in the header
1 manage base URL in page and build
4 correct focus ring behavior in sp-tabs
4 reduce use of sp-icons-medium
5 support IE11?

# Building

## Search Index

`scripts/build-search-index.js` builds a Lunr.js search index for the documentation site via the `yarn build-search-index` command. To ensure that the exported JSON file is not placed into the `tsc` build, which add a large overhead to the processing that happens there, the `src` directory have a dummy copy of the file that includes only an empty object and this command places the final search index directly into the `_site` directory. From this location the Rollup build manages the inclusion of the JSON data in the JS bundles in a much more performant manner.

## Copy Docs

### README.md

### Building API Pages

## Typescript

## CSS

`cp src/components/*.css _site/src/components/`

## 11ty

### Templates

### Rollup Files

## Rollup

### PostCSS

### PostHTML

# Watching?

...
