GECUTIMG
========

Gecutimg sirve para recortar una imagen seleccionando un pedazo de esta, hace uso de canvas con la libreria kinetic.

Ver un ejemplo: [Demo](http://gecutimg.gecoreto.cu.cc)

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
<script src="gecutimg-v1.js"></script>
<!-- Kinetic -->
<script src="kinetic-v5.1.0.min.js"></script>
```
En tu archivos html es necesario tener lo siguiente:
- Un contenedor donde se creara el canvas para manipular la imagen. 
- un boton para iniciar el corte de la imagen.
- Un boton para finalizar el corte de la imagen.
- Una imagen que sera la que queremos recortar.

Finalmente le pasamos los 4 identificadores("los id") nombrados anteriormente como parametro al metodo ` letsCut() ` de la clase ` Gecutimg ` como se muestra a continuación:

```javascript
//Tan pronto se carga la pagina
(function() {
    /**
     * "ctImg" Es el id del boton que iniciara el cortado de la imagen
     * "ctFin" Es el id del boton que finalizara el cortado de la imagen
     * "miImg" Es el id de la imagen a cortar
     * "miCanvas" Es el id del contenedor donde se renderiza el canvas
     */
    gecutimg.letsCut("ctImg", "ctFin", "miImg", "miCanvas");
})();
```

Y Listo!

Ver un ejemplo: [Demo](http://gecutimg.gecoreto.cu.cc)

## Contribuir

Si quieres ayudarme en el desarrollo de este proyecto no lo dudes, tienes a tu disposición todos los script.

## Sugerencias

- [stylegeco@gmail.com](stylegeco@gmail.com)
- [@stylegeco](https://twitter.com/stylegeco)
