import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule
  ],
})
export class IndraCoreModule {
  constructor( @Optional() @SkipSelf() parentModule: IndraCoreModule) {
    if (parentModule) {
      const msg = `IndraCoreModule has already been loaded.
        Import IndraCoreModule once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}
