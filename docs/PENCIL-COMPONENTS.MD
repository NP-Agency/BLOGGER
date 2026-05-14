# Pencil Component Placeholder Map

Create these designs in Pencil as separate `.pen` files. Each `.pen` file should map to one Hamlet partial so conversion stays focused. The map works both ways: design the `.pen` first and convert it to code, or paste existing Hamlet/Tailwind code into Pencil AI and ask it to create the matching `.pen` visual component.

| Priority | Pencil File | Target Code File | Purpose |
|---:|---|---|---|
| 1 | `design/pencil/01-announcement-bar.pen` | `src/components/_announcement_bar.hbs` | Optional top announcement strip with link and close affordance. |
| 2 | `design/pencil/02-header-navigation.pen` | `src/_header.hbs` | Logo, navigation, sign-in/action links, mobile behavior. |
| 3 | `design/pencil/03-home-hero.pen` | `src/components/_home_hero.hbs` | Homepage/blog landing hero with editorial headline and media/product proof area. |
| 4 | `design/pencil/04-trust-strip.pen` | `src/components/_trust_strip.hbs` | Quiet logo/customer proof row. |
| 5 | `design/pencil/05-blog-feed.pen` | `src/components/_blog_feed.hbs` | Blogger feed layout and primary content area. |
| 6 | `design/pencil/06-post-card.pen` | `src/components/_post_card.hbs` | Reusable article card/list item used by feed and related posts. |
| 7 | `design/pencil/07-post-page.pen` | `src/components/_post_page.hbs` | Single article layout, title, metadata, content, author/share zones. |
| 8 | `design/pencil/08-taxonomy-filters.pen` | `src/components/_taxonomy_filters.hbs` | Label/category chips, search/filter controls, archive affordances. |
| 9 | `design/pencil/09-pagination.pen` | `src/components/_pagination.hbs` | Older/newer post navigation and page controls. |
| 10 | `design/pencil/10-sidebar.pen` | `src/components/_sidebar.hbs` | Optional Blogger profile, labels, archive, popular posts, or ad slots. |
| 11 | `design/pencil/11-newsletter-cta.pen` | `src/components/_newsletter_cta.hbs` | CTA/newsletter band matching the dark footer/CTA language. |
| 12 | `design/pencil/12-footer.pen` | `src/components/_footer.hbs` | Footer navigation, newsletter/legal area, copyright. |

## Conversion Order

Start with isolated components first, then assemble pages:

1. Header/navigation
2. Post card
3. Blog feed
4. Post page
5. Footer/newsletter
6. Optional support components

## Design To Code Prompt Template

```text
Convert `design/pencil/XX-component-name.pen` into `src/components/_component_name.hbs`.

Use Hamlet Builder Handlebars markup and Tailwind CSS.
Follow DESIGN.MD and existing Tailwind tokens.
Do not generate React, JSX, CSS Modules, or external library code.
For Blogger data, preserve dynamic Blogger tags instead of hardcoding real post content.
Return only the final partial markup.
```

## Code To Design Prompt Template

```text
Create or update `design/pencil/XX-component-name.pen` from `src/components/_component_name.hbs`.

Use the pasted Hamlet/Tailwind code as the source of truth.
Recreate the component as editable Pencil layers, not a flat screenshot.
Translate Tailwind classes into visual properties: layout, spacing, typography, colors, borders, radius, and responsive behavior.
Use realistic placeholders for Blogger dynamic content.
Create desktop and mobile frames if responsive classes are present.
Follow DESIGN.MD and keep layer names semantic.
```

## Notes For Pencil Designs

- Name layers semantically: `header`, `nav-list`, `post-card-title`, `category-chip`, `featured-image`.
- Use realistic text lengths so responsive behavior is visible.
- Include desktop and mobile frames for navigation, feed, and post page.
- Keep tokens consistent with `DESIGN.MD`: near-black CTAs, coral taxonomy, white editorial canvas, deep green/navy bands.
- When generating a `.pen` file from code, preserve the code hierarchy as Pencil groups and layer names.
