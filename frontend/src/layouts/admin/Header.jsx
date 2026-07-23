export const Header = () => {
  return (
    <>
      <header class="sticky top-0 z-30 h-16 bg-background-50/80 backdrop-blur-md border-b border-background-200/70 flex items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <div class="relative">
            <button class="flex items-center gap-2 px-4 py-2 bg-background-100 border border-background-200/70 rounded-lg text-sm text-foreground-500 hover:text-foreground-700 hover:border-background-300/60 transition-all duration-200 cursor-pointer">
              <span class="w-4 h-4 flex items-center justify-center">
                <i class="ri-search-line"></i>
              </span>
              <span class="hidden sm:inline">Search anything...</span>
              <kbd class="hidden lg:inline-flex ml-4 px-1.5 py-0.5 text-[10px] font-medium text-foreground-400 bg-background-200 rounded border border-background-200/70">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="relative">
            <button class="relative w-10 h-10 flex items-center justify-center rounded-lg text-foreground-500 hover:bg-background-100 hover:text-foreground-700 transition-all duration-200 cursor-pointer">
              <span class="w-5 h-5 flex items-center justify-center">
                <i class="ri-notification-3-line text-xl"></i>
              </span>
              <span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-500 ring-2 ring-background-50"></span>
            </button>
          </div>
          <div class="relative">
            <button class="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-background-100 transition-all duration-200 cursor-pointer">
              <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
                <span class="text-sm font-bold text-primary-700">AD</span>
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-foreground-900 leading-none">
                  Admin User
                </p>
                <p class="text-xs text-foreground-400 mt-0.5">Super Admin</p>
              </div>
              <span class="hidden md:flex w-4 h-4 items-center justify-center text-foreground-400">
                <i class="ri-arrow-down-s-line text-sm"></i>
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
