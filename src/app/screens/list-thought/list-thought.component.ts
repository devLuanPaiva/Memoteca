import { Component, OnInit } from '@angular/core';
import { Thinking } from '../../interfaces/thinking';
import { ThinkingService } from '../../services/thinking.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
import { ThoughtComponent } from '../../components/thought/thought.component';
import { LoadMoreButtonComponent } from "../../components/shared/load-more-button/load-more-button.component";

@Component({
  selector: 'app-list-thought',
  imports: [CommonModule, ThoughtComponent, RouterModule, FontAwesomeModule, LoadMoreButtonComponent],
  templateUrl: './list-thought.component.html',
})
export class ListThoughtComponent implements OnInit {
  listThought: Thinking[] = [];
  currentPage: number = 1;
  haveMoreThought: boolean = true;
  commentSplash = faCommentSlash;

  constructor(private readonly service: ThinkingService) {}
  ngOnInit(): void {
    this.service.list(this.currentPage).subscribe((listThought) => {
      this.listThought = listThought;
    });
  }
  loadMoreThoughts(): void {
    this.service.list(++this.currentPage).subscribe((listThought) => {
      this.listThought.push(...listThought);
      if (!listThought.length) {
        this.haveMoreThought = false;
      }
    });
  }
}
