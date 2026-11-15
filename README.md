# Temas para Claude Code

Un mod de Claude Code que añade varios temas de color inspirados en temas populares de editores, y un comando `/tema` para cambiar entre ellos. Los temas se ven en la app de escritorio y en la app móvil de Claude; la terminal no dibuja temas.

| Nombre | Tema | Modos |
| --- | --- | --- |
| `synthwave` | Synthwave '84, con fondo animado de sol retro y rejilla neón | oscuro |
| `dracula` | Dracula | oscuro |
| `tokyo` | Tokyo Night | oscuro |
| `gruvbox` | Gruvbox | claro y oscuro |
| `onedark` | One Dark Pro Night Flat | oscuro |
| `jellyfish` | Jellyfish | oscuro |
| `claude` | Claude: fondo negro puro para OLED y acento naranja de Claude | oscuro |

## Instalación

En el prompt de una sesión de Claude Code en la terminal:

```
/plugin install temas --marketplace cristiand395/claude-code-themes
```

Responde `y` para añadir el marketplace y elige el ámbito (user, el primero, lo activa en todas tus sesiones).

Desde una shell:

```bash
claude plugin install temas --marketplace cristiand395/claude-code-themes
```

En la app de escritorio, donde `/plugin` no está disponible: pulsa + junto al cuadro del prompt, luego Plugins, Add marketplace con `cristiand395/claude-code-themes`, y después Add plugin.

## Uso

- `/tema` lista los temas y marca el activo.
- `/tema <nombre>` cambia al tema indicado, por ejemplo `/tema dracula`.
- `/tema off` vuelve al tema normal de la app.

El tema elegido se recuerda entre sesiones. Cuando se añade un tema nuevo al mod, se activa la primera vez que el mod carga para poder verlo.

## Añadir un tema

Los temas viven en `hooks/themes.ts`. Cada uno pasa una paleta a `makeColors` (en `hooks/make-colors.js`): superficies y textos en `anchors`, y cinco colores de rol (`accent`, `danger`, `success`, `warning`, `pro`) que también colorean el código.

## Licencia

MIT
