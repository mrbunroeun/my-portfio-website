import { Component, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  title: string;
  skills: string[];
}

interface Project {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  demoUrl?: string;
  codeUrl?: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  clicked = false;
  ohio = `testing this kinna hero section`;
  title = `Angular ${VERSION.full} is red!`;

  boat = {
    name: 'Starfire',
    year: 1977,
    img: '/striking.jpg'
  };

  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      skills: [
        'HTML5 & Semantic Markup',
        'CSS3 (Flexbox, Grid, Animations)',
        'JavaScript',
        'TypeScript',
        'React & Hooks',
        'Next.js',
        'Responsive Web Design'
      ]
    },
    {
      title: 'UX/UI Design',
      skills: [
        'Figma',
        'Framer',
        'Wireframing & Prototyping',
        'Userflow',
        'User-Centered Design',
        'Information Architecture',
        'Basic User Psychology'
      ]
    },
    {
      title: 'Backend & Database',
      skills: [
        'Firebase Authentication',
        'MySQL (Basic)',
        'Laravel (Basic)'
      ]
    },
    {
      title: 'Tools',
      skills: [
        'Git & GitHub',
        'VS Code',
        'npm',
        'Vite'
      ]
    },
    {
      title: 'Additional Skills',
      skills: [
        'Mobile-First Design',
        'Performance Optimization',
        'REST API Integration',
        'Problem Solving'
      ]
    }
  ];

  projects: Project[] = [
    // 1
    {
      title: 'SKIN.ME',
      description: 'Full-stack skincare ecommerce and recommendation web application with AI chatbot.',
      image: 'projects/SKINME.png',
      imageAlt: 'SKIN.ME project screenshot',
      tags: ['Next.js', 'MySQL', 'TypeScript', 'JavaScript', 'Tailwind', 'Gemini AI'],
      demoUrl: 'https://skinme-demo.example.com',
      codeUrl: 'https://github.com/you/skinme'
    },
    // 2
    {
      title: 'Envy Stage',
      description: 'Full-stack project for a stage effects & atmosphere products company — led 100% of frontend work and contributed ~20% on backend. Fully responsive design across mobile and desktop.',
      image: 'projects/envy_stage.png',
      imageAlt: 'Envy Stage project screenshot',
      tags: ['Lavavel', 'Blade', 'Tailwind', 'MySql', 'Java Script', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com'
    },
    // 3
     {
      title: 'Metro',
      description: 'Full-stack project for a stage effects & atmosphere products company — led 100% of frontend work and contributed ~40% on backend. Fully responsive design across mobile and desktop.',
      image: 'projects/metro.png',
      imageAlt: 'Envy Stage project screenshot',
      tags: ['Lavavel', 'Blade', 'Tailwind', 'MySql', 'Java Script', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com'
    },
    // 4
    {
      title: 'SKKAGRICULTURE',
       description: 'Full-stack project for a stage effects & atmosphere products company — led 100% of frontend work and contributed ~40% on backend. Fully responsive design across mobile and desktop.',
      image: 'projects/skk_agriculture.png',
      imageAlt: 'Envy Stage project screenshot',
      tags: ['Lavavel', 'Blade', 'Tailwind', 'MySql', 'Java Script', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com'
    },
    // 5
    {
      title: 'LEDMEDIA',
       description: 'Full-stack project for a stage effects & atmosphere products company — led 100% of frontend work and contributed ~40% on backend. Fully responsive design across mobile and desktop.',
      image: 'projects/led_media.png',
      imageAlt: 'Envy Stage project screenshot',
      tags: ['Lavavel', 'Blade', 'Tailwind', 'MySql', 'Java Script', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com'
    },
    // 6
    {
      title: 'MASTER MEP',
       description: 'Full-stack project for a stage effects & atmosphere products company — led 100% of frontend work and contributed ~40% on backend. Fully responsive design across mobile and desktop.',
      image: 'projects/master_mep.png',
      imageAlt: 'Envy Stage project screenshot',
      tags: ['Lavavel', 'Blade', 'Tailwind', 'MySql', 'Java Script', 'PHP'],
      demoUrl: 'https://testimonial-card-demo.example.com'
    },
  ];
  additionalProjects: Project[] = [
  {
    title: 'BRWeb',
    description: 'This portfolio site itself — built with Angular standalone components and Tailwind CSS, fully responsive from mobile to desktop.',
    image: 'additional_project/brweb.png',
    imageAlt: 'Portfolio project screenshot',
    tags: ['Angular', 'Tailwind', 'TypeScript'],
    demoUrl: 'https://yourportfolio.example.com',
    codeUrl: 'https://github.com/you/portfolio'
  },
  {
    title: 'Portfolio',
    description: 'A Flappy Bird clone built in Unity with C#, featuring time-based difficulty scaling.',
    image: 'additional_project/portfolio.png',
    imageAlt: 'Flappy Bird clone screenshot',
    tags: ['Angular','Tailwind', 'Type Script'],
    demoUrl: 'https://yourportfolio.example.com',
    codeUrl: 'https://github.com/you/flappy-bird-clone'
  },
];
  handleClick() {
    this.clicked = true;
  }
}