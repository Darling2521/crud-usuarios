import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm: FormGroup;
  isEdit = false;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      movil: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.userId = +params['id'];
        const user = this.userService.getUserById(this.userId);
        if (user) this.userForm.patchValue(user);
      }
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      if (this.isEdit) {
        const updatedUser: User = { id: this.userId, ...this.userForm.value, fechaRegistro: new Date() };
        this.userService.updateUser(updatedUser);
        Swal.fire('Actualizado', 'Usuario actualizado correctamente', 'success');
      } else {
        this.userService.addUser(this.userForm.value);
        Swal.fire('Guardado', 'Usuario agregado correctamente', 'success');
      }
      this.router.navigate(['/']);
    } else {
      
      Swal.fire('Error', 'Por favor completa correctamente todos los campos', 'error');
      
      
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}