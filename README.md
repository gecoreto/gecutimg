gecutimg
========

Gecutimg sirve para recortar una imagen seleccionando un pedazo de esta, hace uso de canvas con la libreria kinetic 

Requerimientos
=========

- Libreria KineticJS v5.1.0

## License

This software is licenced under the [ licencia MIT.](http://opensource.org/licenses/MIT). Please read LICENSE for information on the
software availability and distribution.

## Instalación & configuración 

Descarga gecutimg clonándolo  desde tu pc. Si no estás familiarizado con GIT o simplemente quieres el archivo comprimido has click en “Donwload zip” en la parte derecha de la pantalla.

Luego copia la carpeta gecutimg y su contenido en la raíz de tu proyecto, en tu archivo html o php incluye los siguientes scripts. 

```html
<!-- Gecutimg -->
<script src="../gecutimg-v1.js"></script>
<!-- Kinetic -->
<script src="../kinetic-v5.1.0.min.js"></script>
```
En tu archivos html es necesario tener:
- Un contenedor donde se creara el canvas para manipular la imagen. 
- un boton para iniciar el corte de la imagen.
- Un boton para finalizar el corte de la imagen.

Finalmente un ` require 'gecobject/config.php'; ` para cargar la librería y todo debería funcionar!
