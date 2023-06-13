'use client'
import Image from 'next/image'
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {

	return (

		<main>
			<div className='h-screen min-w-full text-center grid justify-center content-center'>
				<h1>Landing page Virtuwed</h1>
				<p>baru tampilan mobile saja yaa</p>
				<Link href={'/homepage'} className='py-2 px-4 bg-tertiary rounded-full inline-block my-4'>undangan digital</Link>
			</div>
		</main >

	)
}
