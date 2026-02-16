<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Services\AcademicService;
use App\Services\ProgressService;
use Illuminate\Http\Request;

class AcademicController extends Controller
{
    public function __construct(
        protected AcademicService $academicService,
        protected ProgressService $progressService
    ) {}

    public function index()
    {
        return response()->json($this->academicService->getCourses());
    }

    public function show($id)
    {
        return response()->json($this->academicService->getLessonContent($id));
    }

    public function storeProgress(Request $request, $id)
    {
        // El controlador NO calcula nada, solo delega al servicio.
        $result = $this->progressService->recordCompletion(
            auth()->id() ?? 1, // Mock user ID
            $id,
            $request->only(['correct_answers', 'total_questions'])
        );

        return response()->json($result);
    }
}
