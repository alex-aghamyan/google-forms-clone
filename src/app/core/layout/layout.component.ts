import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { PushModule } from '@ngrx/component';
import { layoutFeature } from '../store/layout/layout.feature';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, MatButtonModule, PushModule],
  template: `
    <header>
      <h1>{{ title$ | ngrxPush }}</h1>
      <nav>
        <a mat-button routerLink="/dashboard" routerLinkActive="active-link">Dashboard</a>
        <a mat-button routerLink="/bookmarked-forms" routerLinkActive="active-link">
          Bookmarked Forms
        </a>
      </nav>
    </header>
    <div class="divider"></div>
    <main class="page-wrapper">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        margin: 0 2rem;
      }

      header {
        margin: 2rem;
        display: flex;
        justify-content: space-between;

        h1 {
          margin: 0;
        }
      }

      nav {
        display: flex;
        gap: 1rem;
      }

      .divider {
        width: 100%;
        height: 3px;
        margin-bottom: 2rem;
        background-color: #7b1fa2;
      }

      .active-link {
        border-bottom: 3px solid rgb(105 240 174);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly store = inject(Store);
  readonly title$ = this.store.select(layoutFeature.selectTitle);
}
