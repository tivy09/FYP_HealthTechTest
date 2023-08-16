<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\MediaUploadingTrait;
use App\Http\Requests\MassDestroyCountryRequest;
use App\Http\Requests\StoreCountryRequest;
use App\Http\Requests\UpdateCountryRequest;
use App\Models\Country;
use Exception;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Yajra\DataTables\Facades\DataTables;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class CountriesController extends Controller
{

    use MediaUploadingTrait;

    public function index(Request $request)
    {
        abort_if(Gate::denies('country_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        if ($request->ajax()) {
            $query = Country::select(sprintf('%s.*', (new Country())->table));

            if (isset($request->is_active)) {
                if ($request->is_active != 'All') {
                    $query->where('is_active', $request->is_active);
                }
            }

            $table = Datatables::of($query);

            $table->addColumn('placeholder', '&nbsp;');
            $table->addColumn('actions', '&nbsp;');

            $table->editColumn('actions', function ($row) {
                $viewGate = 'country_show';
                $editGate = 'country_edit';
                $activeGate = 'country_edit';
                $inactiveGate = 'country_edit';
                $deleteGate = 'country_delete';
                $crudRoutePart = 'countries';

                return view('partials.datatablesActions', compact(
                    'viewGate',
                    'editGate',
                    'activeGate',
                    'inactiveGate',
                    'deleteGate',
                    'crudRoutePart',
                    'row'
                ));
            });

            $table->editColumn('name', function ($row) {
                return isset($row->name) ? $row->name : '';
            });

            $table->editColumn('short_code', function ($row) {
                return isset($row->short_code) ? $row->short_code : '';
            });

            $table->editColumn('mobile_code', function ($row) {
                return isset($row->mobile_code) ? $row->mobile_code : '';
            });

            $table->editColumn('icon', function ($row) {
                if ($photo = $row->icon) {
                    return sprintf(
                        '<a href="%s" target="_blank"><img src="%s" width="50px" height="50px"></a>',
                        $photo->url,
                        $photo->thumbnail
                    );
                }

                return '';
            });

            $table->editColumn('is_active', function ($row) {
                return isset($row->is_active) ? Country::STATUS_SELECT[$row->is_active] : '';
            });

            $table->rawColumns(['actions', 'placeholder', 'is_active', 'icon']);

            return $table->make(true);
        }

        return view('admin.countries.index');
    }

    public function create()
    {
        abort_if(Gate::denies('country_create'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('admin.countries.create');
    }

    public function store(StoreCountryRequest $request)
    {

        DB::beginTransaction();
        try {

            $country = Country::create($request->all());

            if ($request->input('icon', false)) {
                $country->addMedia(storage_path('tmp/uploads/' . basename($request->input('icon'))))->toMediaCollection('icon');
            }

            if ($media = $request->input('ck-media', false)) {
                Media::whereIn('id', $media)->update(['model_id' => $country->id]);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();

            return redirect()->route('admin.countries.create')->withInput($request->input())->withErrors(['error' => ['Something Error !']]);
        }

        return redirect()->route('admin.countries.index');
    }

    public function edit(Country $country)
    {
        abort_if(Gate::denies('country_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('admin.countries.edit', compact('country'));
    }

    public function update(UpdateCountryRequest $request, Country $country)
    {
        $country->update($request->all());

        if ($request->input('icon', false)) {
            if (!$country->icon || $request->input('icon') !== $country->icon->file_name) {
                if ($country->icon) {
                    $country->icon->delete();
                }
                $country->addMedia(storage_path('tmp/uploads/' . basename($request->input('icon'))))->toMediaCollection('icon');
            }
        } elseif ($country->icon) {
            $country->icon->delete();
        }

        return redirect()->route('admin.countries.index');
    }

    public function show(Country $country)
    {
        abort_if(Gate::denies('country_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return view('admin.countries.show', compact('country'));
    }

    public function destroy(Country $country)
    {
        abort_if(Gate::denies('country_delete'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $country->delete();

        return back();
    }

    public function massDestroy(MassDestroyCountryRequest $request)
    {
        Country::whereIn('id', request('ids'))->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function storeCKEditorImages(Request $request)
    {
        abort_if(Gate::denies('country_create') && Gate::denies('country_edit'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $model         = new Country();
        $model->id     = $request->input('crud_id', 0);
        $model->exists = true;
        $media         = $model->addMediaFromRequest('upload')->toMediaCollection('ck-media');

        return response()->json(['id' => $media->id, 'url' => $media->getUrl()], Response::HTTP_CREATED);
    }

    public function active(Request $request)
    {
        Country::where('id', $request->id)->update(['is_active' => 1]);
        return redirect()->route('admin.countries.index');
    }

    public function inactive(Request $request)
    {
        Country::where('id', $request->id)->update(['is_active' => 0]);
        return redirect()->route('admin.countries.index');
    }
}
