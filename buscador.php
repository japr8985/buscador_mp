<?php
$json = file_get_contents('php://input');
$request = json_decode($json, TRUE);

$file = file_get_contents('data-1.json');
$data = json_decode($file);
/**
 * function para el filtrado por ciudad
 */
function filterByCity($info, $filter) {
    // recorrer data
    return array_filter($info, function($obj) use ($filter){
        // si el objeto en su propiedad Ciudad es igual al filtro que se indico
        if ($obj->Ciudad === $filter) {
            // retornar el obj
            return $obj;
        }
    });
}
/**
 * funcion para el filtrado por tipo
 */
function filterByType($info, $type) {
    return array_filter($info, function($obj) use ($type){
        if ($obj->Tipo === $type) {
            return $obj;
        }
    });
}
/**
 * function para el filtrado por precio
 * pendiente por finalizar
 */
function filterByPrice($info, $price) {
    // separar el rango de precios pero su limitador ";"
    /**
     * $min tiene el precio mas bajo
     * $max tiene el precio mas alto
     * */
    list($min, $max) = explode(";", $price);
    // llevando el rango de precios a numeros (int)
    $min = intval($min);
    $max = intval($max);
    return array_filter($info, function($obj) use ($min, $max){
        /**
         * el precio del inmueble ya viene con un format 
         * establecido, entonces hay que eliminar el 
         * caracter "$" y llevar el precio a un formato en el que se pueda comparar
         */
        /**
         * el precio que viene por defecto tiene la siguiente forma
         * $69,505
         * aplicando el explode tendre un arreglo ["$", "69,505"]
         * donde por una parte tendre el caracter de la moneda y por otro el numero
         * para acceder al numero seria $price[1]
         * */
        $price = explode("$", $obj->Precio);
        /**
         * LLEVANDO EL PRECIO A NUMERO
         * los precios indicados en el archivo tiene como separador de miles la coma
         * se debe eliminar ese formato y llevarlo a integer
         */
        $num = intval(str_replace(",","",$price[1]));
        // realizando comparacion
        if ($num >= $min && $num <= $max) {
            return $obj;
        }
    });
}
// preparando respuesta con toda la data
$response = $data;
/**
 * inciando filtrado de la informacion
 */
// si existe el filtrado por ciudad
if (!empty($request['city'])) {
    $response = filterByCity($response, $request['city']);
}
// si existe el filtrado por tipo
if (!empty($request['type'])) {
    $response = filterByType($response, $request['type']);
}
// si existe el filtrado por precios
if (!empty($request['price'])) {
    $response = filterByPrice($response, $request['price']);
}


echo json_encode($response);
?>