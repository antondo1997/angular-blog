import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../interfaces';

@Pipe({
  name: 'searchPosts',
  // pure:
})
export class SearchPipe implements PipeTransform {

  transform(posts: Post[], searchStr = '', field: string = 'title'): Post[] {
    if (!searchStr.trim()) {
      return posts;
    }
    return posts.filter(post => {
      return post[field].toLowerCase().includes(searchStr.trim().toLowerCase());
    });
  }

}
