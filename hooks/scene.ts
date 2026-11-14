// Retro sunset for Synthwave '84: striped sun on the horizon, scrolling neon grid below.
export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
.grid{animation:run 2.4s linear infinite}
@keyframes run{from{transform:translateY(0)}to{transform:translateY(60px)}}
.sun{animation:pulse 6s ease-in-out infinite}
@keyframes pulse{50%{opacity:.8}}
@media (prefers-reduced-motion:reduce){.grid,.sun{animation:none}}
</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140f22"/><stop offset=".6" stop-color="#2a1640"/><stop offset=".62" stop-color="#3d1450"/><stop offset="1" stop-color="#120c1c"/></linearGradient>
<linearGradient id="sunfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fede5d"/><stop offset=".5" stop-color="#ff8b39"/><stop offset="1" stop-color="#f92aad"/></linearGradient>
<mask id="cuts"><rect width="1600" height="1000" fill="#fff"/><g fill="#000"><rect y="470" width="1600" height="6"/><rect y="500" width="1600" height="9"/><rect y="530" width="1600" height="12"/><rect y="560" width="1600" height="16"/></g></mask>
<filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
<clipPath id="above"><rect width="1600" height="620"/></clipPath><clipPath id="ground"><rect y="620" width="1600" height="380"/></clipPath>
<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d1450" stop-opacity="1"/><stop offset=".35" stop-color="#3d1450" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1600" height="1000" fill="url(#sky)"/>
<g class="sun"><circle cx="800" cy="460" r="200" fill="#f92aad" opacity=".45" filter="url(#glow)"/>
<circle cx="800" cy="460" r="180" fill="url(#sunfill)" mask="url(#cuts)" clip-path="url(#above)"/></g>
<rect y="618" width="1600" height="4" fill="#ff7edb" opacity=".9"/>
<g clip-path="url(#ground)" stroke="#36f9f6" stroke-width="2" opacity=".6">
<g class="grid">${Array.from({ length: 8 }, (_, i) => `<line x1="0" x2="1600" y1="${620 + i * 60}" y2="${620 + i * 60}"/>`).join('')}</g>
${Array.from({ length: 25 }, (_, i) => `<line x1="800" y1="620" x2="${800 + (i - 12) * 260}" y2="1000"/>`).join('')}
</g>
<rect y="620" width="1600" height="380" fill="url(#fade)"/>
</svg>`
