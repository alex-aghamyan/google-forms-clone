import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { IFormResponse } from '../../interfaces/form-response.interface';
import { IQuestion } from 'src/app/core/interfaces/question.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-responses',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container">
      <mat-accordion *ngIf="responses.length > 0; else noResponsesTemplate">
        <mat-expansion-panel *ngFor="let response of responses; index as responseIndex">
          <mat-expansion-panel-header>
            <mat-panel-title>Response {{ responseIndex + 1 }}</mat-panel-title>
          </mat-expansion-panel-header>
          <ol>
            <li *ngFor="let question of questions; index as questionIndex">
              <p>{{ question.text }}</p>
              <p>{{ response.answers[questionIndex] || 'No answer provided' }}</p>
            </li>
          </ol>
        </mat-expansion-panel>
      </mat-accordion>
      <ng-template #noResponsesTemplate>
        <mat-card appearance="outlined">No responses yet!</mat-card>
      </ng-template>
    </section>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
      }

      .container {
        width: 1000px;
        max-width: 1000px;
        margin-top: 3rem;
      }

      mat-card {
        display: grid;
        place-items: center;
        padding: 1rem 2rem;
      }
    `,
  ],
})
export class ResponsesComponent {
  @Input()
  responses!: IFormResponse[];

  @Input()
  questions!: IQuestion[];
}
