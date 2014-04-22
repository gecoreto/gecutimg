/**
 * @package gecutimg
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 * @link https://github.com/gecoreto/gecutimg
 * @author David Garzon <stylegeco@gmail.com>
 */
var gecutimg = (function() {
    var rect, circleA, circleB, imgW, imgH, extension;
    /**
     * @param String ctImg Es el id del boton que iniciara el cortado de la imagen
     * @param String ctFin Es el id del boton que finalizara el cortado de la imagen
     * @param String miImg Es el id de la imagen a cortar
     * @param String miCanvas Es el id del contenedor donde se renderiza el canvas
     */
    function letsCut(cutBtn, endBtn, idImg, idContainer, fileImg) {
        var stage, layer;
        var lienzoFinal = document.createElement("CANVAS");
        lienzoFinal.id = "canvasFinal";
        lienzoFinal.style.display = 'none';
        document.body.appendChild(lienzoFinal);
        cutBtn = document.getElementById(cutBtn);
        endBtn = document.getElementById(endBtn);
        idImg = document.getElementById(idImg);
        //Ocultar imagen inicial
        idImg.style.display = 'none';
        //$(endBtn).fadeOut();
        var url = idImg.src;
        var img = new Image();
        img.src = url;
        getExtension(url);
        img.onload = function() {
            //this = a la imagen cargada
            var imgWidth = this.width;
            var imgHeight = this.height;
            //crear nuevo escenario con kinetic
            stage = new Kinetic.Stage({
                // div contenedor del canvas
                container: idContainer,
                width: imgWidth,
                height: imgHeight
            });
            //Crear capa sobre el lienzo
            layer = new Kinetic.Layer();
            //Crear una imagen con Kinetic
            var image = new Kinetic.Image({
                x: 0,
                y: 0,
                image: this
            });
            //Añade a la capa la imagen
            layer.add(image);
            //Añade al escenario la capa
            stage.add(layer);
        }

        cutBtn.onclick = function(e) {
            this.style.display = "none";
            drawCircles(stage, layer);
        };

        endBtn.onclick = function(e) {
            circleA.remove();
            circleB.remove();
            rect.remove();
            layer.draw();
            try {
                var miCanvas = document.getElementsByTagName("canvas");
                var ctx = miCanvas[0].getContext("2d");
                var datosDeLaImagen = ctx.getImageData(rect.x(), rect.y(), -imgW, -imgH);
                var canvasFinal = miCanvas[1];
                var ctx2 = canvasFinal.getContext("2d");
                canvasFinal.height = datosDeLaImagen.height;
                canvasFinal.width = datosDeLaImagen.width;
                ctx2.putImageData(datosDeLaImagen, 0, 0);
                var dataUrl = canvasFinal.toDataURL(extension);
                window.open(dataUrl);
                rect = null;
                cutBtn.style.display = "inline";
            } catch (err) {
                var mensaje = "Esta exception se produce al usar el navegador chrome debido al metodo getImageData(), el navegador piensa que obtienes la imagen de un dominio externo y lo ve como un fallo de seguridad. Prueba usando firefox que no pone problema con esto =). o si no copia los archivos a tu servidor ya sea local o en la red y ya te debe funcionar en cualquier navegador con soporte html5.\n****Exception****\n" + err;
                alert(mensaje);
                console.log(mensaje);
            }
        };

        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //si tiene como parametro el id del input para cargar imagenes dinamicamente
            if (fileImg) {
                console.log("Todas las API de FILES son compatibles.");
                document.getElementById(fileImg).addEventListener('change', handleFileSelect, false);
            }
        } else {
            alert('Las API de FILES no son totalmente compatibles con este navegador. No puedes cargar imagenes  dinamicamente :( ');
        }
        //funcion que recibe el evento "onchange" del input para cambiar la imagen dinamicamente
        function handleFileSelect(evt) {
            var file = evt.target.files[0]; // FileList object

            var reader = new FileReader();

            reader.onload = (function(theFile) {
                return function(e) {
                    var img = new Image();
                    img.src = e.target.result;
                    getExtension(e.target.result);
                    img.onload = function() {
                        //this = a la imagen cargada
                        var imgWidth = this.width;
                        var imgHeight = this.height;
                        //actualizar escenario nuevo escenario 
                        stage.setAttrs({
                            width: imgWidth,
                            height: imgHeight
                        });
                        layer.removeChildren();
                        //Crear una imagen con Kinetic
                        var image = new Kinetic.Image({
                            x: 0,
                            y: 0,
                            image: this
                        });
                        //Añade a la capa la imagen
                        layer.add(image);
                        //Añade al escenario la capa
                        layer.draw();
                    }
                };
            })(file);

            // Read in the image file as a data URL.
            reader.readAsDataURL(file);

        }
    }

    function getExtension(url) {
        var extensiones_permitidas = new Array(".jpg", ".png");

        //recupero la extensión de este nombre de archivo 
        extension = (url.substring(url.lastIndexOf("."))).toLowerCase();
        //compruebo si la extensión está entre las permitidas 
        for (var i = 0; i < extensiones_permitidas.length; i++) {
            if (extensiones_permitidas[i] == extension) {
                extension = (extensiones_permitidas[i] = ".jpg") ? "image/jpeg" : "image/png";
                break;
            }
        }

    }

    function drawCircles(stage, layer) {
        circleA = new Kinetic.Circle({
            x: 60,
            y: 60,
            radius: 20,
            fill: "black",
            stroke: "white",
            strokeWidth: 2,
            draggable: true
        });

        circleB = new Kinetic.Circle({
            x: stage.getWidth() - 60,
            y: stage.getHeight() - 60,
            radius: 20,
            fill: "black",
            stroke: "white",
            strokeWidth: 2,
            draggable: true
        });

        //arreglo con los circulos
        var shapes = [circleA, circleB];

        if (!rect) {
            imgW = shapes[0].getX() - shapes[1].getX();
            imgH = shapes[0].getY() - shapes[1].getY();
            rect = new Kinetic.Rect({
                x: shapes[0].getX(),
                y: shapes[0].getY(),
                width: -imgW,
                height: -imgH,
                fill: "rgba(0, 0, 0, 0.6)",
                draggable: true
            });
            layer.add(rect);
            layer.draw();
        }
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].on("dragend", function() {
                imgW = shapes[0].getX() - shapes[1].getX();
                imgH = shapes[0].getY() - shapes[1].getY();
                rect.setAttrs({
                    x: shapes[0].getX(),
                    y: shapes[0].getY(),
                    width: -imgW,
                    height: -imgH,
                });
                layer.add(rect);
                layer.draw();
            });
            //Agregar puntero a circulos
            shapes[i].on('mouseover', function() {
                document.body.style.cursor = 'pointer';
            });
            shapes[i].on('mouseout', function() {
                document.body.style.cursor = 'default';
            });
        }
        layer.add(circleA);
        layer.add(circleB);
        layer.draw();

        handlersRect(layer, rect, circleA, circleB);
    }

    function handlersRect(layer, rect, circleA, circleB) {
        //se lanza cuando empiece a mover el rectangulo
        rect.on("dragstart", function() {
            var options = {
                fill: "transparent",
                stroke: "transparent",
            };
            circleA.setAttrs(options);
            circleB.setAttrs(options);
        });
        //se lanza cuando deje de mover el rectangulo
        rect.on("dragend", function() {
            circleA.setAttrs({
                x: rect.x(),
                y: rect.y(),
                fill: "black",
                stroke: "white",
            });
            circleB.setAttrs({
                x: rect.width() + rect.x(),
                y: rect.height() + rect.y(),
                fill: "black",
                stroke: "white",
            });
            layer.draw();
        });
        //Agregar puntero de movimiento al rectangulo
        rect.on('mouseover', function() {
            document.body.style.cursor = 'move';
        });
        rect.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
    }

    return {
        letsCut: letsCut
    }
})();
