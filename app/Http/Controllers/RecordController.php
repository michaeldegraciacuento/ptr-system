<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Record;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $records = Record::paginate(15);

        return Inertia::render('Record/RecordsIndexPage', [
            'records' => $records,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Record/RecordsCreatePage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        $nextCode = $this->generateNextCode();
        $location = $request->input('purok') . ' ' . $request->input('barangay');
        $record = Record::create([
            'code' => $nextCode,
            'date' => $request->input('date'),
            'time' => $request->input('time'),
            'location' => $location,
            'driver' => $request->input('driver'),
            'responder' => $request->input('responder'),
        ]);

        foreach ($request->patients as $key) {
            Patient::create([
                'record_id' => $record->id,
                'patients' => $key['patient_name'],
                'patient_contact' => $key['patient_contact'],
                'patient_address' => $key['patient_address'],
                'patient_sex' => $key['patient_gender'],
                'patient_age' => $key['patient_age'],
                'patient_guardian' => $key['patient_guardian'],
                'patient_guardian_contact' => $key['patient_guardian_contact'],
                'intervention' => $key['intervention'],
                'management' => $key['management'],
                'remarks' => $key['remarks'],
            ]);
        }
        
        return redirect()->route('records.index')->with('success', 'Successfully Created Record');
        //return redirect()->route('records.index')->with('success', 'Successfully Created Record');
    }

    /**
     * Display the specified resource.
     */
    public function show(Record $record)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Record $record)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Record $record)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Record $record)
    {
        //
    }
    private function generateNextCode()
    {
        $latestRecord = Record::latest('code')->first();
        if (!$latestRecord) {
            return 'PTR-0001';
        }
        $numericPart = intval(substr($latestRecord->code, -4)) + 1;
        $nextCode = 'PTR-' . str_pad($numericPart, 4, '0', STR_PAD_LEFT);
        return $nextCode;
    }
}
