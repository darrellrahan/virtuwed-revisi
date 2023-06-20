'use client'
import Image from 'next/image'
import Link from 'next/link';
import Feature from '@/components/Feature';
import Testimoni from '@/components/Testimoni';
import { Button, ButtonOutline } from '@/components/ButtonComponent';

// LIBRARY
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, ArrowUpRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { NewspaperIcon, GiftIcon, PresentationChartLineIcon, UsersIcon, VideoCameraIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';
import Footer from '@/components/Footer';



// NOTE:
// H1 = sm 36px lg 60px, 
// H2 = sm 30px lg 36px,
// H3 = sm 24px lg 30px,
// H4 = sm 20px lg 24px
// H5 = sm 16px lg 

// TODO:
// color pallete
// responsive
// navbar

const disclosures = [
	{ id: 1, title: 'Disclosure 1', content: 'Content for disclosure 1' },
	{ id: 2, title: 'Disclosure 2', content: 'Content for disclosure 2' },
	{ id: 3, title: 'Disclosure 3', content: 'Content for disclosure 3' },
];


export default function Home() {


	return (
		<>
			<main className={`container min-w-full`}>

				{/* JUMBOTRON */}
				<section className='container min-w-full grid gap-6 justify-center items-center px-4 py-20 lg:py-28 lg:grid-cols-2 lg:px-40'>
					<div className='lg:order-2'>
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
						<h1 className='text-4xl lg:text-6xl font-bold'>Platform Pernikahan <span className='text-primary'>Virtual</span></h1>
						<p>Wujudkan pernikahan yang mewah dan elegan anda, secara virtual.</p>
						<div className='lg:flex gap-4'>
							<div>
								<Button title='Mulai Sekarang' link='/dashboard' />
							</div>
							<div className='hidden lg:block'>
								<ButtonOutline title='Cara Memulai' link='/homepage' />
							</div>
						</div>
					</div>


				</section>

				{/* TAGLINE */}
				<section className='bg-tagline bg-cover bg-center'>
					<div className='grid gap-4 py-9 px-5 backdrop-brightness-50 lg:px-40'>
						<h3 className='text-2xl lg:text-3xl font-bold text-white'>Raih pernikahan luar biasa <span className='text-primary'>Virtuwed</span></h3>
						<p className='text-white font-light'>Memperkaya Pernikahan Melalui Pengalaman Digital yang Inovatif.</p>
					</div>
				</section>

				{/* FEATURE */}
				<section className='container grid min-w-full justify-center items-center'>
					{/* FEATURE 1 */}
					<div className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2'>
						<div className='lg:order-2'>
							<Image
								src='/assets/landingpage/feature/virtualWedding.png'
								alt="Jumbotron Ilustration"
								className="w-full h-auto mx-auto"
								width={220}
								height={220}
								priority
							/>
						</div>

						<div className='grid gap-y-4'>
							<h2 className='text-3xl lg:text-4xl font-bold'>Virtual 360° Wedding</h2>
							<p>Dengan Virtuwed, hadirkan suasana pernikahan impianmu ke dalam bentuk virtual room yang kami miliki, sehingga tamu dapat merasakan kesakralan atau feel pernikahan konvensional anda secara digital.</p>
							<div>
								<Link className='inline-block' href={'./homepage'}>
									<div className='items-center flex gap-2'>
										<p className='text-primary'>Lihat 360° Virtual Wedding</p>
										<ArrowUpRightIcon className="h-4 w-4 text-primary" />
									</div>
								</Link>
							</div>
						</div>
					</div>

					{/* FEATURE 2 */}
					<div className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2 bg-primary/20'>
						<div>
							<Image
								src='https://satumomen.com/images/undangan-digital-unlimited-tamu-undangan.png'
								alt="Jumbotron Ilustration"
								className="w-full h-auto mx-auto"
								width={220}
								height={220}
								priority
							/>
						</div>

						<div className='grid gap-y-4'>
							<h2 className='text-3xl lg:text-4xl font-bold'>Undangan Digital</h2>
							<p>Sambutlah era baru undangan digital yang terintegrasi langsung dengan Ruang Virtual 360 kami, dan ucapkan selamat tinggal pada undangan digital era lama.</p>
							<div>
								<Link className='inline-block' href={'./homepage'}>
									<div className='items-center flex gap-2'>
										<p className='text-primary'>Lihat Contoh Undangan</p>
										<ArrowUpRightIcon className="h-4 w-4 text-primary" />
									</div>
								</Link>
							</div>
						</div>
					</div>

					{/* FEATURE 3 */}
					<div className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2'>
						<div className='lg:order-2'>
							<Image
								src='https://satumomen.com/images/reseller-undangan-digital-website-5.png'
								alt="Jumbotron Ilustration"
								className="w-full h-auto mx-auto"
								width={220}
								height={220}
								priority
							/>
						</div>

						<div className='grid gap-y-4'>
							<h2 className='text-3xl lg:text-4xl font-bold'>Desain Mewah & Eksklusif</h2>
							<p>Pilih dari ratusan desain mewah dan eksklusif yang telah dirancang khusus untuk diintegrasikan dengan Ruang Virtual 360 kami dengan cara yang mengesankan.</p>
							<div>
								<Link className='inline-block' href={'./homepage'}>
									<div className='items-center flex gap-2'>
										<p className='text-primary'>Cari Desain Impian Anda</p>
										<ArrowUpRightIcon className="h-4 w-4 text-primary" />
									</div>
								</Link>
							</div>
						</div>
					</div>

					{/* FEATURE 4 */}
					<div className='grid gap-6 px-4 items-center py-16 lg:px-40'>
						<h2 className='text-3xl lg:text-4xl font-bold'>Integrasikan Dengan Fitur Terbaik</h2>

						<div className='grid lg:grid-cols-2 gap-6'>
							<div>
								<Image
									src='https://katsudoto.id/media/assets/promo/kbt-min.webp'
									alt="Jumbotron Ilustration"
									className="w-full h-auto mx-auto"
									width={220}
									height={220}
									priority
								/>
							</div>

							<div className='grid content-center'>
								<ul className='grid gap-4'>
									<li className='flex gap-2 items-center'>
										<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
											<VideoCameraIcon
												className='h-4 w-4 text-primary'
											/>
										</div>
										<p className='text-base'>Live Streaming 2 arah</p>
									</li>
									<li className='flex gap-2 items-center'>
										<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
											<GiftIcon
												className='h-4 w-4 text-primary'
											/>
										</div>
										<p className='text-base'>Hadiah digital</p>
									</li>
									<li className='flex gap-2 items-center'>
										<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
											<ChatBubbleBottomCenterTextIcon
												className='h-4 w-4 text-primary'
											/>
										</div>
										<p className='text-base'>Ucapan Pernikahan</p>
									</li>
								</ul>
							</div>
						</div>
					</div>

				</section>

				{/* PRODUCT */}
				<section className='grid gap-6 bg-white py-20 px-4 content-center lg:px-40'>
					<h2 className='font-bold text-3xl lg:text-4xl text-center'>Paket Virtuwed</h2>
					<div className='grid gap-6 lg:grid-cols-3'>

						{/* PRODUCT */}
						<div className='bg-white grid w-full gap-6 rounded-lg py-10 px-6 border border-solid border-[#d5dfff]'>
							<h4 className='font-bold text-xl lg:text-2xl'>Virtuwed Restu</h4>
							<ul className='grid gap-3'>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<NewspaperIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>Kisah Cinta</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<GiftIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>Amplop digital</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<PresentationChartLineIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>Guest Management</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<UsersIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>E-invitation</p>
								</li>

							</ul>

							<div className='grid gap-4'>
								<h2 className='text-3xl lg:text-4xl font-bold'><span className='font-normal text-base'>Rp </span>250.000</h2>
								<Button title='Tambah ke Cart' link='/homepage' />
							</div>
						</div>
						<div className='bg-white grid w-full gap-6 rounded-lg py-10 px-6 border border-solid border-[#d5dfff]'>
							<h4 className='font-bold text-xl lg:text-2xl'>Virtuwed Lamar</h4>
							<ul className='grid gap-3'>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<NewspaperIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>Kisah Cinta</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<GiftIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>Amplop digital</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<PresentationChartLineIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>Guest Management</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<UsersIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>E-invitation</p>
								</li>

							</ul>

							<div className='grid gap-4'>
								<h2 className='text-3xl lg:text-4xl font-bold'><span className='font-normal text-base'>Rp </span>850.000</h2>
								<Button title='Tambah ke Cart' link='/homepage' />
							</div>
						</div>
						<div className='bg-white grid w-full gap-6 rounded-lg py-10 px-6 border border-solid border-[#d5dfff] '>
							<h4 className='font-bold text-xl lg:text-2xl'>Virtuwed Mantu</h4>
							<ul className='grid gap-3'>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<NewspaperIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>Kisah Cinta</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<GiftIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>Amplop digital</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<PresentationChartLineIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>Guest Management</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<UsersIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p className='text-base'>E-invitation</p>
								</li>

							</ul>

							<div className='grid gap-4'>
								<h2 className='text-3xl lg:text-4xl font-bold'><span className='font-normal text-base'>Rp </span>900.000</h2>
								<Button title='Tambah ke Cart' link='/homepage' />
							</div>
						</div>


					</div>
				</section>

				{/* TESTIMONI */}
				<section className='grid justify-center items-center py-20'>
					<div className='grid gap-4 px-4 lg:px-40'>
						<h2 className='text-3xl lg:text-4xl font-bold'>Yang Mereka Katakan</h2>
						<p>Menawarkan solusi terbaik untuk momen istimewa Anda menjadi tak terlupakan. Dapatkan pengalaman pernikahan yang memikat.</p>
					</div>

					<div className='grid lg:px-40'>
						<Testimoni />
					</div>

				</section>

				{/* CTA */}
				<section
					style={{
						background:
							'linear-gradient(257.12deg, rgba(217, 217, 217, 0) 39.63%, #D1B0B0 87.04%)',
					}}
					className='container grid gap-4 min-w-full justify-center items-center py-32 px-5 text-center' >
					<div className='grid gap-4'>
						<h3 className='text-2xl lg:text-3xl font-bold'>Buat Virtuwed-mu Sekarang</h3>
						<hr className='bg-black'></hr>
						<p className='text-base'>Nikmati pengalaman pernikahan yang tak terlupakan dengan Virtuwed.</p>
					</div>
					<div>
						<Button title='Mulai Sekarang' link='/homepage' />
					</div>
				</section>

				{/* FAQ */}
				<section className='grid gap-4 min-w-full items-center py-20 px-4 text-center lg:text-start lg:px-40'>
					<div className='grid gap-4'>
						<h2 className='text-3xl lg:text-4xl font-bold'>General FAQs</h2>
						<hr className='bg-[#f7f2f2]' />
						<p>Semua yang anda perlu tahu mengenai produk dan bagaimana cara produk kami bekerja. Tidak menemukan jawaban? Hubungi kami</p>
					</div>
					<div className="w-full">
						<Disclosure>
							{({ open }) => (
								<>
									<Disclosure.Button className={`flex w-full justify-between rounded-t-lg px-4 py-4 text-left text-sm font-medium ${open ? 'bg-primary text-white' : 'text-black border-b-2'}`}>
										<span>Apa itu Virtuwed?</span>
										<ChevronUpIcon
											className={`${open ? 'rotate-180 transform text-white' : 'text-black'
												} h-5 w-5`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="bg-primary px-4 py-4 text-sm text-white rounded-b-lg">
										If you are unhappy with your purchase for any reason, email us
										within 90 days and we will refund you in full, no questions asked.
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>

						<Disclosure as="div" className="mt-2">
							{({ open }) => (
								<>
									<Disclosure.Button className={`flex w-full justify-between rounded-t-lg px-4 py-4 text-left text-sm font-medium ${open ? 'bg-primary text-white' : 'text-black border-b-2'}`}>
										<span>Apa itu Virtuwed?</span>
										<ChevronUpIcon
											className={`${open ? 'rotate-180 transform text-white' : 'text-black'
												} h-5 w-5`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="bg-primary px-4 py-4 text-sm text-white rounded-b-lg">
										If you are unhappy with your purchase for any reason, email us
										within 90 days and we will refund you in full, no questions asked.
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>

						<Disclosure as="div" className="mt-2">
							{({ open }) => (
								<>
									<Disclosure.Button className={`flex w-full justify-between rounded-t-lg px-4 py-4 text-left text-sm font-medium ${open ? 'bg-primary text-white' : 'text-black border-b-2'}`}>
										<span>Apa itu Virtuwed?</span>
										<ChevronUpIcon
											className={`${open ? 'rotate-180 transform text-white' : 'text-black'
												} h-5 w-5`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="bg-primary px-4 py-4 text-sm text-white rounded-b-lg">
										If you are unhappy with your purchase for any reason, email us
										within 90 days and we will refund you in full, no questions asked.
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>

						<Disclosure as="div" className="mt-2">
							{({ open }) => (
								<>
									<Disclosure.Button className={`flex w-full justify-between rounded-t-lg px-4 py-4 text-left text-sm font-medium ${open ? 'bg-primary text-white' : 'text-black border-b-2'}`}>
										<span>Apa itu Virtuwed?</span>
										<ChevronUpIcon
											className={`${open ? 'rotate-180 transform text-white' : 'text-black'
												} h-5 w-5`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="bg-primary px-4 py-4 text-sm text-white rounded-b-lg">
										If you are unhappy with your purchase for any reason, email us
										within 90 days and we will refund you in full, no questions asked.
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					</div>

				</section>
			</main >

			<Footer />
		</>

	)
}
