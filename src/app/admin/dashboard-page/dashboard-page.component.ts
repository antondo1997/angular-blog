import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSub: Subscription;
  removeSub: Subscription;
  searchStr = '';

  constructor(
    private postsService: PostsService,
    private alert: AlertService
  ) {
  }

  ngOnInit() {
    this.postsSub = this.postsService.getAll().subscribe(posts => {
      // console.log(posts);
      this.posts = posts;
      // console.log('Posts:', this.posts);
    });
  }

  removePost(id: string) {
    this.removeSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alert.warning('Post has been deleted!');
    });
  }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }
}
