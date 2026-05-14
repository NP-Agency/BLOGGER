# Theme Release Workflow

Use this workflow when preparing a Blogger theme upload.

1. Make source changes in `src/`, `design/`, `docs/`, or config files.
2. Run `npm run build:theme` and verify `dist/theme.xml` is generated.
3. Bump the theme version:

```sh
npm run version:patch
```

Use `version:minor` for new theme features and `version:major` for breaking redesigns.

4. Commit the source changes:

```sh
git add .
git commit -m "chore: release theme v$(cat VERSION)"
```

5. Tag the release:

```sh
git tag "v$(cat VERSION)"
```

6. Upload `dist/theme.xml` to Blogger.

`dist/` is ignored because it is generated. Rebuild it from any Git tag with `npm run build:theme`.
