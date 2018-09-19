import { Pipe } from '@angular/core';
@Pipe({
  name: 'prettyprint'
})
export class PrettyPrintPipe {
  transform(val) {
    return JSON.stringify(val, null, 2)
      .replace(' ', '&nbsp;')
      .replace('\n', '<br/>');
  }
}
