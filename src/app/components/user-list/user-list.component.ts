import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: User[];
 
  constructor(private userService: UserService){
    this.users = this.userService.getUsers();
  }

  deleteUser(id: number) {
    Swal.fire ({
      title: 'Estas seguro?',
      text: 'No podras recuperar este usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id);
        this.users = this.userService.getUsers();
        Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
      }
    });
  }

}
