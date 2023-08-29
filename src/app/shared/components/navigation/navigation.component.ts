import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isNavOpen = true;
  isSmallScreen = false;
/*   isDarkMode = false; */

  constructor() {}

  ngOnInit(): void {
    // Verificar el tamaño de la pantalla para determinar si es pequeña
    this.isSmallScreen = window.innerWidth < 768;
    const storedMode = localStorage.getItem('darkMode');
/*     if (storedMode) {
      this.isDarkMode = JSON.parse(storedMode);
    } */
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Actualizar isSmallScreen al cambiar el tamaño de la ventana
    this.isSmallScreen = window.innerWidth < 768;

    // Si la pantalla es pequeña, asegurarse de que la barra de navegación esté cerrada
    if (this.isSmallScreen) {
      this.isNavOpen = !this.isNavOpen;
    }else{
      this.isNavOpen = this.isNavOpen;
    }
  }

  toggleNav() {
    // Solo abrir la barra de navegación si la pantalla es pequeña
      this.isNavOpen = !this.isNavOpen;
  }
  //modo oscuro
/*   toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    // Guardar el estado en el Local Storage
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  } */
}
