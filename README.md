# Redirect2
**A low dependency, easily deployable URL Shortener.**

## Docker images
- `mattfeng/redirect2:1.0.0`

## How to use `go` as a custom search engine

Ever notice how a Google search works by placing your query into request that looks like `https://www.google.com/search?q=my+search+query`? We can use the same technique to make our URL shortener act as a search engine.

In Firefox, you can do this by installing the [`Add custom search engine`](https://addons.mozilla.org/en-US/firefox/addon/add-custom-search-engine/) 
extension, and then adding that extension to `about:preferences#search` under
&ldquo;One-Click Search Engines.&rdquo; Additionally, adding a keyword will
let you type `[keyword] <space> [shortcut]` to automatically route to
`your.domain.here/[shortcut]`.
