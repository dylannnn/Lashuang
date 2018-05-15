import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from '../app.component';
import { SearchComponent } from '../search/search.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { DictionaryComponent } from '../dictionary/dictionary.component';

// Guard
import { CanDeactivateGuard } from '../guard/can-deactive-guard.service';
import { AuthGuard } from '../services/auth-gard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
    {
        path: 'dict',
        component: DictionaryComponent,
        children: [
            {
                path: '',
                children: [
                    {
                        path: 'new/:word',
                        component: DictionaryComponent,
                    },
                    {
                        path: 'edit/:word',
                        component: DictionaryComponent
                    },
                    {
                        path: ':word',
                        component: DictionaryComponent
                    }
                ]
            }
        ]
    },
    {
        path: '',
        component: SearchComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: true, // <-- debugging purposes only
                preloadingStrategy: SelectivePreloadingStrategy,
            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CanDeactivateGuard,
        SelectivePreloadingStrategy
    ]
})
export class AppRoutingModule { }
