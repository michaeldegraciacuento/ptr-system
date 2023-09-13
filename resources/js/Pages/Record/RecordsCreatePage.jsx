import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import DangerButton from '@/Components/DangerButton';

export default function RecordsCreatePage({ auth }) {

    const [patients, setPatients] = useState([{ id: 1 }]);
    const [selectedImages, setSelectedImages] = useState([]);
    
    const handleFileInputChange = (e) => {
        const files = e.target.files;
        const selected = Array.from(files).map((file) => URL.createObjectURL(file));
        setSelectedImages(selected);
    };
    const { data: formData, setData: setFormData } = useForm({
        date: '',
        time: '',
        barangay: '',
        purok: '',
        driver: '',
        responder: '',
        patients: [
          {
            patient_name: '',
            patient_contact: '',
            patient_address: '',
            patient_age: '',
            patient_gender: '',
            patient_guardian: '',
            patient_guardian_contact: '',
            intervention: '',
            management: '',
            remarks: '',
          },
        ],
      });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handlePatientInputChange = (e, patientId) => {
        const { name, value } = e.target;
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.id === patientId ? { ...patient, [name]: value } : patient
          )
        );
      };
    
    const addPatient = () => {
        const newPatient = { id: patients.length + 1 };
        setPatients([...patients, newPatient]);
    };
    const removePatient = (id) => {
        const updatedPatients = patients.filter((patient) => patient.id !== id);
        setPatients(updatedPatients);
    };
   
   
    const submitForm = (e) => {
        e.preventDefault();
        const formDataToSend = {
            ...formData,
            patients: patients.map((patient) => ({
                ...patient,
                // Include only the relevant patient data
            })),
        };
    
        axios
        .post('/records/store', formDataToSend) // Change to formDataWithFiles if using FormData
        .then((response) => {
            console.log('Form submitted successfully:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Form submitted successfully!',
            });
           
        })
        .catch((error) => {
            console.error('Error submitting form:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while submitting the form.',
            });
        });
      };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transport Record Management / Create</h2>}
        >
            <Head title="Records" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="mx-auto p-4">
                            <form onSubmit={submitForm}>
                                <b>Particular Details:</b>
                                <div className="grid grid-cols-4 grid-rows-1 gap-4 mb-5">
                                    <div className="">
                                        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-1">Date <b className="text-red-500">*</b></label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date} 
                                            onChange={handleInputChange}
                                            className="w-full border rounded-lg focus:outline-none focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-1">Time <b className="text-red-500">*</b></label>
                                        <input
                                            type="time"
                                            name="time"
                                            value={formData.time} 
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="barangay" className="block text-gray-700 text-sm font-bold mb-1">Barangay <b className="text-red-500">*</b></label>
                                        <select
                                            name="barangay"
                                            value={formData.barangay} 
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                            required
                                        >
                                            <option value="" title="Please select a Barangay" disabled>Select Here</option>
                                            <option value="Poblacion">Poblacion</option>
                                            <option value="Burnay">Burnay</option>
                                            <option value="Pangayawan">Pangayawan</option>
                                            <option value="Matangad">Matangad</option>
                                            <option value="Quezon">Quezon</option>
                                            <option value="Kilangit">Kilangit</option>
                                            <option value="C.P Garcia">C.P Garcia</option>
                                            <option value="Ulab">Ulab</option>
                                            <option value="Tala-o">Tala-o</option>
                                            <option value="Cogon">Cogon</option>
                                            <option value="G. Pelaez">G. Pelaez</option>
                                        </select>
                                    </div>
                                    <div className="">
                                        <label htmlFor="purok" className="block text-gray-700 text-sm font-bold mb-1">Purok <b className="text-red-500">*</b></label>
                                        <select
                                            name="purok"
                                            value={formData.purok} 
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                            required
                                        >
                                           <option value="" title="Please select a Barangay" disabled>Select Here</option>
                                            <option value="Purok 1">Purok 1</option>
                                            <option value="Purok 2A">Purok 2A</option>
                                            <option value="Purok 2B">Purok 2B</option>
                                            <option value="Purok 3">Purok 3</option>
                                            <option value="Purok 4">Purok 4</option>
                                            <option value="Purok 5">Purok 5</option>
                                            <option value="Purok 6A">Purok 6A</option>
                                            <option value="Purok 6B">Purok 6B</option>
                                            <option value="Purok 7">Purok 7</option>
                                            <option value="Purok 8">Purok 8</option>
                                            <option value="Purok 9">Purok 9</option>
                                        </select>
                                    </div>
                                </div>

                                {patients.map((patient, index) => (
                                    <div className="patient-div mb-5" key={patient.id}>
                                        <hr />
                                        <b>Patient #{patient.id} Information :</b>
                                        <div className="grid grid-cols-4 grid-rows-2 gap-4">
                                            <div className="">
                                                <label htmlFor="{`patient_name_${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Name <b className="text-red-500">*</b></label>
                                                <input
                                                    type="text"
                                                    name="patient_name"
                                                    value={patient.patient_name} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter your patient name"
                                                    required
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="{`patient_contact${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Contact #</label>
                                                <input
                                                    type="number"
                                                    name="patient_contact"
                                                    value={patient.patient_contact} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter your patient contact #"
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="{`patient_address${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Address</label>
                                                <input
                                                    type="text"
                                                    name="patient_address"
                                                    value={patient.patient_address} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter your address"
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="{`intervention${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Intervention <b className="text-red-500">*</b></label>
                                                <select
                                                    name="intervention"
                                                    value={patient.intervention} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    required
                                                >
                                                    <option value="" title="Please select a intervention">Select Here</option>
                                                    <option value="Vehicular/ Road Accident">Vehicular/ Road Accident</option>
                                                    <option value="Domestic Violence">Domestic Violence</option>
                                                    <option value="Emergency Trauma">Emergency Trauma</option>
                                                    <option value="Pregnant">Pregnant</option>
                                                    <option value="Medical Illness">Medical Illness</option>
                                                    <option value="Follow-up Check-up for Non-Ambulatory">Follow-up Check-up for Non-Ambulatory</option>
                                                    <option value="Discharge Patient for Non-Ambulatory">Discharge Patient for Non-Ambulatory</option>
                                                </select>
                                            </div>
                                            <div className="">
                                                <label htmlFor="{`patient_age${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Age</label>
                                                <input
                                                    type="text"
                                                    name="patient_age"
                                                    value={patient.patient_age} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter patient age"
                                                    required
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="{`patient_gender${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Gender <b className="text-red-500">*</b></label>
                                                <select
                                                    name="patient_gender"
                                                    value={formData.patient_gender} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    required
                                                >
                                                    <option value="" title="Please select a Barangay">Select Here</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="LGBTQ">LGBTQ</option>
                                                </select>
                                            </div>
                                            
                                            <div className="">
                                                <label htmlFor="{`patient_guardian${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Guardian</label>
                                                <input
                                                    type="text"
                                                    name="patient_guardian"
                                                    value={patient.patient_guardian} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter patient guardian"
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="{`patient_guardian_contact${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Contact #</label>
                                                <input
                                                    type="number"
                                                    name="patient_guardian_contact"
                                                    value={patient.patient_guardian_contact} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter patient guardian #"
                                                />
                                            </div>
                                            
                                        </div>
                                        <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-3">
                                            <div className="">
                                                <label htmlFor="{`management${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Management <b className="text-red-500">*</b></label>
                                                <input
                                                    type="text"
                                                    name="management"
                                                    value={patient.management} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter Management "
                                                    required
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="{`remarks${patient.id}`}" className="block text-gray-700 text-sm font-bold mb-1">Remarks <b className="text-red-500">*</b></label>
                                                <input
                                                    type="text"
                                                    name="remarks"
                                                    value={patient.remarks} 
                                                    onChange={(e) => handlePatientInputChange(e, patient.id)}
                                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                    placeholder="Enter remarks"
                                                    required
                                                />
                                            </div>
                                            {index > 0 && ( 
                                                <div className="mt-7">
                                                    <DangerButton
                                                        type="button"
                                                        onClick={() => removePatient(patient.id)} 
                                                    >
                                                        Remove
                                                    </DangerButton>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                 <hr />
                                <div className="grid grid-cols-3 grid-rows-1 gap-4 mt-5">
                                        <div className="">
                                            <label htmlFor="driver" className="block text-gray-700 text-sm font-bold mb-1">Driver <b className="text-red-500">*</b></label>
                                            <select
                                                name="driver"
                                                value={formData.driver} 
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                required
                                            >
                                                <option value="" title="Please select a Barangay" disabled>Select Here</option>
                                                <option value="Nelson C. Nazaro">Nelson C. Nazaro</option>
                                                <option value="Alchie S. Manosa">Alchie S. Manosa</option>
                                                <option value="Bon Fredirick M. Donque">Bon Fredirick M. Donque</option>
                                            </select>
                                        </div>
                                        <div className="">
                                            <label htmlFor="responder" className="block text-gray-700 text-sm font-bold mb-1">Responder <b className="text-red-500">*</b></label>
                                            <select
                                                name="responder"
                                                value={formData.responder} 
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                                required
                                            >
                                               <option value="" title="Please select a Barangay" disabled>Select Here</option>
                                                <option value="Edwin F. Palasan">Edwin F. Palasan</option>
                                                <option value="Christian D. Clavecillas">Christian D. Clavecillas</option>
                                                <option value="Rex B. Micabalo">Rex B. Micabalo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mb-3">
                                        <button
                                            type="button"
                                            onClick={addPatient} 
                                            className="inline-flex items-center w-32 mt-5 h-12 px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Add Patient
                                        </button>
                                    </div>
                               
                                <label htmlFor="">Images:</label>
                                <div className="flex justify-between">
                                    <div className="w-full">
                                        {/* <input
                                            type="file"
                                            name="email"
                                            className="px-3 py-2 border rounded-lg focus:outline-none w-96 focus:border-blue-500"
                                            placeholder="Enter remarks"
                                            multiple
                                            onChange=handleFileInputChange
                                        /> */}
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white w-24 h-10 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {selectedImages.map((image, index) => (
                                        <div key={index} className="flex justify-center items-center">
                                            <img src={image} alt={`Image ${index + 1}`} className="max-w-xs h-auto" />
                                        </div>
                                    ))}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
