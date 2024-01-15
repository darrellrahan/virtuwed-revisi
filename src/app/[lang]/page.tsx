// 'use client'
import Image from 'next/image'
import Link from 'next/link';
import Testimoni from '@/src/components/Testimoni';
import { Button, ButtonOutline } from '@/src/components/ButtonComponent';

// LIBRARY
import { Disclosure } from '@headlessui/react'
import { ArrowUpRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { NewspaperIcon, GiftIcon, PresentationChartLineIcon, UsersIcon, VideoCameraIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/20/solid';
import Footer from '@/src/components/home/Footer';
import { motion } from "framer-motion"
import Navbar from '@/src/components/Navbar';

import { getDictionary } from '@/src/lib/dictionary';
import { Locale } from '@/i18n.config';
import Header from '@/src/components/home/Header';
import MobileNavbar from '@/src/components/home/MobileNavbar';
import Hero from '@/src/components/home/Hero';
import Award from '@/src/components/home/Award';
import GeneralFeatures from '@/src/components/home/GeneralFeatures';
import SpecificFeatures from '@/src/components/home/SpecificFeatures';
import Pricing from '@/src/components/home/Pricing';
import Testimonial from '@/src/components/home/Testimonial';
import Video from '@/src/components/home/Video';
import Faq from '@/src/components/home/Faq';
import { TogglerProvider } from '@/src/context/toggler';



// NOTE:
// H1 = sm 36px lg 60px,
// H2 = sm 30px lg 36px,
// H3 = sm 24px lg 30px,
// H4 = sm 20px lg 24px
// H5 = sm 16px lg


// export default async function Home({
// 	params: { lang },
// }: {
// 	params: { lang: Locale }
// }) {
// 	const { page } = await getDictionary(lang)

// 	const item = {
// 		hidden: {
// 			y: "100%",
// 			transition: { ease: [0.455, 0.03, 0.515, 0.955] }
// 		},
// 		visible: {
// 			y: 0,
// 			transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
// 		}
// 	};

// 	const item2 = {
// 		offscreen: {
// 			y: "200%",
// 			// transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
// 			transition: { ease: [0.455, 0.03, 0.515, 0.955] }
// 		},
// 		onscreen: {
// 			y: 0,
// 			transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
// 		}
// 	};

// 	return (
// 		<>
// 			<Navbar />
// 			<main className='container min-w-full'>

// 				{/* JUMBOTRON */}
// 				<section id='Home' className='container w-full grid gap-6 justify-center items-center px-4 py-20 lg:py-28 lg:grid-cols-2 mt-8 md:mt-0 lg:px-40 lg:h-screen max-w-screen-xl mx-auto'>
// 					<div className='lg:order-2'>
// 						<Image
// 							src="/assets/landingpage/jumbotron.png"
// 							alt="Jumbotron Ilustration"
// 							className="w-full h-auto mx-auto"
// 							width={500}
// 							height={500}
// 							priority
// 						/>
// 					</div>

// 					<div className='grid gap-4 justify-start'>
// 						<span className="overflow-hidden inline-block">
// 							{lang == 'id'
// 								?
// 								<h1 className='text-4xl lg:text-6xl font-deAetna'>{page.home.jumbotron.title.common}<span className='text-transparent bg-clip-text bg-gradient-to-r from-primaryGradient-start to-primaryGradient-end'>{page.home.jumbotron.title.special}</span></h1>
// 								:
// 								<h1 className='text-4xl lg:text-6xl font-deAetna'><span className='text-transparent bg-clip-text bg-gradient-to-r from-[#EFD2D2] from-10% to-[#D18080] to-30%'>{page.home.jumbotron.title.special}</span>{page.home.jumbotron.title.common}</h1>
// 							}
// 						</span>
// 						<p className='font-light font-amiamie'>{page.home.jumbotron.description}</p>
// 						<div className='flex gap-4'>
// 							<div>
// 								<Link href={`/agy-yoriko/hasnat-ferdiananda-wXlECm`}
// 									// style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }}
// 									className='btn bg-gradient-to-r from-primaryGradient-start to-primaryGradient-end text-white  rounded-lg hover:btn-shadow-primary'>{page.home.jumbotron.button1}</Link>
// 							</div>
// 							<div>
// 								<Link href={'https://wa.me/6285156914687'} target='_blank' className="btn btn-accent text-secondary border-secondary hover:bg-secondary hover:border-secondary rounded-lg border">{page.home.jumbotron.button2}</Link>
// 								{/* <ScrollLink to="Paket" smooth={true} duration={500}><p>Packages</p></ScrollLink> */}
// 							</div>
// 						</div>
// 					</div>


// 				</section>

// 				{/* TAGLINE */}
// 				<section className='bg-tagline bg-cover bg-center'>
// 					<div className='backdrop-brightness-[.2] '>
// 						<div className='max-w-screen-xl mx-auto grid gap-4 justify-start py-9 px-5 lg:px-40'>
// 							<h3 className='text-2xl lg:text-3xl font-deAetna text-white'>{page.home.tagline.title.common}<span className='text-transparent bg-clip-text bg-gradient-to-r from-primaryGradient-start to-primaryGradient-end'>{page.home.tagline.title.special}</span></h3>
// 							<p className='text-white font-light font-amiamie'>{page.home.tagline.description}</p>
// 						</div>
// 					</div>
// 				</section>

// 				{/* FEATURE */}
// 				<section id='Feature' className='min-w-full'>
// 					{/* FEATURE 1 */}
// 					<div className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2 max-w-screen-xl mx-auto'>
// 						<div className='lg:order-2'>
// 							<Image
// 								src='/assets/landingpage/feature/1.png'
// 								alt="Jumbotron Ilustration"
// 								className="w-full h-auto mx-auto"
// 								width={500}
// 								height={500}
// 								priority
// 							/>
// 						</div>

// 						<div className='grid gap-y-4'>
// 							<span className="overflow-hidden inline-block pb-1.5">
// 								<h2 className='text-3xl lg:text-4xl font-deAetna'>{page.home.feature.feat1.title}</h2>
// 							</span>
// 							<p className='font-light font-amiamie'>{page.home.feature.feat1.description}</p>
// 							<div>
// 								<Link className='inline-block' href={'/agy-yoriko/hasnat-ferdiananda-wXlECm/resepsivirtual'}>
// 									<div className='items-center flex gap-2'>
// 										<p className='text-secondary font-amiamie'>{page.home.feature.feat1.button}</p>
// 										<ArrowUpRightIcon className="h-4 w-4 text-secondary" />
// 									</div>
// 								</Link>
// 							</div>
// 						</div>
// 					</div>

// 					{/* FEATURE 2 */}
// 					<div className='bg-secondary/10'>
// 						<div className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2 max-w-screen-xl mx-auto'>
// 							<div>
// 								<Image
// 									src='/assets/landingpage/feature/2.png'
// 									alt="Jumbotron Ilustration"
// 									className="w-full h-auto mx-auto"
// 									width={500}
// 									height={500}
// 									priority
// 								/>
// 							</div>

// 							<div className='grid gap-y-4'>
// 								<span className="overflow-hidden inline-block pb-1.5">
// 									<h2 className='text-3xl lg:text-4xl font-deAetna'>{page.home.feature.feat2.title}</h2>
// 								</span>
// 								<p className='font-light font-amiamie'>{page.home.feature.feat2.description}</p>
// 								<div>
// 									<Link className='inline-block' href={'/agy-yoriko/hasnat-ferdiananda-wXlECm'}>
// 										<div className='items-center flex gap-2'>
// 											<p className='text-secondary font-amiamie'>{page.home.feature.feat2.button}</p>
// 											<ArrowUpRightIcon className="h-4 w-4 text-secondary" />
// 										</div>
// 									</Link>
// 								</div>
// 							</div>
// 						</div>
// 					</div>

// 					{/* FEATURE 3 */}
// 					<div className='grid gap-6 px-4 justify-center items-center py-16 lg:px-40 lg:grid-cols-2 max-w-screen-xl mx-auto'>
// 						<div className='lg:order-2'>
// 							<Image
// 								src='/assets/landingpage/feature/3.png'
// 								alt="Jumbotron Ilustration"
// 								className="w-full h-auto mx-auto"
// 								width={500}
// 								height={500}
// 								priority
// 							/>
// 						</div>

// 						<div className='grid gap-y-4'>
// 							<span className="overflow-hidden inline-block pb-1.5">
// 								<h2 className='text-3xl lg:text-4xl font-deAetna'>{page.home.feature.feat3.title}</h2>
// 							</span>
// 							<p className='font-light font-amiamie'>{page.home.feature.feat3.description}</p>
// 							<div>
// 								<Link className='inline-block' href={{ pathname: '/agy-yoriko/hasnat-ferdiananda-wXlECm' }}>
// 									<div className='items-center flex gap-2'>
// 										<p className='text-secondary font-amiamie'>{page.home.feature.feat3.button}</p>
// 										<ArrowUpRightIcon className="h-4 w-4 text-secondary" />
// 									</div>
// 								</Link>
// 							</div>
// 						</div>
// 					</div>

// 					{/* FEATURE 4 */}
// 					<div className='grid gap-6 px-4 items-center py-16 lg:px-40 max-w-screen-xl mx-auto'>
// 						<span className="overflow-hidden inline-block pb-1.5">
// 							<h2 className='text-3xl lg:text-4xl font-deAetna'>{page.home.feature.feat4.title}</h2>
// 						</span>

// 						<div className='grid justify-items-start lg:grid-cols-2 gap-6'>
// 							<div>
// 								<Image
// 									src='/assets/landingpage/feature/feat4.webp'
// 									alt="Jumbotron Ilustration"
// 									className="w-full h-auto mx-auto"
// 									width={2908}
// 									height={1824}
// 									priority
// 									quality={100}
// 								/>
// 							</div>

// 							<div className='grid content-center'>
// 								<ul className='grid gap-4'>
// 									<li className='flex gap-2 items-center'>
// 										<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 											<VideoCameraIcon
// 												className='h-4 w-4 text-secondary'
// 											/>
// 										</div>
// 										<p className='text-base font-amiamie'>{page.home.feature.feat4.points[0]}</p>
// 									</li>
// 									<li className='flex gap-2 items-center'>
// 										<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 											<GiftIcon
// 												className='h-4 w-4 text-secondary'
// 											/>
// 										</div>
// 										<p className='text-base font-amiamie'>{page.home.feature.feat4.points[1]}</p>
// 									</li>
// 									<li className='flex gap-2 items-center'>
// 										<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 											<ChatBubbleBottomCenterTextIcon
// 												className='h-4 w-4 text-secondary'
// 											/>
// 										</div>
// 										<p className='text-base font-amiamie'>{page.home.feature.feat4.points[2]}</p>
// 									</li>
// 								</ul>
// 							</div>
// 						</div>
// 					</div>

// 				</section>

// 				{/* PRODUCT */}
// 				<section id='Packages' className='grid gap-6 bg-gray-300/25 py-20 px-4 content-center lg:px-40 max-w-screen-xl mx-auto'>
// 					<span className="overflow-hidden inline-block pb-1.5">
// 						<h2 className='font-deAetna text-3xl lg:text-4xl text-center'>{page.home.package.title}</h2>
// 					</span>
// 					<div className='grid gap-6 items-start lg:grid-cols-2'>

// 						{/* PRODUCT */}
// 						<div className='bg-white grid w-full gap-6 rounded-2xl py-10 px-6 border border-solid border-[#d5dfff]'>
// 							<h4 className='font-deAetna text-xl lg:text-2xl'>Virtuwed Premium</h4>
// 							<ul className='grid gap-3 font-light font-amiamie'>

// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<NewspaperIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package1[0]}</p>
// 								</li>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<GiftIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package1[1]}</p>
// 								</li>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<PresentationChartLineIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package1[2]}</p>
// 								</li>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<UsersIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package1[3]}</p>
// 								</li>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<UsersIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package1[4]}</p>
// 								</li>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<UsersIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package1[5]}</p>
// 								</li>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<UsersIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package1[6]}</p>
// 								</li>
// 							</ul>

// 							<div className='grid gap-4'>
// 								<h2 className='text-3xl lg:text-4xl font-deAetna'><span className='font-normal text-base'>Rp </span>2.000.000</h2>
// 								<Link
// 									target='_blank'
// 									href={'https://wa.me/6285156914687'}
// 									className='btn bg-gradient-to-r from-primaryGradient-start to-primaryGradient-end text-white  rounded-lg hover:btn-shadow-primary'>{page.home.package.button}</Link>
// 							</div>
// 						</div>

// 						<div className='bg-white grid w-full gap-6 rounded-2xl py-10 px-6 border border-solid border-[#d5dfff]'>

// 							<div>
// 								<h4 className='font-deAetna text-xl lg:text-2xl'>Virtuwed Priority</h4>
// 								<p>{page.home.package.package2.description}</p>
// 							</div>

// 							<ul className='grid gap-3 font-light font-amiamie'>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<NewspaperIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package2.points[0]}</p>
// 								</li>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<GiftIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package2.points[1]}</p>
// 								</li>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<PresentationChartLineIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p>{page.home.package.package2.points[2]}</p>
// 								</li>
// 								<li className='flex gap-2 items-center'>
// 									<div className='grid justify-center items-center h-8 w-8 rounded-full bg-secondary/30'>
// 										<UsersIcon
// 											className='h-4 w-4 text-secondary'
// 										/>
// 									</div>
// 									<p className='text-base'>{page.home.package.package2.points[3]}</p>
// 								</li>

// 							</ul>

// 							<div className='grid gap-4'>
// 								<h2 className='text-3xl lg:text-4xl font-deAetna'><span className='font-normal text-base'>Rp </span>10.000.000</h2>
// 								<Link
// 									target='_blank'
// 									href={'https://wa.me/6285156914687'}
// 									className='btn bg-gradient-to-r from-primaryGradient-start to-primaryGradient-end text-white  rounded-lg hover:btn-shadow-primary'>{page.home.package.button}</Link>
// 							</div>
// 						</div>

// 					</div>
// 				</section>

// 				{/* TESTIMONI */}
// 				<section id='Testimonial' className='grid justify-center items-center py-20 max-w-screen-xl mx-auto'>
// 					<div className='grid gap-4 px-4 lg:px-40 text-center'>
// 						<span className="overflow-hidden inline-block pb-1.5">
// 							<h2 className='text-3xl lg:text-4xl font-deAetna'>{page.home.testimoni.title}</h2>
// 						</span>
// 						<p className='font-light font-amiamie lg:max-w-xl lg:mx-auto'>{page.home.testimoni.description}</p>
// 					</div>

// 					<div className='grid lg:px-40'>
// 						<Testimoni />
// 					</div>

// 				</section>

// 				{/* CTA */}
// 				<section
// 					className='bg-cta bg-cover bg-center' >
// 					<div className='grid gap-4 min-w-full justify-center items-center py-32 px-5 text-center backdrop-brightness-[.2]'>
// 						<div className='grid gap-4'>
// 							<h2 className='text-3xl lg:text-4xl font-deAetna text-white'>{page.home.cta.title}</h2>
// 							<hr></hr>
// 							<p className='text-white font-light font-amiamie'>{page.home.cta.description}</p>
// 						</div>
// 						<div>
// 							<Link
// 								target='_blank'
// 								href={'https://wa.me/6285156914687'}
// 								className='btn btn-wide bg-gradient-to-r from-primaryGradient-start to-primaryGradient-end text-white rounded-lg hover:btn-shadow-primary'>{page.home.cta.button}</Link>
// 						</div>
// 					</div>
// 				</section>

// 				{/* FAQ */}
// 				<section className='grid gap-4 items-center py-20 px-4 text-start lg:px-40 max-w-screen-xl mx-auto '>
// 					<div className='grid gap-4'>
// 						<span className="overflow-hidden inline-block pb-1.5">
// 							<h2 className='text-3xl lg:text-4xl font-deAetna text-center'>General FAQs</h2>
// 						</span>
// 						<hr className='bg-[#f7f2f2]' />
// 						<p className='font-light font-amiamie lg:max-w-xl mx-auto text-center'>{page.home.faq.description}</p>
// 					</div>

// 					<div className="join join-vertical w-full">
// 						<div className="collapse collapse-arrow join-item border border-base-300">
// 							<input type="radio" name="my-accordion-4" />
// 							<div className="collapse-title text-xl font-medium">
// 								{page.home.faq.accordion1.title}
// 							</div>
// 							<div className="collapse-content">
// 								<p>{page.home.faq.accordion1.description}</p>
// 							</div>
// 						</div>
// 						<div className="collapse collapse-arrow join-item border border-base-300">
// 							<input type="radio" name="my-accordion-4" />
// 							<div className="collapse-title text-xl font-medium">
// 								{page.home.faq.accordion2.title}
// 							</div>
// 							<div className="collapse-content">
// 								<p>{page.home.faq.accordion2.description}</p>
// 							</div>
// 						</div>
// 						<div className="collapse collapse-arrow join-item border border-base-300">
// 							<input type="radio" name="my-accordion-4" />
// 							<div className="collapse-title text-xl font-medium">
// 								{page.home.faq.accordion3.title}
// 							</div>
// 							<div className="collapse-content">
// 								<p>{page.home.faq.accordion3.description}</p>
// 							</div>
// 						</div>
// 						<div className="collapse collapse-arrow join-item border border-base-300">
// 							<input type="radio" name="my-accordion-4" />
// 							<div className="collapse-title text-xl font-medium">
// 								{page.home.faq.accordion4.title}
// 							</div>
// 							<div className="collapse-content">
// 								<p>{page.home.faq.accordion4.description}</p>
// 							</div>
// 						</div>
// 						<div className="collapse collapse-arrow join-item border border-base-300">
// 							<input type="radio" name="my-accordion-4" />
// 							<div className="collapse-title text-xl font-medium">
// 								{page.home.faq.accordion5.title}
// 							</div>
// 							<div className="collapse-content">
// 								<p>{page.home.faq.accordion5.description}</p>
// 							</div>
// 						</div>
// 					</div>

// 				</section>
// 			</main >

// 			<Footer />
// 		</>

// 	)
// }


export default async function Home({
	params: { lang },
}: {
	params: { lang: Locale }
}) {
	const dict = await getDictionary(lang)

	return (
		<>
			<TogglerProvider>

				<Header dict={dict.header} lang={lang} />
				<MobileNavbar dict={dict.header} lang={lang} />
				<Hero dict={dict.hero} />
				<Award dict={dict.award} />
				<GeneralFeatures dict={dict.feature} />
				<SpecificFeatures dict={dict.value} />
				<Pricing dict={dict.pricing} />
				<Testimonial dict={dict.review} />
				<Video dict={dict.video} />
				<Faq dict={dict.faq} />
				<Footer />

			</TogglerProvider>

		</>
	)
}