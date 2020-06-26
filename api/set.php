<?php

header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'));

file_put_contents("../app/api/data/{$_GET['file']}", $data);