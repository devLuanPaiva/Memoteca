import { RouterModule, Routes } from '@angular/router';
import { ThoughtFormComponent } from './components/thought/thought-form/thought-form.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'criar',
    component: ThoughtFormComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
