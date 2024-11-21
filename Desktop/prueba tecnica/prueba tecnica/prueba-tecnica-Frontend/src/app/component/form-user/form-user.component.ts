import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/UserService';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent {

  documentForm: FormGroup;
  userData: any | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router
  ) {
    this.documentForm = this.fb.group({
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onSubmit() {
    if (this.documentForm.valid) {
      const { documentType, documentNumber } = this.documentForm.value;

      this.userService.getUser(documentType, documentNumber).subscribe({
        next: (data) => {
          this.userService.setUserData(data);
          this.router.navigate(['/inf-user']);
        },
        error: (error) => {
          if (error.status === 404) {
            Swal.fire({
              icon: 'error',
              title: 'Usuario no encontrado',
              text: 'No se pudo encontrar un usuario con los datos proporcionados.',
            });
          } else {

            Swal.fire({
              icon: 'error',
              title: 'Error al obtener los datos del usuario',
              text: 'Algo salió mal, por favor intente nuevamente más tarde.',
            });
          }

          this.errorMessage = error;
          this.userData = null;
        }
      });
    }
  }
}
