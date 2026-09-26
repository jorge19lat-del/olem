"""Genera public/images/annobon-topo.svg: Annobón con curvas de nivel en blanco (fondo transparente).

Es un relieve estilizado (no cartográfico): la costa es la curva 0, el pico Quioveo al sur,
el cráter del lago A Pot al norte, y unas pocas isobatas en el mar.

    python3 -m venv .venv && .venv/bin/pip install numpy scikit-image
    .venv/bin/python scripts/generate-annobon-topo.py
"""

import numpy as np
from scipy.ndimage import distance_transform_edt, gaussian_filter
from skimage.draw import polygon as fill_polygon
from skimage.measure import approximate_polygon, find_contours

W, H = 600, 800  # viewBox
STEP = 2  # unidades de viewBox por celda de la malla
LINE = "#f6f3ec"

# Costa (x, y) en el viewBox, de norte a sur en sentido horario. Norte arriba.
COAST = [
    (236, 104), (280, 82), (340, 96), (376, 132), (410, 164), (444, 192), (452, 240),
    (446, 290), (436, 330), (444, 368), (438, 420), (420, 470), (408, 520), (394, 580),
    (364, 652), (330, 698), (292, 722), (256, 708), (236, 670), (220, 640), (192, 598),
    (170, 556), (166, 510), (160, 460), (150, 420), (158, 372), (150, 330), (152, 280),
    (170, 222), (190, 170), (208, 128),
]


def smooth_closed(points, samples=16):
    """Catmull-Rom cerrada para que la costa no tenga esquinas."""
    p = np.array(points, float)
    out = []
    n = len(p)
    for i in range(n):
        p0, p1, p2, p3 = p[i - 1], p[i], p[(i + 1) % n], p[(i + 2) % n]
        for t in np.linspace(0, 1, samples, endpoint=False):
            t2, t3 = t * t, t * t * t
            out.append(0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    return np.array(out)


def gauss(xx, yy, cx, cy, sx, sy=None):
    sy = sy or sx
    return np.exp(-(((xx - cx) / sx) ** 2 + ((yy - cy) / sy) ** 2) / 2)


rng = np.random.default_rng(7)
gw, gh = W // STEP, H // STEP
yy, xx = np.mgrid[0:gh, 0:gw] * STEP

coast = smooth_closed(COAST) / STEP
mask = np.zeros((gh, gw), bool)
rr, cc = fill_polygon(coast[:, 1], coast[:, 0], mask.shape)
mask[rr, cc] = True



def noise(sigma, amp):
    n = gaussian_filter(rng.standard_normal((gh, gw)), sigma)
    return n / np.abs(n).max() * amp


# Costa recortada: se desplaza el borde con ruido para que no quede como una curva de dibujo.
signed = (distance_transform_edt(mask) - distance_transform_edt(~mask)) * STEP
mask = signed + noise(3, 7) + noise(8, 10) > 0
d_in = distance_transform_edt(mask) * STEP
d_out = distance_transform_edt(~mask) * STEP


# Relieve: rampa desde la costa + Quioveo (sur) + borde del cráter con el lago A Pot (norte).
LAKE = (312, 250)
r = np.hypot(xx - LAKE[0], (yy - LAKE[1]) * 1.15)
crater_rim = np.exp(-(((r - 42) / 20) ** 2) / 2)
peaks = (
    1.00 * gauss(xx, yy, 300, 540, 70, 85)
    + 0.30 * gauss(xx, yy, 300, 270, 90, 80)
    + 0.35 * gauss(xx, yy, 250, 410, 55, 90)
    + 0.30 * crater_rim
)
ramp = 1 - np.exp(-d_in / 22)
land = ramp * (0.12 + peaks) + noise(9, 0.05) * ramp
sea = -d_out / 60 + noise(14, 0.12) * np.clip(d_out / 40, 0, 1)
field = np.where(mask, land, sea)
field = gaussian_filter(field, 1.2)

# Lago A Pot: superficie plana (sin curvas dentro) con su orilla dibujada aparte.
lake = r + noise(4, 3) < 24
shore = (r >= 24) & (r < 30)
field[lake] = field[shore].min() - 0.01
lake_edge = gaussian_filter(lake.astype(float), 1.0)


def paths(level, source=None):
    out = []
    for c in find_contours(field if source is None else source, level):
        c = approximate_polygon(c, tolerance=0.35) * STEP
        if len(c) < 8:
            continue
        pts = " ".join(f"{x:.1f} {y:.1f}" for y, x in c)
        out.append(f"M{pts}")
    return out


layers = []
# Isobatas: discontinuas y más tenues.
for i, level in enumerate([-0.4, -0.85, -1.4]):
    d = " ".join(paths(level))
    layers.append(f'<path d="{d}" stroke-dasharray="2 5" opacity="{0.45 - i * 0.1:.2f}"/>')
# Costa.
layers.append(f'<path d="{" ".join(paths(0.0))}" stroke-width="1.6"/>')
# Curvas de nivel (las que caen dentro del lago se quitan).
for level in np.arange(0.06, 1.2, 0.055):
    d = " ".join(paths(level))
    if d:
        layers.append(f'<path d="{d}" opacity="0.8"/>')
layers.append(f'<path d="{" ".join(paths(0.5, lake_edge))}" stroke-width="1.4"/>')

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke="{LINE}" '
    f'stroke-width="0.9" stroke-linejoin="round" stroke-linecap="round">' + "".join(layers) + "</svg>\n"
)
with open("public/images/annobon-topo.svg", "w") as f:
    f.write(svg)
print(f"annobon-topo.svg: {len(svg) / 1024:.0f} KB")
