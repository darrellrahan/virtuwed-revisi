'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n } from '@/i18n.config'
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function LocaleSwitcher() {
    const pathName = usePathname()

    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/'
        const segments = pathName.split('/')
        segments[1] = locale
        return segments.join('/')
    }

    return (
        <ul className='flex gap-x-3'>
            {/* {i18n.locales.map(locale => {
                return (
                    <li key={locale}>
                        <Link
                            href={redirectedPathName(locale)}
                            className='rounded-md border bg-secondary px-3 py-2 text-white'
                        >
                            <span className="fi fi-id"></span> {locale}
                        </Link>
                    </li>
                )
            })} */}
            <li>
                <Link
                    href={redirectedPathName(i18n.locales[1])}
                    className='rounded-md bg-secondary/20 px-3 py-2'
                >
                    <span className="fi fi-id"></span>
                </Link>
            </li>
            <li>
                <Link
                    href={redirectedPathName(i18n.locales[0])}
                    className='rounded-md bg-secondary/20 px-3 py-2'
                >
                    <span className="fi fi-us"></span>
                </Link>
            </li>
        </ul>
    )
}
