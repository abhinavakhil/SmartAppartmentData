import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanDialogComponent } from '@app/modules/dialogs/plan-dialog/plan-dialog.component';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  @Input() apartmentItem: any;
  showPlan: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openPlanDialog(plan: any) {
    const dialogRef = this.dialog.open(PlanDialogComponent, {
      data: { plan: plan },
      height: '80vh',
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
