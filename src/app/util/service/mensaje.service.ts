import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private snackBar: MatSnackBar,
  ) { }
  MostrarMensaje(message: string) {
    this.snackBar.open(message, 'AVISO', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['my-snackbar']
    });
  }
  MostrarMensaje2(message: string) {
    this.snackBar.open(message, 'AVISO', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['my-snackbar']
    });
  }
}
