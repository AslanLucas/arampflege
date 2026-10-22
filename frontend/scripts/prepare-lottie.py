"""Prepare the two decorative Lottie scenes (components/LottieScene) for the site.

Run once by hand when a source file changes. Recolours the fills to the brand palette in
app/styles/tokens.css, drops expressions (they point to a "Controller" layer that is not in the
files and would need eval) and editor-only keys, rounds numbers and writes compact JSON.

    python3 scripts/prepare-lottie.py "~/Downloads/Helping the needy.json" "~/Downloads/Helping Doctor to aged people.json"
"""

import json
import sys
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "animations"

# Source RGB (0-255) -> brand hex. Colours not listed stay as they are.
PALETTE = {
    "rollstuhl-spaziergang": {
        # Skin tones (179, 112, 45 and 247, 172, 176) stay as they are
        (216, 175, 40): "#c4567b",  # mustard: hat, trousers, flowers
        (86, 48, 60): "#3f0a20",  # outlines
        (164, 211, 241): "#e3b8c7",  # coat, clouds
        (235, 223, 195): "#e9ddd8",  # grey hair, hills
        (244, 238, 217): "#fbf8f5",  # sun
    },
    "beratung": {
        (255, 80, 92): "#e8a48f",  # skin
        (252, 60, 76): "#d4846f",  # skin shadow
        (211, 231, 236): "#f1e4e8",  # light clothing
        (185, 218, 225): "#e2c8d1",  # clothing shadow
        (227, 240, 241): "#f6eaee",
        (238, 250, 251): "#fbf8f5",
        (177, 166, 255): "#c4567b",  # patient clothing
        (158, 138, 255): "#aa1a4b",
        (121, 108, 237): "#8c1540",
        (17, 178, 216): "#7a1236",  # trousers
        (0, 145, 193): "#5e0f2e",
        (50, 24, 124): "#5e0f2e",  # hair
        (31, 13, 82): "#3f0a20",  # shoes
    },
}

DROP_KEYS = {"mn", "hd", "cix", "bm", "ix", "np"}


def hex_to_unit(value: str) -> list[float]:
    return [round(int(value[i : i + 2], 16) / 255, 4) for i in (1, 3, 5)]


def clean(node, palette):
    if isinstance(node, dict):
        if node.get("ty") in ("fl", "st") and not node["c"].get("a"):
            rgb = tuple(round(v * 255) for v in node["c"]["k"][:3])
            if rgb in palette:
                node["c"]["k"] = [*hex_to_unit(palette[rgb]), 1]
        # "x" is an expression only when it is a string; easing handles use "x" as well
        return {
            key: clean(value, palette)
            for key, value in node.items()
            if key not in DROP_KEYS and not (key == "x" and isinstance(value, str))
        }
    if isinstance(node, list):
        return [clean(value, palette) for value in node]
    if isinstance(node, float):
        return round(node, 2)
    return node


def main() -> None:
    sources = [Path(arg).expanduser() for arg in sys.argv[1:]]
    if len(sources) != 2:
        sys.exit(__doc__)
    OUT.mkdir(parents=True, exist_ok=True)
    for name, source in zip(PALETTE, sources):
        data = clean(json.loads(source.read_text()), PALETTE[name])
        target = OUT / f"{name}.json"
        target.write_text(json.dumps(data, separators=(",", ":")))
        print(f"Wrote {target} ({target.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
