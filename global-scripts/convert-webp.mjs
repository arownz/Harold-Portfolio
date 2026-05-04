// npx ts-node --esm global-scripts/convert-webp.mjs --dry-run (default, no actual file changes)
// npx ts-node --esm global-scripts/convert-webp.mjs --replace (to replace original images with WebP versions)
// npx ts-node --esm global-scripts/convert-webp.mjs --target tutorial-guides/guide-2 --replace (target specific folder)

import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const rootDir = process.cwd();

const isDirectory = async (dir) => {
  try {
    const stats = await fs.stat(dir);
    return stats.isDirectory();
  } catch {
    return false;
  }
};

const resolveProjectDir = async () => {
  const candidates = [
    rootDir,
    path.join(rootDir, "my-portfolio1"),
    path.join(rootDir, "frontend"),
  ];

  for (const candidate of candidates) {
    const srcPath = path.join(candidate, "src");
    const assetsPath = path.join(srcPath, "assets");

    if ((await isDirectory(srcPath)) && (await isDirectory(assetsPath))) {
      return { srcPath, assetsPath, projectDir: candidate };
    }
  }

  throw new Error(
    `Could not find a project with src/assets. Checked: ${candidates.join(", ")}`
  );
};

// Parse --target argument to scope conversion to specific folder
const targetArg = process.argv.find((arg, i) => process.argv[i - 1] === "--target");
let assetDirs = [];
let srcDir;
let targetedImageNames = new Set(); // Track image names from target folder

const configureDirectories = async () => {
  const { srcPath, assetsPath, projectDir } = await resolveProjectDir();
  const publicPath = path.join(projectDir, "public");
  srcDir = srcPath;

  if (targetArg) {
    // If target is relative path, resolve from detected assets root; if absolute, use as-is.
    const targetDir = path.isAbsolute(targetArg)
      ? targetArg
      : path.join(assetsPath, targetArg);

    if (!(await isDirectory(targetDir))) {
      throw new Error(`Target folder not found: ${targetDir}`);
    }

    assetDirs = [targetDir];

    console.log(`[INFO] Detected project root: ${projectDir}`);
    console.log(`[INFO] Targeting asset folder: ${targetDir}`);
    console.log(`[INFO] Will search all code in: ${srcDir}`);
    return;
  }

  assetDirs = [assetsPath];
  if (await isDirectory(publicPath)) {
    assetDirs.push(publicPath);
  }

  console.log(`[INFO] Detected project root: ${projectDir}`);
  console.log(`[INFO] Targeting entire codebase (assets/public + src)`);
};

const imageExtensions = new Set([".png", ".jpg", ".jpeg"]);
const quality = 82;
const dryRun = process.argv.includes("--dry-run");
const replaceOriginals = process.argv.includes("--replace");

const toPosixPath = (value) => value.split(path.sep).join("/");

const walkFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const resolved = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walkFiles(resolved);
      }

      return [resolved];
    })
  );

  return nested.flat();
};

const convertImage = async (inputPath) => {
  const parsed = path.parse(inputPath);
  if (!imageExtensions.has(parsed.ext.toLowerCase())) {
    return null;
  }

  const outputPath = path.join(parsed.dir, `${parsed.name}.webp`);

  if (dryRun) {
    return { inputPath, outputPath };
  }

  await sharp(inputPath).webp({ quality }).toFile(outputPath);
  return { inputPath, outputPath };
};

const rewriteCodeFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const editable = new Set([".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".md", ".vue"]);

  if (!editable.has(ext)) return null;

  const original = await fs.readFile(filePath, "utf8");

  // Replace patterns based on whether we're targeting specific images or all
  let rewritten = original;

  if (targetArg) {
    // When targeting, only replace references to images from target folder
    rewritten = rewritten
      // Handle: "guide2-step1.png" or 'guide2-step1.png' or `guide2-step1.png`
      .replace(
        /(["'`])([^"'`/]+)\.(png|jpe?g)\1/gi,
        (_match, quote, fileName) =>
          targetedImageNames.has(fileName.toLowerCase())
            ? `${quote}${fileName}.webp${quote}`
            : _match
      )
      // Handle paths: @/assets/... or ../assets/...
      .replace(
        /(["'`])((?:@\/assets|(?:\.\.\/)+assets)\/[^"'`?]+?)\.(png|jpe?g)\1/gi,
        (_match, quote, assetPath) =>
          targetedImageNames.has(path.basename(assetPath).toLowerCase())
            ? `${quote}${assetPath}.webp${quote}`
            : _match
      )
      // Handle CSS url() with paths
      .replace(
        /url\((['"]?)([^'")]+?\/assets\/[^'")]+?)\.(png|jpe?g)\1\)/gi,
        (_match, quote, assetPath) =>
          targetedImageNames.has(path.basename(assetPath).toLowerCase())
            ? `url(${quote}${assetPath}.webp${quote})`
            : _match
      )
      // Handle root-relative paths: /foo.png
      .replace(
        /(["'`])\/(?!\/)([^"'`?]+?)\.(png|jpe?g)\1/gi,
        (_match, quote, filePath) =>
          targetedImageNames.has(path.basename(filePath).toLowerCase())
            ? `${quote}/${filePath}.webp${quote}`
            : _match
      )
      // Handle relative paths with directories: projects/foo.png
      .replace(
        /(["'`])((?!https?:\/\/|data:|\/\/)[^"'`]*\/[^"'`?]+?)\.(png|jpe?g)\1/gi,
        (_match, quote, filePath) =>
          targetedImageNames.has(path.basename(filePath).toLowerCase())
            ? `${quote}${filePath}.webp${quote}`
            : _match
      );
  } else {
    // When not targeting, replace all image references
    rewritten = original
      .replace(
        /(["'`])((?:@\/assets|(?:\.\.\/)+assets)\/[^"'`?]+?)\.(png|jpe?g)\1/gi,
        (_match, quote, assetPath) => `${quote}${assetPath}.webp${quote}`
      )
      .replace(
        /url\((['"]?)([^'")]+?\/assets\/[^'")]+?)\.(png|jpe?g)\1\)/gi,
        (_match, quote, assetPath) => `url(${quote}${assetPath}.webp${quote})`
      )
      // Handle root-relative paths: /foo.png
      .replace(
        /(["'`])\/(?!\/)([^"'`?]+?)\.(png|jpe?g)\1/gi,
        (_match, quote, filePath) => `${quote}/${filePath}.webp${quote}`
      )
      // Handle relative paths with directories: projects/foo.png
      .replace(
        /(["'`])((?!https?:\/\/|data:|\/\/)[^"'`]*\/[^"'`?]+?)\.(png|jpe?g)\1/gi,
        (_match, quote, filePath) => `${quote}${filePath}.webp${quote}`
      )
      // Also handle bare filenames when doing full codebase
      .replace(
        /(["'`])([^"'`/]+)\.(png|jpe?g)\1/gi,
        (_match, quote, fileName) => `${quote}${fileName}.webp${quote}`
      );
  }

  if (rewritten === original) {
    return null;
  }

  if (!dryRun) {
    await fs.writeFile(filePath, rewritten, "utf8");
  }

  return { filePath };
};

const main = async () => {
  await configureDirectories();

  const filesByDir = await Promise.all(assetDirs.map((dir) => walkFiles(dir)));
  const assetFiles = [...new Set(filesByDir.flat())];
  const codeFiles = await walkFiles(srcDir);

  // Step 1: Populate targetedImageNames from asset files (before conversion)
  if (targetArg) {
    for (const filePath of assetFiles) {
      const parsed = path.parse(filePath);
      if (imageExtensions.has(parsed.ext.toLowerCase())) {
        targetedImageNames.add(parsed.name.toLowerCase());
      }
    }
    console.log(`[INFO] Tracking ${targetedImageNames.size} image(s) from target folder`);
  }

  // Step 2: Convert images to WebP
  const converted = [];
  for (const filePath of assetFiles) {
    const result = await convertImage(filePath);
    if (result) {
      converted.push(result);
    }
  }

  // Step 3: Rewrite code files (searches entire codebase, replaces only target images if --target specified)
  const rewritten = [];
  for (const filePath of codeFiles) {
    const result = await rewriteCodeFile(filePath);
    if (result) {
      rewritten.push(result);
    }
  }

  // Step 4: Remove original image files if --replace flag is set
  let removed = 0;
  if (replaceOriginals) {
    for (const filePath of assetFiles) {
      const ext = path.extname(filePath).toLowerCase();
      if (!imageExtensions.has(ext)) continue;

      const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");

      try {
        await fs.access(webpPath);
      } catch {
        continue;
      }

      if (!dryRun) {
        await fs.unlink(filePath);
      }
      removed += 1;
    }
  }

  const scope = targetArg ? `[${targetArg}]` : "[entire codebase]";
  console.log(
    `${dryRun ? "[dry-run] " : ""}${scope} Converted ${converted.length} image(s) to WebP, rewrote ${rewritten.length} source file(s), and removed ${removed} original image(s).`
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});