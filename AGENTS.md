# Agent Context: Blogger Theme Development

This document serves as the primary system prompt and context for any LLM agent working on this project.

## Workflow Summary
We are building a custom Blogger theme using **Hamlet Builder**, integrating visual designs crafted via **PencilMCP**, and automating content publication via **Google AppScript**. 

1. **Design in Pencil**: Visual layouts are created in `.pen` files.
2. **Convert to Code via PencilMCP**: Agents use PencilMCP to read `.pen` files and convert them into **Tailwind CSS** HTML structures and Handlebars XML for Hamlet.
3. **Compile**: Hamlet Builder (via PostCSS) compiles the Tailwind classes and bundles the output.

For Pencil-specific conversion prompts, component naming, and `.pen` file targets, read `docs/PENCIL-SUMMARY.MD`, `docs/PENCIL-COMPONENTS.MD`, and `docs/PENCIL-COMPONENT-PROMPTS.MD` before generating theme code.

## Why Tailwind CSS?
Tailwind CSS accelerates styling by allowing us to use utility classes directly in our HTML/HBS templates. Hamlet Builder has built-in support for PostCSS, making it trivial to drop in the `tailwindcss` plugin. PencilMCP can be instructed to directly output HTML that utilizes Tailwind classes.

## Hamlet Builder Guidelines

Hamlet Builder is a compiler for Blogger templates using Handlebars, Rollup, and PostCSS.

### CLI Usage
- `hamlet --mode development --watch` (Local dev)
- `hamlet --mode production` (Build)
- `npm run build:theme` (Compile and copy `dist/main.xml` to upload-ready `dist/theme.xml`)

### Partials
- **File-Based**: Prefix with an underscore `_name.hbs`. Included via `{{> name}}`.
- **Folder-Based**: `{{> folder.components}}` includes all partials in `components/`.

### Built-in Helpers
- `{{asset "dist/css/main.css"}}`: Embed compiled CSS inline.
- `{{currentYear}}`: Injects the current year.

### Super Partials (Built-in to Hamlet)
These abstract common Blogger elements:
- `@meta`: Generates header metadata (`<b:include name='@meta'/>`).
- `@image`: Responsive image tag (`<b:include name='@image' data='{ src: data:post.featuredImage, resize: 800 }'/>`).
- `@picture`: Picture tag for art direction.
- `@avatar`: User avatar images.
- `@snippet`: Truncated text blocks.
- `@menu`: Navigation menus (`<b:include name='@menu' data='{ links: data:links }'/>`).
- `@kind`: Adds CSS classes to `<body>` based on view type (e.g. `is-home`, `is-post`).
- `@ads` / `@adsense`: Google AdSense integration.
- `@attr`: Add/remove multiple HTML attributes.
- `@defaultmarkups`: Override Blogger's auto-generated widget inclusions.

### Blogger XML Enhancements
Hamlet automatically handles required attributes for:
- `<html>` root tag.
- `<b:widget/>` tags (auto-generates `id`, `type`, `version`).
- `<Variable/>` tags.
- It normalizes multi-line spacing for `b:*` tags.

## Project Structure
```
├── src/
│   ├── main.hbs              # Main template (compiles to main.xml)
│   ├── _header.hbs           # Partial
│   ├── components/           # Pencil-generated component partials
│   ├── css/
│   │   ├── main.css          # Main stylesheet
│   │   └── _components.css   # Partial CSS
│   └── js/
│       └── main.bundle.js    # Compiles to main.js
├── design/pencil/            # Source `.pen` files, one per component
├── dist/                     # Compiled files
├── .agents/                  # Agent skills (e.g. TagUI)
├── docs/PENCIL-SUMMARY.MD    # Pencil workflow and prompt guidance
├── docs/PENCIL-COMPONENTS.MD # Pencil component checklist
├── docs/PENCIL-COMPONENT-PROMPTS.MD # Per-component Pencil prompts
├── DESIGN.MD                 # Global design system
├── PLAN.MD                   # Project architecture
└── TODO.MD                   # Task tracking
```

## Browser And Visual Testing

When making theme or layout changes, agents must verify the result visually.

### Codex
Use the Codex in-app Browser for local preview, screenshots, and interaction testing. After starting the local Hamlet/dev server, open the local URL in the built-in browser and check desktop and mobile layouts.

### Antigravity
Use Antigravity’s built-in Chrome/browser automation for UI validation. Launch the local dev URL in the integrated Chrome browser, inspect responsive states, and record any visual issues before changing theme files again.

### TagUI
Use TagUI only for workflows that cannot be handled by local browser testing or APIs, such as Blogger dashboard configuration, external portal export flows, or other manual browser processes.

### Required Visual Checks
- **Important**: Run `npm run build:theme` before any visual testing to compile the theme and generate `dist/theme.xml`.
- Verify homepage/feed, post page, and key Blogger widget states.
- Check at least desktop width and mobile width.
- Confirm no overlapping text, clipped buttons, broken images, or invalid Blogger XML.
- Compare styling against `DESIGN.MD`.
