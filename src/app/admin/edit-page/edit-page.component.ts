import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  updateSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alert: AlertService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.postsService.getById(params.id);
        })
      )
      .subscribe((post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, [
            Validators.required
          ]),
          content: new FormControl(post.content, [
            Validators.required
          ])
        });
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const newPost: Post = {
      ...this.post,
      title: this.form.value.title,
      content: this.form.value.content,
      // date: new Date()
    };
    // console.log(newPost.date);

    this.updateSub = this.postsService.update(newPost).subscribe(() => {
      this.submitted = false;
      this.alert.success('Post has been updated!');
      // this.form.reset();
      // this.router.navigate(['/admin', 'dashboard']);
    });
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }
}
