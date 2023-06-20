'use client'
import { guestWeddingSession } from '@/app/api/api';
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
    const [guest, setGuest] = useState<GuestWeddingSession[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const query = `
            query {
                getAllGuestWeddingSessionId(wedding_session_id: "649007bdca091be7add3c440"){
                  wedding_session {
                    id
                  }
                  name
                  whatsapp
                  instagram
                  address
                  visit_invitation_at
                  visit_virtual_wedding_at
                }
              }
          `;

            try {

                const masuk = await guestWeddingSession(query);
                console.log(masuk);
                setGuest(masuk);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='px-8 w-full'>
            <h3>Tamu Undangan</h3>

            <div>
                <ul>
                    {guest && guest.map((guest) => (
                        <li className='p-3 my-3 rounded-lg bg-primary/30' key={guest.name}>
                            <p>Name: {guest.name}</p>
                            <p>adress: {guest.address}</p>
                            <p>instagram: {guest.instagram}</p>
                            <p>whatsapp: {guest.whatsapp}</p>
                            <p>visit_invitation_at: {guest.visit_invitation_at}</p>
                            <p>visit_virtual_wedding: {guest.visit_virtual_wedding_at}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Tamu