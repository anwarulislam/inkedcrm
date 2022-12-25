import { Component, NgModule, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

// make it module
@NgModule({
  declarations: [TemplatesComponent],
  imports: [SharedModule],
})
export class TemplatesModule {}
