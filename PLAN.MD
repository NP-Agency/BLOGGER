# Project Implementation Plan

This document outlines the architectural phases for the Blogger Theme Development and Automation project.

## Current Status

The project now has a working Hamlet/Tailwind test theme generated from the root design direction in `DESIGN.MD` and the Pencil component library starter in `DESIGN.pen`.

Completed foundations:
- Root agent/development instructions in `AGENTS.md`.
- Hamlet Builder, Tailwind, PostCSS, and Autoprefixer project scaffold.
- Root Pencil library file: `DESIGN.pen`.
- Per-component Pencil starter files in `design/pencil/`.
- Per-component Pencil prompts in `docs/PENCIL-COMPONENT-PROMPTS.MD`.
- First-pass Hamlet/Tailwind components in `src/components/` and `src/_header.hbs`.
- Build output at `dist/main.xml` and upload-ready copy at `dist/theme.xml` via `npm run build:theme`.

Next project focus:
- Replace starter `.pen` prompt files with finished visual Pencil components.
- Use PencilMCP to regenerate/refine each Hamlet partial from the final `.pen` files.
- Browser-test the generated Blogger XML visually.
- Upload/import `dist/theme.xml` into Blogger and fix Blogger-specific widget/runtime issues.

## Phase 1: Design Phase
**Goal:** Visually build UI components without writing raw code.
- **Tool:** Pencil.dev (Saved as `.pen` files).
- **Process:** We will create `.pen` files for global layouts and specific components (e.g., Notification Bar, CTA Buttons, Hero Section).
- **Current progress:** `DESIGN.pen` exists and component starter `.pen` files have been created in `design/pencil/`. These files include prompts and usage context; they still need to be turned into final visual components in Pencil.

## Phase 2: Theme Development Phase
**Goal:** Convert visual designs into a functional Blogger theme.
- **Tools:** PencilMCP, Hamlet Builder.
- **Process:** 
  1. An LLM agent uses **PencilMCP** to read the design from `.pen` files.
  2. The agent translates the design into reusable Handlebars components (`.hbs`) built with **Tailwind CSS** utility classes.
  3. We compile the source using Hamlet Builder (with PostCSS Tailwind plugin) into a single Blogger XML template.
- **Current progress:** A test implementation has been generated directly from `DESIGN.MD`/`DESIGN.pen` guidance. It includes announcement, header, hero, trust strip, taxonomy filters, feed wrapper, post card, sidebar, pagination, newsletter CTA, and footer partials. Run `npm run build:theme` to generate `dist/theme.xml`.

### Test Build Command

```bash
npm run build:theme
```

Outputs:
- `dist/main.xml`: Hamlet default compiled output.
- `dist/theme.xml`: upload-ready copy for Blogger testing.

## Phase 3: Content Automation Phase
**Goal:** Automate content creation from Google Calendar to Blogger.
- **Tools:** Google AppScript, CLASP CLI, Google Calendar API, GmailApp/MailApp.
- **Process:** 
  1. Write an AppScript that runs daily.
  2. The script fetches events from a specific Google Calendar and formats the content (including images if any).
  3. It sends an email to the unique Blogger email address to publish the post.

## Phase 4: Visual Automation Phase
**Goal:** Automate manual UI/browser processes.
- **Tools:** TagUI
- **Process:** For any task that cannot be API-driven (like exporting assets from certain web portals or doing manual Blogger dashboard configurations), we will execute TagUI flows. (See `.agents/skills/tagui/SKILL.md` for details).

## Phase 5: Browser And Blogger Validation
**Goal:** Verify that the generated theme works visually and functionally.
- **Tools:** Codex in-app Browser, Antigravity built-in Chrome, Blogger theme preview/import.
- **Process:**
  1. Run `npm run build:theme`.
  2. Inspect `dist/theme.xml` for expected generated sections.
  3. Preview the theme in a browser or Blogger test blog.
  4. Check desktop/mobile layouts, Blogger widget rendering, feed pages, post pages, labels, archive/search views, and form affordances.
  5. Feed any visual issues back into Pencil `.pen` files and regenerate partials.
