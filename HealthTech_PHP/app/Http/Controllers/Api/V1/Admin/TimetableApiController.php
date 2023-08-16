<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\BaseController;
use App\Models\Timetable;
use App\Http\Requests\ApiRequests\StoreTimetableApiRequest;
use App\Http\Requests\ApiRequests\UpdateTimetableApiRequest;

class TimetableApiController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $timetables = Timetable::with(['doctors'])->get();

        foreach ($timetables as $timetable) {
            $time = json_decode($timetable->time);

            $timetable['su'] = $time->Sunday;
            $timetable['mo'] = $time->Monday;
            $timetable['tu'] = $time->Tuesday;
            $timetable['we'] = $time->Wednesday;
            $timetable['th'] = $time->Thursday;
            $timetable['fr'] = $time->Friday;
            $timetable['sa'] = $time->Saturday;
        }

        $timetables->makeHidden(['time', 'created_at', 'updated_at', 'deleted_at', 'status']);

        return parent::resFormat(1601, null, [
            'timetables' => $timetables,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\ApiRequests\StoreTimetableApiRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTimetableApiRequest $request)
    {
        $time = $this->objectToString($request);

        Timetable::create([
            'doctor_id' => $request['doctor_id'],
            'time' => $time,
            'status' => 1,
        ]);

        return parent::success(1603);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Timetable  $timetable
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $timetable = Timetable::with(['doctors'])->where('id', $id)->first();

        $time = json_decode($timetable->time);

        $timetable['su'] = $time->Sunday;
        $timetable['mo'] = $time->Monday;
        $timetable['tu'] = $time->Tuesday;
        $timetable['we'] = $time->Wednesday;
        $timetable['th'] = $time->Thursday;
        $timetable['fr'] = $time->Friday;
        $timetable['sa'] = $time->Saturday;

        $timetable->makeHidden(['time', 'created_at', 'updated_at', 'deleted_at', 'status']);

        return parent::resFormat(1605, null, [
            'timetable' => $timetable,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTimetableRequest  $request
     * @param  \App\Models\Timetable  $timetable
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTimetableApiRequest $request, $id)
    {
        $time = $this->objectToString($request);

        $timetable = Timetable::find($id);

        $timetable->update([
            'time' => $time,
        ]);

        return $request->all();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Timetable  $timetable
     * @return \Illuminate\Http\Response
     */
    public function destroy(Timetable $timetable)
    {
        //
    }

    /**
     * Object to String
     *
     * @param  Request $request
     * @return String $value
     */
    public function objectToString($request)
    {
        $time = [
            'Sunday' => $request['su'],
            'Monday' => $request['mo'],
            'Tuesday' => $request['tu'],
            'Wednesday' => $request['we'],
            'Thursday' => $request['th'],
            'Friday' => $request['fr'],
            'Saturday' => $request['sa'],
        ];

        return json_encode($time);
    }
}
