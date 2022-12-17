import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-sidenavs',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() isExpanded: any;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  navItems = [
    { icon: 'fa-thin fa-house', route: '/dashboard', name: 'Dashboard' },
    {
      icon: 'fa-thin fa-calendar-range',
      route: '/schedule/schedule-dashboard',
      name: 'Schedule',
    },
    {
      icon: 'fa-thin fa-user-astronaut',
      route: '/client/client-dashboard',
      name: 'Clients',
    },
    {
      icon: 'fa-thin fa-user-robot',
      route: '/artist/artists-dashboard',
      name: 'Artists',
    },
    {
      icon: 'fa-thin fa-chart-simple',
      route: '/dashboard/marketing',
      name: 'Marketing',
    },
    {
      icon: 'fa-thin fa-files',
      route: '/dashboard/templates',
      name: 'Templates',
    },
  ];
}