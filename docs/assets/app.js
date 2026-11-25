/* 站点交互：纯原生 JS，无依赖，可在 file:// 下工作。 */
(function () {
  'use strict';

  var root = typeof window.SITE_ROOT === 'string' ? window.SITE_ROOT : '';
  var data = Array.isArray(window.SKILLS_SEARCH_INDEX) ? window.SKILLS_SEARCH_INDEX : [];

  /* ---------- 站内搜索 ---------- */
  var input = document.getElementById('search-input');
  var panel = document.getElementById('search-results');

  function normalize(s) {
    return String(s || '').toLowerCase();
  }

  function renderResults(query) {
    if (!panel || !input) return;
    var q = normalize(query).trim();
    if (!q) {
      panel.hidden = true;
      panel.textContent = '';
      input.setAttribute('aria-expanded', 'false');
      return;
    }
    var terms = q.split(/\s+/).filter(Boolean);
    var hits = data.filter(function (item) {
      var hay = normalize(item.t + ' ' + item.s + ' ' + item.k);
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    }).slice(0, 12);

    panel.textContent = '';
    if (!hits.length) {
      var empty = document.createElement('p');
      empty.className = 'sr-empty';
      empty.textContent = '没有匹配的页面。试试“触发”“评估”“frontmatter”，或查看全站索引。';
      panel.appendChild(empty);
      var fallback = document.createElement('a');
      fallback.href = root + 'index-all.html';
      fallback.innerHTML = '<span class="sr-title">全站索引</span><span class="sr-section">按模块浏览全部页面</span>';
      panel.appendChild(fallback);
    } else {
      hits.forEach(function (item) {
        var a = document.createElement('a');
        a.href = root + item.u;
        var title = document.createElement('span');
        title.className = 'sr-title';
        title.textContent = item.t;
        var section = document.createElement('span');
        section.className = 'sr-section';
        section.textContent = item.s;
        a.appendChild(title);
        a.appendChild(section);
        panel.appendChild(a);
      });
    }
    panel.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  }

  if (input && panel) {
    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      var value = input.value;
      timer = setTimeout(function () { renderResults(value); }, 120);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        panel.hidden = true;
        input.setAttribute('aria-expanded', 'false');
        input.blur();
      }
      if (e.key === 'ArrowDown') {
        var first = panel.querySelector('a');
        if (first && !panel.hidden) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && e.target !== input) {
        panel.hidden = true;
        input.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      var typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
      if (e.key === '/' && !typing) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  /* ---------- 外部链接在新标签页打开 ---------- */
  var links = document.querySelectorAll('a[href^="http://"], a[href^="https://"]');
  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute('target', '_blank');
    links[i].setAttribute('rel', 'noopener noreferrer');
  }

  /* ---------- 目录高亮当前章节 ---------- */
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var linkById = {};
    for (var j = 0; j < tocLinks.length; j++) {
      var href = tocLinks[j].getAttribute('href');
      if (href && href.length > 1) {
        linkById[href.slice(1)] = tocLinks[j];
      }
    }
    var headings = [];
    Object.keys(linkById).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) headings.push(el);
    });
    if (headings.length) {
      var visible = {};
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting;
        });
        var activeId = null;
        for (var k = 0; k < headings.length; k++) {
          if (visible[headings[k].id]) { activeId = headings[k].id; break; }
        }
        tocLinks.forEach(function (a) { a.classList.remove('active'); });
        if (activeId && linkById[activeId]) linkById[activeId].classList.add('active');
      }, { rootMargin: '-110px 0px -65% 0px', threshold: 0 });
      headings.forEach(function (h) { observer.observe(h); });
    }
  }

  /* ---------- 让窄屏导航定位到当前章节 ---------- */
  var currentNav = document.querySelector('.site-nav a.current');
  if (currentNav && typeof currentNav.scrollIntoView === 'function') {
    try {
      currentNav.scrollIntoView({ block: 'nearest', inline: 'center' });
    } catch (e) {
      /* 旧浏览器忽略 */
    }
  }

  /* ---------- 打印按钮 ---------- */
  var printBtn = document.getElementById('print-page');
  if (printBtn) {
    printBtn.addEventListener('click', function () { window.print(); });
  }

  /* ---------- 检查清单：本地勾选状态 ---------- */
  var checklist = document.querySelector('ul.print-checklist');
  if (checklist) {
    var boxes = checklist.querySelectorAll('li');
    boxes.forEach(function (li, index) {
      li.setAttribute('role', 'checkbox');
      li.setAttribute('aria-checked', 'false');
      li.setAttribute('tabindex', '0');
      function toggle() {
        var on = li.getAttribute('aria-checked') === 'true';
        li.setAttribute('aria-checked', on ? 'false' : 'true');
        li.classList.toggle('checked', !on);
      }
      li.addEventListener('click', toggle);
      li.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }
})();
