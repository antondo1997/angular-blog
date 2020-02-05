import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';
import { PostsService } from '../../shared/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private postsService: PostsService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
        title: new FormControl(null, [
          Validators.required,
        ]),
        author: new FormControl(null, [
          Validators.required,
        ]),
        content: new FormControl(null, [
          Validators.required,
        ])
      }
    );
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    // console.log(this.form.value);
    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      content: this.form.value.content,
      date: new Date()
    };
    this.postsService.create(post).subscribe(() => {
      this.form.reset();
    })
    console.log(post);
  }
}
