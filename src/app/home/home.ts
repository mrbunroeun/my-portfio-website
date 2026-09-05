import { Component, ElementRef, HostListener, ChangeDetectorRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

export interface SkillCategory {
  title: string;
  icon: 'frontend' | 'design' | 'backend' | 'tools' | 'additional';
  badge: string;
  color: string;
  skills: string[];
}

export interface ProjectFeature {
  title: string;
  desc: string;
  icon?: string;
}

export interface CaseStudyGalleryItem {
  title: string;
  badge: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ProjectCaseStudy {
  overview: string;
  architecture: string[];
  gallery?: CaseStudyGalleryItem[];
  keyFeatures: ProjectFeature[];
  workflow: string[];
  databaseSchema: string[];
  highlights: string[];
}

export interface CodeRepoOption {
  label: string;
  url: string;
  badge: string;
  type: 'frontend' | 'backend';
}

export interface Project {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  types: ('fullstack' | 'frontend' | 'backend' | 'uiux')[];
  category: string;
  roleBadge: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
  figmaUrl?: string;
  codeRepos?: CodeRepoOption[];
  caseStudy?: ProjectCaseStudy;
}

export interface TargetRole {
  title: string;
  level: string;
  color: string;
  icon: string;
  tagline: string;
  highlights: string[];
}

export interface ServiceOption {
  value: string;
  label: string;
  icon: 'stack' | 'code' | 'design' | 'sparkles' | 'chat';
  badge: string;
  description: string;
}

export type ProjectFilterType = 'all' | 'angular' | 'vue' | 'react' | 'laravel' | 'fullstack' | 'frontend' | 'backend';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  selectedProjectFilter: ProjectFilterType = 'all';
  isDropdownOpen = false;
  activeCaseStudyProject: Project | null = null;
  activeExpandedImage: { image: string; title: string; desc: string } | null = null;
  activeCodeDropdownTitle: string | null = null;
  isCodeDropdownDropUp = false;
  isFilterVisible = true;

  scrollProgress = 0;
  showBackToTop = false;
  private observer: IntersectionObserver | null = null;
  private routeParamSub: Subscription | null = null;
  private queryParamSub: Subscription | null = null;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routeParamSub = this.route.paramMap.subscribe((params) => {
      const routeFilter = params.get('filter');
      if (routeFilter && this.isValidFilter(routeFilter)) {
        this.applyFilter(routeFilter.toLowerCase() as ProjectFilterType, true);
        return;
      }

      this.queryParamSub?.unsubscribe();
      this.queryParamSub = this.route.queryParamMap.subscribe((queryParams) => {
        const queryFilter = queryParams.get('filter');
        if (queryFilter && this.isValidFilter(queryFilter)) {
          this.applyFilter(queryFilter.toLowerCase() as ProjectFilterType, true);
        }
      });
    });
  }

  isValidFilter(filter: string): boolean {
    const validFilters: ProjectFilterType[] = [
      'all',
      'angular',
      'vue',
      'react',
      'laravel',
      'fullstack',
      'frontend',
      'backend'
    ];
    return validFilters.includes(filter.toLowerCase() as ProjectFilterType);
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      setTimeout(() => this.initScrollObserver(), 50);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.routeParamSub?.unsubscribe();
    this.queryParamSub?.unsubscribe();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (typeof window === 'undefined') return;
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = height > 0 ? Math.min(100, Math.max(0, (winScroll / height) * 100)) : 0;
    this.showBackToTop = winScroll > 380;
  }

  scrollToTop() {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private initScrollObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const elements = this.elementRef.nativeElement.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );
    elements.forEach((el: Element) => this.observer?.observe(el));
  }

  toggleCodeDropdown(title: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.activeCodeDropdownTitle === title) {
      this.activeCodeDropdownTitle = null;
      return;
    }

    const button = (event.currentTarget as HTMLElement) || (event.target as HTMLElement);
    if (button && typeof button.getBoundingClientRect === 'function') {
      const rect = button.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If there is less than 170px of space below button in viewport, drop upwards (to top)
      this.isCodeDropdownDropUp = spaceBelow < 170;
    } else {
      this.isCodeDropdownDropUp = false;
    }

    this.activeCodeDropdownTitle = title;
  }

  closeCodeDropdown() {
    this.activeCodeDropdownTitle = null;
  }

  openCaseStudy(project: Project) {
    this.activeCaseStudyProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeCaseStudy() {
    this.activeCaseStudyProject = null;
    this.activeExpandedImage = null;
    document.body.style.overflow = '';
  }

  openImagePreview(image: string, title: string, desc: string) {
    this.activeExpandedImage = { image, title, desc };
  }

  closeImagePreview() {
    this.activeExpandedImage = null;
  }

  readonly targetRoles: TargetRole[] = [
    {
      title: 'Full-Stack Developer',
      level: 'Full-Stack Engineering',
      color: 'from-blue-600 to-indigo-600',
      icon: 'stack',
      tagline: 'End-to-end web architecture, APIs & databases',
      highlights: ['Laravel & PHP', 'Next.js & React', 'MySQL Database', 'RESTful API & Auth'],
    },
    {
      title: 'Frontend Developer',
      level: 'Frontend Engineering',
      color: 'from-cyan-500 to-blue-500',
      icon: 'code',
      tagline: 'Modern responsive SPAs & interactive interfaces',
      highlights: ['Angular 21 (Signals)', 'TypeScript & JavaScript', 'Tailwind CSS', 'Responsive UI/UX'],
    },
    {
      title: 'UX/UI Designer',
      level: 'Design Systems',
      color: 'from-purple-500 to-pink-500',
      icon: 'design',
      tagline: 'User-centered design systems & human psychology',
      highlights: ['Figma Auto-Layout', 'Wireframing & Prototypes', 'User Psychology', 'Design Tokens'],
    },
  ];

  formData = {
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'Full-Stack Developer Role',
    message: '',
  };

  readonly serviceOptions: ServiceOption[] = [
    {
      value: 'Full-Stack Developer Role',
      label: 'Full-Stack Developer Role',
      icon: 'stack',
      badge: 'Full-Stack',
      description: 'End-to-end web applications, APIs & database systems',
    },
    {
      value: 'Frontend Developer Role',
      label: 'Frontend Developer Role',
      icon: 'code',
      badge: 'Frontend',
      description: 'Modern responsive SPAs, Angular/React & Tailwind CSS',
    },
    {
      value: 'UX/UI Design & Prototyping',
      label: 'UX/UI Design & Prototyping',
      icon: 'design',
      badge: 'Design',
      description: 'Figma wireframes, design systems & interactive prototypes',
    },
    {
      value: 'Freelance / Web Project',
      label: 'Freelance / Web Project',
      icon: 'sparkles',
      badge: 'Client Build',
      description: 'Custom client websites, landing pages & redesigns',
    },
    {
      value: 'General Inquiry',
      label: 'General Inquiry',
      icon: 'chat',
      badge: 'Discussion',
      description: 'Questions, consultations, or technical collaboration',
    },
  ];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectService(value: string) {
    this.formData.service = value;
    this.isDropdownOpen = false;
  }

  get selectedServiceOption(): ServiceOption {
    return (
      this.serviceOptions.find((opt) => opt.value === this.formData.service) ||
      this.serviceOptions[0]
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.querySelector('#custom-dropdown-container')?.contains(target)) {
      this.isDropdownOpen = false;
    }
    if (!target.closest('.code-dropdown-container')) {
      this.activeCodeDropdownTitle = null;
    }
  }

  filterAnimationKey = 0;

  get angularProjects(): Project[] {
    return this.projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes('angular')));
  }

  get vueProjects(): Project[] {
    return this.projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes('vue')));
  }

  get reactProjects(): Project[] {
    return this.projects.filter((p) =>
      p.tags.some((t) => t.toLowerCase().includes('react') || t.toLowerCase().includes('next.js'))
    );
  }

  get laravelProjects(): Project[] {
    return this.projects.filter((p) => p.tags.some((t) => t.toLowerCase().includes('laravel')));
  }

  get fullStackProjects(): Project[] {
    return this.projects.filter((p) => p.types.includes('fullstack'));
  }

  get frontendProjects(): Project[] {
    return this.projects.filter((p) => p.types.includes('frontend'));
  }

  get backendProjects(): Project[] {
    return this.projects.filter((p) => p.types.includes('backend'));
  }

  setProjectFilter(filter: ProjectFilterType) {
    this.applyFilter(filter, false);

    // Update query params in the URL bar for easy link sharing without full reload
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filter === 'all' ? {} : { filter },
      queryParamsHandling: '',
    });
  }

  private applyFilter(filter: ProjectFilterType, shouldScrollToSection = false) {
    this.selectedProjectFilter = filter;
    this.filterAnimationKey++;

    // Unmount and remount project cards to force browser to run drop animation from 0% on EVERY card
    this.isFilterVisible = false;
    setTimeout(() => {
      this.isFilterVisible = true;
      this.cdr.markForCheck();

      if (shouldScrollToSection && typeof window !== 'undefined') {
        setTimeout(() => {
          const el = document.getElementById('projects');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }
    }, 15);
  }

  get filteredProjects(): Project[] {
    const filter = this.selectedProjectFilter;

    if (filter === 'angular') {
      return this.angularProjects;
    } else if (filter === 'vue') {
      return this.vueProjects;
    } else if (filter === 'react') {
      return this.reactProjects;
    } else if (filter === 'laravel') {
      return this.laravelProjects;
    } else if (filter === 'fullstack' || filter === 'frontend' || filter === 'backend') {
      return this.projects.filter((p) => p.types.includes(filter));
    }

    return this.projects;
  }

  submitTelegramForm() {
    if (!this.formData.name.trim() || !this.formData.email.trim() || !this.formData.message.trim()) {
      alert('Please fill in your Name, Email, and Message before sending.');
      return;
    }

    const message = `🚀 New Portfolio Inquiry:

👤 Name: ${this.formData.name.trim()}
📧 Email: ${this.formData.email.trim()}
🏢 Company: ${this.formData.company.trim() || 'N/A'}
📱 Phone / Telegram: ${this.formData.phone.trim() || 'N/A'}
🎯 Target Role / Inquiry: ${this.formData.service}

💬 Message:
${this.formData.message.trim()}

-----------------------------
Sent from Bunroeun's Portfolio`;

    const encoded = encodeURIComponent(message);
    const telegramUrl = `https://t.me/HasBunRoeun?text=${encoded}`;
    window.open(telegramUrl, '_blank');
  }

  readonly contact = {
    name: 'Has Bunroeun',
    role: 'Full-Stack Developer & UX/UI Designer',
    degree: 'Bachelor of Information Technology Engineering',
    email: 'bunroeunhas@gmail.com',
    phone: '0966928501',
    telegram: 'https://t.me/HasBunRoeun',
    telegramHandle: '@HasBunRoeun',
    github: 'https://github.com/mrbunroeun',
    githubHandle: '@mrbunroeun',
    linkedin: 'https://www.linkedin.com/in/has-bunroeun-b48761373',
    language: 'English (Upper-Intermediate)'
  };

  readonly relevantCoursework = [
    { title: 'User Interface Design & Development', icon: '🎨', badge: 'UI/UX', desc: 'Design systems, auto-layout, typography, breakpoints & interactive patterns.' },
    { title: 'Artificial Intelligence & Prompt Engineering', icon: '🤖', badge: 'AI & LLMs', desc: 'AI models, prompt engineering, Gemini API integrations, AI-assisted coding & ethics.' },
    { title: 'Search Engine Optimization & Web Performance', icon: '🔍', badge: 'SEO & Core Vitals', desc: 'Technical SEO, meta tags, semantic HTML, schema structured data & indexability.' },
    { title: 'Project Management & Agile', icon: '📊', badge: 'Delivery', desc: 'Sprint planning, client iteration cycles & multi-project coordination.' },
    { title: 'Cryptography & Security', icon: '🔐', badge: 'Security', desc: 'RSA, Diffie-Hellman key exchange, SHA-512 & data security.' },
    { title: 'Software Testing & QA', icon: '🧪', badge: 'Quality', desc: 'Test-Driven Development (TDD), xUnit & Moq mocking frameworks.' }
  ];

  readonly skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Engineering',
      icon: 'frontend',
      badge: 'Core Expertise',
      color: 'from-blue-500 to-indigo-600',
      skills: [
        'Angular 21+ (Signals, Standalone)',
        'Vue.js (Composition API, Components)',
        'React & Next.js (App Router, SSR)',
        'TypeScript (Strict Mode, Generics)',
        'Tailwind CSS & Modern Flex/Grid',
        'SEO & Semantic Markup (Meta, Open Graph)',
        'Responsive Design & Cross-Browser',
        'JavaScript (ES6+, DOM, Async)',
        'Blade Templates (Laravel FE)'
      ]
    },
    {
      title: 'Backend & APIs',
      icon: 'backend',
      badge: 'Server Architecture',
      color: 'from-emerald-500 to-teal-600',
      skills: [
        'Node.js & Express.js REST APIs',
        'Laravel (Routing, Controllers, ORM)',
        'MySQL (Database Design, Queries)',
        'PHP (Server Scripting & CRUD)',
        'RESTful API Design & Integration',
        'Authentication & JWT Sessions'
      ]
    },
    {
      title: 'UX/UI & Product Design',
      icon: 'design',
      badge: 'Visual Systems',
      color: 'from-purple-500 to-pink-600',
      skills: [
        'Figma (Design Systems, Auto Layout)',
        'User Flow & Wireframing',
        'Interactive Prototyping',
        'Responsive Breakpoint Systems',
        'Color Theory & Typography',
        'Micro-Interactions & Transitions'
      ]
    },
    {
      title: 'AI, SEO & Workflows',
      icon: 'tools',
      badge: 'DevOps & Emerging Tech',
      color: 'from-amber-500 to-orange-600',
      skills: [
        'AI Tooling & Prompt Engineering (LLMs)',
        'Gemini AI API & Intelligent Workflows',
        'SEO Best Practices & Core Web Vitals',
        'Git & GitHub Version Control',
        'Hostinger Deployment & .env Config',
        'Software Testing (xUnit/Moq, TDD)',
        'Unity / C# Game Development',
        'Cryptography (RSA, Diffie-Hellman, SHA-512)'
      ]
    }
  ];

  readonly projects: Project[] = [
    {
      title: 'ScripBaa Portfolio Showcase',
      description: 'Modern, responsive frontend portfolio and web showcase platform built with Vue.js, featuring vibrant gradient visual styling, dynamic UI interactions, smooth navigation, and component-driven architecture.',
      image: 'projects/script_portfolio.png',
      imageAlt: 'ScripBaa Vue Portfolio project preview',
      types: ['frontend'],
      category: 'Vue.js Web App',
      roleBadge: 'Frontend Developer (Vue.js)',
      tags: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive UI'],
      demoUrl: 'https://portforlio-example.vercel.app/',
      codeUrl: 'https://github.com/mrbunroeun/vue.js_project',
    },
    {
      title: 'Realestate Toyal Showcase',
      description: 'Modern luxury real estate and property showcase platform built with Vue.js, featuring elegant typography, responsive property cards, interactive catalog navigation, and modern UI styling.',
      image: 'projects/realestate-toyal.jpg',
      imageAlt: 'Realestate Toyal project preview',
      types: ['frontend'],
      category: 'Vue.js Web App',
      roleBadge: 'Frontend Developer (Vue.js)',
      tags: ['Vue.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      demoUrl: 'https://realestate-toyal.vercel.app/',
      codeUrl: 'https://github.com/mrbunroeun/RealestateToyal.git',
    },
    {
      title: 'SKIN.ME AI Ecommerce',
      description: 'Full-stack skincare ecommerce and personalized recommendation web application featuring an integrated AI skincare chatbot assistant.',
      image: 'projects/SKINME.png',
      imageAlt: 'SKIN.ME project preview',
      types: ['fullstack', 'frontend', 'backend'],
      category: 'Full-Stack & AI',
      roleBadge: 'Full-Stack Lead (Next.js + MySQL + Gemini)',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Gemini AI'],
      demoUrl: 'https://skinme.store/',
      codeRepos: [
        {
          label: 'Frontend Repository',
          url: 'https://github.com/wayha168/Year4_Skin.me_FE',
          badge: 'Frontend (React / Next.js)',
          type: 'frontend'
        },
        {
          label: 'Backend Repository',
          url: 'https://github.com/wayha168/Year4-Skinme-BE',
          badge: 'Backend (Node.js / MySQL)',
          type: 'backend'
        }
      ]
    },
    {
      title: 'CWD Realty & Hospitality',
      description: 'Modern condominium management, property leasing, and hospitality showcase platform in Phnom Penh. Developed complete responsive frontend interfaces, service catalogs, and interactive navigation.',
      image: 'projects/cwd.png',
      imageAlt: 'CWD Realty & Hospitality project preview',
      types: ['frontend'],
      category: 'Real Estate & Hospitality',
      roleBadge: 'Frontend Developer (100% FE)',
      tags: ['Laravel', 'Blade', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
      demoUrl: 'https://cwdrealty.com/',
    },
    {
      title: 'LED Media',
      description: 'High-impact multimedia showcase portal for LED screen and digital advertising solutions. Built complete responsive frontend and implemented backend database adjustments.',
      image: 'projects/led_media.png',
      imageAlt: 'LED Media project preview',
      types: ['fullstack', 'frontend', 'backend'],
      category: 'Full-Stack & Media',
      roleBadge: 'Full-Stack Contributor (Frontend + MySQL Backend)',
      tags: ['Laravel', 'Blade', 'Tailwind CSS', 'JavaScript', 'MySQL', 'PHP'],
      demoUrl: 'https://ledmedia.com.kh/',
    },
    {
      title: 'Envy Stage',
      description: 'Commercial web platform for stage effects and atmosphere solutions. Directed full frontend development with responsive layouts and collaborated on backend enhancements.',
      image: 'projects/envy_stage.png',
      imageAlt: 'Envy Stage project preview',
      types: ['fullstack', 'frontend', 'backend'],
      category: 'Full-Stack Commercial',
      roleBadge: 'Frontend Lead & Backend Support',
      tags: ['Laravel', 'Blade', 'Tailwind CSS', 'JavaScript', 'MySQL', 'PHP'],
      demoUrl: 'https://envystage.com/',
    },
    {
      title: 'SKK Agriculture',
      description: 'Modern agricultural enterprise showcase platform featuring product galleries, catalog navigation, and dynamic inquiry interfaces.',
      image: 'projects/skk_agriculture.png',
      imageAlt: 'SKK Agriculture project preview',
      types: ['fullstack', 'frontend', 'backend'],
      category: 'Enterprise Showcase',
      roleBadge: 'Frontend Developer (100% FE)',
      tags: ['Laravel', 'Blade', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      demoUrl: 'https://www.skkagriculture.com/',
    },
    {
      title: 'Metro',
      description: 'Dynamic stage equipment and atmosphere solution corporate portal. Designed and built 100% responsive frontend layout and user interface.',
      image: 'projects/metro.png',
      imageAlt: 'Metro project preview',
      types: ['fullstack', 'frontend', 'backend'],
      category: 'Commercial Portal',
      roleBadge: 'Frontend Developer (100% FE)',
      tags: ['Laravel', 'Blade', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
      demoUrl: 'https://darksalmon-chimpanzee-940996.hostingersite.com/',
    },
    {
      title: 'Master MEP Solution',
      description: 'Mechanical, Electrical, and Plumbing engineering services website. Executed a comprehensive UX redesign, responsive layout overhaul, and frontend performance optimizations.',
      image: 'projects/master_mep.png',
      imageAlt: 'Master MEP project preview',
      types: ['fullstack', 'frontend', 'backend'],
      category: 'Engineering & UX Redesign',
      roleBadge: 'UX/UI & Frontend Redesign (100% Overhaul)',
      tags: ['Laravel', 'Blade', 'JavaScript', 'HTML5', 'CSS3'],
      demoUrl: 'https://mastermepsolution.com.kh/',
    },
    {
      title: 'BRWeb Catering',
      description: 'Modern restaurant and mobile catering web platform built with Angular and TypeScript, featuring dynamic menu structures and responsive layouts modeled after the Metro portal architecture.',
      image: 'additional_project/brweb.png',
      imageAlt: 'BRWeb Catering project preview',
      types: ['frontend'],
      category: 'Angular Web App',
      roleBadge: 'Frontend Lead & UI Structure (Angular TS)',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      demoUrl: 'https://angular-ts-psi.vercel.app/mobile-catering',
    },
    {
      title: 'Bunroeun Developer Portfolio',
      description: 'Modern high-performance developer portfolio and personal showcase website built with Angular, TypeScript, and Tailwind CSS, featuring interactive category filters, glassmorphism aesthetics, fluid animations, and responsive architecture.',
      image: 'additional_project/portfolio.png',
      imageAlt: 'Bunroeun Angular Portfolio project preview',
      types: ['frontend'],
      category: 'Angular Web App',
      roleBadge: 'Frontend Lead & UI Architecture (Angular + TS)',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Responsive UI'],
      demoUrl: 'https://my-portfio-website.vercel.app/',
      codeUrl: 'https://github.com/mrbunroeun/learning-basic-ts-angular.git',
    },
    {
      title: 'Realestate Toyal (Angular Edition)',
      description: 'Modern luxury real estate and property showcase web application built with Angular and TypeScript, featuring standalone component architecture, elegant typography, interactive property catalogs, and fluid responsive layouts.',
      image: 'projects/realestate-toyal.jpg',
      imageAlt: 'Realestate Toyal Angular project preview',
      types: ['frontend'],
      category: 'Angular Web App',
      roleBadge: 'Frontend Developer (Angular + TS)',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      demoUrl: 'https://realestate-toyal-using-agular-nine.vercel.app/',
      codeUrl: 'https://github.com/mrbunroeun/realestate-toyal-using-agular.git',
    },
    {
      title: 'Laravel Multi-Vendor E-Commerce',
      description: 'Full-stack multi-vendor marketplace featuring dynamic storefront templates, vendor onboarding with admin approval workflows, express checkout (ABA / Bakong), and relational MySQL database architecture.',
      image: 'projects/laravel_ecommerce.png',
      imageAlt: 'Laravel Multi-Vendor E-Commerce Storefront preview',
      types: ['fullstack', 'frontend', 'backend'],
      category: 'Full-Stack & Multi-Vendor',
      roleBadge: 'Full-Stack Lead (Laravel + MySQL Backend)',
      tags: ['Laravel', 'Blade', 'MySQL', 'PHP', 'CSS3'],
      caseStudy: {
        overview: 'A complete full-stack multi-vendor e-commerce platform built with Laravel and MySQL. It empowers customers to browse multi-category storefronts, place express orders with automated cart calculations, and offers a multi-step vendor application and admin verification lifecycle.',
        architecture: [
          'Laravel MVC Architecture & RESTful Resource Routing',
          'MySQL Relational Database Design with Foreign Key Integrity',
          'Blade Templating Engine styled with Custom Responsive CSS3',
          'Role-Based Authorization (Admin, Vendor, Customer)',
          'Express Payment & Order Processing Integration'
        ],
        gallery: [
          {
            title: 'Website Templates Showcase',
            badge: 'Storefront Themes',
            description: 'Curated e-commerce template layouts for diverse vendor niches including apparel, fashion, and beauty salon themes.',
            image: 'detail_ecommerce/templates.png',
            imageAlt: 'Website Templates Showcase'
          },
          {
            title: 'Multi-Category Product Catalog',
            badge: 'Catalog & Filters',
            description: 'Dynamic category navigation across Skincare, Clothing, Accessories, and Education with real-time pricing and interactive cards.',
            image: 'detail_ecommerce/catalog.png',
            imageAlt: 'Multi-Category Product Catalog'
          },
          {
            title: 'Product Details & Variant Selector',
            badge: 'Product Engine',
            description: 'Specification interface with dynamic size dropdown, live price computation, quantity limits (max 10), and related products suggestions.',
            image: 'detail_ecommerce/product_detail.png',
            imageAlt: 'Product Details and Cart Action'
          },
          {
            title: 'Express Checkout & Payment Methods',
            badge: 'Payment Gateway',
            description: 'Streamlined checkout with contact & delivery forms, cart summary itemization ($25.00 total), and ACLEDA & ABA Pay integrations.',
            image: 'detail_ecommerce/checkout.png',
            imageAlt: 'Express Checkout with ABA and ACLEDA'
          },
          {
            title: 'Multi-Channel Support & Platform Hub',
            badge: 'Support & Help Center',
            description: 'Multi-channel customer contact center (Call, Email, Live Chat 7AM-9PM) with regional location routing in Phnom Penh, Cambodia.',
            image: 'detail_ecommerce/contact_support.png',
            imageAlt: 'Support and Platform Footer Hub'
          }
        ],
        keyFeatures: [
          {
            title: 'Multi-Vendor Storefront & Hero',
            desc: 'Modern responsive landing page featuring storefront templates showcase and a direct "Create Your Store" call-to-action.'
          },
          {
            title: 'Vendor Onboarding & Questionnaire',
            desc: 'Multi-step onboarding form collecting store criteria, vendor location, product readiness, and delivery logistics.'
          },
          {
            title: 'Admin Verification & Approval Pipeline',
            desc: 'Security gateway where administrators review vendor applications and approve stores before products go live.'
          },
          {
            title: 'Product Catalog & Dynamic Variations',
            desc: 'Categorized catalog (Skincare, Apparel, Accessories) with size selection, live pricing calculation, and stock control.'
          },
          {
            title: 'Shopping Bag & Express Checkout',
            desc: 'Interactive shopping cart modal with express checkout options (ABA Pay, Bakong / KHQR, and Card).'
          },
          {
            title: 'Customer Order History & Tracking',
            desc: 'Customer dashboard tracking past purchases, item quantities, order dates, delivery addresses, and status.'
          }
        ],
        workflow: [
          '1. Storefront Discovery: Customers browse template themes, categories, and featured skincare / apparel products.',
          '2. Vendor Application: Users click "Create Your Store" in the hero and submit store details through the onboarding flow.',
          '3. Admin Review: Platform admins evaluate vendor submissions and approve legitimate seller accounts.',
          '4. Bag & Express Checkout: Shoppers add items to bag and proceed through Express Checkout with ABA / Bakong payment.',
          '5. Order Storage & Tracking: Transactions are securely written to MySQL and updated in customer Order History.'
        ],
        databaseSchema: [
          'users — Authentication credentials, customer profiles, and role management (Admin, Vendor, Customer)',
          'vendors & stores — Store profile info, verification status (Pending, Approved, Rejected), and business details',
          'categories & products — Product catalog, categories, pricing, size options, stock levels, and media',
          'orders & order_items — Relational transactional ledger linking buyers, purchased items, quantities, and pricing',
          'payments — Transaction records, express payment provider logs (ABA / Bakong), and receipt verification'
        ],
        highlights: [
          'End-to-end full-stack development with Laravel & MySQL',
          'Custom multi-vendor onboarding with approval gating',
          'Express checkout with modern digital payments (ABA / Bakong)',
          'Mobile-first responsive UI crafted with Custom CSS3'
        ]
      } 
    }
  ];

  readonly uiuxProjects: Project[] = [
    {
      title: 'LOQO Creative Agency',
      description: 'High-conversion digital agency landing page created in Figma exploring sticky scroll interactions, modern dark theme aesthetics, typography rules, and structured design tokens.',
      image: 'figma_framer/LOQO Website design.png',
      imageAlt: 'LOQO Website design in Figma preview',
      types: ['uiux'],
      category: 'UX/UI Design',
      roleBadge: 'Figma UI/UX & Sticky Scroll',
      tags: ['Figma', 'UI/UX Design', 'Design Systems', 'Prototyping', 'Sticky Scroll'],
      figmaUrl: 'https://www.figma.com/design/2wk7NyrXq0fTNh1HMVmr3W/practice--lily-barkery-and-LOQO?node-id=122-6&p=f&t=oklMZAHA4Xv3HVVW-0',
    },
    {
      title: 'Spotify Web App Redesign',
      description: 'Modernized Spotify web player interface designed in Figma focusing on atomic design components, interactive media card states, typography scales, and empty states UX.',
      image: 'figma_framer/Design spotify.png',
      imageAlt: 'Spotify Web App Redesign preview',
      types: ['uiux'],
      category: 'UX/UI Design',
      roleBadge: 'Figma UI/UX & Component Architecture',
      tags: ['Figma', 'UX/UI Redesign', 'Component System', 'Atomic Design'],
      figmaUrl: 'https://www.figma.com/design/K4DSabsNMLvblBOrUNZpkS/redesign-spotify--empty-page-and-empty-page?node-id=0-1&p=f&t=hfAjZIVqYv0jHuS8-0',
    },
    {
      title: 'Lily Bakery & Organic Store',
      description: 'Full web design for organic artisan bakery and fresh foods store in Figma featuring warm aesthetics, visual storytelling, product showcases, and mobile-first layouts.',
      image: 'figma_framer/enjoy_organic.png',
      imageAlt: 'Lily Bakery & Organic Store design preview',
      types: ['uiux'],
      category: 'UX/UI Design',
      roleBadge: 'Figma UI/UX & Wireframing',
      tags: ['Figma', 'Wireframing', 'UI/UX Design', 'Visual Hierarchy'],
      figmaUrl: 'https://www.figma.com/design/2wk7NyrXq0fTNh1HMVmr3W/new-design-in-figma?node-id=0-1&t=PeEDz82RrMwCzV0a-1',
    },
    {
      title: 'SKIN.ME UI/UX & User Flows',
      description: 'Comprehensive UI/UX design architecture, user flows, wireframes, and usability testing for the AI-powered personalized skincare e-commerce platform.',
      image: 'projects/SKINME.png',
      imageAlt: 'SKIN.ME UI/UX Design System preview',
      types: ['uiux'],
      category: 'UX/UI Design',
      roleBadge: 'Figma User Flows & Wireframing',
      tags: ['Figma', 'User Flows', 'Wireframing', 'Usability Testing'],
      figmaUrl: 'https://www.figma.com/design/4sbIdCAHzNKhFXeHkDunGY/SKIN.ME--PORTFOLIO---EMPTY?node-id=979-2&p=f&t=H16dvl6gMxKfACzJ-0',
    }
  ];

  readonly additionalProjects: Project[] = [];
}