import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TemplatesComponent } from './templates.component';

// make it module
@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TemplatesComponent,
      },
    ]),
  ],
})
export class TemplatesModule {}
