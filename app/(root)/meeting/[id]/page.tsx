"use client";

import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';

import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

const Meeting = ({ params }: { params: { id: string } }) => {
    const { user, isLoaded } = useUser();

    const { call, isCallLoading } = useGetCallById(params.id);
    const [isSetupComplete, setIsSetupComplete] = useState(false)

    if (isCallLoading) return <Loader />

    return (
        <main className='h-full w-full'>
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete} /> : <MeetingRoom />}
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default Meeting