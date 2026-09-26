"""Genera public/images/annobon-topo.svg: Annobón con curvas de nivel en blanco (fondo transparente).

La costa está calcada de un mapa dibujado de la isla; el relieve es estilizado (no cartográfico),
con curvas muy juntas, como una huella dactilar, e isobatas en el mar.

    python3 -m venv .venv && .venv/bin/pip install numpy scikit-image
    .venv/bin/python scripts/generate-annobon-topo.py
"""

import numpy as np
from scipy.ndimage import distance_transform_edt, gaussian_filter
from skimage.draw import polygon as fill_polygon
from skimage.measure import approximate_polygon, find_contours

W, H = 520, 780  # viewBox
STEP = 2  # unidades de viewBox por celda de la malla
LINE = "#f6f3ec"

# Costa calcada del mapa dibujado de Annobón (px del original de 275 × 400), norte arriba.
# De Punta Lale en sentido horario: San Juan, San Pedro, Punta Dologaní, San Antonio del Sur,
# Punta Mamjoba, Santa Cruz y Punta Jisco.
MAP_COAST = [
    (115, 24), (122, 34), (132, 43), (146, 52), (160, 62), (172, 73), (180, 82), (190, 92),
    (198, 103), (203, 116), (207, 131), (212, 146), (218, 161), (220, 173), (215, 182),
    (221, 192), (222, 207), (220, 222), (220, 240), (218, 256), (218, 271), (215, 286),
    (213, 296), (219, 304), (210, 313), (201, 319), (199, 326), (189, 331), (175, 332),
    (165, 328), (158, 320), (150, 313), (139, 313), (128, 316), (119, 317), (113, 323),
    (110, 334), (104, 330), (100, 318), (95, 307), (90, 298), (84, 290), (79, 280),
    (78, 268), (83, 258), (93, 252), (104, 246), (112, 238), (114, 225), (112, 214),
    (108, 204), (103, 194), (96, 185), (90, 175), (84, 161), (80, 150), (74, 140),
    (68, 132), (64, 124), (62, 114), (59, 105), (51, 100), (47, 92), (51, 85), (57, 80),
    (66, 75), (73, 68), (79, 60), (88, 54), (95, 48), (101, 41), (108, 32),
]
YEGANY = [(229, 33), (236, 29), (243, 32), (244, 39), (239, 46), (232, 45), (228, 39)]


SCALE = 2.3


def to_view(points):
    """Del mapa original al viewBox."""
    return [((x - 47) * SCALE + 33, (y - 24) * SCALE + 29) for x, y in points]


COAST = to_view(MAP_COAST)

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

mask = np.zeros((gh, gw), bool)
for outline in (COAST, to_view(YEGANY)):
    pts = smooth_closed(outline, samples=6) / STEP
    rr, cc = fill_polygon(pts[:, 1], pts[:, 0], mask.shape)
    mask[rr, cc] = True



def noise(sigma, amp):
    n = gaussian_filter(rng.standard_normal((gh, gw)), sigma)
    return n / np.abs(n).max() * amp


# Costa recortada: se desplaza el borde con ruido para que no quede como una curva de dibujo.
signed = (distance_transform_edt(mask) - distance_transform_edt(~mask)) * STEP
mask = signed + noise(2, 3) > 0
d_in = distance_transform_edt(mask) * STEP
d_out = distance_transform_edt(~mask) * STEP


# Relieve: Quioveo (598 m, el más alto), Santamina, Abicin y Pico del Fuego; el lago Mazafim en su cráter.
(FUEGO, LAKE, ABICIN, QUIOVEO, SANTAMINA) = to_view([(135, 118), (113, 138), (148, 182), (117, 193), (182, 228)])
r = np.hypot((xx - LAKE[0]) / (12 * SCALE), (yy - LAKE[1]) / (15 * SCALE))  # 1 = orilla del lago
crater_rim = np.exp(-(((r - 1.5) / 0.7) ** 2) / 2)
peaks = (
    1.00 * gauss(xx, yy, *QUIOVEO, 60, 75)
    + 0.80 * gauss(xx, yy, *SANTAMINA, 55, 70)
    + 0.72 * gauss(xx, yy, *ABICIN, 45, 55)
    + 0.62 * gauss(xx, yy, *FUEGO, 35, 40)
    + 0.30 * crater_rim
    + 0.25 * gauss(xx, yy, *to_view([(140, 180)])[0], 140, 220)
)
ramp = 1 - np.exp(-d_in / 22)
land = ramp * (0.12 + peaks) + noise(9, 0.05) * ramp
sea = -d_out / 60 + noise(14, 0.12) * np.clip(d_out / 40, 0, 1)
field = np.where(mask, land, sea)
field = gaussian_filter(field, 1.2)

# Lago A Pot: superficie plana (sin curvas dentro) con su orilla dibujada aparte.
lake = r + noise(4, 0.08) < 1
shore = (r >= 1) & (r < 1.2)
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
for level in np.linspace(0.03, field.max() * 0.98, 36):
    d = " ".join(paths(level))
    if d:
        layers.append(f'<path d="{d}" opacity="0.75"/>')
layers.append(f'<path d="{" ".join(paths(0.5, lake_edge))}" stroke-width="1.4"/>')

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke="{LINE}" '
    f'stroke-width="0.7" stroke-linejoin="round" stroke-linecap="round">' + "".join(layers) + "</svg>\n"
)
with open("public/images/annobon-topo.svg", "w") as f:
    f.write(svg)
print(f"annobon-topo.svg: {len(svg) / 1024:.0f} KB")
