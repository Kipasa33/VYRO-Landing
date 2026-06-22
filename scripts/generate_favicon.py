"""
VYRO premium favicon generator.

Design goals (per brand brief):
- Fully transparent background (no white square, no white padding).
- Dark navy rounded "squircle" badge that fills ~90% of the canvas.
- Clean, bold, geometric cyan-gradient V mark that fills most of the badge.
- Sharp, legible edges at 16 / 32 / 48 px (rendered from a high-res master via LANCZOS).
- Premium AI-startup identity: dark navy base, cyan-blue accent.

Outputs (in /public):
  favicon.ico            -> multi-size 16/32/48
  icon-16x16.png
  icon-32x32.png
  icon-192x192.png
  icon-512x512.png
  apple-touch-icon.png   -> 180x180 (opaque dark badge edge-to-edge for iOS)
"""

import os
from PIL import Image, ImageDraw

PUBLIC = os.path.join(os.path.dirname(__file__), "..", "public")

# Brand palette
NAVY_TOP = (19, 26, 46)      # #131A2E  subtle lighter navy (top)
NAVY_BOT = (8, 11, 22)       # #080B16  deep navy/black (bottom)
CYAN_TOP = (103, 232, 249)   # #67E8F9  bright cyan
CYAN_MID = (34, 211, 238)    # #22D3EE  brand cyan (matches theme_color)
BLUE_BOT = (59, 130, 246)    # #3B82F6  electric blue


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(len(a)))


def vertical_gradient(size, top, bottom):
    """Vertical RGB gradient image."""
    w, h = size, size
    grad = Image.new("RGB", (w, h))
    px = grad.load()
    for y in range(h):
        c = lerp(top, bottom, y / max(1, h - 1))
        for x in range(w):
            px[x, y] = c
    return grad


def diagonal_gradient(size, c0, c1, c2):
    """Diagonal 3-stop gradient (top-left -> mid -> bottom-right) for the V."""
    w, h = size, size
    grad = Image.new("RGB", (w, h))
    px = grad.load()
    maxd = (w - 1) + (h - 1)
    for y in range(h):
        for x in range(w):
            t = (x + y) / maxd
            if t < 0.5:
                c = lerp(c0, c1, t / 0.5)
            else:
                c = lerp(c1, c2, (t - 0.5) / 0.5)
            px[x, y] = c
    return grad


def rounded_mask(size, radius):
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    return m


def build_master(S=1024, transparent_corners=True):
    """Render the icon at resolution S. Returns RGBA image."""
    # supersample for crisp anti-aliasing
    SS = S * 4
    img = Image.new("RGBA", (SS, SS), (0, 0, 0, 0))

    # --- Badge (rounded navy squircle) ---
    if transparent_corners:
        margin = int(SS * 0.05)          # badge fills ~90% of canvas
    else:
        margin = 0                        # edge-to-edge (apple-touch)
    badge_size = SS - 2 * margin
    radius = int(badge_size * 0.235)

    badge_grad = vertical_gradient(badge_size, NAVY_TOP, NAVY_BOT)
    badge_mask = rounded_mask(badge_size, radius)
    img.paste(badge_grad, (margin, margin), badge_mask)

    # subtle top sheen for depth
    sheen = Image.new("RGBA", (SS, SS), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sheen)
    sd.rounded_rectangle(
        [margin, margin, SS - margin, margin + int(badge_size * 0.5)],
        radius=radius, fill=(255, 255, 255, 14),
    )
    sheen_mask = Image.new("L", (SS, SS), 0)
    ImageDraw.Draw(sheen_mask).rounded_rectangle(
        [margin, margin, SS - margin, SS - margin], radius=radius, fill=255
    )
    img = Image.composite(Image.alpha_composite(img, sheen), img, sheen_mask)

    # --- Geometric V mark ---
    cx = SS // 2
    y_top = int(SS * 0.305)
    y_bot = int(SS * 0.735)
    left_x = int(SS * 0.265)
    right_x = int(SS * 0.735)
    thickness = int(SS * 0.150)

    v_mask = Image.new("L", (SS, SS), 0)
    vd = ImageDraw.Draw(v_mask)
    vd.line(
        [(left_x, y_top), (cx, y_bot), (right_x, y_top)],
        fill=255, width=thickness, joint="curve",
    )
    r = thickness // 2
    # rounded caps at the two top ends
    for (ex, ey) in [(left_x, y_top), (right_x, y_top)]:
        vd.ellipse([ex - r, ey - r, ex + r, ey + r], fill=255)

    v_grad = diagonal_gradient(SS, CYAN_TOP, CYAN_MID, BLUE_BOT)
    v_layer = Image.new("RGBA", (SS, SS), (0, 0, 0, 0))
    v_layer.paste(v_grad, (0, 0), v_mask)

    # soft cyan glow behind the V for a premium look
    glow = Image.new("RGBA", (SS, SS), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gcx, gcy = cx, int((y_top + y_bot) / 2)
    gr = int(SS * 0.30)
    gd.ellipse([gcx - gr, gcy - gr, gcx + gr, gcy + gr], fill=(34, 211, 238, 60))
    from PIL import ImageFilter
    glow = glow.filter(ImageFilter.GaussianBlur(SS * 0.04))
    glow_clipped = Image.new("RGBA", (SS, SS), (0, 0, 0, 0))
    glow_clipped = Image.composite(glow, glow_clipped, badge_full_mask(SS, margin, badge_size, radius))

    img = Image.alpha_composite(img, glow_clipped)
    img = Image.alpha_composite(img, v_layer)

    return img.resize((S, S), Image.LANCZOS)


def badge_full_mask(SS, margin, badge_size, radius):
    m = Image.new("L", (SS, SS), 0)
    ImageDraw.Draw(m).rounded_rectangle(
        [margin, margin, SS - margin, SS - margin], radius=radius, fill=255
    )
    return m


def main():
    master = build_master(1024, transparent_corners=True)

    # PNG icons (transparent corners)
    for size in (512, 192, 32, 16):
        master.resize((size, size), Image.LANCZOS).save(
            os.path.join(PUBLIC, f"icon-{size}x{size}.png")
        )

    # 48px for the .ico
    ico_48 = master.resize((48, 48), Image.LANCZOS)
    ico_32 = master.resize((32, 32), Image.LANCZOS)
    ico_16 = master.resize((16, 16), Image.LANCZOS)
    ico_48.save(
        os.path.join(PUBLIC, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    # apple-touch-icon: iOS ignores transparency & adds its own rounding,
    # so render edge-to-edge opaque dark badge.
    apple = build_master(180, transparent_corners=False)
    apple.convert("RGB").save(os.path.join(PUBLIC, "apple-touch-icon.png"))

    print("Generated favicon assets.")


if __name__ == "__main__":
    main()
