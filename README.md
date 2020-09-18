# Redirect2
**A low dependency, easily deployable URL Shortener.**

## Docker images
- `mattfeng/redirect2:1.0.0`

## Configuration
### Environment variables
|variable|default value|allowed values|description|
|:------:|:-----------:|:------------:|:----------|
|`DB_PATH`|`'/db/shortcuts.db'`|any file path|path to sqlite3 database|
|`DEVELOPMENT`|`false`|`true`/`false`|development mode or not|
|`SECRET_HASH`|(non-literal) `sha512(password)`|any valid sha512 hash|sha512 hash of password for security|
|`PORT`|`'8080'`|any valid port as a string|port used by the application|

## How to use Redirect2 as a custom search engine

Ever notice how a Google search works by placing your query into request that looks like **`www.google.com/search?q=my+search+query`**?

We can use the same technique to make our URL shortener act as a search engine.

1. In Firefox, you can do this by installing the [**Add custom search engine**](https://addons.mozilla.org/en-US/firefox/addon/add-custom-search-engine/) 
addon.
2. After creating your custom search engine with your domain, add the search
engine to `about:preferences#search` under &ldquo;One-Click Search
Engines.&rdquo;
3. Adding a keyword will let you type `[keyword] <space> [shortcut]` to
automatically route to `your.domain.here/[shortcut]`.
