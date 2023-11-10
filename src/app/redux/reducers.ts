// /app/redux/reducers.ts
import { FETCH_DATA, SET_DATA } from './actions';

import { FETCH_NEW_DATA, SET_NEW_DATA } from './actions';



interface Wedding {
    wedding_slug: string;
    wedding_name: string;
    reception_begin_at: {
        date: string,
        time: string,
        day: string,
        month: string
    };
    reception_end_at: {
        date: string,
        time: string,
        day: string,
        month: string,
    };
    undangan_digital: {
        cover_undangan_digital: string;
        pengantin_pria: {
            nama_lengkap: string;
            nama_ortu_bapak: string;
            nama_ortu_ibu: string;
            instagram: string;
            foto: string;
        };
        pengantin_wanita: {
            nama_lengkap: string;
            nama_ortu_bapak: string;
            nama_ortu_ibu: string;
            instagram: string;
            foto: string;
        };
        kisah_cinta: Array<{
            kisah_cinta_date: string;
            kisah_cinta_judul: string;
            kisah_cinta_cerita: string;
        }>;
        daftar_acara: Array<{
            event_icon: string,
            event_name: string,
            event_date: string,
            event_time: string,
            event_description: string
        }>;
        reception_location_name: string;
        reception_location_address: string;
        reception_location_maps_url: string;
        ucapan_undangan_digital: {
            total: number,
            tidak_hadir: number,
            hadir: number,
            ragu: number,
            data: Array<{
                nama: string;
                status_kehadiran: string;
                ucapan_invitation_text: string;
            }>;
        }
    };
    resepsi_virtual: {
        wedding_live_streaming_link: {
            full_url: string | null
            query: string | null
        },
        wedding_video_call_link: string | null,
        wedding_greeting_video: string | null;
        wedding_ending_video: string | null;
    };
    kenangan_virtual: string[];
    media: {
        prewedding_photos: string[];
        prewedding_videos: string[];
    };
}

interface Theme {
    id: string;
    nama_theme: string;
    theme_slug: string;
}

interface Guest {
    guest_slug: string;
    nama: string;
    no_whatsapp: string;
    instagram: string | null;
    alamat: string | null;
    status_kehadiran: string | null;
    ucapan_invitation_text: string | null;
    ucapan_virtual_wedding_text: string | null;
    ucapan_virtual_wedding_video: string | null;
    ucapan_virtual_wedding_photo: string | null;
    visit_undangan_digital_at: string | null;
    visit_resepsi_virtual_at: string | null;
    visit_kenangan_virtual_at: string | null;
    undangan_sent_at: string;
    undangan_read_at: string | null;
}

export interface RootState {
    value: {
        wedding: Wedding;
        theme: Theme;
        guest: Guest;
        wedding_slug: string;
        // ... other properties for the 'value' object
    };
}

const initialState: RootState = {
    value: {
        "wedding": {
            "wedding_slug": "",
            "wedding_name": "",
            "reception_begin_at": {
                "date": "",
                "time": "",
                "day": "",
                "month": ""
            },
            "reception_end_at": {
                "date": "",
                "time": "",
                "day": "",
                "month": ""
            },
            "undangan_digital": {
                "cover_undangan_digital": "",
                "pengantin_pria": {
                    "nama_lengkap": "",
                    "nama_ortu_bapak": "",
                    "nama_ortu_ibu": "",
                    "instagram": "",
                    "foto": ""
                },
                "pengantin_wanita": {
                    "nama_lengkap": "",
                    "nama_ortu_bapak": "",
                    "nama_ortu_ibu": "",
                    "instagram": "",
                    "foto": ""
                },
                "kisah_cinta": [
                ],
                "daftar_acara": [
                ],
                "reception_location_name": "",
                "reception_location_address": "",
                "reception_location_maps_url": "",
                "ucapan_undangan_digital": {
                    "total": 0,
                    "tidak_hadir": 0,
                    "hadir": 0,
                    "ragu": 0,
                    "data": []
                }
            },
            "resepsi_virtual": {
                "wedding_live_streaming_link": {
                    "full_url": null,
                    "query": null
                },
                "wedding_video_call_link": null,
                "wedding_greeting_video": null,
                "wedding_ending_video": null
            },
            "kenangan_virtual": [
                ""
            ],
            "media": {
                "prewedding_photos": [],
                "prewedding_videos": []
            }
        },
        "theme": {
            "id": "",
            "nama_theme": "",
            "theme_slug": ""
        },
        "guest": {
            "guest_slug": "",
            "nama": "",
            "no_whatsapp": "",
            "instagram": null,
            "alamat": null,
            "status_kehadiran": null,
            "ucapan_invitation_text": null,
            "ucapan_virtual_wedding_text": null,
            "ucapan_virtual_wedding_video": null,
            "ucapan_virtual_wedding_photo": null,
            "visit_undangan_digital_at": null,
            "visit_resepsi_virtual_at": null,
            "visit_kenangan_virtual_at": null,
            "undangan_sent_at": "",
            "undangan_read_at": null
        },
        "wedding_slug": ""

    }
}

const rootReducer = (state: RootState = initialState, action: any) => {
    switch (action.type) {
        case SET_DATA:
            return { ...state, value: action.payload };
        // Add other cases for different actions

        case SET_NEW_DATA:
            return { ...state, value: { ...state.value, wedding_slug: action.payload } };
        default:
            return state;
    }
};

export default rootReducer;
