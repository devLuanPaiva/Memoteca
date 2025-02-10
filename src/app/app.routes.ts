import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListThoughtComponent } from './screens/list-thought/list-thought.component';
import { ThoughtFormComponent } from './screens/thought-form/thought-form.component';
import { EditThoughtComponent } from './screens/edit-thought/edit-thought.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./screens/list-thought/list-thought.module').then(m => m.ListThoughtRoutingModule)
  },
  {
    path: 'criar',
    loadChildren: () => import('./screens/thought-form/thought-form.module').then(m => m.ThoughtFormRoutingModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./screens/edit-thought/edit-thought.module').then(m => m.EditThoughtRoutingModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
