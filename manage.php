<?php

/**
 * MathFlow Orchestrator - Bare Metal
 * Developed for Technical Interview Demo
 */

function log_info($msg) { echo "\033[34m[INFO]\033[0m $msg\n"; }
function log_success($msg) { echo "\033[32m[SUCCESS]\033[0m $msg\n"; }
function log_error($msg) { echo "\033[31m[ERROR]\033[0m $msg\n"; }

$root = __DIR__;

$steps = [
    'Backend Setup' => function() use ($root) {
        log_info("Configuring Backend (Laravel)...");
        chdir($root . '/backend');
        if (!file_exists('.env')) copy('.env.example', '.env');
        
        $dbPath = $root . '/backend/database/database.sqlite';
        if (!file_exists($dbPath)) touch($dbPath);

        passthru('composer install --no-interaction');
        passthru(PHP_BINARY . ' artisan key:generate');
        passthru(PHP_BINARY . ' artisan migrate:fresh --seed');
    },
    'AI Service Setup' => function() use ($root) {
        log_info("Configuring AI Service (Node.js)...");
        chdir($root . '/ai-service');
        passthru('npm install');
        if (!file_exists('.env')) {
            $apiKey = readline("Enter your GROQ_API_KEY: ");
            file_put_contents('.env', "PORT=3001\nGROQ_API_KEY=$apiKey\n");
        }
    },
    'Frontends Setup' => function() use ($root) {
        log_info("Configuring Frontends...");
        chdir($root . '/frontend-classroom');
        passthru('npm install');
        chdir($root . '/frontend-landing');
        passthru('npm install');
    }
];

echo "------------------------------------------\n";
echo "   MathFlow Orchestrator - Bare Metal     \n";
echo "------------------------------------------\n";
echo "1. Full Setup (Initial configuration)\n";
echo "2. RUN ALL SERVICES (Start Demo)\n";
echo "3. Exit\n";
$choice = readline("Choose an option: ");

if ($choice == '1') {
    foreach ($steps as $name => $step) {
        log_info("Starting $name...");
        $step();
        log_success("$name completed.");
    }
} elseif ($choice == '2') {
    echo "\n\033[1;32m>>> STARTING DEMO ECOSYSTEM <<<\033[0m\n";
    echo "--------------------------------------------------------------------------\n";
    echo "[ Landing ]   -> http://localhost:5174  (Payments & Security)\n";
    echo "[ Classroom ] -> http://localhost:5173  (Lessons & AI Mathy)\n";
    echo "[ API ]       -> http://localhost:8000  (Business Logic)\n";
    echo "--------------------------------------------------------------------------\n";
    echo "Press Ctrl+C to stop all services.\n\n";

    $commands = [
        "cd backend && " . PHP_BINARY . " artisan serve --port=8000",
        "cd ai-service && npm run dev",
        "cd frontend-classroom && npm run dev -- --host --port 5173",
        "cd frontend-landing && npm run dev -- --host --port 5174"
    ];

    $fullCommand = "npx concurrently -k -p \"[{name}]\" -n \"API,AI,CLASS,LAND\" -c \"magenta,cyan,green,yellow\" \"" . implode('" "', $commands) . "\"";
    
    passthru($fullCommand);
}

log_success("Execution finished.");
