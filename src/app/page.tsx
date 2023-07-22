'use client'
import Image from 'next/image'
import Link from 'next/link';
import Testimoni from '@/components/Testimoni';
import { Button, ButtonOutline } from '@/components/ButtonComponent';

// LIBRARY
import { Disclosure } from '@headlessui/react'
import { ArrowUpRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { NewspaperIcon, GiftIcon, PresentationChartLineIcon, UsersIcon, VideoCameraIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';
import Footer from '@/components/Footer';
import { motion } from "framer-motion"
import Navbar from '@/components/Navbar';



// NOTE:
// H1 = sm 36px lg 60px, 
// H2 = sm 30px lg 36px,
// H3 = sm 24px lg 30px,
// H4 = sm 20px lg 24px
// H5 = sm 16px lg 

// TODO:
// navbar mobile
// link btn jumbotron
// decoration wallpaper



export default function Home() {

	const item = {
		hidden: {
			y: "100%",
			transition: { ease: [0.455, 0.03, 0.515, 0.955] }
		},
		visible: {
			y: 0,
			transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
		}
	};

	const item2 = {
		offscreen: {
			y: "200%",
			// transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
			transition: { ease: [0.455, 0.03, 0.515, 0.955] }
		},
		onscreen: {
			y: 0,
			transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
		}
	};

	return (
		<>
			<Navbar />
			<main className='container min-w-full'>

				{/* JUMBOTRON */}
				<section id='Beranda' className='container w-full grid gap-6 justify-center items-center px-4 py-20 lg:py-28 lg:grid-cols-2 mt-8 md:mt-0 lg:px-40 lg:h-screen max-w-screen-xl mx-auto'>
					<div className='lg:order-2'>
						<Image
							src="/assets/landingpage/jumbotron.png"
							alt="Jumbotron Ilustration"
							className="w-full h-auto mx-auto"
							width={500}
							height={500}
							priority
						/>
					</div>

					<div className='grid gap-4 justify-start'>
						<span className="overflow-hidden inline-block">
							<motion.h1 variants={item} initial="hidden" animate="visible" className='text-4xl lg:text-6xl font-deAetna'>Platform Pernikahan <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#EFD2D2] from-10% to-[#D18080] to-30%'>Virtual</span></motion.h1>
						</span>
						<p className='font-light font-amiamie'>Wujudkan pernikahan yang mewah dan elegan anda, secara virtual.</p>
						<div className='lg:flex gap-4'>
							<div>
								<Button title='Mulai Sekarang' link='https://forms.gle/4pD6peBYRoFKVJEN7' />
							</div>
							<div className='hidden lg:block'>
								<ButtonOutline title='Cara Memulai' link='/homepage' />
							</div>
						</div>
					</div>


				</section>

				{/* TAGLINE */}
				<section className='bg-tagline bg-cover bg-center'>
					<div className='backdrop-brightness-[.2] '>
						<div className='max-w-screen-xl mx-auto grid gap-4 justify-start py-9 px-5 lg:px-40'>
							<h3 className='text-2xl lg:text-3xl font-deAetna text-white'>Raih pernikahan luar biasa <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#EFD2D2] from-10% to-[#D18080] to-30%'>Virtuwed</span></h3>
							<p className='text-white font-light font-amiamie'>Memperkaya Pernikahan Melalui Pengalaman Digital yang Inovatif.</p>
						</div>
					</div>
				</section>

				{/* FEATURE */}
				<section id='Fitur' className='min-w-full'>
					{/* FEATURE 1 */}
					<motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2 max-w-screen-xl mx-auto'>
						<div className='lg:order-2'>
							<Image
								src='/assets/landingpage/feature/1.png'
								alt="Jumbotron Ilustration"
								className="w-full h-auto mx-auto"
								width={500}
								height={500}
								priority
							/>
						</div>

						<div className='grid gap-y-4'>
							<span className="overflow-hidden inline-block pb-1.5">
								<motion.h2 variants={item2} className='text-3xl lg:text-4xl font-deAetna'>Virtual 360° Wedding</motion.h2>
							</span>
							<p className='font-light font-amiamie'>Dengan Virtuwed, hadirkan suasana pernikahan impianmu ke dalam bentuk virtual room yang kami miliki, sehingga tamu dapat merasakan kesakralan atau feel pernikahan konvensional anda secara digital.</p>
							<div>
								<Link className='inline-block' href={'./homepage/resepsivirtual'}>
									<div className='items-center flex gap-2'>
										<p className='text-primary font-amiamie'>Lihat 360° Virtual Wedding</p>
										<ArrowUpRightIcon className="h-4 w-4 text-primary" />
									</div>
								</Link>
							</div>
						</div>
					</motion.div>

					{/* FEATURE 2 */}
					<motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} className='bg-primary/20'>
						<div className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2 max-w-screen-xl mx-auto'>
							<div>
								<Image
									src='/assets/landingpage/feature/2.png'
									alt="Jumbotron Ilustration"
									className="w-full h-auto mx-auto"
									width={500}
									height={500}
									priority
								/>
							</div>

							<div className='grid gap-y-4'>
								<span className="overflow-hidden inline-block pb-1.5">
									<motion.h2 variants={item2} className='text-3xl lg:text-4xl font-deAetna'>Undangan Digital</motion.h2>
								</span>
								<p className='font-light font-amiamie'>Sambutlah era baru undangan digital yang terintegrasi langsung dengan Ruang Virtual 360 kami, dan ucapkan selamat tinggal pada undangan digital era lama.</p>
								<div>
									<Link className='inline-block' href={'./homepage'}>
										<div className='items-center flex gap-2'>
											<p className='text-primary font-amiamie'>Lihat Contoh Undangan</p>
											<ArrowUpRightIcon className="h-4 w-4 text-primary" />
										</div>
									</Link>
								</div>
							</div>
						</div>
					</motion.div>

					{/* FEATURE 3 */}
					<motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2 max-w-screen-xl mx-auto'>
						<div className='lg:order-2'>
							<Image
								src='/assets/landingpage/feature/3.png'
								alt="Jumbotron Ilustration"
								className="w-full h-auto mx-auto"
								width={500}
								height={500}
								priority
							/>
						</div>

						<div className='grid gap-y-4'>
							<span className="overflow-hidden inline-block pb-1.5">
								<motion.h2 variants={item2} className='text-3xl lg:text-4xl font-deAetna'>Desain Mewah & Eksklusif</motion.h2>
							</span>
							<p className='font-light font-amiamie'>Pilih dari ratusan desain mewah dan eksklusif yang telah dirancang khusus untuk diintegrasikan dengan Ruang Virtual 360 kami dengan cara yang mengesankan.</p>
							<div>
								<Link className='inline-block' href={{ pathname: '/homepage' }}>
									<div className='items-center flex gap-2'>
										<p className='text-primary font-amiamie'>Cari Desain Impian Anda</p>
										<ArrowUpRightIcon className="h-4 w-4 text-primary" />
									</div>
								</Link>
							</div>
						</div>
					</motion.div>

					{/* FEATURE 4 */}
					<motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} className='grid gap-6 px-4 items-center py-16 lg:px-40 max-w-screen-xl mx-auto'>
						<span className="overflow-hidden inline-block pb-1.5">
							<motion.h2 variants={item2} className='text-3xl lg:text-4xl font-deAetna'>Integrasikan Dengan Fitur Terbaik</motion.h2>
						</span>

						<div className='grid justify-items-start lg:grid-cols-2 gap-6'>
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
										<p className='text-base font-amiamie'>Live Streaming 2 arah</p>
									</li>
									<li className='flex gap-2 items-center'>
										<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
											<GiftIcon
												className='h-4 w-4 text-primary'
											/>
										</div>
										<p className='text-base font-amiamie'>Hadiah digital</p>
									</li>
									<li className='flex gap-2 items-center'>
										<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
											<ChatBubbleBottomCenterTextIcon
												className='h-4 w-4 text-primary'
											/>
										</div>
										<p className='text-base font-amiamie'>Ucapan Pernikahan</p>
									</li>
								</ul>
							</div>
						</div>
					</motion.div>

				</section>

				{/* PRODUCT */}
				<motion.section id='Paket' initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} className='grid gap-6 bg-gray-300/25 py-20 px-4 content-center lg:px-40 max-w-screen-xl mx-auto'>
					<span className="overflow-hidden inline-block pb-1.5">
						<motion.h2 variants={item2} className='font-deAetna text-3xl lg:text-4xl text-center'>Paket Virtuwed</motion.h2>
					</span>
					<div className='grid gap-6 lg:grid-cols-3'>

						{/* PRODUCT */}
						<div className='bg-white grid w-full gap-6 rounded-2xl py-10 px-6 border border-solid border-[#d5dfff]'>
							<h4 className='font-deAetna text-xl lg:text-2xl'>Virtuwed Restu</h4>
							<ul className='grid gap-3 font-light font-amiamie'>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<NewspaperIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>Kisah Cinta</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<GiftIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>Amplop digital</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<PresentationChartLineIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>Guest Management</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<UsersIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>E-invitation</p>
								</li>

							</ul>

							<div className='grid gap-4'>
								<h2 className='text-3xl lg:text-4xl font-deAetna'><span className='font-normal text-base'>Rp </span>250.000</h2>
								<Button title='Tambah ke Cart' link='/homepage' />
							</div>
						</div>

						<div className='bg-white grid w-full gap-6 rounded-2xl py-10 px-6 border border-solid border-[#d5dfff]'>
							<h4 className='font-deAetna text-xl lg:text-2xl'>Virtuwed Lamar</h4>
							<ul className='grid gap-3 font-light font-amiamie'>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<NewspaperIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>Kisah Cinta</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<GiftIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>Amplop digital</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<PresentationChartLineIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>Guest Management</p>
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
								<h2 className='text-3xl lg:text-4xl font-deAetna'><span className='font-normal text-base'>Rp </span>850.000</h2>
								<Button title='Tambah ke Cart' link='/homepage' />
							</div>
						</div>

						<div className='bg-white grid w-full gap-6 rounded-2xl py-10 px-6 border border-solid border-[#d5dfff] '>
							<h4 className='font-deAetna text-xl lg:text-2xl'>Virtuwed Mantu</h4>
							<ul className='grid gap-3 font-light font-amiamie'>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<NewspaperIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>Kisah Cinta</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<GiftIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>Amplop digital</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<PresentationChartLineIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>Guest Management</p>
								</li>
								<li className='flex gap-2 items-center'>
									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-primary/30'>
										<UsersIcon
											className='h-4 w-4 text-primary'
										/>
									</div>
									<p>E-invitation</p>
								</li>

							</ul>

							<div className='grid gap-4'>
								<h2 className='text-3xl lg:text-4xl font-deAetna'><span className='font-normal text-base'>Rp </span>900.000</h2>
								<Button title='Tambah ke Cart' link='/homepage' />
							</div>
						</div>


					</div>
				</motion.section>

				{/* TESTIMONI */}
				<motion.section id='Testimoni' initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} className='grid justify-center items-center py-20 max-w-screen-xl mx-auto'>
					<div className='grid gap-4 px-4 lg:px-40 text-center'>
						<span className="overflow-hidden inline-block pb-1.5">
							<motion.h2 variants={item2} className='text-3xl lg:text-4xl font-deAetna'>Yang Mereka Katakan</motion.h2>
						</span>
						<p className='font-light font-amiamie lg:max-w-xl lg:mx-auto'>Menawarkan solusi terbaik untuk momen istimewa Anda menjadi tak terlupakan. Dapatkan pengalaman pernikahan yang memikat.</p>
					</div>

					<div className='grid lg:px-40'>
						<Testimoni />
					</div>

				</motion.section>

				{/* CTA */}
				<section
					className='bg-cta bg-cover bg-center' >
					<div className='grid gap-4 min-w-full justify-center items-center py-32 px-5 text-center backdrop-brightness-[.2]'>
						<div className='grid gap-4'>
							<h2 className='text-3xl lg:text-4xl font-deAetna text-white'>Buat Virtuwed-mu Sekarang</h2>
							<hr></hr>
							<p className='text-white font-light font-amiamie'>Nikmati pengalaman pernikahan yang tak terlupakan dengan Virtuwed.</p>
						</div>
						<div>
							<Button title='Mulai Sekarang' link='/homepage' />
						</div>
					</div>
				</section>

				{/* FAQ */}
				<motion.section initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.1 }} className='grid gap-4 items-center py-20 px-4 text-center lg:text-start lg:px-40 max-w-screen-xl mx-auto '>
					<div className='grid gap-4'>
						<span className="overflow-hidden inline-block pb-1.5">
							<motion.h2 variants={item2} className='text-3xl lg:text-4xl font-deAetna text-center'>General FAQs</motion.h2>
						</span>
						<hr className='bg-[#f7f2f2]' />
						<p className='font-light font-amiamie lg:max-w-xl mx-auto text-center'>Semua yang anda perlu tahu mengenai produk dan bagaimana cara produk kami bekerja. Tidak menemukan jawaban? Hubungi kami</p>
					</div>
					<div className="w-full">
						<Disclosure>
							{({ open }) => (
								<>
									<Disclosure.Button className={`flex w-full justify-between rounded-t-lg px-4 py-4 text-left text-sm font-medium ${open ? 'bg-primary' : 'border-b-2'}`}>
										<p className={`${open ? 'text-white' : ''} font-amiamie`}>Apa itu layanan undangan digital?</p>
										<ChevronDownIcon
											className={`${open ? 'rotate-180 transform text-white' : 'text-black'
												} h-5 w-5`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="bg-primary px-4 py-4 rounded-b-lg">
										<p className='font-light font-amiamie text-white text-start'>
											Layanan undangan digital adalah sebuah platform atau layanan yang memungkinkan Anda untuk membuat dan mengirimkan undangan pernikahan secara digital melalui email, pesan teks, atau media sosial.
										</p>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>

						<Disclosure as="div" className="mt-2">
							{({ open }) => (
								<>
									<Disclosure.Button className={`flex w-full justify-between rounded-t-lg px-4 py-4 text-left text-sm font-medium ${open ? 'bg-primary' : 'border-b-2'}`}>
										<p className={`${open ? 'text-white' : ''} font-amiamie`}>Apakah undangan digital cocok untuk semua jenis acara?</p>
										<ChevronDownIcon
											className={`${open ? 'rotate-180 transform text-white' : 'text-black'
												} h-5 w-5`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="bg-primary px-4 py-4 rounded-b-lg">
										<p className='font-light font-amiamie text-white text-start'>
											Ya, undangan digital dapat digunakan untuk berbagai jenis acara, seperti pernikahan, ulang tahun, pesta perayaan, pertemuan bisnis, dan lainnya. Prinsipnya adalah menggantikan undangan fisik dengan versi digital yang lebih praktis.
										</p>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>

						<Disclosure as="div" className="mt-2">
							{({ open }) => (
								<>
									<Disclosure.Button className={`flex w-full justify-between rounded-t-lg px-4 py-4 text-left text-sm font-medium ${open ? 'bg-primary' : 'border-b-2'}`}>
										<p className={`${open ? 'text-white' : ''} font-amiamie`}>Apa keuntungan menggunakan layanan undangan digital?</p>
										<ChevronDownIcon
											className={`${open ? 'rotate-180 transform text-white' : 'text-black'
												} h-5 w-5`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="bg-primary px-4 py-4 rounded-b-lg">
										<p className='font-light font-amiamie text-white text-start'>
											Beberapa keuntungan menggunakan layanan undangan digital adalah:
											Hemat biaya cetak dan pengiriman fisik.
											Ramah lingkungan karena mengurangi penggunaan kertas.
											Mudah dan cepat untuk mengirimkan undangan kepada tamu.
											Menawarkan fitur-fitur interaktif seperti konfirmasi kehadiran, navigasi, dan lainnya.
										</p>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>

						<Disclosure as="div" className="mt-2">
							{({ open }) => (
								<>
									<Disclosure.Button className={`flex w-full justify-between rounded-t-lg px-4 py-4 text-left text-sm font-medium ${open ? 'bg-primary' : 'border-b-2'}`}>
										<p className={`${open ? 'text-white' : ''} font-amiamie`}>Apakah undangan digital dapat dipersonalisasi?</p>
										<ChevronDownIcon
											className={`${open ? 'rotate-180 transform text-white' : 'text-black'
												} h-5 w-5`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="bg-primary px-4 py-4 rounded-b-lg">
										<p className='font-light font-amiamie text-white text-start'>
											Ya, undangan digital umumnya dapat dipersonalisasi sesuai dengan preferensi Anda. Anda dapat mengubah warna, gaya, dan layout undangan. Anda juga dapat menambahkan foto atau video pribadi serta informasi tambahan seperti peta lokasi, tanggal acara, dan lainnya.
										</p>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>

						<Disclosure as="div" className="mt-2">
							{({ open }) => (
								<>
									<Disclosure.Button className={`flex w-full justify-between rounded-t-lg px-4 py-4 text-left text-sm font-medium ${open ? 'bg-primary' : 'border-b-2'}`}>
										<p className={`${open ? 'text-white' : ''} font-amiamie`}>Bagaimana undangan digital dapat diakses oleh tamu?</p>
										<ChevronDownIcon
											className={`${open ? 'rotate-180 transform text-white' : 'text-black'
												} h-5 w-5`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="bg-primary px-4 py-4 rounded-b-lg">
										<p className='font-light font-amiamie text-white text-start'>
											Undangan digital dapat diakses oleh tamu melalui email, pesan teks, atau melalui tautan yang dibagikan melalui media sosial atau platform pesan. Tamu dapat membuka undangan tersebut di perangkat mereka, seperti smartphone, tablet, atau komputer, dan melihat semua informasi yang terkandung di dalamnya.
										</p>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>


					</div>

				</motion.section>
			</main >

			<Footer />
		</>

	)
}
