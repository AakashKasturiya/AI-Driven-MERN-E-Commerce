export const Header = ({serif, mono}) => {
  return (
    <>
      <header className="border-b border-[#E4DDCF] bg-[#211E20]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A9823C]/60 text-[#A9823C]"
              style={serif}
            >
              A
            </div>
            <div>
              <h1 className="text-lg text-[#F7F3EC]" style={serif}>
                Atelier Ledger
              </h1>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#A9823C]">
                Product Catalog · Admin
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] text-[#B9B2A5]" style={mono}>
            {new Date().toLocaleDateString(undefined, {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </header>
    </>
  );
};
