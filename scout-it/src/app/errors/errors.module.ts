import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NotFoundComponent, ServerErrorComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [NotFoundComponent, ServerErrorComponent],
})
export class ErrorsModule {}
