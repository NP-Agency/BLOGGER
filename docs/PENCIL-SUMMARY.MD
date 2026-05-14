# Pencil Design And Code Summary

Source: https://docs.pencil.dev/design-and-code/design-to-code

This project uses Pencil for visual component design and Hamlet Builder for Blogger theme output. Keep `.pen` files inside this workspace so the LLM can see both the design file and the target code files. The workflow is bidirectional: use Pencil to convert design to Tailwind/Hamlet code, and use Pencil to turn existing Tailwind/Hamlet code back into editable `.pen` visual components.

## Design To Code Workflow

1. Design one component or page section in Pencil.
2. Save the `.pen` file in `design/pencil/`.
3. Open Pencil AI chat with `Cmd/Ctrl + K`.
4. Ask Pencil to generate code for this repo's stack.
5. Copy/refine the output into the matching Hamlet partial in `src/components/` or `src/_header.hbs`.
6. Run `npm run build`.
7. Visually verify the result with the Codex in-app Browser or Antigravity built-in Chrome.

## Code To Design Workflow

Use this when a component already exists in `src/` and you want Pencil to create or refresh the matching visual `.pen` file.

1. Open or create the target `.pen` file in `design/pencil/`.
2. Open Pencil AI chat with `Cmd/Ctrl + K`.
3. Paste the relevant Hamlet/Tailwind component code from `src/_header.hbs` or `src/components/_name.hbs`.
4. Ask Pencil to recreate the component as editable visual layers.
5. Include the relevant design tokens from `DESIGN.MD` and `tailwind.config.js` when the component uses project-specific colors, spacing, or radii.
6. Create desktop and mobile frames for layout-sensitive components.
7. Save the `.pen` file using the filename from `docs/PENCIL-COMPONENTS.MD`.

## Recommended File Pattern

Use one `.pen` file per component so changes stay small and easy to convert.

```text
design/pencil/
  01-announcement-bar.pen
  02-header-navigation.pen
  03-home-hero.pen
  04-blog-feed.pen
  05-post-card.pen
  06-post-page.pen
  07-newsletter-cta.pen
  08-footer.pen
```

## Design To Code Prompt Rules

Always mention the exact stack and target file:

- Generate `Handlebars/Hamlet` partial markup, not React.
- Use `Tailwind CSS` utility classes.
- Follow `DESIGN.MD` for colors, typography, spacing, radius, and overall tone.
- Use existing Tailwind tokens from `tailwind.config.js`.
- Avoid framework-specific state or JSX.
- Keep Blogger dynamic areas as Blogger/Hamlet tags where needed.
- Prefer semantic HTML.
- Do not add external CSS frameworks or component libraries.

## Code To Design Prompt Rules

Always mention the source file and target `.pen` file:

- Recreate the visual layout as editable Pencil layers, not as a screenshot.
- Preserve component hierarchy from the markup.
- Translate Tailwind classes into visual properties: spacing, sizing, typography, color, borders, radius, and layout.
- Use semantic layer names that match the code structure.
- Create realistic text and image placeholders when dynamic Blogger data is present.
- Create desktop and mobile frames when responsive classes are present.
- Follow `DESIGN.MD` instead of inventing a new visual style.
- Flag any Tailwind class or Blogger tag that cannot be represented visually.

## Best Pencil Prompts

Use these in Pencil AI chat after opening the relevant `.pen` file.

### Convert A Component

```text
Convert this Pencil design into a reusable Hamlet Builder Handlebars partial for this Blogger theme.

Target file: src/components/_component-name.hbs
Stack: plain Handlebars/Hamlet + Tailwind CSS, no React, no JSX.
Design system: follow DESIGN.MD and use Tailwind tokens from tailwind.config.js.
Output only the component markup. Use semantic HTML and responsive Tailwind classes.
Keep placeholder content simple, and do not invent JavaScript behavior.
```

### Convert Header Navigation

```text
Convert this header/navigation design into a Hamlet Builder partial.

Target file: src/_header.hbs
Stack: Handlebars/Hamlet + Tailwind CSS.
Use semantic header/nav markup. Make it responsive for desktop and mobile.
Use the YourSacralGuide design language from DESIGN.MD: white canvas, near-black text, compact navigation, pill CTA.
Output only the partial markup.
```

### Convert Blog Feed Or Blogger Widget Area

```text
Convert this blog feed layout into Blogger-compatible Hamlet markup.

Target file: src/components/_blog_feed.hbs
Stack: Hamlet Builder + Blogger XML widgets + Tailwind CSS.
Preserve Blogger dynamic behavior where appropriate with b:section, b:widget, b:loop, data:post, and related Blogger tags.
Use the visual layout from the Pencil design, but do not replace Blogger data with static-only content.
```

### Ask For A Tailwind Class Audit

```text
Review the generated Tailwind classes against DESIGN.MD.
Check typography scale, spacing, radii, colors, mobile layout, and whether the component feels consistent with the YourSacralGuide design system.
Suggest only specific class changes.
```

### Sync Tokens

```text
Compare the colors, typography, spacing, and radius values in this Pencil design with tailwind.config.js and DESIGN.MD.
Suggest any missing Tailwind tokens needed before code generation.
```

## Best Code To Design Prompts

Use these in Pencil AI chat after creating or opening the target `.pen` file.

### Generate A Pencil Component From Tailwind/Hamlet

```text
Create an editable Pencil visual component from this Hamlet/Tailwind code.

Source file: src/components/_component_name.hbs
Target Pencil file: design/pencil/XX-component-name.pen
Design system: follow DESIGN.MD and use the visual values implied by tailwind.config.js.

Requirements:
- Recreate the component as editable layers, not a flat image.
- Translate Tailwind classes into layout, spacing, typography, color, border, and radius properties.
- Preserve the component hierarchy with semantic layer names.
- Replace Blogger dynamic data with realistic placeholder text and images.
- Create desktop and mobile frames if responsive classes are present.
- Keep the visual style consistent with YourSacralGuide.

Here is the code:

```hbs
PASTE_COMPONENT_CODE_HERE
```
```

### Generate Header Design From Code

```text
Create an editable Pencil header/navigation design from this Hamlet/Tailwind code.

Source file: src/_header.hbs
Target Pencil file: design/pencil/02-header-navigation.pen

Create desktop and mobile frames. Use semantic layers for logo, nav list, nav item, primary CTA, and mobile menu trigger. Follow DESIGN.MD: white canvas, near-black text, compact navigation, pill CTA, restrained editorial spacing.

Here is the code:

```hbs
PASTE_HEADER_CODE_HERE
```
```

### Refresh A Pencil Design After Code Changes

```text
Update this Pencil component to match the latest Hamlet/Tailwind code below.

Keep existing layer names when possible, but adjust layout, spacing, typography, colors, and responsive frames to match the code. Preserve the design language from DESIGN.MD. If a code detail cannot be represented visually, list it separately.

```hbs
PASTE_UPDATED_COMPONENT_CODE_HERE
```
```

### Extract Design Notes From Code

```text
Read this Hamlet/Tailwind component and summarize the visual design decisions needed to recreate it in Pencil.

Return:
- layout structure
- spacing
- typography
- colors
- borders and radius
- responsive behavior
- suggested Pencil layer names

```hbs
PASTE_COMPONENT_CODE_HERE
```
```

## Design Token Guidance

Pencil supports a design-token workflow where variables can be imported from code and later synced back. For this project:

- Treat `DESIGN.MD` as the human-readable design system.
- Treat `tailwind.config.js` as the code token source.
- When Pencil designs introduce a repeated color, radius, or spacing value, add it to `tailwind.config.js` before relying on it across multiple components.

## Icon Guidance

Pencil can use built-in icon libraries including Lucide, Feather, Phosphor, and Material Symbols. For code generation in this project, prefer Lucide-style simple line icons when icons are needed, but avoid adding a runtime icon dependency unless the component truly needs it.

## Quality Checklist

Before accepting generated code:

- It builds with `npm run build`.
- Markup is valid for Hamlet/Blogger.
- Tailwind classes exist in this project.
- Text does not overflow on mobile.
- Sections are not over-carded; use open editorial layouts where `DESIGN.MD` calls for them.
- Dynamic Blogger areas remain dynamic.
- The component has a matching `.pen` source in `design/pencil/`.

Before accepting code-to-design output:

- The Pencil result is editable layers, not a flattened screenshot.
- Desktop and mobile frames match the responsive code.
- Layer names correspond to the component structure.
- Dynamic Blogger content is represented with realistic placeholders.
- The `.pen` file name matches `docs/PENCIL-COMPONENTS.MD`.
