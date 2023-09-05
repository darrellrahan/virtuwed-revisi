'use client'
import { GET_GUEST } from '@/utility/queries';
import { getAllGuestWeddingSessionId } from '@/utility/tamu';
import React, { useEffect, useState } from 'react'

type GuestWeddingSession = {
    wedding_session: {
        id: string;
    };
    name: string;
    whatsapp: string;
    instagram: string;
    address: string;
    visit_invitation_at: string;
    visit_virtual_wedding_at: string;
};

const Tamu = () => {

    const weddingSessionId = '649007bdca091be7add3c440'; // Replace with an actual user ID
    const [guest, setGuest] = useState<GuestWeddingSession[]>([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const variables = { weddingSessionId };
                const response = await getAllGuestWeddingSessionId(GET_GUEST, variables);
                setGuest(response.data.getAllGuestWeddingSessionId);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);


    return (
        <div className="px-6 py-9 w-screen md:w-full">
            <h3 className='text-2xl mb-6 md:text-3xl'>TAMU</h3>
            <div className='overflow-hidden'>
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='overflow-auto'>
                        {guest && guest.map((guest) => (
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="/assets/dashboard/peni.jpg" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{guest.name}</div>
                                            <div className="text-sm opacity-50">{guest.instagram}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {guest.whatsapp}
                                </td>
                                <td>{guest.address}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>

                        ))}

                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div >


    )
}

export default Tamu