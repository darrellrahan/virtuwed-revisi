'use client'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import React, { useState, Fragment } from 'react'
import 'remixicon/fonts/remixicon.css'
import { Dialog, Transition } from '@headlessui/react'


const Register = () => {

    // const [formData, setFormData] = useState({
    //     name: '',
    //     phoneNumber: '',
    // });


    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(false);


    // MODAL SUCCESS
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent multiple submissions
        if (loading) {
            return;
        }

        setLoading(true); // Set loading to true when the submission starts

        try {
            const response = await axios.post('https://api.virtuwed.id/graphql', {
                query: `
mutation CreateGuest($name: String!, $phoneNumber: String!){
    createGuest(wedding_session_id: "649007bdca091be7add3c440", name: $name, whatsapp: $phoneNumber, instagram: "@working", address: "JL.working"){
        id
        wedding_session{
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
              `,
                variables: {
                    name,
                    phoneNumber,
                },
            });

            console.log('Contact created:', response.data.data.createGuest);
            openModal()
        } catch (error) {
            console.error('Error creating contact:', error);
        } finally {
            setLoading(false); // Set loading to false when the submission is done, whether it succeeded or failed
        }
    };

    return (
        <>
            <Navbar />
            <main className='container min-w-full bg-cover-session bg-cover bg-center min-h-screen'>

                <div className='px-4 py-24 md:px-12 lg:px-32 backdrop-brightness-50 min-h-screen grid justify-center'>
                    {/* MENU */}
                    <section className='grid p-6 bg-white rounded-2xl md:w-80'>
                        <h2 className='mb-6 text-center font-deAetna text-xl'>Daftar untuk mendapat undangan resepsi virtual</h2>

                        <div className='grid gap-16 md:gap-12'>
                            {/* INPUT */}
                            <form className='grid gap-6' onSubmit={handleSubmit}>
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Nama</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="..."
                                        className="input input-bordered w-full"
                                        value={name}
                                        onChange={
                                            (e) => { setName(e.target.value); console.log(e.target.value) }
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Nomor Telepon</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="..."
                                        className="input input-bordered w-full"
                                        value={phoneNumber}
                                        onChange={(e) => { setPhoneNumber(e.target.value); console.log(e.target.value) }}
                                        required
                                    />
                                </div>

                                <button
                                    style={{ background: 'linear-gradient(313deg, #FFF -70%, #D1B0B0 100%)' }}
                                    className='inline-flex gap-2 items-center justify-center rounded-lg py-2 px-4 text-white font-mono text-base text-center uppercase lg:w-fit lg:px-6'>

                                    {loading
                                        ? <span className="loading loading-spinner"></span>
                                        : <> <i className="ri-bard-fill text-base"></i>Register Now</>}
                                </button>
                            </form>

                        </div>

                    </section>

                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Register successful
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Pendaftaran kamu telah selesai dilakukan. Kami akan mengirimkan tautan undangan ke nomor telepon kamu.
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-primary/20 text-primary hover:bg-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Got it, thanks!
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </main>
        </>
    )
}

export default Register