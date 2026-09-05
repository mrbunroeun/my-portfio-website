import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'projects/:filter',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { filter: 'all' },
      { filter: 'angular' },
      { filter: 'vue' },
      { filter: 'react' },
      { filter: 'laravel' },
      { filter: 'fullstack' },
      { filter: 'frontend' },
      { filter: 'backend' }
    ]
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
