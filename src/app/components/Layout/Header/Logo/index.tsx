import { Link } from '@/i18n/routing'
import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <Link href='/' className='flex items-center transition-opacity duration-300 hover:opacity-80'>
      <Image
        src='/images/logo/logo.svg'
        alt='Natalie Zimmermann Logo'
        width={150}
        height={40}
        className='h-6 md:h-8 w-auto'
        priority
      />
    </Link>
  )
}

export default Logo
