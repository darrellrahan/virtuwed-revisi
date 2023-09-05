'use client'
import { getAllAssetByWeddingSession } from '@/utility/assets';
import { GET_ASSETS } from '@/utility/queries';
import React, { useEffect, useState } from 'react'

type getAllAssetByWeddingSession = {
    id: string;
    wedding_session: {
        id: string;
    }
    asset_id: string;
    name: string;
    asset_type: string;
    asset_url: string
};

const page = () => {

    const weddingSessionId = '649007bdca091be7add3c440'; // Replace with an actual user ID
    const [assets, setAssets] = useState<getAllAssetByWeddingSession[]>([]);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const variables = { weddingSessionId };
                const response = await getAllAssetByWeddingSession(GET_ASSETS, variables);
                setAssets(response);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchUserData();
    }, []);


    return (
        <div>page</div>
    )
}

export default page