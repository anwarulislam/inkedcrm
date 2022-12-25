import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  templates = [
    {
      name: 'Template 1',
      image: 'assets/images/tatoo2.png',
    },
    {
      name: 'Template 2',
      image: 'assets/images/tatoo2.png',
    },
    {
      name: 'Template 3',
      image: 'assets/images/tatoo2.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
