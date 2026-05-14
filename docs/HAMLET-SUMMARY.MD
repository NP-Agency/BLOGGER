# Hamlet Builder

Hamlet Builder is a modern compiler for building Blogger templates that simplifies theme development by leveraging Handlebars templating, Rollup for JavaScript bundling, and PostCSS for CSS processing. It provides a streamlined workflow for compiling XML, HBS, SCSS, SASS, CSS, and JavaScript files into production-ready Blogger templates with automatic minification using LightningCSS and Terser.

The compiler includes built-in partials (prefixed with `super.`) for common Blogger functionality like meta tags, images, menus, and AdSense integration. It auto-generates widget IDs, normalizes spacing in Blogger tags, and adds required root attributes to the HTML element. Configuration is flexible through multiple config file formats for Rollup, PostCSS, Handlebars helpers, and theme data.

## CLI Commands

### Build Command

Execute a one-time build of your Blogger template, compiling all source files to the output directory.

```bash
# Basic production build
hamlet --mode production

# Build with custom input/output paths
hamlet --input ./theme --output ./build --mode production

# Development build without minification
hamlet --mode development --no-minify
```

### Watch Command

Monitor source files for changes and automatically rebuild when modifications are detected.

```bash
# Watch with development mode
hamlet --mode development --watch

# Watch in production mode with custom paths
hamlet -i ./src -o ./dist -m production -w

# Watch without CSS minification
hamlet --watch --no-minify-css
```

## Configuration Files

### Theme Configuration

Define theme metadata that becomes available as Handlebars template context variables.

```json
// .themerc.json or theme.config.json
{
  "name": "My Awesome Theme",
  "author": "Your Name",
  "version": "1.0.0",
  "description": "A modern Blogger theme",
  "customVar": "Available in templates as {{customVar}}"
}
```

### Rollup Configuration

Customize JavaScript bundling with custom Rollup plugins.

```javascript
// rollup.config.js or .rolluprc.js
import terser from "@rollup/plugin-terser"
import resolve from "@rollup/plugin-node-resolve"

export default {
  plugins: [
    resolve(),
    terser({
      compress: { drop_console: true }
    })
  ]
}
```

### PostCSS Configuration

Configure CSS processing with custom PostCSS plugins.

```javascript
// postcss.config.js or .postcssrc.js
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import tailwindcss from "tailwindcss"

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    cssnano({ preset: 'default' })
  ]
}
```

### Handlebars Configuration

Register custom helpers for use in templates.

```javascript
// handlebars.config.js or .handlebarsrc.js
const formatDate = (date, format) => {
  return new Date(date).toLocaleDateString('en-US', { dateStyle: format })
}

const uppercase = (str) => str.toUpperCase()

export default {
  helpers: {
    formatDate,
    uppercase
  }
}
```

## Template Helpers

### asset Helper

Include external file contents directly in your template during compilation.

```handlebars
<!-- Include compiled CSS inline -->
<style>
{{asset "dist/css/main.css"}}
</style>

<!-- Include compiled JavaScript inline -->
<script>
{{asset "dist/js/main.js"}}
</script>

<!-- Include from node_modules using ~ prefix -->
<style>
{{asset "~/normalize.css/normalize.css"}}
</style>
```

### currentYear Helper

Insert the current year dynamically during build time.

```handlebars
<!-- Footer copyright -->
<footer>
  <p>&copy; {{currentYear}} My Blog. All rights reserved.</p>
</footer>

<!-- Output: <p>&copy; 2025 My Blog. All rights reserved.</p> -->
```

## Template Partials

### File-Based Partials

Create reusable template fragments by prefixing filenames with underscore.

```handlebars
<!-- src/_header.hbs -->
<header class="site-header">
  <h1>{{name}}</h1>
  <nav>{{> navigation}}</nav>
</header>

<!-- src/_navigation.hbs -->
<ul class="nav-list">
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
</ul>

<!-- src/main.hbs - Include partials -->
<html>
<head>
  {{> super.meta}}
</head>
<body>
  {{> header}}
  <main>
    <b:section id='main'>
      <b:widget type='Blog'/>
    </b:section>
  </main>
</body>
</html>
```

### Folder Partials

Include all partials from a folder at once using the `folder.` prefix.

```handlebars
<!-- Automatically includes all partials in the 'components' folder -->
{{> folder.components}}

<!-- Structure example:
src/
  components/
    _button.hbs
    _card.hbs
    _modal.hbs
-->
```

## Super Partials

### @meta Partial

Generate comprehensive header metadata including favicons, Open Graph, and Twitter cards.

```xml
<head>
  <!-- Basic meta with defaults -->
  <b:include name='@meta'/>

  <!-- With custom configuration -->
  <b:include name='@meta' data='{
    favicon: "https://example.com/favicon.png",
    favSizes: [32, 64, 128, 256],
    cardType: "summary",
    forceHttps: true,
    robots: "index,follow",
    ogImage: "https://example.com/default-og.jpg"
  }'/>
</head>
```

### @image Partial

Create responsive image tags with automatic resizing and srcset generation.

```xml
<!-- Basic image -->
<b:include name='@image' data='{ src: data:post.featuredImage }'/>

<!-- Full featured image with all options -->
<b:include name='@image' data='{
  src: data:post.featuredImage,
  alt: data:post.title,
  class: "post-thumbnail",
  resize: 800,
  ratio: "16:9",
  loading: "lazy",
  srcset: [400, 800, 1200],
  sizes: "(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
}'/>
```

### @picture Partial

Generate picture elements with multiple source sizes for art direction.

```xml
<!-- Basic picture element -->
<b:include name='@picture' data='{ src: data:view.featuredImage }'/>

<!-- Custom breakpoints -->
<b:include name='@picture' data='{
  src: data:post.featuredImage,
  resizeSet: [1200, 800, 400],
  alt: data:post.title,
  class: "hero-image",
  ratio: "16:9",
  loading: "lazy"
}'/>
```

### @avatar Partial

Generate user avatar images with fallback to default avatar.

```xml
<!-- Basic avatar -->
<b:include name='@avatar' data='{ src: data:post.author.authorPhoto.image }'/>

<!-- Custom avatar with options -->
<b:include name='@avatar' data='{
  src: data:comment.author.avatar.image,
  default: "https://example.com/default-avatar.png",
  resize: 64,
  alt: data:comment.author.name,
  class: "comment-avatar",
  loading: "lazy"
}'/>
```

### @snippet Partial

Create truncated text blocks with customizable length and ellipsis.

```xml
<!-- Basic snippet -->
<b:include name='@snippet' data='{ string: data:post.snippets.long }'/>

<!-- Custom snippet configuration -->
<b:include name='@snippet' data='{
  string: data:post.body,
  tag: "div",
  class: "post-excerpt",
  id: "excerpt-1",
  length: 150,
  ellipsis: " [...]"
}'/>
```

### @menu Partial

Create navigation menus from PageList widget link arrays with dropdown support.

```xml
<!-- Basic menu -->
<b:include name='@menu' data='{ links: data:links }'/>

<!-- Styled menu with custom prefix for submenus -->
<b:include name='@menu' data='{
  links: data:links,
  prefix: ">>",
  class: "main-navigation",
  id: "primary-nav"
}'/>

<!-- Link format for dropdowns (in PageList widget):
  Home          -> Regular link
  About         -> Parent (next item has prefix)
  __Team        -> Submenu item (has prefix)
  __Contact     -> Submenu item (has prefix)
  Blog          -> Regular link (no prefix = ends submenu)
-->
```

### @kind Partial

Add CSS classes to body based on current page view type.

```xml
<body>
  <b:include name='@kind'/>
  <!-- Adds classes like: is-home, is-post, is-page, is-archive, is-label, is-search, is-error, is-preview -->
  <!-- For single posts/pages: is-single single-id-123456789 -->
</body>
```

### @ads Partial

Insert Google AdSense advertisement blocks.

```xml
<!-- Auto-format ad -->
<b:include name='@ads' data='{ slot: "1234567890" }'/>

<!-- In-feed ad -->
<b:include name='@ads' data='{
  slot: "1234567890",
  layout: "in-feed",
  style: "display: block; text-align: center"
}'/>

<!-- In-article ad -->
<b:include name='@ads' data='{
  slot: "1234567890",
  layout: "in-article"
}'/>
```

### @adsense Partial

Include the AdSense async script in document head.

```xml
<head>
  <b:include name='@adsense'/>
</head>
```

### @attr Partial

Add or remove multiple HTML attributes in a single include.

```xml
<!-- Add multiple attributes -->
<div>
  <b:include name='@attr' data='{["id","container"],["class","wrapper"],["data-theme","dark"]}'/>
</div>

<!-- Remove attribute by omitting second value -->
<div>
  <b:include name='@attr' data='{["disabled"]}'/>
</div>
```

### @defaultmarkups Partial

Override Blogger's auto-generated widget inclusions to prevent conflicts.

```xml
<b:defaultmarkups>
  {{> super.defaultmarkups}}
</b:defaultmarkups>
```

## Blogger XML Enhancements

### Auto Root Attributes

The HTML root tag automatically receives required Blogger attributes.

```xml
<!-- Input -->
<html class='custom-class'>

<!-- Output -->
<html class='custom-class' b:css='false' b:js='false' b:defaultwidgetversion='2' b:layoutsVersion='3' expr:dir='data:blog.languageDirection' expr:lang='data:blog.locale'>
```

### Auto Widget Attributes

Widget tags are automatically completed with required id, type, and version attributes.

```xml
<!-- Input -->
<b:widget/>
<b:widget type='PopularPosts'/>
<b:widget type='Label'/>
<b:widget type='Label'/>

<!-- Output -->
<b:widget id='HTML1' type='HTML' version='2'/>
<b:widget id='PopularPosts1' type='PopularPosts' version='2'/>
<b:widget id='Label1' type='Label' version='2'/>
<b:widget id='Label2' type='Label' version='2'/>
```

### Auto Variable Attributes

Variable elements are automatically completed with description and type attributes.

```xml
<!-- Input -->
<Variable name="primaryColor"/>
<Variable name="showSidebar" value="true"/>

<!-- Output -->
<Variable name='primaryColor' description='primaryColor' type='string'/>
<Variable name='showSidebar' description='showSidebar' type='string' value='true'/>
```

### Normalized Spacing

Multi-line Blogger tag attributes are automatically normalized to single lines.

```xml
<!-- Input (readable multi-line) -->
<b:include name='@image' data='{
  src: data:sourceUrl,
  resize: (data:shrinkToFit
    ? 500
    : 1280)
}'/>

<!-- Output (normalized) -->
<b:include name='@image' data='{ src: data:sourceUrl, resize: (data:shrinkToFit ? 500 : 1280) }'/>
```

## Project Structure

### Recommended File Organization

Structure your Blogger theme project for optimal compilation.

```
my-theme/
├── src/
│   ├── main.hbs              # Main template (compiles to main.xml)
│   ├── _header.hbs           # Partial (underscore prefix)
│   ├── _footer.hbs           # Partial
│   ├── _sidebar.hbs          # Partial
│   ├── widgets/
│   │   ├── _blog-post.hbs    # Widget partial
│   │   └── _popular.hbs      # Widget partial
│   ├── scss/
│   │   ├── main.scss         # Main stylesheet (compiles to main.css)
│   │   ├── _variables.scss   # Partial (not compiled directly)
│   │   └── _components.scss  # Partial
│   └── js/
│       ├── main.bundle.js    # Main script (compiles to main.js)
│       └── utils.js          # Module (imported by bundle)
├── dist/                     # Output directory (auto-created)
│   ├── main.xml
│   ├── css/
│   │   ├── main.css
│   │   └── main.min.css
│   └── js/
│       ├── main.js
│       └── main.min.js
├── package.json
└── .themerc.json
```

### Package.json Scripts

Configure npm scripts for common development workflows.

```json
{
  "name": "my-blogger-theme",
  "version": "1.0.0",
  "scripts": {
    "dev": "hamlet --mode development --watch",
    "start": "hamlet --mode production --watch",
    "build": "hamlet --mode production",
    "build:dev": "hamlet --mode development"
  },
  "devDependencies": {
    "hamlet-builder": "^1.0.46"
  },
  "theme": {
    "name": "My Theme",
    "author": "Your Name",
    "version": "1.0.0"
  },
  "browserslist": [
    ">= 1%",
    "last 2 major versions",
    "not dead"
  ]
}
```

## Summary

Hamlet Builder streamlines Blogger theme development by providing a comprehensive build system that handles Handlebars templating, SCSS/CSS processing with PostCSS, and JavaScript bundling with Rollup. The built-in super partials (`@meta`, `@image`, `@picture`, `@avatar`, `@snippet`, `@menu`, `@kind`, `@ads`, `@adsense`, `@attr`, `@defaultmarkups`) eliminate boilerplate code and provide optimized implementations for common Blogger functionality like SEO meta tags, responsive images, navigation menus, and AdSense integration.

Integration is straightforward: install via npm, create your theme files in the `src` directory using Handlebars syntax with Blogger XML, and run the build command. The compiler automatically handles partial registration (underscore-prefixed files), widget ID generation, attribute normalization, and optional minification. For continuous development, use watch mode to automatically rebuild on file changes. Configuration is flexible through standard config files for Rollup, PostCSS, Handlebars helpers, and theme data, allowing seamless integration with existing toolchains and custom plugins.