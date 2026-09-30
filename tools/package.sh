#!/usr/bin/env bash
# Package a built template for upload: dist/<slug>-v<version>.zip
#   tools/package.sh <slug>
# Zip layout:
#   <slug>/html/            the template (open html/index.html)
#   <slug>/documentation/   Persian guide (also linked from html/)
#   <slug>/source/          optional src/ + build tool for developers
set -euo pipefail
slug="${1:?usage: tools/package.sh <slug>}"
root="$(cd "$(dirname "$0")/.." && pwd)"
node "$root/tools/build.mjs" "$slug"
version="$(node -e "import('$root/src/$slug/site.mjs').then(m=>console.log(m.default.version))")"
stage="$(mktemp -d)"
mkdir -p "$stage/$slug"
cp -r "$root/templates/$slug" "$stage/$slug/html"
if [ -d "$stage/$slug/html/documentation" ]; then mv "$stage/$slug/html/documentation" "$stage/$slug/documentation"; fi
# Keep the documentation link working from html/ after the move
grep -rl 'documentation/index.html' "$stage/$slug/html" --include='*.html' | xargs -r sed -i 's#"documentation/index.html"#"../documentation/index.html"#g'
if [ -d "$stage/$slug/documentation" ]; then sed -i 's#"\.\./assets/#"../html/assets/#g; s#"\.\./\([a-z0-9-]*\.html\)"#"../html/\1"#g' "$stage/$slug/documentation/index.html"; fi
mkdir -p "$stage/$slug/source/src" "$stage/$slug/source/tools" "$stage/$slug/source/vendor"
cp -r "$root/src/$slug" "$root/src/_core" "$stage/$slug/source/src/"
cp -r "$root/tools/build.mjs" "$root/tools/lib" "$stage/$slug/source/tools/"
cp -r "$root/vendor/lucide" "$root/vendor/fonts" "$stage/$slug/source/vendor/"
mkdir -p "$root/dist"
out="$root/dist/$slug-v$version.zip"
rm -f "$out"
(cd "$stage" && zip -qr "$out" "$slug")
rm -rf "$stage"
echo "✓ $out ($(du -h "$out" | cut -f1))"
