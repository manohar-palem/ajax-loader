# MplAjaxLoader

Loader Component for Ajax Calls

## Install

Run `npm install mpl-ajax-loader`


## Usage

- Import Ajax Loader module and add it to import section
```typescript
 import { MplAjaxLoaderModule } from 'mpl-ajax-loader';

 @NgModule({
  imports: [
    ...
    MplAjaxLoaderModule.forRoot(),
    ...
  ]
})
export class AppModule { }
```

- Add loader component to your template where you want to show  API call indication

```html
<div class="container">
    <mpl-ajax-loader [loaderId]="'QUERY_USERS'" [options]="{'classNames': 'test'}"></mpl-ajax-loader>
    <!-- Any other content goes here -->
    <!-- loader will occupy it's container full width & height -->
    <!-- Value of [loaderId] can be any string value -->
</div>
```

- Add a custom header 'mpl-ajax-loader-id' to your ajax call. This header will be automatically removed from the headers list of your API call. This header won't be sent to server and it is required for Ajax Loader module to bind the loader component for respective API call

**Note that __'GET_USERS'__ is the loader id we used in this example and it should be same for `<mpl-ajax-loader [loaderId]>` and `'mpl-ajax-loader-id': ` in headers

```typescript
getUsers() {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const options = {
        headers: {
            'mpl-ajax-loader-id': 'GET_USERS'
        }
    };

    return this.httpClient.get(url, options).subscribe();
}

```

** You can find example/usage in `app.component.ts` file
