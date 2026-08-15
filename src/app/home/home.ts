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

export interface Project {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  type: 'fullstack' | 'frontend' | 'lab';
  category: string;
  roleBadge: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
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

  constructor(private readonly elementRef: ElementRef) {}

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
      tags: ['Next.js', 'MySQL', 'TypeScript', 'Tailwind CSS', 'Gemini AI'],
      demoUrl: 'https://skinme.store/',
    },
    {
      title: 'LED Media',
      description: 'High-impact multimedia showcase portal for LED screen and digital advertising solutions. Built complete responsive frontend and implemented backend database adjustments.',
      image: 'projects/led_media.png',
      imageAlt: 'LED Media project preview',
      type: 'fullstack',
      category: 'Full-Stack & Media',
      roleBadge: 'Full-Stack Contributor (Frontend + MySQL Backend)',
      tags: ['Laravel', 'MySQL', 'PHP', 'Blade', 'Tailwind CSS', 'JavaScript'],
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
      tags: ['Laravel', 'MySQL', 'PHP', 'Blade', 'Tailwind CSS', 'JavaScript'],
      demoUrl: 'https://envystage.com/',
    },
    {
      title: 'BRWeb Catering',
      description: 'Modern restaurant and mobile catering web platform built with Angular and TypeScript, featuring dynamic menu structures and responsive layouts modeled after the Metro portal architecture.',
      image: 'additional_project/brweb.png',
      imageAlt: 'BRWeb Catering project preview',
      type: 'frontend',
      category: 'Angular Web App',
      roleBadge: 'Frontend Lead & UI Structure (Angular TS)',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'Responsive UI', 'Vercel'],
      demoUrl: 'https://angular-ts-psi.vercel.app/mobile-catering',
    },
    {
      title: 'SKK Agriculture',
      description: 'Modern agricultural enterprise showcase platform featuring product galleries, catalog navigation, and dynamic inquiry interfaces.',
      image: 'projects/skk_agriculture.png',
      imageAlt: 'SKK Agriculture project preview',
      type: 'frontend',
      category: 'Enterprise Showcase',
      roleBadge: 'Frontend Developer (100% FE)',
      tags: ['Frontend Development', 'JavaScript', 'Tailwind CSS', 'HTML5/CSS3', 'Responsive UI'],
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
      tags: ['Frontend Architecture', 'Blade', 'Tailwind CSS', 'JavaScript', 'Hostinger'],
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
      tags: ['UX/UI Redesign', 'Responsive Layout', 'Frontend Optimization', 'CSS/JS'],
      demoUrl: 'https://mastermepsolution.com.kh/',
    },
  ];

  readonly additionalProjects: Project[] = [];
}