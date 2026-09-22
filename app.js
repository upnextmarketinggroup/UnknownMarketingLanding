(() => {
  const config = window.LANDING_CONFIG;
  const intro = document.querySelector('#intro');
  const landing = document.querySelector('#landing');
  const video = document.querySelector('#intro-video');
  const placeholder = document.querySelector('#intro-placeholder');
  const play = document.querySelector('#play');
  const sound = document.querySelector('#sound');
  const progress = document.querySelector('#progress');
  let timer;
  let frame;
  let active = false;
  let generation = 0;

  document.querySelector('#year').textContent = new Date().getFullYear();
  for (const item of config.links) {
    let url;
    try { url = new URL(item.url); } catch { /* Empty URLs are placeholders. */ }
    const linked = url && ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol);
    const card = document.createElement(linked ? 'a' : 'div');
    card.className = 'link-card';
    if (linked) card.href = url.href;
    const icon = document.createElement('span');
    icon.className = 'link-icon'; icon.textContent = item.icon; icon.setAttribute('aria-hidden', 'true');
    const copy = document.createElement('span'); copy.className = 'link-copy';
    const title = document.createElement('span'); title.className = 'link-title'; title.textContent = item.title;
    const subtitle = document.createElement('span'); subtitle.className = 'link-subtitle'; subtitle.textContent = item.subtitle;
    copy.append(title, subtitle);
    const badge = document.createElement('span');
    badge.className = linked ? 'link-arrow' : 'coming-soon';
    badge.textContent = linked ? '↗' : 'COMING SOON';
    card.append(icon, copy, badge);
    document.querySelector('#links').append(card);
  }

  function finish() {
    if (!active) return;
    active = false; generation++;
    clearTimeout(timer); cancelAnimationFrame(frame); video.pause();
    intro.hidden = true; landing.hidden = false;
    document.querySelector('#headline').focus({ preventScroll: true });
  }
  async function attemptPlay() {
    const attempt = generation;
    try { await video.play(); }
    catch { if (active && attempt === generation) play.hidden = false; }
  }
  function start() {
    clearTimeout(timer); cancelAnimationFrame(frame);
    active = true; generation++;
    landing.hidden = true; intro.hidden = false; progress.style.width = '0%';
    play.hidden = true; sound.hidden = !config.videoSrc;
    video.hidden = !config.videoSrc; placeholder.hidden = !!config.videoSrc;
    document.querySelector('#skip').focus({ preventScroll: true });
    if (config.videoSrc) {
      if (!video.getAttribute('src')) {
        if (config.posterSrc) video.poster = config.posterSrc;
        video.src = config.videoSrc;
      }
      video.currentTime = 0; video.muted = true; sound.textContent = 'Sound off';
      attemptPlay();
      // A stalled connection must not trap visitors in the introduction.
      timer = setTimeout(() => { if (active && video.readyState < 3) finish(); }, 12000);
    } else {
      const duration = Math.max(500, Number(config.placeholderDurationMs) || 3500);
      const began = performance.now();
      function tick(now) {
        if (!active) return;
        const fraction = Math.min((now - began) / duration, 1);
        progress.style.width = `${fraction * 100}%`;
        if (fraction === 1) finish(); else frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }
  }
  video.addEventListener('ended', finish);
  video.addEventListener('error', finish);
  video.addEventListener('timeupdate', () => {
    if (Number.isFinite(video.duration) && video.duration > 0) progress.style.width = `${video.currentTime / video.duration * 100}%`;
  });
  video.addEventListener('playing', () => { play.hidden = true; });
  play.addEventListener('click', attemptPlay);
  sound.addEventListener('click', () => { video.muted = !video.muted; sound.textContent = video.muted ? 'Sound off' : 'Sound on'; });
  document.querySelector('#skip').addEventListener('click', finish);
  document.querySelector('#replay').addEventListener('click', start);
  document.querySelector('#replay').hidden = false;
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && active) finish(); });
  // Respect reduced-motion preferences; the visitor can explicitly replay the intro.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
})();
