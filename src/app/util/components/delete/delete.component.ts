import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  titulo : string = '';
  subtitulo : string = '';

  constructor(private dialog : MatDialogRef<DeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void 
  {
    this.titulo = this.data['titulo'];
    this.subtitulo = this.data['subtitulo'];
  }

  close(mensaje : string)
  {
    this.dialog.close(mensaje);
  }

}
