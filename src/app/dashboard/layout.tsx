'use client'
import { ChatBubbleBottomCenterTextIcon, CodeBracketSquareIcon, Cog6ToothIcon, GiftIcon, QuestionMarkCircleIcon, UserGroupIcon } from "@heroicons/react/24/solid"
import { Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const poppins = Poppins({
    subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const [activeTab, setActiveTab] = useState('hadiah');
    const handleClick = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <html lang="en">
            <body className={`${poppins.className}`}>
                <main className='container min-w-full flex'>
                    <aside className='sticky top-0 z-10 h-screen w-64 px-3 py-6 border-r border-solid border-[#00000026]'>

                        <Link href={'/'} className='flex items-center px-6 gap-3'>
                            <Image
                                src="/assets/logopack/Virtuwed_Main_Logo.png"
                                alt="Jumbotron Ilustration"
                                className="w-16 h-auto"
                                width={220}
                                height={220}
                                priority
                            />
                            <div>
                                <h1 className='text-xl'>Virtuwed</h1>
                                <p>User</p>
                            </div>
                        </Link>

                        <div className='grid gap-6'>

                            {/* MAIN MENU */}
                            <div className='px-2 w-full grid gap-2 mt-9'>
                                {/* SUBMENU */}
                                <span className="text-xs">Main menu</span>
                                <div className='grid gap-2'>
                                    <Link onClick={() => handleClick('hadiah')} href='/dashboard' className={`${activeTab === 'hadiah' ? 'bg-primary/30 text-primary' : 'text-gray-400'} rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                        <GiftIcon className='w-6 h-6' />
                                        <p className="text-black">
                                            Hadiah
                                        </p>
                                    </Link>
                                    <Link onClick={() => handleClick('tamu')} href='/dashboard/tamu' className={`${activeTab === 'tamu' ? 'bg-primary/30 text-primary' : 'text-gray-400'} rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                        <UserGroupIcon className='w-6 h-6' />
                                        <p className="text-black">
                                            Tamu
                                        </p>
                                    </Link>
                                    <Link onClick={() => handleClick('ucapan')} href='/dashboard' className={`${activeTab === 'ucapan' ? 'bg-primary/30 text-primary' : 'text-gray-400'} rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                        <ChatBubbleBottomCenterTextIcon className='w-6 h-6' />
                                        <p className="text-black">
                                            Ucapan
                                        </p>
                                    </Link>
                                    <Link onClick={() => handleClick('virtuwed')} href='/dashboard' className={`${activeTab === 'virtuwed' ? 'bg-primary/30 text-primary' : 'text-gray-400'} rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                        <CodeBracketSquareIcon className='w-6 h-6' />
                                        <p className='text-black'>
                                            Virtuwed
                                        </p>
                                    </Link>
                                </div>

                                <div>

                                </div>
                            </div>

                            {/* GENERAL MENU */}
                            <div className='px-2 w-full grid gap-2'>
                                {/* SUBMENU */}
                                <span className="text-xs">General Menu</span>
                                <div className='grid gap-2'>
                                    <Link onClick={() => handleClick('settings')} href='/dashboard' className={`${activeTab === 'settings' ? 'bg-primary/30 text-primary' : 'text-gray-400'} rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                        <Cog6ToothIcon className='w-6 h-6' />
                                        <p className="text-black">
                                            Settings
                                        </p>
                                    </Link>
                                    <Link onClick={() => handleClick('help')} href='/dashboard' className={`${activeTab === 'help' ? 'bg-primary/30 text-primary' : 'text-gray-400'} rounded-lg inline-flex justify-start items-center px-3.5 gap-3 h-11`}>
                                        <QuestionMarkCircleIcon className='w-6 h-6' />
                                        <p className="text-black">
                                            Help
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <section className='pt-6 flex flex-auto'>
                        {children}
                        {/* <div className="">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus provident quis porro nam, asperiores odit? Delectus odio officiis nesciunt unde! A qui recusandae impedit nisi commodi fugit at velit voluptas, nam dolorum vero tenetur iure quaerat animi quae nostrum ea aliquid. Ea vel officiis vitae! Corrupti, pariatur eveniet illum cupiditate tempora earum quod laboriosam necessitatibus cumque dicta ea explicabo, suscipit dignissimos non voluptates excepturi, aperiam tempore sunt veritatis nemo? Recusandae magnam quia eos, quibusdam repudiandae autem adipisci tempora voluptate, quis, fugit nemo sit voluptatem totam aperiam voluptatum quidem illo in facere sapiente impedit libero accusamus. Officia nihil velit sapiente inventore atque quia vero sunt fugit ullam saepe illum iste, sed eveniet aliquid, aut voluptatum sit magni, labore dolorem molestiae amet quis similique ipsam. Consequatur, modi fugit. Quis sint, a, veritatis similique enim quo autem tenetur neque pariatur aut laborum hic, provident necessitatibus. Veniam maiores ab dolor quas eveniet similique nobis hic temporibus. Minus ea dolore earum? Doloribus, totam eaque. Suscipit expedita, fugit, cum aut reiciendis mollitia, deserunt assumenda eveniet molestiae maiores omnis dolor praesentium hic fugiat laborum incidunt cupiditate facilis voluptatum vero. Incidunt quae aperiam sit enim in, voluptatibus dolorem eum odit minus quisquam corporis velit nihil a vel nemo, quod totam earum laboriosam ad quam soluta? Eum modi numquam itaque distinctio a, nisi pariatur omnis deserunt iure, laudantium rem fuga fugit sint ab eveniet minima, maiores odit nam! Modi eos qui non minima voluptate ipsum repudiandae labore animi eius necessitatibus, aspernatur consectetur commodi earum voluptatem, autem numquam molestias blanditiis? Sequi aspernatur facere alias, eaque veritatis quis similique reprehenderit, delectus, deleniti magnam inventore laboriosam. Repellat saepe facilis deleniti ratione nihil. Repellendus voluptatem maiores animi porro accusantium dignissimos, numquam reiciendis sapiente totam pariatur rem aliquid debitis quis quas consequuntur, ea alias minus sed reprehenderit in minima molestias quasi, earum ad! Esse itaque rem iusto veniam ducimus, neque, pariatur molestiae sit facere dolores minus dolorem iure. Illo odit quisquam in incidunt libero molestiae facere, magnam soluta recusandae assumenda sapiente inventore ut delectus, ducimus porro sit, itaque perferendis non! Inventore perspiciatis ut nostrum! Omnis consequuntur, at qui quos perferendis maxime! Labore eligendi culpa consequatur aperiam nisi et repellat corporis ea suscipit provident! Rerum asperiores dolorem, repudiandae ipsum est quaerat corrupti hic praesentium. Dolor alias at neque, dolores praesentium architecto saepe earum, perferendis odit laudantium id, recusandae quis beatae eligendi dignissimos! Qui quod autem laboriosam adipisci eos iste modi maiores tempore quia. Quos officia reiciendis perspiciatis rerum. Sint, ipsam aut fugiat pariatur magni inventore aspernatur quibusdam incidunt molestiae dolor quam cum facere doloribus. Iure eveniet quia ex tempora error odio quas doloremque totam, sunt explicabo praesentium possimus hic id, eum qui molestiae, voluptate in alias officia tempore. Pariatur architecto maxime deserunt nisi officia ipsam laborum tenetur exercitationem ad quae, dolor velit reiciendis sapiente voluptates ab ratione mollitia natus. Odio voluptatem dignissimos laborum voluptatibus, quibusdam quos similique autem sint corrupti eum esse adipisci ducimus ex saepe explicabo repellat excepturi officiis sapiente aliquid doloremque quod id nesciunt nostrum? Eveniet, amet dolore incidunt laudantium, perferendis, quisquam molestiae animi quos illo quasi expedita! Repellendus rerum minima, est fugit nam unde illum ad praesentium nobis aliquid at reiciendis assumenda esse dolor labore, nisi voluptate in! Praesentium impedit ipsum totam sunt. A aliquid rem dolorem maxime ullam ea quod quae blanditiis fugiat voluptatibus, quisquam reprehenderit cumque provident voluptas aliquam fuga voluptatem architecto mollitia! Eveniet commodi velit vero error distinctio asperiores! Cum recusandae sequi tempore temporibus, ipsam officiis eius nulla suscipit unde quia sapiente provident, alias, aut doloribus architecto ducimus deserunt. Quae eaque, accusamus quasi et rem commodi odio veritatis deleniti sed hic cum facilis dolorum illo error qui. Ducimus tenetur repudiandae dicta consequuntur laboriosam unde tempore voluptatum ab accusantium nihil officiis adipisci, voluptate autem eos cupiditate soluta vel? Non iusto, quam vel ea obcaecati nam? Voluptatem, hic eaque nostrum qui ratione reprehenderit! Deserunt quae eligendi, perferendis deleniti id omnis enim delectus temporibus eos possimus! Minima, optio. Nobis, libero ducimus impedit placeat soluta, fugit recusandae assumenda sunt laudantium natus illum delectus ipsam dolore esse molestias inventore aliquid deserunt velit ratione culpa? Repellendus animi perspiciatis dolore nemo soluta possimus laborum velit. Necessitatibus quas error veritatis quidem magni nisi sapiente ipsam delectus, pariatur dolor, beatae dolorem aliquid minima asperiores repellat sequi vitae magnam cupiditate nam quae cumque. Quaerat ex est, quas fuga natus tempore repudiandae ab a quia, earum veritatis expedita cupiditate repellendus aliquam, sed praesentium debitis eligendi dolor hic neque placeat culpa nihil temporibus? Rerum eligendi porro debitis repellendus officiis quaerat sed, eaque corrupti eveniet sit id magni amet ullam voluptatem dignissimos magnam accusamus. Dolorem quisquam fuga repellat sit placeat, corporis, nam totam, ipsam quidem cumque possimus. Voluptatibus sint vero labore aliquid voluptate blanditiis quibusdam eveniet repudiandae placeat quod! Facere eveniet quia laudantium a ducimus nostrum iste tenetur cum laborum tempora at reprehenderit deserunt laboriosam minima saepe, odio debitis et ipsam nobis, animi rerum consequuntur. Dignissimos aliquid, alias porro provident laborum, vitae suscipit fugit, illo ut quia ipsam ratione soluta ipsum eaque voluptas iusto distinctio repudiandae molestiae architecto sunt corporis dolores. Quod, non expedita inventore laborum optio nemo nihil a illo, vero dicta laboriosam exercitationem, illum impedit? Hic quo sunt ea ducimus eligendi delectus quae commodi officia, voluptas exercitationem? Ipsum nulla debitis architecto ex? Sunt, minima laboriosam. Ab perferendis accusamus hic ut ipsam dolore maxime omnis commodi atque optio. Deleniti, illum dolorem. Dolor magni iusto eaque, blanditiis perspiciatis aut alias, nesciunt enim nisi corrupti deserunt accusantium! Vel voluptatum iste quasi reiciendis explicabo. Fugiat necessitatibus vero delectus laborum! Distinctio, dolorum non? Officiis maxime odio praesentium expedita facilis voluptatem perferendis natus tenetur, ad quam, laborum magnam consectetur dolores tempore rerum hic sint dolorum nemo? Impedit accusamus expedita eveniet consequuntur totam officia nam, eligendi, debitis commodi, laborum minima. Eveniet assumenda eos repudiandae quisquam mollitia nostrum, aut adipisci? Repellat hic, maiores cupiditate, ipsum magni maxime minima rerum esse inventore minus nisi libero officia labore nulla ea sunt fuga molestiae? Dolorem veniam voluptas ullam esse enim quasi laborum cumque voluptatem! Necessitatibus reiciendis illo aut, harum natus eius fuga quo ipsam minus dolorem velit laborum, enim ex accusantium.</p>
                        </div> */}
                    </section>
                </main>
            </body>
        </html>
    )
}
