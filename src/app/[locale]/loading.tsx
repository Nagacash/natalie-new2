export default function LocaleLoading() {
  return (
    <div
      className='flex min-h-[40vh] items-center justify-center'
      aria-live='polite'
      aria-busy='true'
    >
      <div className='h-8 w-8 animate-spin rounded-full border-2 border-accent-cyan border-t-transparent' />
    </div>
  )
}
