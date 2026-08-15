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
  selectedProjectFilter: 'all' | 'fullstack' | 'frontend' | 'lab' = 'all';
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

  setProjectFilter(filter: 'all' | 'fullstack' | 'frontend' | 'lab') {
    this.selectedProjectFilter = filter;
  }

  get filteredProjects(): Project[] {
    const all = [...this.projects, ...this.additionalProjects];
    if (this.selectedProjectFilter === 'all') return all;
    return all.filter((p) => p.type === this.selectedProjectFilter);
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
      title: 'SKIN.ME',
      description: 'Full-stack skincare ecommerce and personalized recommendation web application featuring an integrated AI skincare chatbot.',
      image: 'projects/SKINME.png',
      imageAlt: 'SKIN.ME project preview',
      type: 'fullstack',
      category: 'Full-Stack & AI',
      roleBadge: 'Full-Stack Lead (Next.js + MySQL + Gemini)',
      tags: ['Next.js', 'MySQL', 'TypeScript', 'Tailwind CSS', 'Gemini AI'],
      demoUrl: 'https://skinme-demo.example.com',
      codeUrl: 'https://github.com/you/skinme',
    },
    {
      title: 'Envy Stage',
      description: 'Commercial web platform for stage effects and atmosphere solutions. Directed 100% frontend development and collaborated on 20% backend logic.',
      image: 'projects/envy_stage.png',
      imageAlt: 'Envy Stage project preview',
      type: 'fullstack',
      category: 'Commercial Web',
      roleBadge: 'Frontend Lead & Backend Support (100% FE / 20% BE)',
      tags: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL', 'JavaScript', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com',
    },
    {
      title: 'Metro',
      description: 'Corporate portal for stage and atmosphere products. Built 100% responsive frontend layouts and contributed ~40% backend database integration.',
      image: 'projects/metro.png',
      imageAlt: 'Metro project preview',
      type: 'fullstack',
      category: 'Commercial Web',
      roleBadge: 'Full-Stack Contributor (100% FE / 40% BE)',
      tags: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL', 'JavaScript', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com',
    },
    {
      title: 'SKK Agriculture',
      description: 'Modern agricultural enterprise showcase platform featuring product galleries and dynamic inquiry systems.',
      image: 'projects/skk_agriculture.png',
      imageAlt: 'SKK Agriculture project preview',
      type: 'fullstack',
      category: 'Enterprise Platform',
      roleBadge: 'Full-Stack Contributor (100% FE / 40% BE)',
      tags: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL', 'JavaScript', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com',
    },
    {
      title: 'LED Media',
      description: 'High-impact multimedia showcase portal for LED screen and digital advertising solutions with interactive showcases.',
      image: 'projects/led_media.png',
      imageAlt: 'LED Media project preview',
      type: 'frontend',
      category: 'Frontend & Media',
      roleBadge: 'Frontend Architect (100% Responsive UI)',
      tags: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL', 'JavaScript', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com',
    },
    {
      title: 'Master MEP',
      description: 'Mechanical, Electrical, and Plumbing engineering services portal designed for optimal clarity and fast mobile performance.',
      image: 'projects/master_mep.png',
      imageAlt: 'Master MEP project preview',
      type: 'frontend',
      category: 'Frontend Engineering',
      roleBadge: 'Frontend Engineer (UI/UX + Optimization)',
      tags: ['Laravel', 'Blade', 'Tailwind CSS', 'MySQL', 'JavaScript', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com',
    },
  ];

  readonly additionalProjects: Project[] = [
    {
      title: 'BRWeb Portfolio',
      description: 'Personal portfolio platform built with Angular 21 standalone architecture, Signals, and modern Tailwind CSS design tokens.',
      image: 'additional_project/brweb.png',
      imageAlt: 'BRWeb portfolio preview',
      type: 'frontend',
      category: 'Frontend & UI/UX',
      roleBadge: 'Frontend & UX/UI Designer',
      tags: ['Angular 21', 'Tailwind CSS', 'TypeScript'],
      demoUrl: 'https://yourportfolio.example.com',
      codeUrl: 'https://github.com/you/portfolio',
    },
    {
      title: 'Flappy Game Lab',
      description: 'Interactive browser experiment featuring time-based difficulty progression and responsive input controllers.',
      image: 'additional_project/portfolio.png',
      imageAlt: 'Game experiment preview',
      type: 'lab',
      category: 'Interactive Lab',
      roleBadge: 'Frontend & Game Logic',
      tags: ['Angular', 'TypeScript', 'Canvas / CSS'],
      demoUrl: 'https://yourportfolio.example.com',
    },
  ];
}