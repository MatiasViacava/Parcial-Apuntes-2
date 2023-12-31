import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Dessert } from 'src/app/models/dessert';
import { DessertService } from 'src/app/services/dessert.service';
@Component({
  selector: 'app-creaedita-dessert',
  templateUrl: './creaedita-dessert.component.html',
  styleUrls: ['./creaedita-dessert.component.css'],
})
export class CreaeditaDessertComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  dessert: Dessert = new Dessert();
  mensaje: string = '';
  maxFecha: Date = moment().add(-1, 'days').toDate();
  dueDateDessert = new FormControl(new Date());
  tipos: { value: string; viewValue: string }[] = [
    { value: 'dulce', viewValue: 'Dulce' },
    { value: 'salado', viewValue: 'Salado' },
  ];
  edicion: boolean = false;
  idDessert: number = 0;

  constructor(
    private dS: DessertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute


  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idDessert: [''],
      nameDessert: ['', Validators.required],
      typeDessert: ['', Validators.required],
      caloryDessert: ['', [Validators.required]],
      dueDateDessert: ['', Validators.required],
    });
    this.route.params.subscribe((data: Params) => {
      this.idDessert = data['idDessert'];
      this.edicion = data['idDessert'] != null;
      this.init();
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.dessert.idDessert = this.idDessert; //ACTUALIZAR
      this.dessert.nameDessert = this.form.value.nameDessert;
      this.dessert.caloryDessert = this.form.value.caloryDessert;
      this.dessert.typeDessert = this.form.value.typeDessert;
      this.dessert.dueDateDessert = this.form.value.dueDateDessert;
      if(this.edicion){
        this.dS.modificar(this.dessert).subscribe((data) => {
          this.dS.list().subscribe(data => {
            this.dS.setList(data);
          })
        })
      } else {
        this.dS.insert(this.dessert).subscribe((data) => {
          this.dS.list().subscribe(data => {
            this.dS.setList(data)
          })
        })
      }
      this.router.navigate(['postres']);
    } else {
      this.mensaje = 'Por favor complete todos los campos obligatorios.';
    }
  }

  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init() {
    if (this.edicion) {
      this.dS.listarId(this.idDessert).subscribe((data) => {
        this.form = new FormGroup({
        idDessert: new FormControl(data.idDessert),
        nameDessert: new FormControl(data.nameDessert),
        typeDessert: new FormControl(data.typeDessert),
        caloryDessert:new FormControl(data.caloryDessert),
        dueDateDessert: new FormControl(data.dueDateDessert),
        });
      });
    }

  }
}
