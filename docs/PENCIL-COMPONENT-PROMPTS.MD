# Pencil Component Prompts

Use these prompts in Pencil after opening the matching `.pen` file. The same prompts are also embedded inside each starter `.pen` file as editable text layers. Each component has two prompts:

- Visual prompt: generate or refine the Pencil visual component.
- Code prompt: generate Hamlet/Tailwind markup from the finished `.pen` design.

Always attach or reference:

- Root `DESIGN.MD`
- Root `DESIGN.pen`
- `tailwind.config.js`
- The matching target file from `src/`

## Global Visual Prompt Rules

```text
Use root DESIGN.MD as the primary design source of truth.
Use DESIGN.pen as the Pencil component library and reuse existing components before creating new ones.
Create editable Pencil layers, not screenshots.
Use semantic layer names that map cleanly to HTML structure.
Create desktop and mobile frames when layout changes matter.
Keep the YourSacralGuide style: restrained editorial UI, white canvas, near-black CTAs, coral taxonomy accents, deep green/navy bands, thin rules, rounded media, and generous whitespace.
Do not introduce visual styles that are not supported by DESIGN.MD.
```

## Global Code Prompt Rules

```text
Generate production-ready Hamlet Builder Handlebars markup with Tailwind CSS classes.
Use the current `.pen` file as the visual source of truth, but follow root DESIGN.MD and tailwind.config.js for tokens.
Return only the partial markup for the target file.
Do not generate React, JSX, CSS Modules, Vue, external CSS frameworks, or unrelated JavaScript.
Use semantic HTML and accessible attributes.
Preserve Blogger dynamic behavior where relevant with Blogger/Hamlet tags and realistic placeholders only where dynamic data is unavailable.
Use existing Tailwind tokens where possible.
After code is copied into the repo, it must pass `npm run build`.
```

## 01 Announcement Bar

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable announcement-bar component in `design/pencil/01-announcement-bar.pen`.

Context: this component appears above the global header for short notices, launch messages, or a highlighted link. It must be compact and high contrast without distracting from the page.

Reuse existing button/link/icon components from DESIGN.pen where possible. Create desktop and mobile variants. Use a black or near-black full-width strip, centered concise microcopy, optional underlined link, and a small close affordance on the right. Keep it 36px-44px tall, restrained, accessible, and consistent with the YourSacralGuide editorial system.
```

Code prompt:

```text
Convert `design/pencil/01-announcement-bar.pen` into `src/components/_announcement_bar.hbs`.

Use Hamlet Builder Handlebars markup and Tailwind CSS. Generate a compact full-width announcement strip with optional link and close button affordance. Use semantic HTML, accessible labels, root DESIGN.MD, and tokens from tailwind.config.js. Return only the partial markup.
```

## 02 Header Navigation

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable global header/navigation component in `design/pencil/02-header-navigation.pen`.

Context: this component appears at the top of every Blogger page. It anchors the brand, exposes primary navigation, and provides a compact primary action without stealing attention from article content.

Reuse button-primary, button-secondary, nav item, and announcement-bar patterns from DESIGN.pen where possible. Create desktop and mobile frames. Desktop should use a three-zone layout: logo left, centered navigation, right-side CTA/action. Mobile should include logo, menu trigger, and an expanded menu state. Use white canvas, near-black text, compact spacing, thin rules, and a pill CTA.
```

Code prompt:

```text
Convert `design/pencil/02-header-navigation.pen` into `src/_header.hbs`.

Use Hamlet Builder Handlebars markup and Tailwind CSS. Generate semantic `header` and `nav` markup with desktop and mobile-ready structure. Use accessible labels, a logo/brand link, nav links, a primary CTA, and a mobile menu trigger if present in the design. Return only the partial markup.
```

## 03 Home Hero

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable home-hero component in `design/pencil/03-home-hero.pen`.

Context: this component appears at the top of the homepage or blog landing view. It introduces the publication with a large editorial headline, short support copy, primary CTA, and optional media/product proof area.

Reuse typography, button-primary, button-secondary, hero-photo-card, and agent-console-card patterns from DESIGN.pen. Create desktop and mobile frames. The hero should feel like a restrained editorial AI/research publication: white canvas, monumental tight headline, short body text, near-black pill CTA, secondary text link, and a rounded media/product proof composition below or beside the copy. Keep the first viewport focused and leave a hint of the next section.
```

Code prompt:

```text
Convert `design/pencil/03-home-hero.pen` into `src/components/_home_hero.hbs`.

Use Hamlet Builder Handlebars markup and Tailwind CSS. Generate a responsive hero section with semantic structure, accessible media placeholders, CTA links, and reusable Tailwind classes aligned to DESIGN.MD. Return only the partial markup.
```

## 04 Trust Strip

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable trust-logo-strip component in `design/pencil/04-trust-strip.pen`.

Context: this component appears after the hero or inside proof sections to quietly show partner, client, publication, or credibility logos.

Reuse trust-logo-strip rules from DESIGN.MD. Create desktop and mobile variants. Use centered microcopy above a row of monochrome placeholder logos with generous horizontal spacing, optional thin rules, and no card containers. It must feel quiet, credible, and editorial.
```

Code prompt:

```text
Convert `design/pencil/04-trust-strip.pen` into `src/components/_trust_strip.hbs`.

Use Hamlet Builder Handlebars markup and Tailwind CSS. Generate a responsive trust strip with optional intro text and logo placeholders. Keep it accessible and restrained. Return only the partial markup.
```

## 05 Blog Feed

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable blog-feed component in `design/pencil/05-blog-feed.pen`.

Context: this is the primary Blogger index/feed area. It displays recent posts, categories, dates, excerpts, optional thumbnails, filters, and pagination while preserving Blogger dynamic post data.

Reuse post-card, taxonomy/filter chip, pagination, and rule-separated list patterns. Create desktop and mobile frames. The feed should support Blogger dynamic content: post title, URL, date, label/category, excerpt, thumbnail, and older/newer navigation. Prefer editorial rows or restrained cards, thin dividers, clear scanning, and coral taxonomy accents.
```

Code prompt:

```text
Convert `design/pencil/05-blog-feed.pen` into `src/components/_blog_feed.hbs`.

Use Blogger-compatible Hamlet markup and Tailwind CSS. Preserve dynamic Blogger behavior with appropriate `b:loop`, `b:if`, `data:post`, labels, post URLs, dates, snippets, thumbnails, and pagination where applicable. Do not hardcode real posts except as fallback placeholders. Return only the partial markup.
```

## 06 Post Card

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable post-card component in `design/pencil/06-post-card.pen`.

Context: this reusable article preview appears in the blog feed, related posts, sidebar popular posts, and archive/search results. It must handle long titles and missing images gracefully.

Create variants: row with thumbnail, text-only row, compact sidebar card, and featured card if useful. Use category chip/date metadata, 24px-32px title, excerpt, optional rounded thumbnail, thin top/bottom rules, and restrained spacing. Avoid heavy shadows and decorative card stacking. Include desktop and mobile variants.
```

Code prompt:

```text
Convert `design/pencil/06-post-card.pen` into `src/components/_post_card.hbs`.

Use Hamlet Builder Handlebars markup and Tailwind CSS. Generate reusable post-card markup that can receive Blogger post data. Include title, URL, labels/category, date, snippet, and optional featured image areas. Return only the partial markup.
```

## 07 Post Page

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable single post page component in `design/pencil/07-post-page.pen`.

Context: this component renders single Blogger posts. It needs a strong article header, metadata, featured image support, readable body content, labels, share links, author area, and related/navigation links.

Create desktop and mobile frames. Include article title, eyebrow/category, date, author, featured image area, long-form body typography sample, quote/code/image samples if helpful, labels, share affordances, related posts, and previous/next navigation. Keep typography readable and editorial, with generous whitespace and thin rules. Preserve Blogger dynamic content as realistic placeholders.
```

Code prompt:

```text
Convert `design/pencil/07-post-page.pen` into `src/components/_post_page.hbs`.

Use Blogger-compatible Hamlet markup and Tailwind CSS. Preserve dynamic Blogger post data: title, body, author, date, labels, featured image, comments/share/navigation if present. Use semantic article/header/footer structure. Return only the partial markup.
```

## 08 Taxonomy Filters

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable taxonomy-filters component in `design/pencil/08-taxonomy-filters.pen`.

Context: this component appears above feeds, archive views, search results, and label pages to help readers scan or filter content by category/topic.

Reuse blog-filter-chip and button-pill-outline patterns from DESIGN.pen. Create inactive, active, hover/focus, dense mobile wrap, and optional search-field variants. Use coral and soft-coral accents, rounded pill shapes, and clear wrapping behavior. Avoid tiny unreadable filters.
```

Code prompt:

```text
Convert `design/pencil/08-taxonomy-filters.pen` into `src/components/_taxonomy_filters.hbs`.

Use Hamlet Builder Handlebars markup and Tailwind CSS. Generate accessible filter navigation with active/inactive states, Blogger label links where applicable, and responsive wrapping. Return only the partial markup.
```

## 09 Pagination

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable pagination component in `design/pencil/09-pagination.pen`.

Context: this component appears below feed, archive, search, and post pages to navigate older/newer posts or previous/next article content.

Reuse text-link/button-secondary patterns and simple arrow icons from DESIGN.pen. Create feed older/newer variant and single-post previous/next variant. Use thin top rule, clear left/right alignment on desktop, stacked or full-width tap targets on mobile, and restrained text links rather than heavy buttons.
```

Code prompt:

```text
Convert `design/pencil/09-pagination.pen` into `src/components/_pagination.hbs`.

Use Blogger-compatible Hamlet markup and Tailwind CSS. Generate accessible older/newer or previous/next navigation using Blogger pagination data where applicable. Return only the partial markup.
```

## 10 Sidebar

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable sidebar component in `design/pencil/10-sidebar.pen`.

Context: this optional secondary column is used for Blogger profile, labels, archive links, popular posts, newsletter capture, or ad slots. It should not dominate article or feed content.

Create modules for profile/about, label list, archive list, popular posts, small newsletter, and optional ad placeholder. Use thin dividers, compact headings, restrained typography, and generous but efficient spacing. Create desktop sidebar and mobile stacked variants.
```

Code prompt:

```text
Convert `design/pencil/10-sidebar.pen` into `src/components/_sidebar.hbs`.

Use Blogger-compatible Hamlet markup and Tailwind CSS. Generate optional sidebar sections for profile/about, labels, archive, popular posts, newsletter, and ad slot placeholders. Preserve Blogger widget compatibility where appropriate. Return only the partial markup.
```

## 11 Newsletter CTA

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable newsletter-cta component in `design/pencil/11-newsletter-cta.pen`.

Context: this component appears near the bottom of the homepage, feed, post page, or footer to invite readers to subscribe or take a primary action.

Reuse footer-newsletter, button-primary, and form input patterns from DESIGN.pen. Create dark near-black/deep-green variants plus mobile layout. Include coral label, white headline, supporting text, email field, submit affordance, and legal microcopy. Keep it premium, restrained, and not marketing-card heavy.
```

Code prompt:

```text
Convert `design/pencil/11-newsletter-cta.pen` into `src/components/_newsletter_cta.hbs`.

Use Hamlet Builder Handlebars markup and Tailwind CSS. Generate a responsive CTA/newsletter section with accessible form labels, email input, submit action, and legal microcopy. Keep any form behavior static unless explicitly specified. Return only the partial markup.
```

## 12 Footer

Visual prompt:

```text
Using root DESIGN.MD as the primary design source and DESIGN.pen as the Pencil component library, create an editable footer component in `design/pencil/12-footer.pen`.

Context: this component appears at the bottom of every page. It closes the site with navigation, newsletter/signup area, social/legal links, copyright, and optional brand statement.

Reuse footer-newsletter, footer link, button-secondary, and form patterns from DESIGN.pen. Create desktop and mobile variants. Use a dark near-black footer, muted links, white headings, coral newsletter label, email input, footer columns, legal microcopy, and current-year copyright. Keep it calm, organized, and scan-friendly.
```

Code prompt:

```text
Convert `design/pencil/12-footer.pen` into `src/components/_footer.hbs`.

Use Hamlet Builder Handlebars markup and Tailwind CSS. Generate responsive footer markup with navigation columns, newsletter area if present, legal links, social links if present, and `{{currentYear}}` for the copyright year. Return only the partial markup.
```
