import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { SearchPipe } from './pipes/search.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    SearchPipe,
    LoadingSpinnerComponent
  ],
  imports: [
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    SearchPipe,
    LoadingSpinnerComponent
  ],
})
export class SharedModule {

}
