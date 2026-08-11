import { Component, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  title: string;
  skills: string[];
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

  handleClick() {
    this.clicked = true;
  }
}