export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F5F0]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-[#F47B20]/20 border-t-[#F47B20] animate-spin" />
        <p className="text-sm text-black/40 font-sans tracking-widest uppercase">
          Loading
        </p>
      </div>
    </div>
  )
}