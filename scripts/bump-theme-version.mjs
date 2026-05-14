import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const bump = process.argv[2] ?? "patch";
const allowed = new Set(["patch", "minor", "major"]);

if (!allowed.has(bump)) {
  console.error(`Unknown bump "${bump}". Use patch, minor, or major.`);
  process.exit(1);
}

const packagePath = path.join(root, "package.json");
const themeConfigPath = path.join(root, "theme.config.json");
const versionPath = path.join(root, "VERSION");

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, "utf8"));
const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
};

const parseVersion = (version) => {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new Error(`Expected semver version like 1.0.0, received "${version}".`);
  }

  return match.slice(1).map(Number);
};

const nextVersion = (version, bumpType) => {
  const [major, minor, patch] = parseVersion(version);

  if (bumpType === "major") {
    return `${major + 1}.0.0`;
  }

  if (bumpType === "minor") {
    return `${major}.${minor + 1}.0`;
  }

  return `${major}.${minor}.${patch + 1}`;
};

const packageJson = readJson(packagePath);
const themeConfig = readJson(themeConfigPath);
const currentVersion = packageJson.version ?? themeConfig.theme?.version;
const newVersion = nextVersion(currentVersion, bump);

packageJson.version = newVersion;
themeConfig.theme = themeConfig.theme ?? {};
themeConfig.theme.version = newVersion;

writeJson(packagePath, packageJson);
writeJson(themeConfigPath, themeConfig);
fs.writeFileSync(versionPath, `${newVersion}\n`);

console.log(`Theme version bumped: ${currentVersion} -> ${newVersion}`);
