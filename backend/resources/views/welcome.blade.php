<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MathFlow API - Service Monitor</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-200 min-h-screen flex items-center justify-center font-sans">
    <div class="max-w-2xl w-full p-8 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
        <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
                M
            </div>
            <div>
                <h1 class="text-2xl font-bold text-white">MathFlow Core API</h1>
                <p class="text-slate-400 text-sm">v1.0.0 • Entorno de Desarrollo</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                <h3 class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Estado del Sistema</h3>
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span class="text-emerald-400 font-medium text-sm">Operativo</span>
                </div>
            </div>
            <div class="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                <h3 class="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Base de Datos</h3>
                <span class="text-slate-200 font-medium text-sm">SQLite (Encrypted)</span>
            </div>
        </div>

        <div class="space-y-3">
            <h3 class="text-white text-sm font-semibold mb-4">Endpoints Críticos para la Demo:</h3>
            <div class="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg group hover:bg-slate-900 transition-colors">
                <code class="text-indigo-400 text-xs">GET /api/v1/courses</code>
                <span class="text-[10px] text-slate-500 font-mono">Catalog Mock Data</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg group hover:bg-slate-900 transition-colors">
                <code class="text-indigo-400 text-xs">POST /api/v1/subscribe</code>
                <span class="text-[10px] text-slate-500 font-mono">Luhn Validation</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg group hover:bg-slate-900 transition-colors">
                <code class="text-indigo-400 text-xs">POST /api/v1/lessons/{id}/complete</code>
                <span class="text-[10px] text-slate-500 font-mono">Progress Tracking</span>
            </div>
        </div>

        <div class="mt-8 pt-6 border-t border-slate-700 text-center">
            <p class="text-slate-500 text-xs italic">"Transformando la educación matemática con IA Agéntica."</p>
        </div>
    </div>
</body>
</html>
