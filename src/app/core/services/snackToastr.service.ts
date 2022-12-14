import { Injectable } from "@angular/core";
import {
  MatLegacySnackBar as MatSnackBar,
  MatLegacySnackBarHorizontalPosition as MatSnackBarHorizontalPosition,
  MatLegacySnackBarVerticalPosition as MatSnackBarVerticalPosition,
} from "@angular/material/legacy-snack-bar";
@Injectable({
  providedIn: "root",
})
export class SnackToastrService {
  private successOptions: any;
  private errorOptions:any;
  private warningOptions:any;
  private infoOptions:any;
  private horizontalPosition: MatSnackBarHorizontalPosition = "end";
  private verticalPosition: MatSnackBarVerticalPosition = "top";
  constructor(private toastr: MatSnackBar) {
    this.successOptions = {
      panelClass: ['green-snackbar'],
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    };
    this.errorOptions = {
      panelClass: ['red-snackbar'],
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    };
    this.infoOptions = {
      panelClass: ['blue-snackbar'],
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    };
    this.warningOptions = {
      panelClass: ['yellow-snackbar'],
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    };
  }

  success(message:string){
    this.toastr.open(message,'X',this.successOptions)
  }
  error(message:string){
    this.toastr.open(message,'X',this.errorOptions)
  }
  info(message:string){
    this.toastr.open(message,'X',this.infoOptions)
  }
  warning(message:string){
    this.toastr.open(message,'X',this.warningOptions)
  }
}
