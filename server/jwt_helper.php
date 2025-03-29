<?php
require __DIR__ . '/vendor/autoload.php';


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

define('JWT_SECRET', 'your_secret_key'); 

define('JWT_ALG', 'HS256');

define('JWT_EXPIRATION', 3600);

function createJWT($id, $email, $role) {
    $payload = [
        'iss' => 'your_app_name', 
        'iat' => time(), 
        'exp' => time() + JWT_EXPIRATION, 
        'email' => $email,
        'role' => $role,
    ];
    return JWT::encode($payload, JWT_SECRET, JWT_ALG);
}

function verifyJWT($token) {
    try {
        return JWT::decode($token, new Key(JWT_SECRET, JWT_ALG));
    } catch (Exception $e) {
        return null;
    }
}
