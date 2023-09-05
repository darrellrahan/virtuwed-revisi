'use client'
import { getAllGuestDigitalGiftByWeddingSessionId } from '@/utility/hadiah';
import { GET_GIFT } from '@/utility/queries';
import React, { useEffect, useState } from 'react'

type getAllGuestDigitalGiftByWeddingSessionId = {
    id: string
    digital_gift: {
        id: string
        price: number
        name: string
        description: string
        preview: string
    }
    guest: {
        id: string
        name: string
    }
    invoice: {
        id: string
        invoice: string
    }
    message: string
};


const page = () => {

    const weddingSessionId = '649007bdca091be7add3c440'; // Replace with an actual user ID
    const [gift, setGift] = useState<getAllGuestDigitalGiftByWeddingSessionId[]>([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const variables = { weddingSessionId };
                const response = await getAllGuestDigitalGiftByWeddingSessionId(GET_GIFT, variables);
                setGift(response);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);

    return (
        <div className="overflow-x-hidden">
            <table className="table overflow-x-auto">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>Gift</th>
                        <th>From</th>
                        <th>Message</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody className='overflow-auto'>
                    {gift && gift.map((gift) => {
                        return (
                            <tr key={gift.id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="\assets\ballroom\gift\bunga.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{gift.digital_gift.name}</div>
                                            <div className="text-sm opacity-50">{gift.digital_gift.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {gift.guest.name}
                                </td>
                                <td>{gift.message}</td>
                                <td>{gift.digital_gift.price}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                        )
                    })}


                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th></th>
                        <th>Gift</th>
                        <th>Giver</th>
                        <th>Message</th>
                        <th>Price</th>
                    </tr>
                </tfoot>

            </table>
        </div >
    )
}

export default page