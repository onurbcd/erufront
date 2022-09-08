import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwapPosition } from '@model';

@Component({
  selector: 'app-swap-position',
  templateUrl: './swap-position.component.html',
  styleUrls: ['./swap-position.component.css'],
})
export class SwapPositionComponent implements OnInit {
  formGroup!: FormGroup;

  targetFormControl = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(this.swapPosition.max),
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public swapPosition: SwapPosition,
    private matDialogRef: MatDialogRef<SwapPositionComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onConfirmClick(): void {
    const swapPositionResult: SwapPosition = {
      id: this.swapPosition.id,
      target: this.formGroup.value.target,
      max: this.swapPosition.max,
    };

    this.matDialogRef.close(swapPositionResult);
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      target: this.targetFormControl,
    });
  }
}
