(() => {
  'use strict';
  const languageButtons = document.querySelectorAll('[data-set-lang]');
  function setLanguage(language) {
    const chinese = language === 'zh';
    document.documentElement.lang = chinese ? 'zh-CN' : 'en';
    document.title = chinese ? '吴天一 · 研究与工程实践' : 'Tianyi Wu · Research & Engineering';
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.setLang === language)));
    document.querySelector('nav').setAttribute('aria-label', chinese ? '主导航' : 'Main navigation');
    document.querySelector('.languages').setAttribute('aria-label', chinese ? '语言' : 'Language');
    document.querySelector('.filters').setAttribute('aria-label', chinese ? '论文筛选' : 'Publication filters');
    document.querySelector('meta[name="description"]').content = chinese ? '吴天一：多模态学习、情感计算与时序建模。研究论文、项目与工程经历。' : 'Tianyi Wu — multimodal learning, affective computing and temporal modeling. Research, publications and engineering experience.';
  }
  languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.setLang)));
  // Every new page load starts in English, independent of browser locale.
  setLanguage('en');
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    document.querySelectorAll('.paper').forEach(paper => { paper.hidden = filter !== 'all' && paper.dataset.status !== filter; });
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('nav a').forEach(link => {
          const active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
  }
})();
