// Slideshow modal logic for 1041 Short Leaf Circle listing
(function() {
  const PHOTOS = [
    { src: 'images/RAB2025-1.jpg',  caption: 'Photo 1' },
    { src: 'images/RAB2025-5.jpg',  caption: 'Photo 2' },
    { src: 'images/RAB2025-6.jpg',  caption: 'Photo 3' },
    { src: 'images/RAB2025-9.jpg',  caption: 'Photo 4' },
    { src: 'images/RAB2025-10.jpg', caption: 'Photo 5' },
    { src: 'images/RAB2025-11.jpg', caption: 'Photo 6' },
    { src: 'images/RAB2025-13.jpg', caption: 'Photo 7' },
    { src: 'images/RAB2025-14.jpg', caption: 'Photo 8' },
    { src: 'images/RAB2025-15.jpg', caption: 'Photo 9' },
    { src: 'images/RAB2025-17.jpg', caption: 'Photo 10' },
    { src: 'images/RAB2025-18.jpg', caption: 'Photo 11' },
    { src: 'images/RAB2025-19.jpg', caption: 'Photo 12' },
    { src: 'images/RAB2025-20.jpg', caption: 'Photo 13' },
    { src: 'images/RAB2025-22.jpg', caption: 'Photo 14' },
    { src: 'images/RAB2025-23.jpg', caption: 'Photo 15' },
    { src: 'images/RAB2025-24.jpg', caption: 'Photo 16' },
    { src: 'images/RAB2025-25.jpg', caption: 'Photo 17' },
    { src: 'images/RAB2025-26.jpg', caption: 'Photo 18' },
    { src: 'images/RAB2025-28.jpg', caption: 'Photo 19' },
    { src: 'images/RAB2025-29.jpg', caption: 'Photo 20' },
    { src: 'images/RAB2025-30.jpg', caption: 'Photo 21' },
    { src: 'images/RAB2025-31.jpg', caption: 'Photo 22' },
    { src: 'images/RAB2025-32.jpg', caption: 'Photo 23' },
    { src: 'images/RAB2025-33.jpg', caption: 'Photo 24' },
    { src: 'images/RAB2025-34.jpg', caption: 'Photo 25' },
    { src: 'images/RAB2025-35.jpg', caption: 'Photo 26' },
    { src: 'images/RAB2025-36.jpg', caption: 'Photo 27' },
    { src: 'images/RAB2025-37.jpg', caption: 'Photo 28' },
    { src: 'images/RAB2025-38.jpg', caption: 'Photo 29' },
    { src: 'images/RAB2025-39.jpg', caption: 'Photo 30' },
    { src: 'images/RAB2025-40.jpg', caption: 'Photo 31' },
    { src: 'images/RAB2025-41.jpg', caption: 'Photo 32' },
    { src: 'images/RAB2025-42.jpg', caption: 'Photo 33' },
    { src: 'images/RAB2025-43.jpg', caption: 'Photo 34' },
    { src: 'images/RAB2025-44.jpg', caption: 'Photo 35' },
    { src: 'images/RAB2025-45.jpg', caption: 'Photo 36' },
    { src: 'images/RAB2025-46.jpg', caption: 'Photo 37' },
    { src: 'images/RAB2025-47.jpg', caption: 'Photo 38' },
    { src: 'images/RAB2025-48.jpg', caption: 'Photo 39' },
    { src: 'images/RAB2025-49.jpg', caption: 'Photo 40' },
    { src: 'images/RAB2025-50.jpg', caption: 'Photo 41' },
    { src: 'images/RAB2025-51.jpg', caption: 'Photo 42' },
    { src: 'images/RAB2025-52.jpg', caption: 'Photo 43' },
    { src: 'images/RAB2025-53.jpg', caption: 'Photo 44' },
    { src: 'images/RAB2025-54.jpg', caption: 'Photo 45' },
    { src: 'images/RAB2025-55.jpg', caption: 'Photo 46' },
  ];

  let i = 0;
  const $ = (sel) => document.querySelector(sel);

  // Wire up hero photo + thumbs
  function init() {
    const heroImg = $('#heroPhoto');
    if (heroImg) heroImg.src = PHOTOS[0].src;

    const thumbs = document.querySelectorAll('.thumb img');
    thumbs.forEach((el, idx) => { el.src = PHOTOS[idx + 1] ? PHOTOS[idx + 1].src : PHOTOS[0].src; });

    // build modal thumbs
    const tray = $('#modalThumbs');
    PHOTOS.forEach((p, idx) => {
      const btn = document.createElement('button');
      btn.className = 'modal-thumb';
      btn.innerHTML = `<img src="${p.src}" alt="">`;
      btn.addEventListener('click', () => goTo(idx));
      tray.appendChild(btn);
    });

    document.querySelectorAll('[data-open-slideshow]').forEach((el) => {
      const startAt = parseInt(el.dataset.openSlideshow, 10) || 0;
      el.addEventListener('click', () => open(startAt));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(startAt); }
      });
    });

    $('#modalClose').addEventListener('click', close);
    $('#navPrev').addEventListener('click', () => goTo(i - 1));
    $('#navNext').addEventListener('click', () => goTo(i + 1));

    document.addEventListener('keydown', (e) => {
      if (!$('#modal').classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goTo(i - 1);
      if (e.key === 'ArrowRight') goTo(i + 1);
    });

    // Click backdrop to close
    $('#modal').addEventListener('click', (e) => {
      if (e.target.id === 'modal' || e.target.id === 'modalStage') close();
    });
  }

  function open(idx) {
    i = idx % PHOTOS.length;
    render();
    $('#modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    $('#modal').classList.remove('open');
    document.body.style.overflow = '';
  }
  function goTo(idx) {
    i = ((idx % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
    render();
  }
  function render() {
    const p = PHOTOS[i];
    $('#modalImg').src = p.src;
    $('#modalImg').alt = p.caption;
    $('#modalCaption').textContent = p.caption;
    $('#modalCount').innerHTML = `<b>${String(i+1).padStart(2,'0')}</b> / ${String(PHOTOS.length).padStart(2,'0')}`;
    document.querySelectorAll('.modal-thumb').forEach((el, idx) => {
      el.classList.toggle('active', idx === i);
      if (idx === i) el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
