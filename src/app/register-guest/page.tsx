'use client'
import React, { useState } from 'react'
import { RootState } from '../redux/reducers';
import { useSelector } from 'react-redux';
import 'remixicon/fonts/remixicon.css'
import axios from 'axios';

const Page = () => {
    const API_BASE_URL = 'https://panel.virtuwed.id/api/register-guest';

    const wedding_slug = useSelector((state: RootState) => state.value.wedding_slug);

    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    const [nama, setNama] = useState('');
    const [noWhatsapp, setNoWhatsapp] = useState('');
    const [instagram, setInstagram] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Prevent multiple submissions
        if (loading) {
            return;
        }

        setLoading(true); // Set loading to true when the submission starts
        try {
            const response = await axios.post(API_BASE_URL, {
                wedding_slug: wedding_slug,
                nama,
                no_whatsapp: noWhatsapp,
                kode_negara: '+62',
                instagram,
                alamat: null,
            });
            setNama('')
            setNoWhatsapp('')
            setInstagram('')

            console.log(response.data);

            setIsSuccess(true)
            if (document) {
                (document.getElementById('modalMessage') as HTMLFormElement).showModal();
            }
        } catch (error) {
            setIsSuccess(false)
            if (document) {
                (document.getElementById('modalMessage') as HTMLFormElement).showModal();
            }
            alert(error)
        } finally {
            setLoading(false); // Set loading to false when the submission is done, whether it succeeded or failed
        }
    };
    return (
        <main className='container min-w-full mx-auto min-h-[666px] h-[100dvh] max-w-screen-xl bg-White'>
            <section className='grid gap-6 min-h-[666px] h-[100dvh] content-center justify-items-center px-6'>
                <div className='grid p-2 text-center'>
                    <p className='p3-r text-N700'>Sebelum menghadiri acara pernikahan</p>
                    <h2 className='text-N700 mb-2 md:mb-3'>{wedding_slug.replace('-', ' & ')}</h2>
                    <p className='p3-r text-N700 '>Mohon untuk mengisi data dibawah ini</p>
                </div>

                <form className='grid gap-6 w-full justify-items-center max-w-sm' onSubmit={handleSubmit}>
                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text font-amiamie text-N700">Nama</span>
                        </label>
                        <input required type="text" placeholder="John" className="input input-bordered w-full"
                            value={nama}
                            onChange={(e) => {
                                setNama(e.target.value)
                            }}
                        />
                    </div>
                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text font-amiamie text-N700">No Whatsapp</span>
                        </label>
                        <div className='join gap-1'>

                            <div className='bg-N200 border border-N300 rounded-md grid items-center justify-items-center pl-2 pr-3 pt-3 pb-2'>
                                <p className='p1-r text-N400'>+62</p>
                            </div>
                            <input required type="text" placeholder="8112396277" className="input input-bordered w-full"
                                value={noWhatsapp}
                                onChange={(e) => {
                                    setNoWhatsapp(e.target.value)
                                }} />
                        </div>
                    </div>
                    <div className="form-control w-full max-w-sm">
                        <label className="label">
                            <span className="label-text font-amiamie text-N700">Username Instagram</span>
                            <span className="label-text-alt font-amiamie text-N400">Optional</span>
                        </label>
                        <div className='join gap-1'>
                            <div className='bg-N200 border border-N300 rounded-md grid items-center justify-items-center w-[60px]'>
                                <p className='p1-r text-N400'>@</p>
                            </div>
                            <input type="text" placeholder="john_" className="input input-bordered w-full"
                                value={instagram}
                                onChange={(e) => {
                                    setInstagram(e.target.value)
                                    console.log(e.target.value);

                                }} />
                        </div>
                    </div>

                    <div className='flex w-full items-center gap-1 text-red-500'>
                        <i className="ri-error-warning-line self-start"></i>
                        <p className='p3-r'>Link akan dikirim ke no WA yang didaftarkan</p>
                    </div>
                    <button type="submit" className="btn btn-block btn-secondary text-White">
                        {loading
                            ? <span className="loading loading-spinner"></span>
                            : <i className="ri-whatsapp-line ri-lg text-White"></i>
                        }
                        Kirim link resepsi
                    </button>
                </form>
            </section>

            <dialog id="modalMessage" className="modal">
                <div className="modal-box">
                    <h3 className="text-N700">{isSuccess ? "Berhasil" : "Gagal"}</h3>
                    <p className="py-4 text-N700">{isSuccess ? "Tolong cek kembali pesan pada whatsapp anda yang dikirim oleh akun bernama Virtuwed" : "Permintaan tidak dapat diproses, mohon coba lagi"}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-secondary text-White">Tutup</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </main>
    )
}

export default Page