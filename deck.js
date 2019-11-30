'use strict';

(() => {
  const state = {
    page: 0,
  };

  function render() {
    const sections = document.querySelectorAll('section');
    const totalPages = sections.length;

    document.body.style.margin = `0`;
    document.body.style.background = '#000'

    for (const section of sections) {
      section.style.display = 'none';
    }

    const section = sections[state.page];
    section.style.display = null;
    section.style['box-shadow'] = 'unset';
    const scale = Math.min(window.innerWidth / section.clientWidth,
                           window.innerHeight / section.clientHeight);
    section.style.transform = `scale(${scale})`;

    const top = (window.innerHeight - section.clientHeight) / 2;
    const left = (window.innerWidth - section.clientWidth) / 2;
    section.style.margin = `${top}px 0 0 ${left}px`;
  }

  function flip(direction) {
    const sections = document.querySelectorAll('section');
    const totalPages = sections.length;

    switch (direction) {
    case 'next':
      state.page = Math.min(state.page + 1, totalPages - 1);
      break;
    case 'prev':
      state.page = Math.max(state.page - 1, 0);
      break;
    }

    render();
  }

  function enter() {
    document.body.classList.add("deck");

    document.body.addEventListener('keydown', (ev) => {
      switch (ev.key) {
      case 'ArrowLeft':
        flip('prev');
        break;
      case 'ArrowRight':
        flip('next');
        break;
      }
      return false;
    });

    document.body.addEventListener('wheel', (ev) => {
      if (ev.deltaY > 0) flip('next');
      else flip('prev');
      return false;
    });

    render();
  }

  window.addEventListener('load', () => {
    document.body.addEventListener('keydown', (ev) => {
      if (ev.key === 's') enter();
      return false;
    });
  });
})();