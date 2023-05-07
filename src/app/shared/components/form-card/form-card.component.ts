import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IForm } from '../../../core/interfaces/form.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [NgIf, RouterModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCardComponent {
  @Input()
  form!: IForm;

  @Output()
  toggleBookmarkedStatus = new EventEmitter<number>();

  @Output()
  deleteForm = new EventEmitter<number>();

  emitToggleFormBookmarkedStatus(): void {
    this.toggleBookmarkedStatus.emit(this.form.id);
  }

  emitDeleteForm(): void {
    this.deleteForm.emit(this.form.id);
  }
}
