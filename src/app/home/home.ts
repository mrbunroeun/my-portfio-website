import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  type: 'fullstack' | 'frontend';
  category: string;
  roleBadge: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
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

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  selectedProjectFilter: 'all' | 'fullstack' | 'frontend' = 'all';
  isDropdownOpen = false;
  activeCaseStudyProject: Project | null = null;
  activeExpandedImage: { image: string; title: string; desc: string } | null = null;
  activeCodeDropdownTitle: string | null = null;
  isCodeDropdownDropUp = false;

  constructor(private readonly elementRef: ElementRef) {}

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

  setProjectFilter(filter: 'all' | 'fullstack' | 'frontend') {
    this.selectedProjectFilter = filter;
  }

  get filteredProjects(): Project[] {
    if (this.selectedProjectFilter === 'all') return this.projects;
    return this.projects.filter((p) => p.type === this.selectedProjectFilter);
  }

  get fullStackProjects(): Project[] {
    return this.projects.filter((p) => p.type === 'fullstack');
  }

  get frontendProjects(): Project[] {
    return this.projects.filter((p) => p.type === 'frontend');
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



  readonly skillCategories: SkillCategory[] = [

    {
      title: 'Frontend Engineering',
      icon: 'frontend',
      badge: 'Core Expertise',
      color: 'from-cyan-500 to-blue-500',
      skills: [
        'HTML5 & Semantic Markup',
        'CSS3, Flexbox & Grid',
        'JavaScript (ES6+)',
        'TypeScript',
        'Angular (Signals & Standalone)',
        'React & Next.js',
        'Tailwind CSS',
        'Responsive Design'
      ]
    },
    {
      title: 'UX/UI Design',
      icon: 'design',
      badge: 'Design Systems',
      color: 'from-purple-500 to-pink-500',
      skills: [
        'Figma & Auto-Layout',
        'Framer Prototyping',
        'Wireframing & Userflows',
        'User-Centered Design',
        'Information Architecture',
        'User Psychology Basics',
        'Design Token Systems'
      ]
    },
    {
      title: 'Backend & Database',
      icon: 'backend',
      badge: 'API & Data',
      color: 'from-emerald-500 to-teal-500',
      skills: [
        'Firebase Authentication',
        'MySQL Database',
        'Laravel & PHP',
        'RESTful API Integration',
        'CRUD Architecture'
      ]
    },
    {
      title: 'Tools & Workflow',
      icon: 'tools',
      badge: 'DevOps & Tooling',
      color: 'from-amber-500 to-orange-500',
      skills: [
        'Git & GitHub',
        'VS Code & Extensions',
        'npm & Package Management',
        'Vite & Build Tools',
        'Postman API Testing'
      ]
    },
    {
      title: 'Key Competencies',
      icon: 'additional',
      badge: 'Practices',
      color: 'from-indigo-500 to-violet-500',
      skills: [
        'Mobile-First Architecture',
        'Performance Optimization',
        'Component Reusability',
        'Cross-Browser Compatibility',
        'Agile Problem Solving'
      ]
    }
  ];

  readonly projects: Project[] = [
    {
      title: 'SKIN.ME AI Ecommerce',
      description: 'Full-stack skincare ecommerce and personalized recommendation web application featuring an integrated AI skincare chatbot assistant.',
      image: 'projects/SKINME.png',
      imageAlt: 'SKIN.ME project preview',
      type: 'fullstack',
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
      title: 'LED Media',
      description: 'High-impact multimedia showcase portal for LED screen and digital advertising solutions. Built complete responsive frontend and implemented backend database adjustments.',
      image: 'projects/led_media.png',
      imageAlt: 'LED Media project preview',
      type: 'fullstack',
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
      type: 'fullstack',
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
      type: 'frontend',
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
      type: 'frontend',
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
      type: 'frontend',
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
      type: 'frontend',
      category: 'Angular Web App',
      roleBadge: 'Frontend Lead & UI Structure (Angular TS)',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      demoUrl: 'https://angular-ts-psi.vercel.app/mobile-catering',
    },
    {
      title: 'Laravel Multi-Vendor E-Commerce',
      description: 'Full-stack multi-vendor marketplace featuring dynamic storefront templates, vendor onboarding with admin approval workflows, express checkout (ABA / Bakong), and relational MySQL database architecture.',
      image: 'projects/laravel_ecommerce.png',
      imageAlt: 'Laravel Multi-Vendor E-Commerce Storefront preview',
      type: 'fullstack',
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
    },
  ];

  readonly additionalProjects: Project[] = [];
}