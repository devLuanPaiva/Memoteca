import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListThoughtComponent } from './screens/list-thought/list-thought.component';
import { ThoughtFormComponent } from './screens/thought-form/thought-form.component';

export const routes: Routes = [
  {
    path: '',
    component: ListThoughtComponent
  },
  {
    path: 'criar',
    component: ThoughtFormComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
