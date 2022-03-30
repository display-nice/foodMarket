<?php
$_POST = json_decode(file_get_contents("php://input"), true); // декодирует JSON
echo var_dump($_POST);
// команда берёт те данные, которые пришли из клиента, превращает в строку, и показывает их
// обратно
