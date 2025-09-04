import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet, NavigationEnd, RouterLinkActive} from '@angular/router';
import { AuthService } from '../services/Auth.Service';
import {NgClass, NgIf} from '@angular/common';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { filter } from 'rxjs/operators';

// @ts-ignore
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, NgIf, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      // Transition de gauche à droite (navigation vers l'avant)
      transition('home => diagnostic, diagnostic => ressources, ressources => activites, activites => profil', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ left: '100%', opacity: 0 })
        ], { optional: true }),
        query(':leave', [
          style({ left: '0%', opacity: 1 })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({ left: '-100%', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%', opacity: 1 }))
          ], { optional: true })
        ])
      ]),

      // Transition de droite à gauche (navigation vers l'arrière)
      transition('profil => activites, activites => ressources, ressources => diagnostic, diagnostic => home', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ left: '-100%', opacity: 0 })
        ], { optional: true }),
        query(':leave', [
          style({ left: '0%', opacity: 1 })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-in', style({ left: '100%', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms ease-out', style({ left: '0%', opacity: 1 }))
          ], { optional: true })
        ])
      ]),

      // Transition fade pour les autres cas (login, etc.)
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' })
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, transform: 'scale(1)' })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-in', style({ opacity: 0, transform: 'scale(1.05)' }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ], { optional: true })
        ])
      ])
    ]),

    // Animation pour le loader de page
    trigger('pageLoader', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit{
  title = 'Zen';
  menuOpen = false;
  isNavigating = false;
  currentRoute = '';
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    // Écouter les changements de route pour les animations
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = this.getRouteAnimationData(event.urlAfterRedirects);
      this.isNavigating = false;
    });

  }
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  // Fonction pour obtenir le nom de la route pour les animations
  getRouteAnimationData(url: string): string {
    if (url.includes('/home')) return 'home';
    if (url.includes('/diagnostic')) return 'diagnostic';
    if (url.includes('/ressources')) return 'ressources';
    if (url.includes('/activites')) return 'activites';
    if (url.includes('/user')) return 'user';
    if (url.includes('/login')) return 'login';
    return 'other';
  }

  // Préparer l'animation de route
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  logout() {
    this.isNavigating = true;
    this.closeMenu();

    // Petit délai pour l'animation
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
    }, 200);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  // Navigation avec effet de loading
  navigateWithEffect(route: string) {
    this.isNavigating = true;
    this.closeMenu();

    setTimeout(() => {
      this.router.navigate([route]);
    }, 100);
  }
}
