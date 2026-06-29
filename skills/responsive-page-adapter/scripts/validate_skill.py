#!/usr/bin/env python3
"""Validate the responsive-page-adapter Codex skill for repository use."""

from __future__ import annotations

import re
import sys
from pathlib import Path


REQUIRED_SECTIONS = [
    "Core Principle",
    "Supported Task Modes",
    "Diagnostic Gate",
    "Baseline Mapping",
    "Non-Negotiable Rules",
    "Unified State Rule",
    "CSS Governance",
    "Breakpoint Semantics",
    "Fix Order",
    "Validation Matrix",
    "Output Style",
]

REQUIRED_PHRASES = [
    "先同源，再重排，最后美化",
    "content, structure, interaction, media, visual, or CSS priority",
    "module mapping table",
    "title, body/content summary, quantity/counts, canonical order, image/background requirements, interactions, state source, mobile-allowed changes, and prohibited changes",
    "内容系统双写",
    "交互状态不同源",
    "mobile 结构重写过度",
    "CSS 优先级失控",
    "断点语义不清",
    "视觉问题和结构问题混在一起",
    "display: none",
    "For implementation tasks",
    "For planning, review, or Figma-only",
]

REQUIRED_BREAKPOINT_WIDTHS = ["375", "390", "414", "430", "768", "1024", "1440", "1920"]


def fail(message: str) -> int:
    print(f"FAIL: {message}", file=sys.stderr)
    return 1


def parse_frontmatter(text: str) -> dict[str, str]:
    match = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not match:
        raise ValueError("SKILL.md must start with YAML frontmatter")

    values: dict[str, str] = {}
    for raw_line in match.group(1).splitlines():
        if not raw_line.strip():
            continue
        if ":" not in raw_line:
            raise ValueError(f"Invalid frontmatter line: {raw_line!r}")
        key, value = raw_line.split(":", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values


def main() -> int:
    skill_dir = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    skill_md = skill_dir / "SKILL.md"
    openai_yaml = skill_dir / "agents" / "openai.yaml"

    if not skill_md.exists():
        return fail("SKILL.md not found")
    if not openai_yaml.exists():
        return fail("agents/openai.yaml not found")

    text = skill_md.read_text(encoding="utf-8")

    try:
        frontmatter = parse_frontmatter(text)
    except ValueError as exc:
        return fail(str(exc))

    name = frontmatter.get("name", "")
    description = frontmatter.get("description", "")

    if name != "responsive-page-adapter":
        return fail("frontmatter name must be responsive-page-adapter")
    if not re.fullmatch(r"[a-z0-9-]{1,64}", name):
        return fail("frontmatter name must be lowercase hyphen-case")
    if not description:
        return fail("frontmatter description is required")
    if len(description) > 1024:
        return fail("frontmatter description must be 1024 characters or fewer")
    if "<" in description or ">" in description:
        return fail("frontmatter description must not contain angle brackets")

    for section in REQUIRED_SECTIONS:
        if f"## {section}" not in text:
            return fail(f"missing required section: {section}")

    for phrase in REQUIRED_PHRASES:
        if phrase not in text:
            return fail(f"missing required phrase: {phrase}")

    for width in REQUIRED_BREAKPOINT_WIDTHS:
        if f"`{width}`" not in text and f"`{width}x" not in text:
            return fail(f"missing required acceptance breakpoint width: {width}")

    if "Use $responsive-page-adapter" not in openai_yaml.read_text(encoding="utf-8"):
        return fail("agents/openai.yaml default_prompt must mention $responsive-page-adapter")

    print("OK: responsive-page-adapter skill is valid")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
