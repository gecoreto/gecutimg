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
Gecobject provee el archivo  ` autoload.php ` que se encarga de cargar automáticamente los archivos necesarios para el  correcto funcionamiento de la librería. Si usa una versión de php anterior a la 5.3 no funcionara correctamente el autoload ni la librería ya que esta implementa ` namespace ` que están presentes solo a partir de php 5.3 o superior. Sin embargo si llegase a presentar problemas en la carga de archivos y estas utilizando la versión correcta de php revisa los comentarios en el archivo [autoload.php](https://github.com/gecoreto/gecobject/blob/master/autoload.php).

Finalmente un ` require 'gecobject/config.php'; ` para cargar la librería y todo debería funcionar!
