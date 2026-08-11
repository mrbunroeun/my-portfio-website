import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly isHidden = signal(false);
  protected readonly isMenuOpen = signal(false);
  private lastScrollY = 0;

  @HostListener('window:scroll')
  onWindowScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY && currentScrollY > 80) {
      this.isHidden.set(true);
    } else {
      this.isHidden.set(false);
    }

    this.lastScrollY = currentScrollY;
  }

  toggleMenu() {
    this.isMenuOpen.update((open) => !open);
  }
}