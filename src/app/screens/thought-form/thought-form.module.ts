import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThoughtFormComponent } from "./thought-form.component";

const routes: Routes = [
  {
    path: '',
    component: ThoughtFormComponent
  }
]
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ThoughtFormComponent]
})

export class ThoughtFormRoutingModule { }