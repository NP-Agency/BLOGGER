# Project TODO

This file tracks the current state of the project. Mark items with `[x]` as they are completed.

## Initialization
- [x] Create project structure and documentation (AGENTS.md, PLAN.MD, DESIGN.MD).
- [x] Create TagUI skill guide.
- [x] Initialize `package.json` and install `hamlet-builder`, `tailwindcss`, `postcss`, and `autoprefixer`.
- [x] Configure `postcss.config.js` and `tailwind.config.js`.
- [x] Run `npm install` and `npm run build` to successfully generate the `dist/` directory.

## Design & Theme Development
- [x] Add Pencil design-to-code summary and component placeholder map.
- [x] Create Pencil starter `.pen` files listed in `docs/PENCIL-COMPONENTS.MD`.
- [x] Create `DESIGN.pen` as the initial Pencil design/component library.
- [x] Add per-component visual and code prompts in `docs/PENCIL-COMPONENT-PROMPTS.MD`.
- [x] Generate a first-pass test theme from `DESIGN.MD`/`DESIGN.pen` guidance.
- [x] Add `npm run build:theme` and generate `dist/theme.xml`.
- [x] Import/upload placeholder `dist/theme.xml` into Blogger and confirm it renders.
- [x] Fix initial Blogger XML/runtime issues: `&copy;` entity, missing `<b:skin>`, and invalid `super.meta` includable placement.
- [ ] Convert/refine `DESIGN.MD` tokens into final Pencil variables and reusable library components.
- [ ] Replace starter `.pen` prompt files with finished visual component designs in Pencil.
- [ ] Refine Header/Navigation in Pencil (`design/pencil/02-header-navigation.pen`).
- [ ] Regenerate Header component (`src/_header.hbs`) from final Pencil design via PencilMCP.
- [ ] Replace static placeholder post cards in `src/components/_post_card.hbs` and `src/components/_blog_feed.hbs` with real Blogger post data.
- [ ] Build a real Blogger feed loop using `data:posts`, `data:post.title`, `data:post.url`, `data:post.labels`, `data:post.timestamp`, `data:post.snippet`, and `data:post.featuredImage` where available.
- [ ] Refine main blog feed layout in Pencil (`design/pencil/05-blog-feed.pen`) around real Blogger data states.
- [ ] Regenerate feed layout/widget wrapper from final Pencil design.
- [ ] Refine post layout in Pencil (`design/pencil/07-post-page.pen`) around single-post Blogger data.
- [ ] Regenerate post layout component from final Pencil design.
- [ ] Create real single-post rendering for title, body, author/date, labels, featured image, comments/share/navigation where available.
- [ ] Create Blogger-compatible empty states for no posts, missing featured images, missing labels, and short snippets.
- [ ] Browser-test the generated theme at desktop and mobile sizes with real Blogger posts.
- [ ] Re-import/upload `dist/theme.xml` into the Blogger test blog after dynamic data integration and fix remaining runtime issues.

## AppScript Automation
- [ ] Initialize CLASP project.
- [ ] Write AppScript to parse Calendar events and send to Blogger via email.
- [ ] Set up daily triggers.
- [ ] Test the integration.

## TagUI Visual Automation
- [ ] Identify processes requiring visual automation.
- [ ] Write TagUI scripts for those processes.
- [ ] Test and refine TagUI workflows.
