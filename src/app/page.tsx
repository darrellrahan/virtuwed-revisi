'use client'
import Image from 'next/image'
import Feature from '@/components/Feature';

// LIBRARY
import { Button, ButtonOutline } from '@/components/ButtonComponent';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

// FONT 
import { Poppins } from 'next/font/google'
import Testimoni from '@/components/Testimoni';
const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700']
})

// DATA FEATURE
const featureData = [
	{
		source: '/assets/landingpage/feature/virtualWedding.png',
		title: 'Virtual 360° Wedding',
		description: 'Dengan Virtuwed, hadirkan suasana pernikahan impianmu ke dalam bentuk virtual room yang kami miliki, sehingga tamu dapat merasakan kesakralan atau feel pernikahan konvensional anda secara digital.',
		link: './homepage',
		linkTitle: 'Lihat 360° Virtual Wedding'
	},
	{
		source: 'https://satumomen.com/images/undangan-digital-unlimited-tamu-undangan.png',
		title: 'Undangan Digital',
		description: 'Sambutlah era baru undangan digital yang terintegrasi langsung dengan Ruang Virtual 360 kami, dan ucapkan selamat tinggal pada undangan digital era lama.',
		link: './homepage',
		linkTitle: 'Lihat Contoh Undangan'
	},
	{
		source: 'https://satumomen.com/images/reseller-undangan-digital-website-5.png',
		title: 'Desain Mewah & Eksklusif',
		description: 'Pilih dari ratusan desain mewah dan eksklusif yang telah dirancang khusus untuk diintegrasikan dengan Ruang Virtual 360 kami dengan cara yang mengesankan.',
		link: './homepage',
		linkTitle: 'Cari Desain Impian Anda'
	},
]


// NOTE:
// H1 = sm 36px, 
// H2 = sm 30px,
// H3 = sm 24px,
// H4 = sm 20px,

// TODO:
// produk
// footer
// color pallete
// font
// responsive
// navbar



export default function Home() {

	return (
		<main className={`${poppins.className} container min-w-full`}>

			{/* JUMBOTRON */}
			<section className='container min-w-full grid gap-y-6 justify-center items-center px-4 py-20'>
				<div>
					<Image
						src="https://satumomen.com/images/aplikasi-undangan-digital-website.webp"
						alt="Jumbotron Ilustration"
						className="w-full h-auto mx-auto"
						width={220}
						height={220}
						priority
					/>
				</div>

				<div className='grid gap-4 justify-start'>
					<h1 className='text-4xl font-bold'>Platform Pernikahan <span className='text-primary'>Virtual</span></h1>
					<p>Wujudkan pernikahan yang mewah dan elegan anda, secara virtual.</p>
					<Button link='/homepage' />
				</div>


			</section>

			{/* TAGLINE */}
			<section className='container grid gap-4 py-9 px-5 bg-gray-500'>
				<h3 className='text-2xl font-bold'>Raih pernikahan luar biasa <span className='text-primary'>Virtuwed</span></h3>
				<p className='text-white'>Memperkaya Pernikahan Melalui Pengalaman Digital yang Inovatif.</p>
			</section>

			{/* FEATURE */}
			<section className='container grid min-w-full justify-center items-center'>
				{/* FEATURE 1 */}
				{featureData.map((data, key) => {
					return (
						<Feature
							key={key}
							source={data.source}
							title={data.title}
							description={data.description}
							link={data.link}
							linkTitle={data.linkTitle}
						/>
					)
				})}

			</section>

			{/* PRODUCT */}
			<section></section>

			{/* TESTIMONI */}
			<section className='grid justify-center items-center gap-6 py-20'>
				<div className='grid gap-4 px-4'>
					<h2 className='text-3xl font-bold'>Yang Mereka Katakan</h2>
					<p>Menawarkan solusi terbaik untuk momen istimewa Anda menjadi tak terlupakan. Dapatkan pengalaman pernikahan yang memikat.</p>
				</div>

				<div className='grid'>
					<Testimoni />
				</div>

			</section>

			{/* CTA */}
			<section className='container grid gap-4 min-w-full justify-center items-center py-32 px-5 text-center bg-gray-400'>
				<div className='grid gap-4'>
					<h3 className='text-2xl font-bold'>Buat Virtuwed-mu Sekarang</h3>
					<hr className='bg-[#f7f2f2]'></hr>
					<p className='text-lg'>Nikmati pengalaman pernikahan yang tak terlupakan dengan Virtuwed.</p>
				</div>
				<ButtonOutline link='/homepage' />
			</section>

			{/* FAQ */}
			<section className='grid gap-4 min-w-full justify-items-center items-center py-20 px-4 text-center'>
				<div className='grid gap-4'>
					<h2 className='text-3xl font-bold'>General FAQs</h2>
					<hr className='bg-[#f7f2f2]' />
					<p>Semua yang anda perlu tahu mengenai produk dan bagaimana cara produk kami bekerja. Tidak menemukan jawaban? Hubungi kami</p>
				</div>
				<div className="w-full bg-green-500">
					<Disclosure>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
									<span>What is your refund policy?</span>
									<ChevronUpIcon
										className={`${open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="bg-yellow-300 px-4 pt-4 pb-2 text-sm text-gray-500">
									If you are unhappy with your purchase for any reason, email us
									within 90 days and we will refund you in full, no questions asked.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Disclosure as="div" className="mt-2">
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
									<span>Do you offer technical support?</span>
									<ChevronUpIcon
										className={`${open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
									No.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</section>

			{/* FOOTER */}
			<section></section>
		</main >

	)
}
