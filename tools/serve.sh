#!/usr/bin/env bash
# Serve a built template locally: tools/serve.sh <slug> [port]
set -euo pipefail
slug="${1:?usage: tools/serve.sh <slug> [port]}"
root="$(cd "$(dirname "$0")/.." && pwd)"
exec python3 -m http.server "${2:-8080}" --directory "$root/templates/$slug"
