<?php
header("content-type:text/html; charset=UTF-8");
require_once("engine/engine.php");

$engine = new Engine();
$engine->init();
//$engine->lock("123");
$engine->forceReload(true);
$engine->output();