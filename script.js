// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initWorkFilter();
  initModal();
  initSmoothScroll();
  initScrollAnimations();
  initImageModal();
  
  // Fix logo click
  const logo = document.querySelector('.logo');
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Theme Toggle (Dark/Light)
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  // Check saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
  
  toggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Work Filter
function initWorkFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      workCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          // Add animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Case Study Modal
function initModal() {
  const modal = document.getElementById('case-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');
  const workCards = document.querySelectorAll('.work-card');
  const workLinks = document.querySelectorAll('.work-link');
  
  const caseStudies = {
    flowly: {
      client: 'Flowly',
      type: 'SaaS产品设计',
      title: 'Flowly — 项目管理平台',
      subtitle: '重新定义团队协作方式',
      year: '2024',
      heroClass: 'placeholder-saas',
      gallery: [
        { id: 1, caption: '首页仪表盘设计', color: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' },
        { id: 2, caption: '任务管理界面', color: 'linear-gradient(135deg, #2d5a87 0%, #3d7ab5 100%)' },
        { id: 3, caption: '团队协作模块', color: 'linear-gradient(135deg, #1e3a5f 0%, #3d7ab5 100%)' },
        { id: 4, caption: '数据分析看板', color: 'linear-gradient(135deg, #2d5a87 0%, #1e3a5f 100%)' }
      ],
      overview: {
        client: 'Flowly Inc.',
        duration: '4 个月',
        role: '产品设计负责人',
        team: '6 人'
      },
      challenges: {
        question: '如何在保持功能完整的同时，降低新用户的学习门槛？',
        points: [
          '原产品有超过50个功能入口，用户不知所措',
          '首次使用需要完成12步配置，完成率仅为28%',
          '核心工作流分散在3个不同页面中',
          '缺乏清晰的引导和反馈机制'
        ]
      },
      contributions: [
        { metric: '42%', title: '用户留存提升', desc: '通过优化引导流程和简化信息架构' },
        { metric: '68%', title: '任务完成率', desc: '重新设计核心工作流，减少操作步骤' },
        { metric: '100+', title: '设计组件', desc: '构建完整的设计系统，提升团队效率3倍' },
        { metric: '20+', title: '用户访谈', desc: '深入了解用户需求，支撑设计决策' }
      ],
      process: {
        discover: { title: '用户研究', desc: '20+深度用户访谈，竞品分析，数据埋点分析', tags: ['用户访谈', '竞品分析', '数据分析'] },
        define: { title: '问题定义', desc: '用户旅程地图，用户画像，问题陈述，设计原则', tags: ['用户画像', '旅程地图', '设计原则'] },
        ideate: { title: '创意发散', desc: '头脑风暴，草图，信息架构，快速原型', tags: ['头脑风暴', '信息架构', '线框图'] },
        prototype: { title: '高保真原型', desc: '视觉设计，交互动效，设计规范，组件库', tags: ['视觉设计', '交互动效', '组件库'] },
        test: { title: '验证迭代', desc: '可用性测试，A/B测试，迭代优化，上线追踪', tags: ['可用性测试', 'A/B测试', '迭代优化'] }
      },
      results: [
        { value: '42%', label: '用户留存提升', height: '84%' },
        { value: '68%', label: '任务完成率', height: '68%' },
        { value: '12s', label: '平均操作时间', height: '45%' },
        { value: '4.8', label: 'NPS评分', height: '96%' }
      ],
      feedback: {
        quote: '这次重新设计让我们的产品真正做到了简单而强大，用户的反馈非常积极！',
        author: '— 张明，Flowly CEO'
      },
      learnings: [
        { title: '简化的力量', desc: '不是增加功能，而是让每个功能都恰到好处。有时候，少即是多。' },
        { title: '数据的价值', desc: '将定性洞察与定量数据结合，能让设计决策更有说服力。' },
        { title: '系统的重要性', desc: '构建设计系统不是终点，而是提升整个产品质量的起点。' }
      ]
    },
    orbit: {
      client: 'Orbit',
      type: '设计系统',
      title: 'Orbit Design System',
      subtitle: '构建统一的设计语言',
      year: '2023',
      heroClass: 'placeholder-system',
      gallery: [
        { id: 1, caption: '设计原子组件', color: 'linear-gradient(135deg, #3d2458 0%, #5d3a82 100%)' },
        { id: 2, caption: '色彩系统规范', color: 'linear-gradient(135deg, #5d3a82 0%, #7d50ac 100%)' },
        { id: 3, caption: '按钮组件库', color: 'linear-gradient(135deg, #3d2458 0%, #7d50ac 100%)' },
        { id: 4, caption: '文档网站设计', color: 'linear-gradient(135deg, #5d3a82 0%, #3d2458 100%)' }
      ],
      overview: {
        client: 'Orbit Tech',
        duration: '3 个月',
        role: '设计系统架构师',
        team: '4 人'
      },
      challenges: {
        question: '如何在快速迭代中保持产品设计的一致性？',
        points: [
          '5条产品线各有一套设计，视觉语言不统一',
          '设计团队重复造轮子，效率低下',
          '新设计师上手需要2个月才能融入',
          '没有统一的设计规范和组件库'
        ]
      },
      contributions: [
        { metric: '3x', title: '设计效率提升', desc: '组件复用大幅减少重复工作' },
        { metric: '150+', title: '设计组件', desc: '构建完整的原子设计组件体系' },
        { metric: '200页', title: '设计文档', desc: '详尽的设计指南和使用规范' },
        { metric: '1周', title: '新手上手', desc: '从2个月缩短到1周' }
      ],
      process: {
        discover: { title: '现状审计', desc: '全面盘点现有设计资产，识别问题和机会', tags: ['设计审计', '竞品分析', '用户调研'] },
        define: { title: '设计语言', desc: '建立设计原则、色彩、字体、间距等核心规范', tags: ['设计原则', '色彩系统', '字体系统'] },
        ideate: { title: '组件规划', desc: '依据原子设计理论，规划组件层次结构', tags: ['原子设计', '组件规划', 'API设计'] },
        prototype: { title: '组件开发', desc: '设计组件、编写文档、建立示例', tags: ['组件设计', '技术对接', '文档编写'] },
        test: { title: '推广维护', desc: '内部培训、收集反馈、持续迭代', tags: ['培训推广', '反馈收集', '版本管理'] }
      },
      results: [
        { value: '3x', label: '设计效率', height: '90%' },
        { value: '75%', label: '组件复用率', height: '75%' },
        { value: '1周', label: '新手上手', height: '40%' },
        { value: '4.9', label: '团队满意度', height: '98%' }
      ],
      feedback: {
        quote: '设计系统上线后，我们终于可以专注于解决用户问题，而不是争论按钮样式了！',
        author: '— 李华，Orbit 产品负责人'
      },
      learnings: [
        { title: '协作的艺术', desc: '设计系统不仅是技术工作，更是跨团队协作的艺术。' },
        { title: '持续演进', desc: '好的设计系统不是一蹴而就的，需要持续迭代和优化。' },
        { title: '用户优先', desc: '设计系统的用户是团队成员，让他们参与进来是成功的关键。' }
      ]
    },
    nexus: {
      client: 'Nexus',
      type: '网页设计',
      title: 'Nexus — 开发者社区',
      subtitle: '连接全球开发者',
      year: '2024',
      heroClass: 'placeholder-web',
      gallery: [
        { id: 1, caption: '社区首页设计', color: 'linear-gradient(135deg, #1e4a4d 0%, #2a6a6d 100%)' },
        { id: 2, caption: '文章详情页', color: 'linear-gradient(135deg, #2a6a6d 0%, #3a8a8d 100%)' },
        { id: 3, caption: '个人资料页面', color: 'linear-gradient(135deg, #1e4a4d 0%, #3a8a8d 100%)' },
        { id: 4, caption: '代码编辑器预览', color: 'linear-gradient(135deg, #2a6a6d 0%, #1e4a4d 100%)' }
      ],
      overview: {
        client: 'Nexus Dev',
        duration: '5 个月',
        role: '全链路设计师',
        team: '8 人'
      },
      challenges: {
        question: '如何打造一个让开发者愿意停留和分享的社区？',
        points: [
          '现有平台设计陈旧，无法吸引年轻开发者',
          '内容创作流程复杂，用户分享意愿低',
          '社区互动机制薄弱，用户粘性不足',
          '移动端体验极差，70%访问来自手机'
        ]
      },
      contributions: [
        { metric: '68%', title: '注册转化率', desc: '简化注册流程，优化引导体验' },
        { metric: '3x', title: '内容发布', desc: '重新设计编辑器，降低发布门槛' },
        { metric: '45%', title: '日活提升', desc: '增强社区互动机制和个性化推荐' },
        { metric: '12', title: '设计迭代', desc: '快速原型测试，数据驱动优化' }
      ],
      process: {
        discover: { title: '社区调研', desc: '深入理解开发者需求和社区行为模式', tags: ['用户访谈', '社区分析', '竞品研究'] },
        define: { title: '产品定位', desc: '明确社区价值主张和核心功能', tags: ['价值主张', '功能规划', '用户旅程'] },
        ideate: { title: '体验设计', desc: '设计核心页面和互动流程', tags: ['信息架构', '交互设计', '动效设计'] },
        prototype: { title: '视觉落地', desc: '建立设计语言并完成全链路设计', tags: ['视觉设计', '响应式', '组件库'] },
        test: { title: '数据验证', desc: 'A/B测试和持续迭代优化', tags: ['可用性测试', 'A/B测试', '数据埋点'] }
      },
      results: [
        { value: '68%', label: '注册转化率', height: '80%' },
        { value: '45%', label: '日活提升', height: '70%' },
        { value: '3x', label: '内容发布', height: '85%' },
        { value: '52m', label: '平均停留', height: '60%' }
      ],
      feedback: {
        quote: '新的Nexus让人眼前一亮，终于有一个懂开发者的社区了！',
        author: '— 王磊，活跃开发者用户'
      },
      learnings: [
        { title: '社区的本质', desc: '社区设计的核心是人与人的连接，而不是功能的堆砌。' },
        { title: '开发者体验', desc: '开发者既是用户也是专家，设计需要同时满足审美和效率。' },
        { title: '增长思维', desc: '每个设计决策都应该考虑如何促进用户增长和留存。' }
      ]
    }
  };
  
  function renderChallenge(challenge) {
    return `
      <h3>${challenge.question}</h3>
      <ul class="case-list">
        ${challenge.points.map(point => `<li>${point}</li>`).join('')}
      </ul>
    `;
  }
  
  function renderContributions(contributions) {
    return contributions.map((contribution, index) => `
      <div class="contribution-card">
        <div class="contribution-metric">${contribution.metric}</div>
        <div class="contribution-title">${contribution.title}</div>
        <p>${contribution.desc}</p>
      </div>
    `).join('');
  }
  
  function renderProcess(process) {
    const steps = [
      { key: 'discover', step: '01', name: '发现' },
      { key: 'define', step: '02', name: '定义' },
      { key: 'ideate', step: '03', name: '构思' },
      { key: 'prototype', step: '04', name: '原型' },
      { key: 'test', step: '05', name: '测试' }
    ];
    
    return steps.map(({ key, step, name }) => {
      const data = process[key];
      return `
        <div class="timeline-item">
          <div class="timeline-step">
            <span class="step-num">${step}</span>
            <span class="step-name">${name}</span>
          </div>
          <div class="timeline-content">
            <h4>${data.title}</h4>
            <p>${data.desc}</p>
            <div class="tag-group">
              ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
  
  function renderResults(results) {
    return results.map(result => `
      <div class="result-card">
        <div class="result-value">${result.value}</div>
        <div class="result-label">${result.label}</div>
        <div class="result-chart">
          <div class="chart-bar" style="height: ${result.height}"></div>
        </div>
      </div>
    `).join('');
  }
  
  function renderLearnings(learnings) {
    return learnings.map(learning => `
      <div class="learning-card">
        <h4>${learning.title}</h4>
        <p>${learning.desc}</p>
      </div>
    `).join('');
  }

  function renderGallery(gallery, projectId) {
    return gallery.map((item, index) => `
      <div class="gallery-item" data-gallery-index="${index}" data-project="${projectId}">
        <div class="gallery-item-placeholder" style="background: ${item.color}">
          <div class="gallery-item-placeholder-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
            </svg>
          </div>
          <span>${item.caption}</span>
        </div>
        <div class="gallery-overlay">
          <div class="gallery-caption">${item.caption}</div>
        </div>
        <div class="gallery-zoom-indicator">
          <svg class="gallery-zoom-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
          </svg>
        </div>
      </div>
    `).join('');
  }
  
  function openModal(projectId) {
    const caseStudy = caseStudies[projectId] || caseStudies.flowly;
    
    // Update modal content
    document.getElementById('modal-client').textContent = caseStudy.client;
    document.getElementById('modal-type').textContent = caseStudy.type;
    document.getElementById('modal-title').textContent = caseStudy.title;
    document.getElementById('modal-subtitle').textContent = caseStudy.subtitle;
    document.getElementById('modal-year').textContent = caseStudy.year;
    
    // Update hero image
    const heroEl = document.getElementById('modal-hero');
    heroEl.className = 'case-hero-image ' + caseStudy.heroClass;
    
    // Update overview
    document.getElementById('modal-overview-client').textContent = caseStudy.overview.client;
    document.getElementById('modal-overview-duration').textContent = caseStudy.overview.duration;
    document.getElementById('modal-overview-role').textContent = caseStudy.overview.role;
    document.getElementById('modal-overview-team').textContent = caseStudy.overview.team;
    
    // Update challenges
    document.getElementById('modal-challenges').innerHTML = renderChallenge(caseStudy.challenges);
    
    // Update contributions
    document.querySelector('.contributions-grid').innerHTML = renderContributions(caseStudy.contributions);
    
    // Update process
    document.querySelector('.design-process-timeline').innerHTML = renderProcess(caseStudy.process);
    
    // Update results
    document.getElementById('modal-results').innerHTML = renderResults(caseStudy.results);
    
    // Update feedback
    const feedbackEl = document.getElementById('modal-feedback');
    feedbackEl.querySelector('p').textContent = caseStudy.feedback.quote;
    feedbackEl.querySelector('.quote-author').textContent = caseStudy.feedback.author;
    
    // Update learnings
    document.getElementById('modal-learnings').innerHTML = renderLearnings(caseStudy.learnings);
    
    // Update gallery
    document.getElementById('modal-gallery').innerHTML = renderGallery(caseStudy.gallery, projectId);
    
    // Bind gallery click events
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        openImageModal(
          item.dataset.project,
          parseInt(item.dataset.galleryIndex)
        );
      });
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 滚动到模态框顶部
    setTimeout(() => {
      document.querySelector('.modal-content').scrollTop = 0;
    }, 100);
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Open modal when clicking card or link
  workCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal(card.dataset.project);
    });
  });
  
  workLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = link.closest('.work-card');
      openModal(card.dataset.project);
    });
  });
  
  // Close modal
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll('.capability-card, .work-card, .process-step, .contact-link');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add some micro-interactions
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// Image Preview Modal
let currentGallery = [];
let currentIndex = 0;

function initImageModal() {
  const imageModal = document.getElementById('image-modal');
  const closeBtn = imageModal.querySelector('.image-modal-close');
  const prevBtn = imageModal.querySelector('.image-modal-prev');
  const nextBtn = imageModal.querySelector('.image-modal-next');
  
  closeBtn.addEventListener('click', closeImageModal);
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) closeImageModal();
  });
  prevBtn.addEventListener('click', () => navigateImage(-1));
  nextBtn.addEventListener('click', () => navigateImage(1));
  
  document.addEventListener('keydown', (e) => {
    if (imageModal.classList.contains('active')) {
      if (e.key === 'Escape') closeImageModal();
      if (e.key === 'ArrowLeft') navigateImage(-1);
      if (e.key === 'ArrowRight') navigateImage(1);
    }
  });
}

function openImageModal(projectId, index) {
  const caseStudy = caseStudies[projectId] || caseStudies.flowly;
  currentGallery = caseStudy.gallery;
  currentIndex = index;
  updateImageModal();
  document.getElementById('image-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  document.getElementById('image-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function navigateImage(direction) {
  currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
  updateImageModal();
}

function updateImageModal() {
  const item = currentGallery[currentIndex];
  const imgEl = document.getElementById('image-modal-img');
  const indicatorEl = document.getElementById('image-modal-indicator');
  
  // Hide img element since we don't have real images
  imgEl.style.display = 'none';
  indicatorEl.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
  
  // Add a visual placeholder with smooth transition
  let content = document.querySelector('.image-modal-content');
  let existingPlaceholder = content.querySelector('.image-modal-placeholder');
  if (!existingPlaceholder) {
    existingPlaceholder = document.createElement('div');
    existingPlaceholder.className = 'image-modal-placeholder';
    content.insertBefore(existingPlaceholder, content.firstChild.nextSibling);
  }
  
  // Add exit animation before updating
  existingPlaceholder.style.opacity = '0';
  existingPlaceholder.style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    existingPlaceholder.style.cssText = `
      width: 100%;
      max-width: 900px;
      aspect-ratio: 16 / 10;
      background: ${item.color};
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: var(--font-display);
      font-size: 1.5rem;
      text-align: center;
      padding: var(--spacing-xl);
      opacity: 1;
      transform: scale(1);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    `;
    existingPlaceholder.innerHTML = `
      <div style="text-align: center;">
        <div style="width: 80px; height: 80px; border: 3px solid rgba(255,255,255,0.4); border-radius: 50%; margin: 0 auto ${item.spacing-xl}; display: flex; align-items: center; justify-content: center;">
          <svg style="width: 32px; height: 32px; fill: rgba(255,255,255,0.8);" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
          </svg>
        </div>
        <div>${item.caption}</div>
      </div>
    `;
  }, 200);
  
  // Update or create caption
  let captionEl = content.querySelector('.image-modal-caption');
  if (!captionEl) {
    captionEl = document.createElement('div');
    captionEl.className = 'image-modal-caption';
    content.appendChild(captionEl);
  }
  captionEl.textContent = item.caption;
  
  // Refresh animations for new content
  captionEl.style.animation = 'none';
  void captionEl.offsetWidth;
  captionEl.style.animation = 'captionFadeInModal 0.3s ease 0.3s forwards';
}
