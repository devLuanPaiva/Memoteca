import { RouterModule, Routes } from "@angular/router";
import { EditThoughtComponent } from "./edit-thought.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: EditThoughtComponent
  }
]
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), EditThoughtComponent]
})

export class EditThoughtRoutingModule { }