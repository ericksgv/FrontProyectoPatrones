import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../service/admin-service.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  plazoletaId: number = 0;
  plazoletaName: string = "";

  constructor(private http: HttpClient, private router: Router, private adminService: AdminServiceService) {}

  ngOnInit(): void {
    this.plazoletaId = +localStorage.getItem("plazoletaIdAdmin")!;
  
    if (this.plazoletaId) {
      this.adminService.obtenerNombrePlazoletaPorId(this.plazoletaId)
        .subscribe(
          (plazoleta: PlazoletaDTO) => {
            this.plazoletaName = plazoleta.nombre;
            console.log("esss", this.plazoletaName);
          },
          (error) => {
            console.error('Error fetching plazoleta name:', error);
          }
        );
    }
  }

  logout() {
    localStorage.removeItem('plazoletaIdAdmin');
    this.router.navigate(['/ingresoAdmin']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
}



interface PlazoletaDTO {
  id: number;
  nombre: string;
}
