/**
 * @package gecutimg
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 * @link https://github.com/gecoreto/gecutimg
 * @author David Garzon <stylegeco@gmail.com>
 */
var gecutimg = (function() {
    var rect, circleA, circleB, imgW, imgH;
    function letsCut(cutBtn, endBtn, idImg, idContainer) {
        $("body").append('<canvas id="canvasFinal"></canvas>');
        $("#canvasFinal").css({display:"none"});
        var stage;
        var layer;
        cutBtn = "#" + cutBtn;
        endBtn = "#" + endBtn;
        idImg = "#" + idImg;
        $(idImg).fadeOut();
        //$(endBtn).fadeOut();
        var url = $(idImg).attr("src");
        var img = new Image();
        img.src = url;
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

        $(cutBtn).on("click", function() {
           // $(cutBtn).fadeOut();
           // $(endBtn).fadeIn();
            drawCircles(stage, layer);
        });

        $(endBtn).on("click", function() {
            circleA.remove();
            circleB.remove();
            rect.remove();
            layer.draw();
            var miCanvas = document.getElementsByTagName("canvas");
            var ctx = miCanvas[0].getContext("2d");
            var datosDeLaImagen = ctx.getImageData(rect.x(), rect.y(), -imgW, -imgH);
            var canvasFinal = miCanvas[1];
            var ctx2 = canvasFinal.getContext("2d");
            canvasFinal.height = datosDeLaImagen.height;
            canvasFinal.width = datosDeLaImagen.width;
            ctx2.putImageData(datosDeLaImagen, 0, 0);
            var dataUrl = canvasFinal.toDataURL();
            window.open(dataUrl);
            rect = null;
           // $(this).fadeOut();
          //  $(cutBtn).fadeIn();
        });
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