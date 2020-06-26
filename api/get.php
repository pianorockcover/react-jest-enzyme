<?php

header("Content-Type: application/json");

echo file_get_contents("../app/api/data/{$_GET['file']}");