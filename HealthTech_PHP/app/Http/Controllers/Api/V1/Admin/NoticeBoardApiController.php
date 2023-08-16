<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Traits\MediaUploadingTrait;
use App\Http\Requests\ApiRequests\StoreNoticeBoardRequest;
use App\Http\Requests\UpdateNoticeBoardRequest;
use App\Http\Resources\Admin\NoticeBoardResource;
use App\Models\NoticeBoard;
use Gate;
use Symfony\Component\HttpFoundation\Response;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class NoticeBoardApiController extends BaseController
{
    use MediaUploadingTrait;

    public function index()
    {
        $noticeBoards = NoticeBoard::with(['image'])->get();


        foreach ($noticeBoards as $noticeBoard) {
            $noticeBoard['image_url'] = $noticeBoard->image->document->url ?? null;
            $noticeBoard['image_thumbnail'] = $noticeBoard->image->document->thumbnail ?? null;
            $noticeBoard['image_preview'] = $noticeBoard->image->document->preview ?? null;
        }

        $noticeBoards->makeHidden(['image', 'media', 'image_id']);

        return parent::resFormat(1001, null, ['noticeBoards' => $noticeBoards]);
    }

    public function store(StoreNoticeBoardRequest $request)
    {
        $noticeBoard = NoticeBoard::create($request->all());

        return parent::success(1002);
    }

    public function show(NoticeBoard $noticeBoard)
    {
        abort_if(Gate::denies('notice_board_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new NoticeBoardResource($noticeBoard->load(['post_to']));
    }

    public function update(UpdateNoticeBoardRequest $request, NoticeBoard $noticeBoard)
    {
        $noticeBoard->update($request->all());

        if ($request->input('image', false)) {
            if (!$noticeBoard->image || $request->input('image') !== $noticeBoard->image->file_name) {
                if ($noticeBoard->image) {
                    $noticeBoard->image->delete();
                }
                $noticeBoard->addMedia(storage_path('tmp/uploads/' . basename($request->input('image'))))->toMediaCollection('image');
            }
        } elseif ($noticeBoard->image) {
            $noticeBoard->image->delete();
        }

        return (new NoticeBoardResource($noticeBoard))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function destroy(NoticeBoard $noticeBoard)
    {
        abort_if(Gate::denies('notice_board_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $noticeBoard->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function active($id)
    {
        DB::beginTransaction();
        try {
            $noticeBoard = NoticeBoard::where(['id' => $id])->first();

            $data = ['status' => 1];
            if ($noticeBoard->status) {
                $data = ['status' => 0];
            }

            $noticeBoard->update($data);
            DB::commit();

            return parent::success(1003);
        } catch (Exception $e) {
            DB::rollback();
            Log::channel("api")->error("Active Noticeboard Function Error(Admin/NoticeboardApiController)", ["id" => $id, 'error' => $e->getMessage()]);
            return parent::error();
        }
    }
}
