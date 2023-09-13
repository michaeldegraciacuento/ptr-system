import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessButton from '@/Components/SuccessButton';
import DangerButton from '@/Components/DangerButton';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';


export default function RecordsIndexpage({ auth, records }) {
    if (!records) {
        records = [];
    }
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Patient Transport Record Management</h2>}
        >
            <Head title="Records" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-3">
                        <Link href={route('records.create')}>
                            <PrimaryButton>Create</PrimaryButton>
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-6 py-4">
                            Search Function:
                            <input
                                type="text"
                                placeholder="Search by code, date, purok, or barangay"
                                className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 w-full"
                                value=""
                            />
                        </div>
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Id
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Code
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Driver / Responder
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" class="relative px-6 py-3 text-xs font-medium text-gray-500 uppercase ">
                                   Action
                                </th>
                                </tr>
                            </thead>
                            
                            <tbody className="bg-white divide-y divide-gray-200">
                                {records.data.map((record) => (
                                    <tr key={record.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{record.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{record.code}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {record.driver.split(' ').slice(0, 2).join(' ')} <b>/</b> {record.responder.split(' ').slice(0, 2).join(' ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{record.purok}{record.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{record.date} <b>/</b>  {record.time}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <SuccessButton to="">Edit</SuccessButton>
                                            <span className="mx-2"></span>
                                            <DangerButton to="">Delete</DangerButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                           
                            </table>
                            <div className="px-6 py-4 text-center">
                                {records.links && records.links.map((link, index) => (
                                    <span key={index} className="px-2">
                                         <a
                                            href={link.url}
                                            className={link.active ? 'font-bold' : ''}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    </span>
                                ))}
                            </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
