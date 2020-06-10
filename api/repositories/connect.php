<?php

    session_start();

    $host = "simulator.c2p5biwhjisu.sa-east-1.rds.amazonaws.com"; /* Host name */

    $user = "simulator"; /* User */

    $password = "cria1234A*"; /* Password */

    $dbname = "simulador"; /* Database name */

    $con = mysqli_connect($host, $user, $password,$dbname);

    $con->set_charset("utf8");

    // Check connection
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }

?>